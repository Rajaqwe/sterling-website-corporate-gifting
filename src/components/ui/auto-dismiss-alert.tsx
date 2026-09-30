'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export function AutoDismissAlert({ message, type = 'error', duration = 3000 }: { message: string, type?: 'error' | 'success', duration?: number }) {
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (message) {
      setVisible(true);
      const timer = setTimeout(() => {
        setVisible(false);
        const url = new URL(window.location.href);
        url.searchParams.delete("message");
        const nextUrl = url.pathname + (url.searchParams.toString() ? `?${url.searchParams.toString()}` : "") + url.hash;
        router.replace(nextUrl, { scroll: false });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, router, pathname]);

  if (!message || !visible) return null;

  const styles = type === 'error' 
    ? 'bg-destructive/10 text-destructive border-destructive/20'
    : 'bg-emerald-50 text-emerald-800 border-emerald-200 dark:bg-emerald-950/20 dark:text-emerald-300 dark:border-emerald-900/50';

  return (
    <div className={`p-3 text-sm rounded-lg border text-center transition-opacity duration-[var(--motion-ui)] ease-[var(--ease-standard)] motion-safe:animate-fade-in ${styles}`}>
      {message}
    </div>
  );
}
