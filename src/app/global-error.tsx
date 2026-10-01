'use client';
 
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body>
        <div className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-background">
          <div className="flex flex-col items-center gap-2 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <h2 className="text-2xl font-bold">Something went wrong!</h2>
            <p className="text-muted-foreground max-w-md">
              A critical error occurred. Please try again later or contact support if the issue persists.
            </p>
          </div>
          <button type="button" onClick={() => reset()} className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-ui hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">Try again</button>
        </div>
      </body>
    </html>
  );
}
