import type { Metadata } from "next";
import { FilterDrawer } from "@/components/products/ProductFilterSidebar";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Package, Star, Clock } from "lucide-react";
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
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-4xl font-serif font-bold text-primary mb-2">Personalised Gifts</h1>
            <p className="text-muted-foreground text-lg">Custom branded merchandise and tailored corporate gifts.</p>
          </div>
        </div>

        <div className="flex-1 w-full">
          {products.length === 0 ? (
            <div className="text-center py-20 border rounded-lg bg-secondary/10">
              <Package className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-xl font-medium text-primary">No personalised gifts found</h3>
              <p className="text-muted-foreground mt-2">Try adjusting your filters or search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
                <Link key={product.id} href={`/products/${product.slug}`} className="group block">
                  <Card className="h-full flex flex-col overflow-hidden transition-all hover:shadow-md border-transparent hover:border-primary/20">
                    <div className="aspect-square bg-secondary/20 relative flex items-center justify-center p-6">
                      <Package className="h-16 w-16 text-primary/40 group-hover:scale-110 transition-transform duration-300" />
                      {product.isDiscounted && (
                        <span className="absolute top-3 left-3 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">Sale</span>
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
    </>
  );
}
