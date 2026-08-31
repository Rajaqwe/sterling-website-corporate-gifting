import React from "react";
import { Loader2 } from "lucide-react";

export default function GlobalLoading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full gap-4">
      <Loader2 className="h-10 w-10 animate-spin text-accent" />
      <h2 className="text-xl font-serif text-primary animate-pulse tracking-wide">
        STERLING
      </h2>
      <p className="text-sm text-muted-foreground animate-pulse">
        Curating premium gifts...
      </p>
    </div>
  );
}
