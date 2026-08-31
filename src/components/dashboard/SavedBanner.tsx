"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle2, X } from "lucide-react";

interface SavedBannerProps {
  message?: string;
}

export function SavedBanner({ message = "Changes saved successfully." }: SavedBannerProps) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (params.get("saved") === "1") {
      setVisible(true);
      router.replace(pathname, { scroll: false }); // strip ?saved=1
      // Auto-dismiss after 4 s
      const t = setTimeout(() => setVisible(false), 4000);
      return () => clearTimeout(t);
    }
  }, [params, pathname, router]);

  if (!visible) return null;

  return (
    <div 
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 rounded-lg border border-[hsl(var(--status-success))] bg-[hsl(var(--status-success-bg))] px-4 py-3 text-sm text-[hsl(var(--status-success))] shadow-sm"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0 text-[hsl(var(--status-success))]" />
      <span className="flex-1">{message}</span>
      <button
        onClick={() => setVisible(false)}
        className="text-[hsl(var(--status-success))] hover:opacity-75 transition-opacity"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
