import type { Metadata } from "next";
import { MobileFilterDrawer, ProductFilterSidebar } from "@/components/products/ProductFilterSidebar";
import Link from "next/link";
import { Package, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Suspense } from "react";
import { ProductCard } from "@/components/products/ProductCard";

export const metadata: Metadata = {
  title: "Gift Collections",
  description: "Curated corporate gift collections for every occasion — employee milestones, client relationships, festive gifting, and more.",
};
import { serializeData } from "@/lib/utils/serialize";

import { prisma } from "@/lib/prisma/client";
import { parseSearchParams, buildPrismaWhereClause, buildPrismaOrderBy, getAvailableFilters } from "@/lib/products/filter-utils";

export default async function CollectionsPage(
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

  try {
    [products, filterData] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true,
          media: true,
        },
        orderBy,
      }),
      getAvailableFilters(),
    ]);
  } catch (error) {
    console.error("[gift-collections] DB error:", error);

    return (
      <div className="container mx-auto flex min-h-[60vh] items-center justify-center px-4 py-24 sm:px-6 lg:px-8">
        <div className="max-w-lg text-center">
          <Package className="mx-auto mb-5 h-14 w-14 text-muted-foreground" />
          <h1 className="text-3xl font-serif font-bold text-primary">
            "Gift Collections"
          </h1>
          <p className="mt-3 text-lg text-muted-foreground">
            We&apos;re having trouble loading the catalogue right now. Please try again in a moment.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className={buttonVariants({ variant: "outline" })}>Back to Home</Link>
            <Link href="/request-a-quote" className={buttonVariants()}>Request a Quote</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="lg:hidden">
        <Suspense fallback={<div className="fixed left-0 top-1/2 -translate-y-1/2 z-40 h-32 w-10 bg-muted animate-pulse rounded-r-xl border border-border/50" />}>
          <MobileFilterDrawer
            categories={filterData.categories}
            attributes={filterData.attributes}
            totalResultsCount={products.length}
          />
        </Suspense>
      </div>
      <div className="container mx-auto px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32">
      <div className="rounded-[24px] border border-border/70 bg-secondary/35 px-5 py-8 sm:px-9 sm:py-11">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Curated collections</span>
            <h1 className="mt-3 text-4xl font-serif font-bold text-primary sm:text-5xl">Find a considered starting point.</h1>
            <p className="mt-3 max-w-2xl text-lg text-muted-foreground">Explore products through the gifting moments, audiences, and themes that shape your brief.</p>
          </div>
          
        </div>
      </div>

      <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-start">
        <div className="hidden lg:block lg:w-64 lg:shrink-0">
          <ProductFilterSidebar
            categories={filterData.categories}
            attributes={filterData.attributes}
            totalResultsCount={products.length}
          />
        </div>
        <div className="flex-1 w-full min-w-0">
          {products.length === 0 ? (
            <div className="text-center pt-32 pb-20 border rounded-lg bg-secondary/10">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-primary">No collections found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <>
              <div className="mb-6 flex items-center justify-between gap-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">{products.length}</span> products to explore
                </p>
                <Link href="/corporate-gifts" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline sm:inline-flex">
                  View all gifts <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {serializeData(products).map((product: any) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
    </>
  );
}
