'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { rateLimit } from '@/lib/security/rate-limit'
import { headers } from 'next/headers'

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

  const role = data?.user?.app_metadata?.role;
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

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
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback`,
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
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const companyName = formData.get('companyName') as string | null

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return redirect(`/register?message=${encodeURIComponent(error.message)}`)
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
  const supabase = await createClient()
  const email = formData.get('email') as string

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth/callback?next=/reset-password`,
  })

  if (error) {
    return redirect(`/forgot-password?message=${encodeURIComponent(error.message)}&type=error`)
  }

  return redirect(`/forgot-password?message=${encodeURIComponent('Password reset link sent! Check your inbox.')}&type=success`)
}

export async function updatePassword(formData: FormData) {
  const supabase = await createClient()
  const password = formData.get('password') as string

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return redirect(`/reset-password?message=${encodeURIComponent(error.message)}&type=error`)
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=' + encodeURIComponent('Password updated successfully! Please sign in.') + '&type=success')
}
