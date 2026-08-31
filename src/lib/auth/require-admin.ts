import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?message=Please sign in to access this page&type=error')
  }

  let role = user.app_metadata?.role
  
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    const { prisma } = await import('@/lib/prisma/client')
    const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { role: true } })
    role = dbUser?.role
    
    if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
      redirect('/dashboard?message=Unauthorized. Administrator access required.&type=error')
    }
  }

  return user
}
