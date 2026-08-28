import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function CorporateGiftsLoading() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 space-y-4 md:space-y-0">
        <div>
          <Skeleton className="h-10 w-64 mb-2" />
          <Skeleton className="h-6 w-96" />
        </div>
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <Skeleton className="hidden lg:block w-64 h-[600px] rounded-xl shrink-0" />

        <div className="flex-1 w-full min-w-0">
          <div className="flex justify-between mb-4">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-9 w-40" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {Array.from({ length: 9 }).map((_, i) => (
              <Card key={i} className="flex flex-col h-full overflow-hidden border-border/60">
                <Skeleton className="aspect-[4/5] w-full rounded-none" />
                <CardContent className="p-5 flex-1 flex flex-col gap-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-16" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="mt-auto pt-3 border-t border-border/40 flex justify-between items-end">
                    <div>
                      <Skeleton className="h-3 w-20 mb-1" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
