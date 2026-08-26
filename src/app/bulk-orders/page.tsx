import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
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
      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Volume Procurement
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Scale Your Gifting <br className="hidden md:block" />With Confidence
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Sterling makes large-volume procurement effortless. From tiered pricing to dedicated 
            account management, we handle the complexities so you don&apos;t have to.
          </p>
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
              { icon: BadgePercent, title: "Bulk Pricing Tiers", desc: "Enjoy significant volume discounts as your order quantity increases. The more you order, the better the per-unit pricing." },
              { icon: UserCheck, title: "Dedicated Account Manager", desc: "A single point of contact to assist you from product curation to final delivery — no runaround." },
              { icon: FileText, title: "Procurement Support", desc: "We provide detailed quotations, valid GST invoices, proforma invoices, and compliance documentation." },
              { icon: Truck, title: "Multi-Location Delivery", desc: "Seamless dispatch and tracking for large shipments across multiple corporate offices or individual addresses." },
              { icon: ShieldCheck, title: "Quality Assurance", desc: "Every unit is individually quality-checked before dispatch. Damaged items are replaced at no extra cost." },
              { icon: PackageCheck, title: "Inventory Management", desc: "Pre-order and store inventory with us for scheduled dispatch throughout the year." },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/20 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 mb-5">
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

      {/* Pricing Tiers */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Volume Pricing</h2>
            <p className="text-muted-foreground">Better rates as your order size grows.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { tier: "Starter", range: "25-99 units", discount: "Standard pricing", color: "bg-secondary/50" },
              { tier: "Growth", range: "100-499 units", discount: "5-10% off", color: "bg-accent/10" },
              { tier: "Scale", range: "500-999 units", discount: "10-18% off", color: "bg-accent/15" },
              { tier: "Enterprise", range: "1,000+ units", discount: "Custom quote", color: "bg-primary text-white" },
            ].map((tier, i) => (
              <Card key={i} className={`border-none shadow-sm overflow-hidden ${tier.color}`}>
                <CardContent className="p-6 text-center">
                  <h3 className={`text-lg font-semibold mb-2 ${i === 3 ? "text-white" : "text-primary"}`}>{tier.tier}</h3>
                  <div className={`text-sm mb-3 ${i === 3 ? "text-white/80" : "text-muted-foreground"}`}>{tier.range}</div>
                  <div className={`text-sm font-semibold ${i === 3 ? "text-accent" : "text-accent"}`}>{tier.discount}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Need pricing for a large order?
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Share your requirements and we&apos;ll deliver a detailed proposal with tiered pricing within 24 hours.
          </p>
          <Link href="/request-a-quote">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-base font-semibold">
              Request Bulk Pricing
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
