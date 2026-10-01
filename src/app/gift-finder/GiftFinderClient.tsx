"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { SlidersHorizontal, ArrowRight } from "lucide-react";

export function GiftFinderClient({
  budget,
  quantity,
  audience,
}: {
  budget: number;
  quantity: number;
  audience: string;
}) {
  const router = useRouter();
  const [nextBudget, setNextBudget] = useState(String(budget));
  const [nextQuantity, setNextQuantity] = useState(String(quantity));
  const [nextAudience, setNextAudience] = useState(audience);

  function submit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams({
      budget: String(Math.max(250, Number(nextBudget) || 2000)),
      quantity: String(Math.max(1, Number(nextQuantity) || 50)),
      audience: nextAudience,
    });
    router.push("/gift-finder?" + params.toString());
  }

  return (
    <form onSubmit={submit} className="rounded-[26px] border border-border bg-card p-5 shadow-xl sm:p-7">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <SlidersHorizontal className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-muted-foreground">Tell us the shape of the order</p>
          <h2 className="mt-1 text-lg font-bold text-foreground">We&apos;ll filter the catalogue for you.</h2>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-semibold text-foreground">Budget per recipient</span>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">₹</span>
            <input
              value={nextBudget}
              onChange={(e) => setNextBudget(e.target.value.replace(/\D/g, ""))}
              inputMode="numeric"
              min={250}
              className="h-11 w-full rounded-xl border border-input bg-background pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
              aria-label="Budget per recipient"
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-semibold text-foreground">Quantity</span>
          <input
            value={nextQuantity}
            onChange={(e) => setNextQuantity(e.target.value.replace(/\D/g, ""))}
            inputMode="numeric"
            min={1}
            className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
            aria-label="Quantity"
          />
        </label>
      </div>

      <label className="mt-4 block space-y-2">
        <span className="text-sm font-semibold text-foreground">Who are you gifting?</span>
        <select
          value={nextAudience}
          onChange={(e) => setNextAudience(e.target.value)}
          className="h-11 w-full rounded-xl border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-accent/30"
        >
          <option value="employees">Employees &amp; teams</option>
          <option value="clients">Clients &amp; partners</option>
          <option value="events">Events &amp; conferences</option>
          <option value="festive">Festive &amp; celebration</option>
        </select>
      </label>

      <button
        type="submit"
        data-track-event="gift_finder_filter"
        className="btn-gold mt-5 inline-flex h-11 w-full items-center justify-center rounded-full px-5 text-sm font-bold"
      >
        Update shortlist <ArrowRight className="ml-2 h-4 w-4" />
      </button>
    </form>
  );
}
