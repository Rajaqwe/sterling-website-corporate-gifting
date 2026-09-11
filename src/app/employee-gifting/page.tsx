import { Metadata } from 'next';
import Link from 'next/link';
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, PartyPopper, Calendar, Trophy, Heart, Users } from "lucide-react";

export const metadata: Metadata = {
  title: 'Employee Gifting Programs | Sterling',
  description: 'Celebrate your team with premium, thoughtful corporate gifts for onboarding, festivals, anniversaries and more.',
};

export default function EmployeeGiftingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground pt-32 pb-20 md:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Employee Appreciation
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Gifts That Inspire <br className="hidden md:block" />Your People
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create thoughtful moments for your people, from onboarding and milestones to festivals and recognition.
          </p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/request-a-quote" className={cn(buttonVariants({ size: "lg" }), "btn-primary h-12 px-7 font-semibold")}>Build an employee program</Link>
            <Link href="/corporate-gifts" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "btn-primary h-12 border-white/70 bg-transparent px-7 font-semibold text-white hover:bg-white/10 hover:text-white")}>Browse gifts</Link>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Gifting Programs</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Purpose-built programs designed for every milestone in the employee lifecycle.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: Gift, 
                title: "Welcome Kits", 
                desc: "Make a stellar first impression on new hires with comprehensive, branded onboarding kits that include premium stationery, tech accessories, and personalized welcome notes.",
                highlight: "Onboarding"
              },
              { 
                icon: PartyPopper, 
                title: "Festival Gifting", 
                desc: "Curated hampers and premium gifts to celebrate Diwali, Christmas, Eid, and other major festivals. Custom packaging with your brand identity included.",
                highlight: "Festive"
              },
              { 
                icon: Calendar, 
                title: "Work Anniversaries", 
                desc: "Recognize loyalty and milestones with tiered, personalized rewards for long-serving employees. From 1-year to 25-year milestone celebrations.",
                highlight: "Milestones"
              },
              { 
                icon: Trophy, 
                title: "Performance Rewards", 
                desc: "Premium incentives to celebrate exceptional achievements and motivate your high-performers. Curated selections that feel truly special.",
                highlight: "Recognition"
              },
              { 
                icon: Heart, 
                title: "Well-being Gifts", 
                desc: "Thoughtful wellness hampers, self-care kits, and mindfulness packages that show you care about your team's health and happiness.",
                highlight: "Well-being"
              },
              { 
                icon: Users, 
                title: "Team Building Kits", 
                desc: "Collaborative gift sets perfect for offsite events, team celebrations, and group activities that bring your team closer together.",
                highlight: "Offsites"
              },
            ].map((program, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/20 overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    <div className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-foreground dark:text-white transition-colors duration-300">
                      <program.icon className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-primary">{program.title}</h3>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-accent/20 text-accent">
                          {program.highlight}
                        </span>
                      </div>
                      <p className="text-muted-foreground leading-relaxed">{program.desc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">How It Works</h2>
            <p className="text-muted-foreground">Simple, streamlined, stress-free.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Tell Us Your Needs", desc: "Share your budget, headcount, and occasion. We handle the rest." },
              { step: "02", title: "We Curate & Brand", desc: "Our team selects premium products and applies your branding." },
              { step: "03", title: "Confirm Delivery", desc: "Align the final delivery requirements with your selected gifts and program." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-serif font-bold text-accent/30 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-primary mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Ready to appreciate your team?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Let our gifting specialists craft the perfect employee appreciation program for your organization.
          </p>
          <Link href="/request-a-quote" className={buttonVariants({ variant: "default", size: "lg", className: "btn-primary h-12 px-8 text-base font-semibold" })}>
              Curate Employee Gifts
            </Link>
        </div>
      </section>
    </div>
  );
}
