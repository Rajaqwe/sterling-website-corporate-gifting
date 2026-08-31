import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const rawNext = requestUrl.searchParams.get('next');
  
  // Validate next parameter to prevent open redirects (P1-5)
  const next = rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//') 
    ? rawNext 
    : '/dashboard';

  if (code) {
    const supabase = await createClient()
    
    // Attempt to exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      // LOG EXACT ERROR SERVER-SIDE FOR DEBUGGING OAUTH FAILURES
      console.error("====== OAUTH EXCHANGE ERROR ======")
      console.error("Error Status:", error.status)
      console.error("Error Message:", error.message)
      console.error("Error Name:", error.name)
      console.error("Auth Code Used:", code.substring(0, 5) + "...")
      console.error("==================================")
      
      return NextResponse.redirect(new URL(`/login?message=${encodeURIComponent("Google Login Failed: " + error.message)}&type=error`, request.url))
    }
    // Success - check and provision Prisma User
    const { data: { user } } = await supabase.auth.getUser()
    
    if (user) {
      const { prisma } = await import('@/lib/prisma/client');
      let existingUser = await prisma.user.findUnique({ where: { id: user.id } });
      
      if (!existingUser) {
        const userByEmail = await prisma.user.findUnique({ where: { email: user.email! } });
        if (userByEmail) {
          // Orphaned Prisma user: a user exists with this email but a different Supabase ID.
          // This happens if a user deletes their Supabase account but not their Prisma account,
          // or during OAuth linking quirks. We'll try to reconnect them by updating their ID.
          try {
            await prisma.user.update({
              where: { email: user.email! },
              data: { id: user.id }
            });
            console.log(`Reconnected orphaned Prisma user ${user.email} to new Supabase ID ${user.id}`);
            existingUser = await prisma.user.findUnique({ where: { id: user.id } });
          } catch (e) {
            console.error(`Could not reconnect orphaned Prisma user ${user.email}. Foreign keys may prevent ID update.`, e);
          }
        } else {
          existingUser = await prisma.user.create({
            data: {
              id: user.id,
              email: user.email!,
              fullName: user.user_metadata?.full_name || null,
              avatarUrl: user.user_metadata?.avatar_url || null,
              role: 'CUSTOMER',
            }
          });
        }
      }

      // Sync the role from Prisma to Supabase app_metadata (OAuth logins sometimes wipe custom claims)
      if (existingUser && existingUser.role !== user.app_metadata?.role) {
        try {
          const { getSupabaseAdmin } = await import('@/lib/supabase/admin');
          await getSupabaseAdmin().auth.admin.updateUserById(user.id, { 
            app_metadata: { role: existingUser.role } 
          });
        } catch (e) {
          console.error("Failed to sync role to Supabase app_metadata", e);
        }
      }
    }
    
    // Success - redirect to dashboard
    return NextResponse.redirect(new URL(next, request.url))
  }

  // If there's an explicit error from the provider, redirect to login
  const error_description = requestUrl.searchParams.get('error_description')
  if (error_description) {
    return NextResponse.redirect(new URL(`/login?message=${encodeURIComponent(error_description)}&type=error`, request.url))
  }

  // If there is no code, it might be an Implicit Flow with a URL hash fragment
  return NextResponse.redirect(new URL('/auth/confirm' + requestUrl.search, request.url))
}
