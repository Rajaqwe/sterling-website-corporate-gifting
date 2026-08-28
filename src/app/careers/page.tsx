import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Clock, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: 'Careers at Sterling | Sterling',
  description: 'Join our growing team of corporate gifting experts. Explore current openings at Sterling.',
};

const openings = [
  {
    title: "Business Development Executive",
    location: "Mumbai / Remote",
    type: "Full-time",
    desc: "Drive new corporate partnerships and expand our B2B client portfolio across India.",
    tags: ["Sales", "B2B", "Partnerships"],
  },
  {
    title: "Corporate Sales Manager",
    location: "Mumbai",
    type: "Full-time",
    desc: "Lead a team of sales executives and manage relationships with enterprise clients.",
    tags: ["Leadership", "Enterprise Sales"],
  },
  {
    title: "Product & Sourcing Specialist",
    location: "Hybrid",
    type: "Full-time",
    desc: "Identify trending premium products and manage supplier relationships across categories.",
    tags: ["Sourcing", "Product Management"],
  },
  {
    title: "Customer Success Executive",
    location: "Remote",
    type: "Full-time",
    desc: "Ensure flawless order execution and provide dedicated support for our corporate clients.",
    tags: ["Customer Service", "Operations"],
  },
];

export default function CareersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-white py-20 md:py-15 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Build Your Career <br className="hidden md:block" />at Sterling
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            We&apos;re growing rapidly and looking for passionate individuals to join our mission 
            of delivering exceptional corporate gifting solutions.
          </p>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { label: "Fast Growth", value: "5x YoY" },
              { label: "Team Size", value: "10+" },
              { label: "Work Type", value: "Hybrid" },
              { label: "Learning Budget", value: "₹80K/yr" },
            ].map((stat, i) => (
              <div key={i} className="p-5 rounded-xl bg-secondary/30">
                <div className="text-xl md:text-2xl font-serif font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-xs text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Openings */}
      <section className="py-20 md:py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Current Openings</h2>
            <p className="text-muted-foreground">Find your next opportunity with us.</p>
          </div>
          <div className="space-y-4">
            {openings.map((job, i) => (
              <Card key={i} className="border-none shadow-sm bg-white overflow-hidden hover:shadow-md transition-all duration-300 group">
                <CardContent className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {job.type}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{job.desc}</p>
                      <div className="flex flex-wrap gap-2">
                        {job.tags.map((tag, j) => (
                          <span key={j} className="text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full bg-primary/5 text-primary">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Link href="/contact" className="shrink-0">
                      <Button variant="outline" className="gap-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
                        Apply
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
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
            Don&apos;t see your role?
          </h2>
          <p className="text-lg text-white/80 mb-10">
            We&apos;re always looking for talented people. Send us your resume and we&apos;ll reach out when there&apos;s a fit.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-base font-semibold">
              Send Your Resume
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
