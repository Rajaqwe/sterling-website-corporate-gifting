import Link from "next/link";
import { ArrowRight, ClipboardCheck, FileCheck2, Headphones, Palette } from "lucide-react";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

const TRUST_POINTS = [
  {
    icon: FileCheck2,
    title: "GST-ready billing",
    description: "Clear company details and invoice support for business purchases.",
  },
  {
    icon: ClipboardCheck,
    title: "Bulk & PO-friendly",
    description: "Share quantity, budget, deadlines and purchase-order requirements up front.",
  },
  {
    icon: Palette,
    title: "Branding made clear",
    description: "Choose available branding options and align the finish before you place the order.",
  },
  {
    icon: Headphones,
    title: "Human support",
    description: "Talk to the Sterling team when the brief is too specific for a catalogue alone.",
  },
];

export function CorporateProcurementTrust() {
  return (
    <section className="border-y border-border/60 bg-secondary/20 py-20 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <Reveal animationType="fade-up">
            <div className="max-w-xl">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                Corporate procurement
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold tracking-[-0.035em] text-primary sm:text-4xl">
                Built for the way business teams actually buy.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                Your brief can include quantities, budgets, branding, delivery dates and
                procurement requirements. Sterling keeps those details together so you can
                make a confident decision before production starts.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/request-a-quote"
                  className="btn-primary inline-flex h-12 items-center justify-center rounded-full px-6 text-sm font-bold shadow-md transition-[transform,box-shadow] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg"
                >
                  Start a corporate enquiry
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-background px-6 text-sm font-semibold text-foreground transition-[border-color,background-color,transform] duration-300 ease-out hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5"
                >
                  Talk to the team
                </Link>
              </div>
            </div>
          </Reveal>

          <StaggerContainer staggerDelay={70} className="grid gap-3 sm:grid-cols-2">
            {TRUST_POINTS.map(({ icon: Icon, title, description }) => (
              <Reveal key={title}>
                <article className="group h-full rounded-2xl border border-border/70 bg-card/80 p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg dark:bg-card/60">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-base font-bold text-foreground">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p>
                </article>
              </Reveal>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}
