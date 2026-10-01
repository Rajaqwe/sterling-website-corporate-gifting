import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { serializeData } from "@/lib/utils/serialize";
import { ProductCard } from "@/components/products/ProductCard";
import { GiftFinderClient } from "./GiftFinderClient";

export const metadata: Metadata = {
  title: "Gift Finder",
  description: "Find corporate gift options by budget, quantity and gifting goal, then shortlist them for a quote.",
};

type SearchParams = Promise<{
  budget?: string;
  quantity?: string;
  audience?: string;
}>;

function clampInt(value: string | undefined, fallback: number, min: number, max: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(max, Math.max(min, Math.round(parsed))) : fallback;
}

export default async function GiftFinderPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const budget = clampInt(params.budget, 2000, 250, 100000);
  const quantity = clampInt(params.quantity, 50, 1, 10000);
  const audience = params.audience || "employees";

  let products: any[] = [];
  try {
    const inBudget = await prisma.product.findMany({
      where: {
        status: "ACTIVE",
        price: { lte: budget },
        minimumOrderQuantity: { lte: quantity },
      },
      include: { category: true, media: true },
      orderBy: [{ isFeatured: "desc" }, { price: "asc" }],
      take: 6,
    });

    products = serializeData(inBudget as any[]);

    if (products.length < 3) {
      const nearest = await prisma.product.findMany({
        where: {
          status: "ACTIVE",
          minimumOrderQuantity: { lte: quantity },
        },
        include: { category: true, media: true },
        orderBy: { price: "asc" },
        take: 6,
      });

      const seen = new Set(products.map((p) => p.id));
      products = serializeData([
        ...products,
        ...(nearest as any[]).filter((p) => !seen.has(p.id)).slice(0, 6 - products.length),
      ]);
    }
  } catch (error) {
    console.error("Gift Finder query failed:", error);
  }

  return (
    <div className="min-h-screen bg-background">
      <section className="border-b border-border/60 bg-secondary/25 pt-28 sm:pt-36">
        <div className="container mx-auto px-4 pb-14 sm:px-6 sm:pb-20 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-end">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                Gift Finder
              </span>
              <h1 className="mt-5 font-serif text-4xl font-bold tracking-[-0.04em] text-primary sm:text-5xl">
                Start with the brief. We&apos;ll narrow the choices.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg">
                Choose your budget, quantity and audience to get a practical shortlist you can take straight into a corporate quote.
              </p>
              <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-muted-foreground">
                {["Built for bulk orders", "Branding-aware options", "Quote-ready shortlist"].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <GiftFinderClient budget={budget} quantity={quantity} audience={audience} />
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Your shortlist</span>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Options to explore</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Showing gifts at or near ₹{budget.toLocaleString("en-IN")} per recipient for {quantity.toLocaleString("en-IN")} units.
            </p>
          </div>
          <Link
            href={`/request-a-quote?budgetPerRecipient=${budget}&numberOfRecipients=${quantity}&eventType=${encodeURIComponent(audience)}`}
            data-track-event="gift_finder_quote"
            className="btn-primary inline-flex h-11 items-center justify-center rounded-full px-5 text-sm font-bold"
          >
            Quote this brief <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>

        {products.length > 0 ? (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-border p-10 text-center">
            <h3 className="text-lg font-bold text-foreground">We need a little more detail.</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-muted-foreground">
              Start a quote and tell us the quantity, budget and deadline. Our team can build a shortlist from the full catalogue.
            </p>
            <Link href="/request-a-quote" className="btn-primary mt-5 inline-flex h-11 items-center rounded-full px-5 text-sm font-bold">
              Start a quote <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
