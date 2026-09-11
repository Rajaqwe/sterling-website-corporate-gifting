import { Metadata } from 'next';
import Link from 'next/link';
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Stamp, Package, Palette, Layers, Printer, Scissors } from "lucide-react";

export const metadata: Metadata = {
  title: 'Custom Branding | Sterling',
  description: 'Personalize corporate gifts with your logo, brand colors, and custom packaging for maximum brand impact.',
};

export default function CustomBrandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground pt-32 pb-20 md:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Brand Your Gifts
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Make Every Gift <br className="hidden md:block" />Unmistakably Yours
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform premium products into powerful brand ambassadors. Our custom branding services 
            ensure your corporate gifts make a lasting, professional impression.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/request-a-quote" className={cn(buttonVariants({ size: "lg" }), "btn-primary h-12 px-7 font-semibold")}>Start customization</Link>
            <Link href="/corporate-gifts" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "btn-primary h-12 border-white/70 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white")}>Browse brandable gifts</Link>
          </div>
        </div>
      </section>

      {/* Branding Services */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Branding Capabilities</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From subtle elegance to bold statements — we bring your brand to life on every product.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Stamp, title: "Laser Engraving", desc: "Precision etching that creates a permanent, premium finish on metals, leather, and wood products. Ideal for executive gifts." },
              { icon: Printer, title: "UV & Screen Printing", desc: "Vibrant, full-color printing for suitable drinkware, textiles, and packaging materials." },
              { icon: Package, title: "Custom Packaging", desc: "Elevate the unboxing experience with branded gift boxes, magnetic closures, custom tissue, and ribbon-tied finishes." },
              { icon: Palette, title: "Brand Color Matching", desc: "Share your brand guidelines and preferred colours so the proposed finish feels considered and consistent." },
              { icon: Scissors, title: "Custom Shapes & Inserts", desc: "Die-cut foam inserts, custom box shapes, and product holders tailored to your specific gift configuration." },
              { icon: Layers, title: "Multi-Surface Branding", desc: "Apply your logo across multiple surfaces — the product, the box, the sleeve, and even the thank-you card." },
            ].map((service, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/20 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-foreground dark:text-white transition-colors duration-300 mb-5">
                    <service.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-lg font-semibold text-primary mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Branding Process</h2>
            <p className="text-muted-foreground">From concept to finished product in 4 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Share Your Brand Assets", desc: "Upload your logo, brand guidelines, and preferences." },
              { step: "02", title: "Design Mockup", desc: "We create digital mockups for your approval." },
              { step: "03", title: "Sample Approval", desc: "Receive a physical sample before bulk production." },
              { step: "04", title: "Production & Delivery", desc: "Bulk production with quality checks at every step." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-serif font-bold text-accent/30 mb-4">{item.step}</div>
                <h3 className="text-base font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand journey */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-accent/10">
              <div className="text-2xl font-serif font-bold text-primary mb-1">01</div>
              <div className="text-sm text-muted-foreground">Choose a product and share your brief</div>
            </div>
            <div className="p-6 rounded-xl bg-accent/10">
              <div className="text-2xl font-serif font-bold text-primary mb-1">02</div>
              <div className="text-sm text-muted-foreground">Review suitable branding and packaging options</div>
            </div>
            <div className="p-6 rounded-xl bg-accent/10">
              <div className="text-2xl font-serif font-bold text-primary mb-1">03</div>
              <div className="text-sm text-muted-foreground">Approve the final details before production</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to put your brand on premium gifts?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Share your product, quantity, and brand requirements to begin a tailored conversation.
          </p>
          <Link href="/request-a-quote" className={buttonVariants({ variant: "default", size: "lg", className: "btn-primary h-12 px-8 text-base font-semibold" })}>
              Start Customization
            </Link>
        </div>
      </section>
    </div>
  );
}
