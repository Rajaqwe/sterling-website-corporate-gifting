import Link from "next/link";
import { Building2, ClipboardCheck, FileCheck2, FileText, ArrowRight } from "lucide-react";

const POINTS = [
  { icon: Building2, title: "Company & GST details", text: "Keep your company profile and GST number up to date for business-order processing and billing." },
  { icon: ClipboardCheck, title: "Purchase-order workflow", text: "Approved quotes can be converted through the corporate PO / bank-transfer option at checkout." },
  { icon: FileText, title: "Quote records", text: "Your approved quotations remain available in your account for review before an order is created." },
  { icon: FileCheck2, title: "Invoice access", text: "Order records provide invoice PDF access after the order is created." },
];

export function ProcurementSupport({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "rounded-2xl border border-border/70 bg-secondary/25 p-5" : "border-y border-border/60 bg-secondary/20 py-20 sm:py-24"}>
      <div className={compact ? "" : "container mx-auto px-4 sm:px-6 lg:px-8"}>
        <div className={compact ? "" : "mx-auto max-w-5xl"}>
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Procurement support</span>
            <h2 className={compact ? "mt-2 text-xl font-serif font-bold text-primary" : "mt-4 text-3xl font-serif font-bold tracking-tight text-primary sm:text-4xl"}>
              Make the business side easier, too.
            </h2>
            <p className={compact ? "mt-2 text-sm leading-relaxed text-muted-foreground" : "mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg"}>
              Sterling keeps key company, quote, purchase-order and invoice steps close to the buying journey so your procurement team knows where to go next.
            </p>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {POINTS.map(({ icon: Icon, title, text }) => (
              <article key={title} className="rounded-2xl border border-border/70 bg-card p-5 shadow-sm">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent"><Icon className="h-5 w-5" /></div>
                <h3 className="mt-4 text-sm font-bold text-foreground">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>

          {!compact && (
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/dashboard/company" className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5">Company profile <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/dashboard/quotes" className="inline-flex h-11 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-semibold text-foreground transition-[background-color,border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-accent/50 hover:bg-accent/5">My quotes <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/request-a-quote" className="inline-flex h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg">Start a corporate enquiry <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
