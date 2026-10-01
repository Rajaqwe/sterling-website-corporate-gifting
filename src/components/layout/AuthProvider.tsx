'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AuthProvider({ accessToken, children }: { accessToken: string | null, children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";
    const isBrowserAuditPlaceholder =
      supabaseUrl.includes("example.supabase.co") ||
      supabaseAnonKey === "local-browser-audit-key";

    if (isBrowserAuditPlaceholder) {
      return;
    }

    const supabase = createClient()
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken) {
        router.refresh()
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [accessToken, router])

  return <>{children}</>
}
