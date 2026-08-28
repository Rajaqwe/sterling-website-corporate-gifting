/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const revalidate = 3600; // 1 hour ISR

import { ProductFilterSidebar, MobileFilterDrawer } from "@/components/products/ProductFilterSidebar";
import { ProductCard } from "@/components/products/ProductCard";
import { ActiveFilters, SortDropdown } from "@/components/products/ProductCatalogFilters";
import { Package } from "lucide-react";
import { Suspense } from "react";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

import { prisma } from "@/lib/prisma/client";
import { parseSearchParams, buildPrismaWhereClause, buildPrismaOrderBy, getAvailableFilters } from "@/lib/products/filter-utils";

export default async function CorporateGiftsPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const filters = parseSearchParams(searchParams);
  const where = buildPrismaWhereClause(filters);
  const orderBy = buildPrismaOrderBy(filters.sort);

  // Fetch products and available filters in parallel
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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Corporate Catalog</h1>
          <p className="text-muted-foreground text-lg">Browse premium gifts for your team and clients.</p>
        </div>
        <div className="flex items-center gap-3">
          <Suspense fallback={<div className="h-9 w-24 bg-muted animate-pulse rounded-md" />}>
            <MobileFilterDrawer 
              categories={filterData.categories} 
              attributes={filterData.attributes}
              totalResultsCount={products.length} 
            />
          </Suspense>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Suspense fallback={<div className="hidden lg:block w-64 h-96 bg-muted animate-pulse rounded-xl" />}>
          <ProductFilterSidebar 
            className="hidden lg:block w-64 shrink-0 self-start sticky top-24"
            categories={filterData.categories}
            attributes={filterData.attributes}
            totalResultsCount={products.length}
          />
        </Suspense>

        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div className="text-sm text-muted-foreground">
              Showing <span className="font-medium text-foreground">{products.length}</span> products
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
            <div className="text-center py-20 border rounded-lg bg-surface-elevated">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-primary">No products found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <StaggerContainer staggerDelay={100} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Reveal key={product.id}>
                  <ProductCard product={product as any} />
                </Reveal>
              ))}
            </StaggerContainer>
          )}
        </div>
      </div>
    </div>
  );
}
