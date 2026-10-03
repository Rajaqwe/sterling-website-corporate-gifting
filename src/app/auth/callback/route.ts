import { createClient } from '@/lib/supabase/server'
import { getOrCreatePrismaUser } from '@/lib/auth/server'
import { NextResponse } from 'next/server'

const PRODUCTION_APP_URL = 'https://sterling-website-corporate-gifting-sterling17.vercel.app'

function getSafeOrigin(request: Request): string {
  const requestUrl = new URL(request.url)
  if (process.env.NODE_ENV !== 'production') return requestUrl.origin

  // OAuth callbacks should always return to Sterling's stable public URL.
  // Do not send users back to a deployment-specific Vercel hostname.
  return PRODUCTION_APP_URL
}

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const origin = getSafeOrigin(request)
  const code = requestUrl.searchParams.get('code')
  const rawNext = requestUrl.searchParams.get('next')

  const next = rawNext && rawNext.startsWith('/') && !rawNext.startsWith('//')
    ? rawNext
    : '/dashboard'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)

    if (error) {
      console.error('====== OAUTH EXCHANGE ERROR ======')
      console.error('Error Status:', error.status)
      console.error('Error Message:', error.message)
      console.error('Error Name:', error.name)
      console.error('Auth Code Used:', code.substring(0, 5) + '...')
      console.error('==================================')
      return NextResponse.redirect(new URL(`/login?message=${encodeURIComponent('Google Login Failed: ' + error.message)}&type=error`, origin))
    }

    const { data: { user }, error: userError } = await supabase.auth.getUser()
    if (userError || !user) {
      return NextResponse.redirect(new URL('/login?message=Unable%20to%20read%20your%20new%20session&type=error', origin))
    }

    const dbUser = await getOrCreatePrismaUser(user)

    if (dbUser && dbUser.role !== user.app_metadata?.role) {
      try {
        const { getSupabaseAdmin } = await import('@/lib/supabase/admin')
        await getSupabaseAdmin().auth.admin.updateUserById(user.id, {
          app_metadata: { role: dbUser.role }
        })
      } catch (e) {
        console.error('Failed to sync role to Supabase app_metadata', e)
      }
    }

    if (dbUser) {
      const { mergeGuestCart } = await import('@/lib/cart/merge-guest-cart')
      await mergeGuestCart(dbUser.id)
    }

    return NextResponse.redirect(new URL(next, origin))
  }

  const errorDescription = requestUrl.searchParams.get('error_description')
  if (errorDescription) {
    return NextResponse.redirect(new URL(`/login?message=${encodeURIComponent(errorDescription)}&type=error`, origin))
  }

  return NextResponse.redirect(new URL('/auth/confirm' + requestUrl.search, origin))
}
