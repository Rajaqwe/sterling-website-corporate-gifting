import { Metadata } from 'next';
import Link from 'next/link';
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Truck, BadgePercent, UserCheck, FileText, ShieldCheck, PackageCheck } from "lucide-react";

export const metadata: Metadata = {
  title: 'Bulk Corporate Orders | Sterling',
  description: 'Streamlined procurement for large-volume corporate gifting with tiered pricing and dedicated account management.',
};

export default function BulkOrdersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground pt-32 pb-20 md:py-15	 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Volume Procurement
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Scale Your Gifting <br className="hidden md:block" />With Confidence
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Bring your quantity, budget, product preferences, and delivery requirements into one clear gifting brief.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/request-a-quote" className={cn(buttonVariants({ size: "lg" }), "btn-primary h-12 px-7 font-semibold")}>Request bulk pricing</Link>
            <Link href="/corporate-gifts" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "btn-primary h-12 border-white/70 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white")}>Browse the catalogue</Link>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Built for Enterprise Scale</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need for seamless large-volume corporate gifting.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: BadgePercent, title: "Volume Pricing", desc: "Use product-level price tiers as a starting point, then request a quote for your specific quantity." },
              { icon: UserCheck, title: "Requirement-led Curation", desc: "Share the audience, product preferences, and quantity so the shortlist fits the brief." },
              { icon: FileText, title: "Clear Quote Request", desc: "Capture the practical information needed to discuss products, quantity, branding, and delivery." },
              { icon: Truck, title: "Delivery Planning", desc: "Include delivery locations and timing in your request so the team can assess the requirement." },
              { icon: ShieldCheck, title: "Approval-led Process", desc: "Review proposed product and branding details before the order moves forward." },
              { icon: PackageCheck, title: "Corporate-ready Catalogue", desc: "Compare products by starting price, MOQ, customisation, and other business details." },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/20 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-foreground dark:text-white transition-colors duration-300 mb-5">
                    <item.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Planning tiers */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Plan the right volume</h2>
            <p className="text-muted-foreground">Actual pricing depends on the selected product, quantity, and customisation requirements.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { tier: "Starter", range: "A focused team requirement", discount: "Begin with product discovery", color: "bg-secondary/50" },
              { tier: "Growth", range: "A broader department program", discount: "Compare suitable product tiers", color: "bg-accent/10" },
              { tier: "Scale", range: "A multi-team requirement", discount: "Include branding and delivery needs", color: "bg-accent/15" },
              { tier: "Enterprise", range: "A large or complex brief", discount: "Request a tailored discussion", color: "bg-primary text-white" },
            ].map((tier, i) => (
              <Card key={i} className={`border-none shadow-sm overflow-hidden ${tier.color}`}>
                <CardContent className="p-6 text-center">
                  <h3 className={`text-lg font-semibold mb-2 ${i === 3 ? "text-white" : "text-primary"}`}>{tier.tier}</h3>
                  <div className={`text-sm mb-3 ${i === 3 ? "text-muted-foreground" : "text-muted-foreground"}`}>{tier.range}</div>
                  <div className={`text-sm font-semibold ${i === 3 ? "text-accent" : "text-accent"}`}>{tier.discount}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Need pricing for a large order?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Share your requirements to begin a tailored discussion around products, quantities, and branding.
          </p>
          <Link href="/request-a-quote" className={buttonVariants({ variant: "default", size: "lg", className: "btn-primary h-12 px-8 text-base font-semibold" })}>
              Request Bulk Pricing
            </Link>
        </div>
      </section>
    </div>
  );
}
