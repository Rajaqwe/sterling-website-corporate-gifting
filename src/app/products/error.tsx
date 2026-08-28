'use client';
 
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
 
export default function ProductsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);
 
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 p-8 text-center">
      <AlertCircle className="h-10 w-10 text-muted-foreground" />
      <h2 className="text-xl font-bold">Failed to load product data</h2>
      <p className="text-muted-foreground max-w-sm">
        We encountered an issue while retrieving this product. Please try refreshing.
      </p>
      <Button onClick={() => reset()} variant="outline">
        Refresh Component
      </Button>
    </div>
  );
}
