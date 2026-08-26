'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBrowserClient } from '@supabase/ssr';
import { Loader2 } from 'lucide-react';

export default function AuthConfirmPage() {
  const router = useRouter();
  const [error, setError] = useState('');

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    // The browser client automatically parses the #access_token hash from the URL 
    // and sets the secure cookies.
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        router.push('/dashboard');
      }
    });

    const checkSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        setError(error.message);
        setTimeout(() => router.push('/login?message=Authentication failed&type=error'), 2000);
        return;
      }

      if (session) {
        router.push('/dashboard');
      } else {
        // Give the onAuthStateChange listener a split second to fire before declaring failure
        setTimeout(() => {
          if (!error) {
            setError('No session found in the URL. Please try logging in again.');
            setTimeout(() => router.push('/login?message=No session found&type=error'), 2000);
          }
        }, 1500);
      }
    };

    checkSession();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      {error ? (
        <div className="text-destructive font-medium text-center">
          <p>{error}</p>
          <p className="text-sm text-muted-foreground mt-2">Redirecting to login...</p>
        </div>
      ) : (
        <>
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <h2 className="text-xl font-medium font-serif">Verifying your secure login...</h2>
          <p className="text-sm text-muted-foreground">Please wait a moment while we securely sign you in.</p>
        </>
      )}
    </div>
  );
}
