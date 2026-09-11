'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/security/rate-limit'
import { headers } from 'next/headers'
import { mergeGuestCart } from '@/lib/cart/merge-guest-cart'
import { assertEnv } from '@/lib/env'

// Server-enforced password policy. The UI hint is not a security control.
const PASSWORD_MIN_LENGTH = 10;
function validatePassword(password: string): string | null {
  if (!password || password.length < PASSWORD_MIN_LENGTH) {
    return `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`;
  }
  if (!/[a-zA-Z]/.test(password) || !/[0-9]/.test(password)) {
    return 'Password must contain both letters and numbers.';
  }
  return null;
}

export async function login(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'anonymous';
  const limitCheck = await rateLimit(`login_${ip}`, 5, 60000); // 5 attempts per minute
  
  if (!limitCheck.success) {
    return redirect(`/login?message=${encodeURIComponent('Too many login attempts. Please try again later.')}`)
  }

  const supabase = await createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  let isAdmin = false;
  if (data?.user) {
    const { prisma } = await import('@/lib/prisma/client');
    const dbUser = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: { role: true }
    });
    const role = dbUser?.role || data.user.app_metadata?.role;
    isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';
    await mergeGuestCart(data.user.id);
  }

  revalidatePath('/', 'layout')
  
  if (isAdmin) {
    redirect('/admin')
  } else {
    redirect('/dashboard')
  }
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login?message=You have been securely logged out&type=success')
}

export async function signInWithOAuth(provider: 'google' | 'apple') {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${assertEnv('NEXT_PUBLIC_APP_URL')}/auth/callback`,
    },
  })

  if (error) {
    return redirect(`/login?message=${encodeURIComponent(error.message)}&type=error`)
  }

  if (data?.url) {
    redirect(data.url)
  }
}

export async function signInAnonymously() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signInAnonymously()

  if (error) {
    return redirect(`/login?message=${encodeURIComponent('Could not sign in as guest')}&type=error`)
  }

  revalidatePath('/', 'layout')
  redirect('/corporate-gifts')
}

export async function signup(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'anonymous';
  const limitCheck = await rateLimit(`signup_${ip}`, 3, 60000); // 3 attempts per minute
  
  if (!limitCheck.success) {
    return redirect(`/register?message=${encodeURIComponent('Too many signup attempts. Please try again later.')}`)
  }

  const supabase = await createClient()
  
  const email = (formData.get('email') as string)?.trim().toLowerCase()
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const companyName = formData.get('companyName') as string | null

  const passwordError = validatePassword(password);
  if (passwordError) {
    return redirect(`/register?message=${encodeURIComponent(passwordError)}&type=error`)
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect(`/register?message=${encodeURIComponent('Please enter a valid email address.')}&type=error`)
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    // Log the real cause server-side; return a generic message so attackers
    // cannot enumerate registered emails from the signup response.
    console.error('Signup failed:', error.message);
    return redirect(`/register?message=${encodeURIComponent('Could not create your account. If this email is already registered, try signing in or resetting your password.')}&type=error`)
  }

  // Provision Prisma User
  if (data?.user) {
    const { prisma } = await import('@/lib/prisma/client');
    const existingUser = await prisma.user.findUnique({ where: { id: data.user.id } });
    if (!existingUser) {
      const userByEmail = await prisma.user.findUnique({ where: { email } });
      let finalUserId = data.user.id;

      if (userByEmail) {
        try {
          await prisma.user.update({
            where: { email },
            data: { id: data.user.id }
          });
        } catch (e) {
          console.error("Could not reconnect orphaned Prisma user on signup", e);
          finalUserId = userByEmail.id; // Fallback
        }
      } else {
        const fullName = [firstName, lastName].filter(Boolean).join(' ') || null;
        
        await prisma.user.create({
          data: {
            id: data.user.id,
            email,
            fullName,
            role: 'CUSTOMER',
          }
        });
      }

      if (companyName && !userByEmail) {
        let slug = companyName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
        const existingCompany = await prisma.company.findUnique({ where: { slug } });
        if (existingCompany) {
          slug = `${slug}-${Date.now()}`;
        }

        const company = await prisma.company.create({
          data: {
            name: companyName,
            slug,
            industry: 'Other',
          }
        });

        await prisma.companyMember.create({
          data: {
            userId: data.user.id,
            companyId: company.id,
            role: 'COMPANY_ADMIN',
          }
        });
      }
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
}

export async function resetPassword(formData: FormData) {
  const ip = (await headers()).get('x-forwarded-for') || 'anonymous';
  const limitCheck = await rateLimit(`reset_${ip}`, 3, 60000); // 3 requests per minute

  if (!limitCheck.success) {
    return redirect(`/forgot-password?message=${encodeURIComponent('Too many requests. Please try again later.')}&type=error`)
  }

  const supabase = await createClient()
  const email = (formData.get('email') as string)?.trim().toLowerCase()

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return redirect(`/forgot-password?message=${encodeURIComponent('Please enter a valid email address.')}&type=error`)
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${assertEnv('NEXT_PUBLIC_APP_URL')}/auth/callback?next=/reset-password`,
  })

  if (error) {
    console.error('Password reset request failed:', error.message);
  }

  // Always show the same response so the endpoint cannot be used to
  // discover which emails have accounts.
  return redirect(`/forgot-password?message=${encodeURIComponent('If an account exists for that email, a password reset link has been sent.')}&type=success`)
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const passwordError = validatePassword(password);
  if (passwordError) {
    return redirect(`/reset-password?message=${encodeURIComponent(passwordError)}&type=error`)
  }

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return redirect(`/reset-password?message=${encodeURIComponent(error.message)}&type=error`)
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=' + encodeURIComponent('Password updated successfully! Please sign in.') + '&type=success')
}
