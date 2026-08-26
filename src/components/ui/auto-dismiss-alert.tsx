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
        // Optional: clean up the URL by removing the ?message= part
        router.replace(pathname, { scroll: false });
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration, router, pathname]);

  if (!message || !visible) return null;

  const styles = type === 'error' 
    ? 'bg-destructive/10 text-destructive border-destructive/20' 
    : 'bg-green-100 text-green-800 border-green-200';

  return (
    <div className={`p-3 text-sm rounded-md border text-center transition-opacity duration-300 ${styles}`}>
      {message}
    </div>
  );
}
