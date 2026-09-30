import React from "react";
import { Loader2, Sparkles } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div
      className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-4 px-4 text-center motion-safe:animate-fade-in"
      role="status"
      aria-live="polite"
      aria-label="Loading Sterling"
    >
      <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-accent/30 bg-accent/10">
        <Sparkles className="h-5 w-5 text-accent motion-safe:animate-pulse" />
        <Loader2 className="absolute inset-0 m-auto h-10 w-10 animate-spin text-accent/70" />
      </div>
      <h2 className="text-xl font-serif tracking-wide text-primary">STERLING</h2>
      <p className="text-sm text-muted-foreground">Curating premium gifts...</p>
    </div>
  );
}
