"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ArrowRight, Bookmark, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatINR } from "@/lib/currency";
import {
  QuoteShortlistItem,
  QUOTE_SHORTLIST_EVENT,
  readQuoteShortlist,
  writeQuoteShortlist,
} from "@/lib/quote-shortlist";
import { useEffect, useMemo, useState } from "react";

export function QuoteShortlistClient() {
  const [items, setItems] = useState<QuoteShortlistItem[]>([]);
  const [quantity, setQuantity] = useState(50);

  useEffect(() => {
    const sync = () => setItems(readQuoteShortlist());
    sync();
    window.addEventListener(QUOTE_SHORTLIST_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(QUOTE_SHORTLIST_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const remove = (id: string) => {
    writeQuoteShortlist(items.filter((item) => item.id !== id));
  };

  const clear = () => {
    writeQuoteShortlist([]);
  };

  const referenceEstimate = useMemo(() => {
    return items.reduce((total, item) => {
      const price = typeof item.price === "number" && item.price > 0 ? item.price : 0;
      return total + price * quantity;
    }, 0);
  }, [items, quantity]);

  const pricedItemCount = items.filter((item) => typeof item.price === "number" && item.price > 0).length;

  if (items.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center shadow-sm">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-secondary/80">
          <Bookmark className="h-8 w-8 text-accent" />
        </div>
        <h2 className="mt-5 text-2xl font-heading font-bold text-foreground">Your shortlist is empty</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
          Save products while browsing and build a focused gift selection before requesting one quote.
        </p>
        <Link
          href="/corporate-gifts"
          className="btn-primary mt-6 inline-flex h-11 items-center justify-center gap-2 rounded-xl px-6 text-sm font-semibold"
        >
          Browse corporate gifts
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Quote shortlist</p>
          <h2 className="mt-1 text-xl font-heading font-bold text-foreground">{items.length} product{items.length === 1 ? "" : "s"} saved</h2>
          <p className="mt-1 text-sm text-muted-foreground">Use this as your working selection before asking Sterling for pricing.</p>
        </div>
        <Button type="button" variant="outline" onClick={clear} className="w-full sm:w-auto">
          <RotateCcw className="mr-2 h-4 w-4" />
          Clear shortlist
        </Button>
      </div>

      <div className="rounded-2xl border border-accent/20 bg-accent/[0.06] p-5">
        <div className="grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent">Reference pricing</p>
            <h2 className="mt-1 text-lg font-heading font-bold text-foreground">See the starting-price scale for your shortlist</h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">
              This is only a planning reference using the displayed starting prices. Final pricing can change with volume, branding, packaging, shipping and taxes.
            </p>
          </div>
          <label className="w-full lg:w-44">
            <span className="mb-1.5 block text-xs font-semibold text-muted-foreground">Units per selected product</span>
            <input
              type="number"
              min={1}
              max={1000000}
              value={quantity}
              onChange={(event) => setQuantity(Math.max(1, Number(event.target.value) || 1))}
              className="h-11 w-full rounded-xl border border-border bg-background px-3 text-sm font-semibold text-foreground outline-none ring-offset-background focus-visible:ring-2 focus-visible:ring-accent"
            />
          </label>
        </div>
        <div className="mt-5 flex flex-wrap items-end justify-between gap-4 border-t border-accent/10 pt-4">
          <div>
            <span className="text-xs uppercase tracking-wide text-muted-foreground">Across {pricedItemCount} priced item{pricedItemCount === 1 ? "" : "s"}</span>
            <p className="mt-1 text-2xl font-heading font-bold text-foreground">{formatINR(referenceEstimate)}</p>
          </div>
          <p className="max-w-md text-right text-xs leading-5 text-muted-foreground">
            {pricedItemCount === items.length
              ? `At ${quantity.toLocaleString("en-IN")} units for every saved product.`
              : "Some saved products do not have a displayed starting price, so they are excluded from this reference."
            }
          </p>
        </div>
      </div>

      <div className="grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="grid gap-5 rounded-2xl border border-border bg-card p-4 shadow-sm sm:grid-cols-[120px_1fr_auto] sm:items-center">
            <div className="relative aspect-square overflow-hidden rounded-xl bg-secondary/50">
              {item.imageUrl ? (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">No image</div>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
                {item.category && <span>{item.category}</span>}
                {item.moq ? <span>MOQ {item.moq}</span> : null}
                {item.leadTimeDays ? <span>{item.leadTimeDays} day lead time</span> : null}
              </div>
              <h3 className="mt-2 truncate text-xl font-heading font-bold text-foreground">{item.name}</h3>
              {typeof item.price === "number" && item.price > 0 ? (
                <p className="mt-1 text-sm text-muted-foreground">Starting from <span className="font-semibold text-foreground">{formatINR(item.price)}</span> / unit</p>
              ) : null}
              <Link href={`/products/${item.slug}`} className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent hover:underline">
                View product <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="flex items-center gap-2 sm:flex-col">
              <Button type="button" variant="ghost" onClick={() => remove(item.id)} className="h-10 flex-1 sm:flex-none">
                <Trash2 className="mr-2 h-4 w-4" />
                Remove
              </Button>
            </div>
          </article>
        ))}
      </div>

      <div className="sticky bottom-4 z-20 rounded-2xl border border-border bg-background/95 p-4 shadow-xl backdrop-blur">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-foreground">Ready to price this selection?</p>
            <p className="text-xs text-muted-foreground">Sterling can review the saved products with your quantity, budget and delivery needs.</p>
          </div>
          <Link
            href={`/request-a-quote?numberOfRecipients=${quantity}`}
            data-track-event="shortlist_request_quote"
            className="btn-primary inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold sm:w-auto"
          >
            Request quote
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
