import { BadgeCheck, Box, FileCheck2, Palette } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";

const POINTS = [
  ["Bulk-ready", Box],
  ["GST-ready billing", FileCheck2],
  ["Branding support", Palette],
  ["Human procurement support", BadgeCheck],
] as const;

export function ProcurementReadyBar() {
  return (
    <section className="border-y border-border/60 bg-card py-5">
      <div className="container mx-auto grid grid-cols-2 gap-3 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {POINTS.map(([label, Icon]) => (
          <Reveal key={label}>
            <div className="flex min-h-11 items-center justify-center gap-2 rounded-xl bg-secondary/45 px-3 text-center text-xs font-semibold text-foreground sm:text-sm">
              <Icon className="h-4 w-4 shrink-0 text-accent" />
              <span>{label}</span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
