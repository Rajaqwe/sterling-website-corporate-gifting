import { buttonVariants } from "@/components/ui/button";
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Recycle, TreePine, Heart, Package, Globe } from "lucide-react";
import { MarketingHero } from "@/components/marketing/MarketingHero";

export const metadata: Metadata = {
  title: 'Sustainability | Sterling',
  description: 'Our commitment to eco-friendly corporate gifting — responsible materials, ethical sourcing, and sustainable packaging.',
};

export default function SustainabilityPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MarketingHero 
        title={<>Gifting That Gives <br className="hidden md:block" />Back to the Planet</>}
        subtitle="At Sterling, we believe great gifts and environmental responsibility go hand in hand. We're committed to sustainable practices across our entire supply chain."
      />

      {/* Sustainability Pillars */}
      <section className="pt-32 pb-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Our Sustainability Pillars</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every decision we make is guided by our commitment to a better future.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Leaf, title: "Eco-Friendly Products", desc: "Items made from recycled, biodegradable, or highly renewable materials. Bamboo, organic cotton, recycled plastics, and more." },
              { icon: Package, title: "Responsible Packaging", desc: "We minimize unnecessary plastic and use recyclable, compostable packaging materials wherever possible." },
              { icon: Recycle, title: "Reusable By Design", desc: "Curating high-utility gifts designed for long-term daily use rather than single-use disposables that end up in landfills." },
              { icon: Heart, title: "Ethical Sourcing", desc: "Partnering with manufacturers who adhere to fair labor practices, safe working conditions, and environmental standards." },
              { icon: TreePine, title: "Carbon-Conscious Logistics", desc: "Optimized shipping routes and consolidated deliveries to minimize our transportation carbon footprint." },
              { icon: Globe, title: "Community Impact", desc: "Supporting local artisans and social enterprises through our product sourcing to create positive community impact." },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/20 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-green-500/10 text-green-600 group-hover:bg-green-600 group-hover:text-foreground dark:text-white transition-colors duration-300 mb-5">
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

      {/* Impact Numbers */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-primary mb-4">Our Impact</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-background shadow-sm">
              <div className="text-2xl font-serif font-bold text-green-600 mb-1">40%</div>
              <div className="text-sm text-muted-foreground">Of Our Catalog is Eco-Friendly</div>
            </div>
            <div className="p-6 rounded-xl bg-background shadow-sm">
              <div className="text-2xl font-serif font-bold text-green-600 mb-1">Zero</div>
              <div className="text-sm text-muted-foreground">Single-Use Plastic in Packaging</div>
            </div>
            <div className="p-6 rounded-xl bg-background shadow-sm">
              <div className="text-2xl font-serif font-bold text-green-600 mb-1">100%</div>
              <div className="text-sm text-muted-foreground">Ethically Vetted Suppliers</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Choose gifts that reflect your values.
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Explore our curated eco-friendly collections and make your corporate gifting more sustainable.
          </p>
          <Link href="/corporate-gifts" className={buttonVariants({ variant: "default", size: "lg", className: "btn-primary h-12 px-8 text-base font-semibold" })}>
              Browse Eco-Friendly Gifts
            </Link>
        </div>
      </section>
    </div>
  );
}
