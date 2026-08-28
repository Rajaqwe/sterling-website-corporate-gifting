import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function requireAdmin() {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login?message=Please sign in to access this page&type=error')
  }

  const role = user.app_metadata?.role
  if (role !== 'ADMIN' && role !== 'SUPER_ADMIN') {
    redirect('/dashboard?message=Unauthorized. Administrator access required.&type=error')
  }

  return user
}
