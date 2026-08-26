'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

export function AuthProvider({ accessToken, children }: { accessToken: string | null, children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
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
