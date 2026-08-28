import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, Megaphone, Crown, Rocket, Users, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: 'Event & Conference Gifts | Sterling',
  description: 'Memorable merchandise and kits for corporate events, conferences, product launches, and VIP occasions.',
};

export default function EventGiftsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-white py-20 md:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Events & Conferences
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Gifts That Make <br className="hidden md:block" />Events Unforgettable
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Leave a lasting impression on your attendees with high-quality, customized merchandise 
            tailored for seminars, product launches, and major corporate events.
          </p>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Gifting for Every Occasion</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Whether it&apos;s 50 attendees or 5,000 — we&apos;ve got you covered with the perfect merchandise.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: CalendarDays, title: "Conference Kits", desc: "Cohesive sets including branded notebooks, pens, lanyards, USB drives, and drinkware — everything in one polished package." },
              { icon: Megaphone, title: "Promotional Merchandise", desc: "Cost-effective, high-utility items designed for mass distribution and maximum brand visibility at trade shows and expos." },
              { icon: Crown, title: "VIP & Client Events", desc: "Exclusive, premium luxury gifts curated for executives and high-value clients at intimate corporate gatherings." },
              { icon: Rocket, title: "Product Launch Events", desc: "Unique, thematic gifts that align perfectly with your new product or brand identity and create buzz." },
              { icon: Users, title: "Team Offsites", desc: "Fun, memorable gift sets for company offsites, retreats, and team-building events that boost camaraderie." },
              { icon: Sparkles, title: "Award Ceremonies", desc: "Distinguished trophies, plaques, and premium award kits that celebrate achievement with elegance." },
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

      {/* Quick Stats */}
      <section className="py-16 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 rounded-xl bg-white shadow-sm">
              <div className="text-2xl font-serif font-bold text-primary mb-1">24 - 48 Hours</div>
              <div className="text-sm text-muted-foreground">Express Production Available</div>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-sm">
              <div className="text-2xl font-serif font-bold text-primary mb-1">5,000+</div>
              <div className="text-sm text-muted-foreground">Events Serviced</div>
            </div>
            <div className="p-6 rounded-xl bg-white shadow-sm">
              <div className="text-2xl font-serif font-bold text-primary mb-1">Pan-India</div>
              <div className="text-sm text-muted-foreground">Venue Delivery Coverage</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Planning an event?
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Tell us about your event and we&apos;ll curate the perfect gift selection for your attendees.
          </p>
          <Link href="/request-a-quote">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-base font-semibold">
              Plan Event Gifting
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
