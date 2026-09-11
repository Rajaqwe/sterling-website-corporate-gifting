import { Skeleton } from "@/components/ui/skeleton";

export default function GiftCollectionsLoading() {
  return (
    <div className="container mx-auto px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pt-32" aria-busy="true" aria-label="Loading gift collections">
      <div className="rounded-[24px] bg-primary p-8 sm:p-10"><Skeleton className="h-3 w-36 bg-white/20" /><Skeleton className="mt-5 h-11 w-3/4 max-w-lg bg-white/20" /><Skeleton className="mt-4 h-5 w-full max-w-xl bg-white/15" /></div>
      <div className="mt-10 flex gap-8"><Skeleton className="hidden h-[560px] w-64 shrink-0 lg:block" /><div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }).map((_, index) => <div key={index} className="overflow-hidden rounded-xl border border-border/60 bg-card"><Skeleton className="aspect-[4/5] w-full rounded-none" /><div className="space-y-3 p-5"><Skeleton className="h-3 w-20" /><Skeleton className="h-6 w-4/5" /><Skeleton className="h-4 w-2/3" /><Skeleton className="mt-8 h-9 w-full" /></div></div>)}</div></div>
    </div>
  );
}
