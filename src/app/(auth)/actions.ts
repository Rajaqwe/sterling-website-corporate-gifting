'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/security/rate-limit'
import { headers } from 'next/headers'
import { mergeGuestCart } from '@/lib/cart/merge-guest-cart'
import { assertEnv } from '@/lib/env'
import { getOrCreatePrismaUser } from '@/lib/auth/server'

// Server-enforced password policy. The UI hint is not a security control.
const PASSWORD_MIN_LENGTH = 10;
const PRODUCTION_APP_URL = 'https://sterling-website-corporate-gifting-sterling17.vercel.app';

function validatePassword(password: string): string | null {
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`;
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must contain both letters and numbers.';
  }
  return null;
}

/**
 * Resolve the public origin used for Supabase OAuth/password-reset callbacks.
 * Production must never use a localhost origin. Vercel's deployment URL is
 * preferred when available, with the stable Sterling production alias as a
 * final production fallback. Local development keeps its configured URL.
 */
async function getPublicAppUrl(): Promise<string> {
  const configured = assertEnv('NEXT_PUBLIC_APP_URL').trim().replace(/\/$/, '');
  const isLocalConfigured = /^https?:\/\/(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(configured);
  const isProduction = process.env.NODE_ENV === 'production';

  if (isProduction) {
    const vercelUrl = process.env.VERCEL_URL?.trim().replace(/\/$/, '');
    if (vercelUrl && !/^(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(vercelUrl)) {
      return vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`;
    }
    if (!isLocalConfigured) return configured;
    return PRODUCTION_APP_URL;
  }

  if (!isLocalConfigured) return configured;

  const requestHeaders = await headers();
  const forwardedHost = requestHeaders.get('x-forwarded-host') || requestHeaders.get('host');
  const forwardedProto = requestHeaders.get('x-forwarded-proto') || 'https';

  if (forwardedHost && !/^(localhost|127\.0\.0\.1)(?::\d+)?$/i.test(forwardedHost)) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return configured;
}

export async function login(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'anonymous';
  const limitCheck = await rateLimit(`login_${ip}`, 5, 60000);
  
  if (!limitCheck.success) {
    return redirect(`/login?message=${encodeURIComponent('Too many login attempts. Please try again later.')}`)
  }

  const supabase = await createClient()
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return redirect(`/login?message=${encodeURIComponent(error.message)}`)
  if (!data?.user) return redirect('/login?message=Authentication failed&type=error')

  const dbUser = await getOrCreatePrismaUser(data.user);
  if (!dbUser) {
    await supabase.auth.signOut();
    return redirect('/login?message=Unable to create your account profile&type=error')
  }
  if (!dbUser.isActive) {
    await supabase.auth.signOut();
    return redirect('/login?message=Your account has been deactivated&type=error')
  }

  await mergeGuestCart(dbUser.id);
  revalidatePath('/', 'layout')

  const role = dbUser.role || data.user.app_metadata?.role;
  if (role === 'ADMIN' || role === 'SUPER_ADMIN') redirect('/admin')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login?message=You have been securely logged out&type=success')
}

export async function signInWithOAuth(provider: 'google' | 'apple') {
  const supabase = await createClient()
  const publicAppUrl = await getPublicAppUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${publicAppUrl}/auth/callback`,
    },
  })

  if (error) return redirect(`/login?message=${encodeURIComponent(error.message)}&type=error`)
  if (data?.url) redirect(data.url)
}

export async function signInAnonymously() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInAnonymously()
  if (error) return redirect(`/login?message=${encodeURIComponent('Could not sign in as guest')}&type=error`)
  revalidatePath('/', 'layout')
  redirect('/corporate-gifts')
}

export async function signup(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'anonymous';
  const limitCheck = await rateLimit(`signup_${ip}`, 3, 60000);
  if (!limitCheck.success) return redirect(`/register?message=${encodeURIComponent('Too many signup attempts. Please try again later.')}`)

  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const companyName = formData.get('companyName') as string | null

  const passwordError = validatePassword(password);
  if (passwordError) return redirect(`/register?message=${encodeURIComponent(passwordError)}&type=error`)
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect(`/register?message=${encodeURIComponent('Please enter a valid email address.')}&type=error`)

  const { data, error } = await supabase.auth.signUp({ email, password })
  if (error) {
    console.error('Signup failed:', error.message);
    return redirect(`/register?message=${encodeURIComponent('Could not create your account. If this email is already registered, try signing in or resetting your password.')}&type=error`)
  }

  if (data?.user) {
    const { prisma } = await import('@/lib/prisma/client');
    const existingUser = await prisma.user.findUnique({ where: { id: data.user.id } });
    if (!existingUser) {
      const userByEmail = await prisma.user.findUnique({ where: { email } });
      if (userByEmail) {
        try { await prisma.user.update({ where: { email }, data: { id: data.user.id } }); }
        catch (e) { console.error('Could not reconnect orphaned Prisma user on signup', e); }
      } else {
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || null;
        await prisma.user.create({ data: { id: data.user.id, email, fullName, role: 'CUSTOMER' } });
      }

      if (companyName && !userByEmail) {
        let slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const existingCompany = await prisma.company.findUnique({ where: { slug } });
        if (existingCompany) slug = `${slug}-${Date.now()}`;
        const company = await prisma.company.create({ data: { name: companyName, slug, industry: 'Other' } });
        await prisma.companyMember.create({ data: { userId: data.user.id, companyId: company.id, role: 'COMPANY_ADMIN' } });
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
}

export async function resetPassword(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'anonymous';
  const limitCheck = await rateLimit(`reset_${ip}`, 3, 60000);
  if (!limitCheck.success) return redirect(`/forgot-password?message=${encodeURIComponent('Too many requests. Please try again later.')}&type=error`)

  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return redirect(`/forgot-password?message=${encodeURIComponent('Please enter a valid email address.')}&type=error`)

  const publicAppUrl = await getPublicAppUrl();
  const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${publicAppUrl}/auth/callback?next=/reset-password` })
  if (error) console.error('Password reset request failed:', error.message);
  return redirect(`/forgot-password?message=${encodeURIComponent('If an account exists for that email, a password reset link has been sent.')}&type=success`)
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string
  const passwordError = validatePassword(password);
  if (passwordError) return redirect(`/reset-password?message=${encodeURIComponent(passwordError)}&type=error`)
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return redirect(`/reset-password?message=${encodeURIComponent(error.message)}&type=error`)
  revalidatePath('/', 'layout')
  redirect('/login?message=' + encodeURIComponent('Password updated successfully! Please sign in.') + '&type=success')
}
