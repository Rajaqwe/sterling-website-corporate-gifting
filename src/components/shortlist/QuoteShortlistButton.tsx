"use client";

import { useEffect, useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  QuoteShortlistItem,
  QUOTE_SHORTLIST_EVENT,
  readQuoteShortlist,
  writeQuoteShortlist,
} from "@/lib/quote-shortlist";

interface QuoteShortlistButtonProps {
  item: QuoteShortlistItem;
  compact?: boolean;
}

export function QuoteShortlistButton({
  item,
  compact = false,
}: QuoteShortlistButtonProps) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const sync = () => {
      setSaved(readQuoteShortlist().some((entry) => entry.id === item.id));
    };

    sync();
    window.addEventListener(QUOTE_SHORTLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(QUOTE_SHORTLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [item.id]);

  const toggle = () => {
    const current = readQuoteShortlist();
    const exists = current.some((entry) => entry.id === item.id);

    if (exists) {
      writeQuoteShortlist(current.filter((entry) => entry.id !== item.id));
      setSaved(false);
      return;
    }

    writeQuoteShortlist([item, ...current.filter((entry) => entry.id !== item.id)]);
    setSaved(true);
  };

  return (
    <Button
      type="button"
      variant="secondary"
      size={compact ? "icon" : "sm"}
      onClick={toggle}
      data-track-event={saved ? "shortlist_remove" : "shortlist_add"}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.name} from quote shortlist` : `Save ${item.name} to quote shortlist`}
      title={saved ? "Remove from quote shortlist" : "Save for quote"}
      className={
        compact
          ? "h-10 w-10 rounded-xl border border-background/70 bg-background/90 text-foreground shadow-md backdrop-blur hover:bg-background"
          : "h-10 rounded-xl gap-2 border-border/70 bg-background/90 px-3 text-xs font-semibold shadow-sm hover:border-accent hover:text-accent"
      }
    >
      {saved ? <BookmarkCheck className="h-4 w-4 text-accent" /> : <Bookmark className="h-4 w-4" />}
      {!compact && <span>{saved ? "Saved" : "Save for quote"}</span>}
    </Button>
  );
}

export function QuoteShortlistNav() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const sync = () => setCount(readQuoteShortlist().length);
    sync();
    window.addEventListener(QUOTE_SHORTLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(QUOTE_SHORTLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return (
    <a
      href="/quote-shortlist"
      data-track-event="quote_shortlist_nav"
      aria-label={`Quote shortlist${count ? `, ${count} saved` : ""}`}
      className="relative inline-flex min-h-10 min-w-10 items-center justify-center rounded-full p-2 text-foreground hover:bg-secondary transition-ui touch-manipulation"
    >
      <Bookmark className="h-5 w-5" />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 min-w-5 rounded-full bg-accent px-1 text-center text-[10px] font-bold leading-5 text-accent-foreground shadow-sm">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </a>
  );
}
