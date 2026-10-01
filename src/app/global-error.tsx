'use client';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background text-foreground">
        <main className="flex min-h-screen w-full flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex flex-col items-center gap-2">
            <div
              aria-hidden="true"
              className="flex h-12 w-12 items-center justify-center rounded-full border border-destructive/30 text-destructive"
            >
              !
            </div>
            <h2 className="text-2xl font-bold">Something went wrong</h2>
            <p className="max-w-md text-sm text-muted-foreground">
              A critical error occurred. Please try again later or contact support if the issue persists.
            </p>
          </div>
          <button
            type="button"
            onClick={() => reset()}
            className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-ui hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
