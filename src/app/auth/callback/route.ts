import { createClient } from '@/lib/supabase/server'
import { getOrCreatePrismaUser } from '@/lib/auth/server'
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
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return NextResponse.redirect(new URL('/login?message=Unable%20to%20read%20your%20new%20session&type=error', request.url));
    }

    // Provision/reconcile the application profile without changing legacy
    // Prisma primary keys. This keeps OAuth and password login consistent.
    const dbUser = await getOrCreatePrismaUser(user);

    if (dbUser && dbUser.role !== user.app_metadata?.role) {
      try {
        const { getSupabaseAdmin } = await import('@/lib/supabase/admin');
        await getSupabaseAdmin().auth.admin.updateUserById(user.id, {
          app_metadata: { role: dbUser.role }
        });
      } catch (e) {
        console.error("Failed to sync role to Supabase app_metadata", e);
      }
    }

    if (dbUser) {
      const { mergeGuestCart } = await import('@/lib/cart/merge-guest-cart');
      await mergeGuestCart(dbUser.id);
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
