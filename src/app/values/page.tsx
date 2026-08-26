import { Metadata } from 'next';
import { Card, CardContent } from "@/components/ui/card";
import { Award, Users, Heart, Lightbulb, Eye, Leaf } from "lucide-react";

export const metadata: Metadata = {
  title: 'Our Values | Sterling',
  description: 'The core values that drive Sterling — quality, reliability, customer-first thinking, creativity, transparency, and sustainability.',
};

export default function ValuesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            What We Stand For
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Our Core Values
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            These principles guide every decision we make — from product selection to client relationships.
          </p>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                icon: Award, 
                title: "Quality Without Compromise", 
                desc: "We source only premium, durable products that meet the highest standards of craftsmanship. Every item is tested before it reaches our catalog.",
                accent: "bg-amber-500/10 text-amber-600"
              },
              { 
                icon: Users, 
                title: "Reliability You Can Count On", 
                desc: "We deliver on our promises with on-time fulfillment and consistent service excellence. Your deadlines are our deadlines.",
                accent: "bg-blue-500/10 text-blue-600"
              },
              { 
                icon: Heart, 
                title: "Customer First, Always", 
                desc: "Your success is our priority. We provide dedicated, responsive support for every order — whether it's 25 units or 25,000.",
                accent: "bg-rose-500/10 text-rose-600"
              },
              { 
                icon: Lightbulb, 
                title: "Creative Innovation", 
                desc: "We offer innovative customization options and unique curation to make your gifts stand out from the ordinary corporate fare.",
                accent: "bg-purple-500/10 text-purple-600"
              },
              { 
                icon: Eye, 
                title: "Radical Transparency", 
                desc: "Clear communication, honest pricing, upfront timelines, and no hidden charges. What we quote is what you pay.",
                accent: "bg-cyan-500/10 text-cyan-600"
              },
              { 
                icon: Leaf, 
                title: "Sustainability Matters", 
                desc: "Commitment to eco-friendly options, responsible packaging, and ethical sourcing throughout our supply chain.",
                accent: "bg-green-500/10 text-green-600"
              },
            ].map((value, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/20 overflow-hidden hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <div className={`inline-flex h-14 w-14 items-center justify-center rounded-2xl ${value.accent} mb-5`}>
                    <value.icon className="h-7 w-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl text-center">
          <div className="text-5xl font-serif text-accent/30 mb-6">&quot;</div>
          <p className="text-xl md:text-2xl font-serif text-primary leading-relaxed mb-6">
            A great gift doesn&apos;t just show appreciation — it builds trust, 
            strengthens bonds, and creates memories that last far beyond the moment.
          </p>
          <p className="text-muted-foreground font-medium">— The Sterling Team</p>
        </div>
      </section>
    </div>
  );
}
