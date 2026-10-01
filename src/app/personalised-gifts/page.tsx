import type { Metadata } from "next";
import { FilterDrawer } from "@/components/products/ProductFilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import Link from "next/link";
import { Package } from "lucide-react";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Personalised Corporate Gifts",
  description: "Custom-engraved and personalised corporate gifts for employees, clients, and events — build a gift your recipients will remember.",
};

import { prisma } from "@/lib/prisma/client";
import { parseSearchParams, buildPrismaWhereClause, buildPrismaOrderBy, getAvailableFilters } from "@/lib/products/filter-utils";

export default async function PersonalisedGiftsPage(
  props: {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
  }
) {
  const searchParams = await props.searchParams;
  const filters = parseSearchParams(searchParams);
  const where = buildPrismaWhereClause(filters);
  const orderBy = buildPrismaOrderBy(filters.sort);

  let products: any[] = [];
  let filterData: any = { categories: [], attributes: [] };
  let dbError = false;

  try {
    const [fetchedProducts, fetchedFilterData] = await Promise.all([
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
    products = fetchedProducts;
    filterData = fetchedFilterData;
  } catch (error) {
    console.error('[personalised-gifts] DB error:', error);
    dbError = true;
  }

  if (dbError) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 text-center">
        <Package className="mx-auto h-14 w-14 text-muted-foreground mb-5" />
        <h1 className="text-3xl font-bold text-primary mb-3">Personalised Gifts</h1>
        <p className="text-muted-foreground text-lg mb-8">We&#39;re having trouble loading products right now. Please try again in a moment.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/corporate-gifts" className="inline-flex items-center justify-center rounded-full bg-primary text-white font-semibold px-7 h-12 text-sm hover:opacity-90 transition-opacity">Browse Corporate Gifts</Link>
          <Link href="/request-a-quote" className="inline-flex items-center justify-center rounded-full border border-border font-semibold px-7 h-12 text-sm hover:bg-secondary transition-colors">Request a Quote</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 h-32 w-10 bg-muted animate-pulse rounded-r-xl border border-border/50" />}>
        <FilterDrawer 
          categories={filterData.categories} 
          attributes={filterData.attributes}
          totalResultsCount={products.length} 
        />
      </Suspense>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-12">
        <div className="rounded-[24px] border border-border/70 bg-secondary/35 px-5 py-8 sm:px-9 sm:py-11">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Personalised corporate gifting</span>
            <h1 className="mt-3 text-4xl font-serif font-bold text-primary sm:text-5xl">Make the gift unmistakably yours.</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Browse products suited to custom branding, personalised details, and company-ready presentation.</p>
          </div>
        </div>

        <div className="mt-8 flex-1 w-full">
          {products.length === 0 ? (
            <div className="text-center py-20 border rounded-2xl bg-surface-elevated">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-primary">No personalised gifts found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
              <div className="mt-6">
                <Link href="/request-a-quote" className="btn-primary inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold">
                  Request help choosing
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product as any} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
