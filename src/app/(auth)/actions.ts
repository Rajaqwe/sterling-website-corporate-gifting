'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/login?message=${encodeURIComponent(error.message)}`)
  }

  const role = data?.user?.user_metadata?.role;
  const isAdmin = role === 'ADMIN' || role === 'SUPER_ADMIN';

  revalidatePath('/', 'layout')
  
  if (isAdmin) {
    redirect('/admin')
  } else {
    redirect('/dashboard')
  }
}

export async function signOut() {
  const supabase = createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/login?message=You have been securely logged out&type=success')
}

export async function signInWithOAuth(provider: 'google' | 'apple') {
  const supabase = createClient()
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
  const supabase = createClient()
  const { error } = await supabase.auth.signInAnonymously()

  if (error) {
    return redirect(`/login?message=${encodeURIComponent('Could not sign in as guest')}&type=error`)
  }

  revalidatePath('/', 'layout')
  redirect('/corporate-gifts')
}

export async function signup(formData: FormData) {
  const supabase = createClient()
  
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const fullName = formData.get('fullName') as string | null

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
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (!existingUser) {
      await prisma.user.create({
        data: {
          id: data.user.id,
          email,
          fullName: fullName || null,
          role: 'CUSTOMER',
        }
      });
    }
  }

  revalidatePath('/', 'layout')
  redirect('/login?message=Check email to continue sign in process')
}

export async function resetPassword(formData: FormData) {
  const supabase = createClient()
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
  const supabase = createClient()
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
