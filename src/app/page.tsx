import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, Gift, ShieldCheck, Truck, Star, Quote, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 lg:pt-36 lg:pb-40 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('https://images.unsplash.com/photo-1577969145618-9fc31a8bc83c?q=80&w=2940&auto=format&fit=crop')] bg-cover bg-center" />
        <div className="absolute inset-0 -z-10 bg-primary/80 backdrop-blur-sm" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase animate-fade-in">
            Premium B2B Gifting
          </span>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 max-w-4xl mx-auto leading-tight animate-fade-in-up">
            Corporate Gifting, <br className="hidden md:block" />Elevated.
          </h1>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-in-up-delay">
            Thoughtfully curated corporate gifts designed to strengthen relationships, 
            celebrate milestones, and leave a lasting impression.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up-delay-2">
            <Link href="/corporate-gifts">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-base font-semibold">
                Explore Corporate Gifts
              </Button>
            </Link>
            <Link href="/request-a-quote">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-primary hover:bg-white h-12 px-8 text-base">
                Request a Corporate Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="relative z-10 -mt-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { number: "500+", label: "Corporate Clients" },
              { number: "10,000+", label: "Gifts Delivered" },
              { number: "50+", label: "Product Categories" },
              { number: "98%", label: "Client Satisfaction" },
            ].map((stat, i) => (
              <Card key={i} className="border-none shadow-lg bg-white text-center">
                <CardContent className="py-5 px-4">
                  <div className="text-2xl md:text-3xl font-serif font-bold text-primary mb-0.5">
                    {stat.number}
                  </div>
                  <div className="text-xs text-muted-foreground font-medium">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Trusted By */}
      <section className="pt-20 pb-8 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground tracking-wider uppercase mb-8">
            Trusted by leading companies across India
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-14 opacity-40">
            {["TCS", "Wipro", "Infosys", "Reliance", "Tata Group", "HCL"].map((name, i) => (
              <span key={i} className="text-lg md:text-xl font-bold tracking-wide text-primary/80 font-serif">
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Why Sterling Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Why Choose Sterling</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We understand the complexities of enterprise procurement. Our platform is built specifically for modern corporate needs.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "Premium Quality", desc: "Every item is rigorously tested and curated to reflect your brand's high standards." },
              { icon: Briefcase, title: "Custom Branding", desc: "Elegant logo placement, custom packaging, and personalized notes for every recipient." },
              { icon: Truck, title: "Global Logistics", desc: "Seamless bulk shipping to a single office or individual addresses worldwide." },
              { icon: Gift, title: "Dedicated Support", desc: "Your dedicated account manager handles the end-to-end gifting process." },
            ].map((feature, i) => (
              <Card key={i} className="border-none shadow-none bg-secondary/50 text-center p-6 hover:shadow-md hover:bg-secondary/70 transition-all duration-300">
                <CardContent className="pt-6">
                  <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/5 text-primary mb-6">
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">Curated for Every Occasion</h2>
              <p className="text-muted-foreground">Explore our most popular corporate gifting categories.</p>
            </div>
            <Link href="/gift-collections">
              <Button variant="link" className="text-primary p-0">View All Collections &rarr;</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Category 1 */}
            <Link href="/corporate-gifts" className="group block relative h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549465220-1a8b9238cd48?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Executive Gifts</h3>
                <p className="text-white/80">Premium selections for VIP clients and leadership.</p>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/employee-gifting" className="group block relative h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Employee Appreciation</h3>
                <p className="text-white/80">Celebrate milestones, anniversaries, and holidays.</p>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/employee-gifting" className="group block relative h-[400px] rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1606830733744-0ad778449672?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/20 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">Welcome Kits</h3>
                <p className="text-white/80">Curated onboarding boxes for new team members.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from corporate leaders who trust Sterling for their gifting needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                quote: "Sterling transformed our Diwali gifting program. The quality was exceptional, and the custom branding was flawless. Our employees were thrilled.",
                name: "Priya Sharma",
                role: "HR Director, Tech Solutions",
                rating: 5,
              },
              {
                quote: "We needed 2,000 welcome kits on a tight timeline. Sterling delivered perfectly — on time, on budget, and beyond expectations. Highly recommended.",
                name: "Rahul Mehta",
                role: "COO, FinServe India",
                rating: 5,
              },
              {
                quote: "The dedicated account manager made the entire process effortless. From product selection to multi-city delivery, everything was handled professionally.",
                name: "Anita Desai",
                role: "Procurement Head, GlobalCorp",
                rating: 5,
              },
            ].map((testimonial, i) => (
              <Card key={i} className="border-none shadow-sm bg-secondary/30 overflow-hidden hover:shadow-md transition-all duration-300">
                <CardContent className="p-8">
                  <Quote className="h-8 w-8 text-accent/40 mb-4" />
                  <p className="text-foreground leading-relaxed mb-6 italic">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>
                  <div>
                    <div className="font-semibold text-primary">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-secondary/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-4">How It Works</h2>
            <p className="text-muted-foreground">From enquiry to delivery in 3 simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Share Your Requirements", desc: "Tell us about your occasion, budget, headcount, and any branding preferences." },
              { step: "02", title: "We Curate & Brand", desc: "Our specialists curate the perfect selection and create branded mockups for your approval." },
              { step: "03", title: "Seamless Delivery", desc: "We handle production, quality checks, and delivery — to one address or thousands." },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="text-6xl font-serif font-bold text-accent/20 mb-4">{item.step}</div>
                <h3 className="text-lg font-semibold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/request-a-quote">
              <Button size="lg" className="bg-primary text-white hover:bg-primary/90 h-12 px-8 text-base font-semibold gap-2">
                Get Started
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to elevate your corporate gifting?</h2>
          <p className="text-lg text-white/80 mb-10">
            Our corporate gifting specialists are ready to help you curate the perfect selection for your team or clients.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/request-a-quote">
              <Button size="lg" className="w-full sm:w-auto bg-accent text-primary hover:bg-accent/90 h-12 px-8 text-base font-semibold">
                Start a Corporate Enquiry
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
