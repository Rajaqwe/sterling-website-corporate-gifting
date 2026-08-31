
import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Target, Users, Award, Globe, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: 'About Sterling | Sterling',
  description: 'Premium corporate gifting solutions for businesses, employee engagement, client relationships, events and brand recognition.',
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-primary text-white py-20 md:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Our Story
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Crafting Meaningful <br className="hidden md:block" />Corporate Connections
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Sterling provides premium corporate gifting solutions designed to strengthen 
            business relationships, enhance employee engagement, and elevate brand recognition.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 -mt-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "40+", label: "Corporate Clients" },
              { number: "10,000+", label: "Gifts Delivered" },
              { number: "50+", label: "Product Categories" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-lg bg-background text-center">
                <CardContent className="py-6 px-4">
                  <div className="text-2xl md:text-3xl font-serif font-bold text-primary mb-1">
                    {stat.number}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="border-none shadow-sm bg-secondary/30 overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary mb-6">
                  <Target className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional gifting experiences that help companies express genuine 
                  appreciation and build lasting connections with their clients, partners, and teams. 
                  We believe every gift is an opportunity to strengthen a relationship.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-sm bg-secondary/30 overflow-hidden">
              <CardContent className="p-8 md:p-10">
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent/20 text-accent mb-6">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-4">Our Vision</h2>
                <p className="text-muted-foreground leading-relaxed">
                  To be India&apos;s most trusted corporate gifting partner — known for impeccable quality, 
                  thoughtful curation, and seamless end-to-end service that makes every occasion 
                  unforgettable for businesses of all sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What Sets Us Apart */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">What Sets Us Apart</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We go beyond just gifting — we create experiences that resonate.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Award, title: "Curated Quality", desc: "Every product in our catalog is handpicked and rigorously vetted for premium quality and durability." },
              { icon: Users, title: "Dedicated Support", desc: "Your dedicated account manager handles everything — from curation to delivery — so you can focus on your business." },
              { icon: Heart, title: "Thoughtful Personalization", desc: "Custom branding, personalized notes, and bespoke packaging to make every gift uniquely yours." },
              { icon: Globe, title: "Pan-India Delivery", desc: "Seamless bulk shipping across India — to a single office or thousands of individual addresses." },
              { icon: Target, title: "Corporate-First Approach", desc: "Built specifically for B2B needs: GST invoices, procurement support, tiered pricing, and compliance documentation." },
              { icon: Sparkles, title: "Trend-Forward Curation", desc: "Our sourcing team constantly identifies the latest premium products to keep your gifting fresh and impressive." },
            ].map((item, i) => (
              <Card key={i} className="border-none shadow-none bg-background/60 text-center p-6 hover:shadow-md transition-shadow duration-300">
                <CardContent className="pt-6">
                  <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary/5 text-primary mb-5">
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

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Let&apos;s build something memorable together.
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Whether you&apos;re gifting 10 or 10,000 — we&apos;d love to help you create the perfect experience.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-a-quote">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-base font-semibold">
                Request a Quote
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-primary hover:bg-background h-12 px-8 text-base">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
