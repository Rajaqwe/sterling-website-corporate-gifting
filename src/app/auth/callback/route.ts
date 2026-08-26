import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get('code')
  const next = requestUrl.searchParams.get('next') || '/dashboard'

  if (code) {
    const supabase = createClient()
    
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
      const existingUser = await prisma.user.findUnique({ where: { email: user.email! } });
      
      if (!existingUser) {
        await prisma.user.create({
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
