import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted/80 motion-reduce:animate-none", className)}
      {...props}
    />
  )
}

export { Skeleton }
