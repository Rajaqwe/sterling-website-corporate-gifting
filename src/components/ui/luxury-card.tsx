import * as React from "react"
import { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const LuxuryCard = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<typeof Card>
>(({ className, ...props }, ref) => (
  <Card
    ref={ref}
    className={cn(
      "bg-surface-elevated border-border/60 transition-all duration-200 hover:border-accent/40 hover:shadow-lg hover:-translate-y-0.5",
      className
    )}
    {...props}
  />
))
LuxuryCard.displayName = "LuxuryCard"

export { LuxuryCard, CardHeader as LuxuryCardHeader, CardFooter as LuxuryCardFooter, CardTitle as LuxuryCardTitle, CardDescription as LuxuryCardDescription, CardContent as LuxuryCardContent }
