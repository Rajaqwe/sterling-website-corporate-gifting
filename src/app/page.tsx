import Link from "next/link";
import {
  ArrowRight,
  Award,
  Box,
  BriefcaseBusiness,
  Building2,
  CheckCircle2,
  Gift,
  Headphones,
  Megaphone,
  Palette,
  PartyPopper,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Users,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DemoVideoCarousel } from "@/components/home/DemoVideoCarousel";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

const needs = [
  { title: "Bulk Employee Gifting", description: "Welcome, recognise, and celebrate your people at scale.", href: "/employee-gifting", image: "/videos/posters/demo-2.jpg", icon: Users },
  { title: "Client Gifting", description: "Make every relationship feel considered and premium.", href: "/corporate-gifts", image: "/videos/posters/demo-4.jpg", icon: BriefcaseBusiness },
  { title: "Custom Branding", description: "Your brand on every premium gift item.", href: "/custom-branding", image: "/videos/posters/demo-1.jpg", icon: Palette },
  { title: "Employee Welcome Kits", description: "Set the tone from a new hire's first day.", href: "/employee-gifting", image: "/videos/posters/demo-3.jpg", icon: Box },
  { title: "Event & Conference Gifting", description: "Create memorable moments at every event.", href: "/event-gifts", image: "/videos/posters/demo-4.jpg", icon: PartyPopper },
  { title: "Festive Corporate Gifting", description: "Premium choices for Diwali and major milestones.", href: "/corporate-gifts", image: "/videos/posters/demo-5.jpg", icon: Award },
];

const budgets = [
  { label: "UNDER ₹500", href: "/corporate-gifts?maxPrice=500" },
  { label: "UNDER ₹1000", href: "/corporate-gifts?maxPrice=1000" },
  { label: "UNDER ₹1500", href: "/corporate-gifts?maxPrice=1500" },
  { label: "UNDER ₹2500", href: "/corporate-gifts?maxPrice=2500" },
  { label: "PREMIUM ₹2500+", href: "/corporate-gifts?minPrice=2500" },
];

const workflow = [
  ["01", "Tell us what you need", "Share your occasion, audience, quantity, budget, and delivery requirements."],
  ["02", "We curate your gifts", "Explore gifts yourself or work with Sterling to build the right selection."],
  ["03", "Approve branding", "Choose branding, packaging, and personal touches where available."],
  ["04", "We deliver", "Coordinate delivery for your team, clients, or event."],
];

const teams = [
  { title: "HR & People", description: "Onboarding, appreciation, milestones, and festive programs.", href: "/employee-gifting", cta: "Explore employee gifting", icon: Users },
  { title: "Marketing", description: "Conference merchandise, launch kits, and event-ready gifting.", href: "/event-gifts", cta: "Explore event gifting", icon: Megaphone },
  { title: "Sales & Client teams", description: "Relationship-led gifting for customers, prospects, and partners.", href: "/corporate-gifts", cta: "Browse client gifts", icon: Gift },
  { title: "Procurement", description: "Clear requirements, customisation, and bulk-order support.", href: "/bulk-orders", cta: "Request a bulk quote", icon: Building2 },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <section className="relative flex min-h-[820px] items-center overflow-hidden pb-24 pt-28 sm:pt-36 lg:min-h-[880px] lg:pt-40">
        <div className="absolute inset-0 -z-20"><DemoVideoCarousel /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(10,22,38,.86)_0%,rgba(10,22,38,.62)_48%,rgba(10,22,38,.30)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-44 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer staggerDelay={105} className="max-w-3xl text-white">
            <Reveal animationType="fade-up">
              <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-300/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-white/95 backdrop-blur-md shadow-lg shadow-amber-500/10">
                <Sparkles className="h-3.5 w-3.5 text-amber-300 animate-spin-slow" /> Bespoke Corporate Gifting Platform
              </span>
            </Reveal>
            <Reveal animationType="mask-text">
              <h1 className="font-heading max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                <span className="text-gold-subtle drop-shadow-sm">Meaningful Gifts.</span><br />
                <span className="text-white drop-shadow-md">Stronger Relationships.</span>
              </h1>
            </Reveal>
            <Reveal animationType="fade-up">
              <p className="mt-7 max-w-2xl text-lg leading-relaxed text-white/90 sm:text-xl font-sans">
                Premium corporate gifting solutions designed to help businesses celebrate employees, clients and relationships with thoughtful, branded gifts.
              </p>
            </Reveal>
            <Reveal animationType="fade-up">
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link href="/request-a-quote">
                  <button className="btn-gold h-14 px-9 rounded-full font-heading font-bold text-base shadow-[0_12px_28px_-6px_rgba(212,175,55,0.4)] flex items-center justify-center w-full sm:w-auto hover:scale-[1.02] transition-transform shimmer-sweep">
                    GET A CORPORATE QUOTE <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/corporate-gifts">
                  <button className="btn-secondary h-14 px-8 rounded-full font-heading font-semibold text-base shadow-lg flex items-center justify-center w-full sm:w-auto bg-white/10 text-white border-white/40 hover:bg-white hover:text-sp-navy dark:hover:text-sp-navy backdrop-blur-md">
                    EXPLORE COLLECTIONS
                  </button>
                </Link>
              </div>

              {/* Enterprise Trust & Social Proof Bar */}
              <div className="mt-12 pt-8 border-t border-white/15 flex flex-wrap items-center gap-6 sm:gap-10 text-white/80 text-xs sm:text-sm font-medium">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="font-semibold text-white">500+ Enterprise Clients</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                  <span className="font-bold text-white">4.9/5</span>
                  <span className="text-white/70">Client Rating</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-amber-300" />
                  <span>Pan-India Direct Delivery</span>
                </div>
              </div>
            </Reveal>
          </StaggerContainer>
        </div>
      </section>

      {/* Feature Ribbon (Elevated Luxury Cards) */}
      <section className="border-y border-border/50 bg-card/60 backdrop-blur-md py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
            {[
              { title: "Premium Quality", description: "Carefully vetted products", icon: Sparkles },
              { title: "Custom Branding", description: "Your logo on every gift", icon: Palette },
              { title: "Bulk Scaling", description: "Seamless bulk volume", icon: Box },
              { title: "Pan India Delivery", description: "Direct recipient dispatch", icon: Truck },
              { title: "GST Invoicing", description: "100% compliant billing", icon: ReceiptText },
              { title: "Dedicated Support", description: "Personal gifting concierge", icon: Headphones },
            ].map(({ title, description, icon: Icon }) => (
              <div 
                key={title} 
                className="group relative flex flex-col items-center text-center p-4 rounded-xl border border-border/40 bg-background/50 hover:bg-background hover:border-accent/40 hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-accent/15 text-accent group-hover:bg-accent group-hover:text-primary transition-colors duration-300">
                  <Icon className="h-4 w-4" />
                </div>
                <p className="font-heading font-bold text-xs sm:text-sm text-foreground">{title}</p>
                <p className="mt-0.5 text-[11px] leading-relaxed text-muted-foreground">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Corporate Solutions" title="Built for Businesses" description="Comprehensive corporate gifting solutions tailored to your company's specific needs and milestones." />
          <StaggerContainer staggerDelay={70} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((need) => (
              <Reveal key={need.title}>
                <Link 
                  href={need.href} 
                  className="group relative flex min-h-72 overflow-hidden rounded-[24px] border border-border/60 hover:border-amber-400/50 bg-primary p-7 text-white shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-55 transition-transform duration-700 group-hover:scale-[1.08] group-hover:opacity-65" 
                    style={{ backgroundImage: `url('${need.image}')` }} 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />
                  
                  {/* Subtle Top Luxury Badge */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 backdrop-blur-md text-amber-200 border border-white/20 shadow-sm group-hover:bg-amber-400 group-hover:text-primary transition-colors duration-300">
                      <need.icon className="h-4 w-4" />
                    </span>
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-200/90 group-hover:text-amber-200 transition-colors">
                      Bespoke
                    </span>
                  </div>

                  <div className="relative mt-auto transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 ease-out z-10">
                    <h3 className="text-2xl font-bold font-serif tracking-tight text-white group-hover:text-amber-100 transition-colors">{need.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/80 opacity-90 group-hover:opacity-100 transition-opacity duration-500">{need.description}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber-300 group-hover:text-amber-200">
                      Explore Collection <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-secondary/35 py-20 sm:py-28 border-y border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
            <SectionHeading eyebrow="Plan with a budget" title="Make your shortlist faster" description="Start with a practical per-unit range, then refine by category, brandability, and minimum order quantity." align="left" />
            <Link href="/corporate-gifts" className="hidden lg:flex btn-primary h-12 px-6 rounded-full text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg">
              View Complete Catalogue <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {budgets.map((budget) => (
              <Link 
                key={budget.label} 
                href={budget.href} 
                className="group flex min-h-28 flex-col justify-between rounded-[20px] border border-border/80 bg-card dark:bg-card/70 p-5 shadow-sm hover:shadow-xl hover:border-accent/50 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C5A880] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Price Tier</span>
                <span className="flex items-center justify-between font-heading font-bold text-base sm:text-lg text-primary group-hover:text-accent transition-colors">
                  {budget.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-accent" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="A considered process" title="How Sterling works" description="A simple, streamlined journey from initial brief to guaranteed on-time delivery." />
          <StaggerContainer staggerDelay={100} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map(([step, title, description]) => (
              <Reveal key={step}>
                <article className="group relative rounded-2xl border border-border/60 bg-card p-7 shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden dark:bg-card/50">
                  <div className="absolute top-0 right-0 w-28 h-28 bg-accent/5 rounded-bl-full transition-transform duration-500 group-hover:scale-125 dark:bg-accent/10" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent text-lg font-black font-heading mb-6 transition-all duration-500 group-hover:bg-primary group-hover:text-primary-foreground shadow-sm">
                    {step.replace('#', '')}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-primary relative z-10 group-hover:text-accent transition-colors">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground relative z-10">{description}</p>
                </article>
              </Reveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-card/40 border-y border-border/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Custom Branding" title="Make Every Gift Carry Your Brand" description="Logo embossing, laser engraving, UV printing, customized packaging, and branded unboxing experiences." align="center" />
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="group flex-1 w-full text-center">
              <div className="relative overflow-hidden bg-background/80 h-56 rounded-[24px] mb-5 flex items-center justify-center border border-border/80 shadow-sm transition-all duration-500 hover:shadow-lg hover:-translate-y-1">
                <Box className="w-14 h-14 text-muted-foreground/60 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h4 className="font-heading font-semibold text-base text-foreground">1. Premium Blank Base</h4>
            </div>

            <ArrowRight className="hidden md:block w-8 h-8 text-accent/60 animate-pulse" />

            <div className="group flex-1 w-full text-center">
              <div className="relative overflow-hidden bg-accent/5 h-56 rounded-[24px] mb-5 flex items-center justify-center border border-accent/40 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1">
                <Palette className="w-14 h-14 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6" />
              </div>
              <h4 className="font-heading font-semibold text-base text-accent">2. Bespoke Logo Application</h4>
            </div>

            <ArrowRight className="hidden md:block w-8 h-8 text-accent/60 animate-pulse [animation-delay:150ms]" />

            <div className="group flex-1 w-full text-center">
              <div className="relative overflow-hidden bg-gradient-to-br from-accent/10 to-amber-500/10 h-56 rounded-[24px] mb-5 flex items-center justify-center border-2 border-accent shadow-md transition-all duration-500 hover:shadow-2xl hover:shadow-accent/25 hover:-translate-y-1">
                <Gift className="w-14 h-14 text-accent transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h4 className="font-heading font-bold text-base text-primary dark:text-amber-300">3. Finished Executive Unboxing</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-20 text-white sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Built for gifting teams" title="The right pathway for every brief" description="Choose the route that best reflects what your team is trying to achieve." inverse />
          <StaggerContainer staggerDelay={70} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {teams.map((team) => (
              <Reveal key={team.title}>
                <Link href={team.href} className="group flex h-full min-h-60 flex-col rounded-2xl border border-white/15 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/20 dark:hover:bg-white/10 hover:border-amber-300/40 shadow-md hover:shadow-xl">
                  <team.icon className="h-6 w-6 text-amber-300 group-hover:scale-110 transition-transform duration-300" />
                  <h3 className="mt-8 text-xl font-bold font-serif">{team.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/75">{team.description}</p>
                  <span className="mt-auto pt-6 text-sm font-semibold text-amber-200 group-hover:text-amber-100 flex items-center gap-1">
                    {team.cta} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary/45 py-20 sm:py-28">
        <div className="signature-gradient absolute inset-x-0 top-0 h-1" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Reveal animationType="fade-up">
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Dedicated Concierge</span>
            </Reveal>
            <Reveal animationType="mask-text">
              <h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-primary sm:text-5xl font-serif">
                Tell us about the gift you have in mind.
              </h2>
            </Reveal>
            <Reveal animationType="fade-up">
              <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                Share your recipient profile, quantity, budget, and target delivery date. Our corporate gifting specialists will prepare a tailored presentation deck within 24 hours.
              </p>
            </Reveal>
            <Reveal animationType="fade-up">
              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link href="/request-a-quote" className="btn-gold h-14 px-8 rounded-full font-heading font-bold text-sm tracking-wider uppercase shadow-xl flex items-center justify-center shimmer-sweep">
                  GET CORPORATE QUOTE <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
                <Link href="/corporate-gifts" className="btn-secondary h-14 px-8 rounded-full font-heading font-semibold text-sm tracking-wider uppercase shadow-md flex items-center justify-center">
                  EXPLORE COLLECTIONS
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, inverse = false, align = "center" }: { eyebrow: string; title: string; description: string; inverse?: boolean; align?: "center" | "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return <div className={`max-w-2xl ${alignment}`}><Reveal animationType="fade-up"><span className={`text-xs font-bold uppercase tracking-[0.16em] ${inverse ? "text-amber-200" : "text-primary"}`}>{eyebrow}</span></Reveal><Reveal animationType="mask-text"><h2 className={`font-heading mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl ${inverse ? "text-white" : "text-sp-navy dark:text-white dark:text-white"}`}>{title}</h2></Reveal><Reveal animationType="fade-up"><p className={`mt-4 text-base leading-relaxed sm:text-lg ${inverse ? "text-white/75" : "text-muted-foreground"}`}>{description}</p></Reveal></div>;
}
