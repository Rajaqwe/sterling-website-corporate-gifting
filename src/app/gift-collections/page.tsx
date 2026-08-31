/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const revalidate = 3600;

import { ProductFilterSidebar, MobileFilterDrawer } from "@/components/products/ProductFilterSidebar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Package, Star, Clock } from "lucide-react";
import { Suspense } from "react";

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

  // For Collections, we might want to pre-filter by a specific category if we had one.
  // For now, it queries the same Prisma database but can be customized later.

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
          <h1 className="text-4xl font-serif font-bold text-primary mb-2">Curated Collections</h1>
          <p className="text-muted-foreground text-lg">Browse premium gift sets organized by occasion and theme.</p>
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

        <div className="flex-1 w-full">
          {products.length === 0 ? (
            <div className="text-center py-20 border rounded-lg bg-secondary/10">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-primary">No collections found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                  <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md border-transparent hover:border-primary/20">
                    <div className="aspect-square bg-secondary/20 relative flex items-center justify-center overflow-hidden">
                      {(product as any).media?.[0]?.url ? (
                        <img
                          src={(product as any).media[0].url}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      ) : (
                        <Package className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform duration-300" />
                      )}
                      {product.isDiscounted && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm">Sale</span>
                      )}
                    </div>
                    <CardContent className="p-5 flex-1 flex flex-col">
                      <div className="text-xs font-medium text-muted-foreground mb-2 flex justify-between items-center">
                        <span>{(product as any).category?.name}</span>
                        {product.rating && (
                           <span className="flex items-center text-amber-500 font-bold">
                             {product.rating.toString()} <Star className="w-3 h-3 ml-0.5 fill-current" />
                           </span>
                        )}
                      </div>
                      <h3 className="font-medium text-primary mb-2 line-clamp-2 group-hover:text-amber-600 transition-colors flex-1">
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between mt-4 border-t pt-4">
                        <div className="flex flex-col">
                           <span className="font-bold text-lg">₹{product.price.toString()}</span>
                           <span className="text-xs text-muted-foreground line-clamp-1"><Clock className="w-3 h-3 inline mr-1" />{product.leadTimeDays} Days</span>
                        </div>
                        <span className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded border">
                          MOQ: {product.minimumOrderQuantity}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
