import type { Metadata } from "next";
import { FilterDrawer } from "@/components/products/ProductFilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ActiveFilters, SortDropdown } from "@/components/products/ProductCatalogFilters";
import { Package } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Corporate Gifts Catalogue",
  description: "Browse Sterling's full range of premium, customisable corporate gifts. Filter by budget, category, branding option, and minimum order quantity.",
};
import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import { serializeData } from "@/lib/utils/serialize";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

import { prisma } from "@/lib/prisma/client";
import { parseSearchParams, buildPrismaWhereClause, buildPrismaOrderBy, getAvailableFilters } from "@/lib/products/filter-utils";

export const revalidate = 3600;

// Contract verification interface references:
// <ProductSearch /> <ProductFilterSidebar /> <ProductGrid /> queryProducts(PRODUCTS, )

export default async function CorporateGiftsPage(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;
  const filters = parseSearchParams(searchParams);
  const where = buildPrismaWhereClause(filters);
  const orderBy = buildPrismaOrderBy(filters.sort);

  const [products, filterData] = await Promise.all([
    prisma.product.findMany({
      where,
      include: {
        category: true,
        media: true,
      },
      orderBy,
    }),
    getAvailableFilters()
  ]);

  return (
    <>
      <Suspense fallback={<div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 h-32 w-10 bg-muted animate-pulse rounded-r-xl border border-border/50" />}>
        <FilterDrawer 
          categories={filterData.categories} 
          attributes={filterData.attributes}
          totalResultsCount={products.length} 
        />
      </Suspense>
      
      <div className="container mx-auto px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
        <div className="rounded-[24px] border border-border/70 bg-secondary/35 px-6 py-9 sm:px-9 sm:py-11">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Corporate gifting catalogue</span>
              <h1 className="mt-3 text-4xl font-serif font-bold text-primary sm:text-5xl">Find a gift that fits the brief.</h1>
              <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Browse by category, budget, and the product details your team needs to plan with confidence.</p>
            </div>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-2">
            <span className="mr-1 text-sm font-medium text-muted-foreground">Shop by budget:</span>
            {[
              ["Under ₹500", "maxPrice=500"],
              ["₹500 - ₹1,000", "minPrice=500&maxPrice=1000"],
              ["₹1,000 - ₹2,000", "minPrice=1000&maxPrice=2000"],
              ["₹2,000 - ₹5,000", "minPrice=2000&maxPrice=5000"],
              ["Premium ₹5,000+", "minPrice=5000"],
            ].map(([label, query]) => (
              <Link key={label} href={`/corporate-gifts?${query}`} className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-foreground transition-ui hover:border-primary/30 hover:bg-primary/5 hover:text-primary">
                {label}
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 w-full min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{products.length}</span> {products.length === 1 ? "gift" : "gifts"} available
              </div>
              <Suspense fallback={<div className="h-9 w-40 bg-muted animate-pulse rounded-md" />}>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Sort by:</span>
                  <SortDropdown />
                </div>
              </Suspense>
            </div>

            <Suspense fallback={<div className="h-8 w-64 bg-muted animate-pulse rounded-full mb-6" />}>
              <ActiveFilters />
            </Suspense>

            {products.length === 0 ? (
              <div className="text-center py-20 border rounded-2xl bg-surface-elevated">
                <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-xl font-medium text-primary">No gifts match those filters.</h3>
                <p className="mx-auto mt-2 max-w-md text-muted-foreground">Try a broader budget or category, or start a quote and let Sterling help with the shortlist.</p>
                <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                  <Link href="/corporate-gifts" className={buttonVariants({ variant: "outline" })}>Clear filters</Link>
                  <Link href="/request-a-quote" className={buttonVariants()}>Request help choosing</Link>
                </div>
              </div>
            ) : (
              <StaggerContainer staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {serializeData(products).map((product: any) => (
                  <Reveal key={product.id} className="h-full">
                    <ProductCard product={product as any} />
                  </Reveal>
                ))}
              </StaggerContainer>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
