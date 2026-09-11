import Link from "next/link";
import {
  ArrowRight,
  Award,
  Box,
  BriefcaseBusiness,
  Building2,
  Gift,
  Megaphone,
  Palette,
  PartyPopper,
  Sparkles,
  Users,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { DemoVideoCarousel } from "@/components/home/DemoVideoCarousel";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

const needs = [
  { title: "Bulk Employee Gifting", description: "Welcome, recognise, and celebrate your people at scale.", href: "/employee-gifting", image: "/videos/posters/demo-2.jpg", icon: Users },
  { title: "Client Gifting", description: "Make every relationship feel considered and premium.", href: "/corporate-gifts", image: "/videos/posters/demo-1.jpg", icon: BriefcaseBusiness },
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
      <section className="relative flex min-h-[780px] items-center overflow-hidden pb-24 pt-24 sm:pt-32 lg:min-h-[840px] lg:pt-36">
        <div className="absolute inset-0 -z-20"><DemoVideoCarousel /></div>
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(12,26,43,.82)_0%,rgba(12,26,43,.58)_44%,rgba(12,26,43,.26)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background to-transparent" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer staggerDelay={105} className="max-w-3xl text-white">
            <Reveal animationType="fade-up">
              <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-amber-200" /> Premium corporate gifting
              </span>
            </Reveal>
            <Reveal animationType="mask-text">
              <h1 className="font-heading max-w-3xl text-5xl font-bold leading-[1.04] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
                Meaningful Gifts.<br />Stronger Relationships.
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
                  <button className="btn-primary h-14 px-8 rounded-full font-heading font-semibold text-base shadow-xl flex items-center justify-center w-full sm:w-auto">
                    GET A CORPORATE QUOTE <ArrowRight className="ml-2 h-5 w-5" />
                  </button>
                </Link>
                <Link href="/corporate-gifts">
                  <button className="btn-secondary h-14 px-8 rounded-full font-heading font-semibold text-base shadow-lg flex items-center justify-center w-full sm:w-auto bg-white/10 text-white border-white hover:bg-white hover:text-sp-navy dark:hover:text-sp-navy">
                    EXPLORE COLLECTIONS
                  </button>
                </Link>
              </div>
            </Reveal>
          </StaggerContainer>
        </div>
      </section>

      <section className="border-y border-border/70 bg-card">
        <div className="container mx-auto grid gap-4 px-4 py-8 text-center grid-cols-2 sm:grid-cols-3 md:grid-cols-6 sm:px-6 lg:px-8">
          {[
            ["Premium Quality", "Carefully vetted products"],
            ["Custom Branding", "Your logo on every gift"],
            ["Bulk Orders", "Seamless scaling capability"],
            ["Pan India Delivery", "Delivered directly to recipients"],
            ["GST Invoicing", "Compliant billing process"],
            ["Dedicated Support", "Your personal gifting expert"],
          ].map(([title, description]) => <div key={title} className="px-4"><p className="font-heading font-semibold text-sp-purple dark:text-white">{title}</p><p className="mt-1 font-sans text-sm leading-relaxed text-muted-foreground">{description}</p></div>)}
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Corporate Solutions" title="Built for Businesses" description="Comprehensive corporate gifting solutions tailored to your company's specific needs and milestones." />
          <StaggerContainer staggerDelay={70} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {needs.map((need) => <Reveal key={need.title}><Link href={need.href} className="group relative flex min-h-64 overflow-hidden rounded-[22px] border border-border/70 bg-primary p-6 text-white shadow-sm transition-ui hover:-translate-y-1 hover:shadow-xl"><div className="absolute inset-0 bg-cover bg-center opacity-60 transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: `url('${need.image}')` }} /><div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" /><div className="relative mt-auto transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out"><need.icon className="mb-8 h-5 w-5 text-white/85" /><h3 className="text-2xl font-bold tracking-tight">{need.title}</h3><p className="mt-2 max-w-sm text-sm leading-relaxed text-white/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{need.description}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Explore <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" /></span></div></Link></Reveal>)}
          </StaggerContainer>
        </div>
      </section>

      <section className="bg-secondary/40 py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]"><SectionHeading eyebrow="Plan with a budget" title="Make your shortlist faster" description="Start with a practical per-unit range, then refine by category, brandability, and minimum order quantity." align="left" /><Link href="/corporate-gifts" className={cn(buttonVariants({ variant: "outline" }), "hidden lg:flex btn-primary border-primary/20 hover:text-white")}>View the catalogue <ArrowRight className="ml-2 h-4 w-4" /></Link></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{budgets.map((budget) => <Link key={budget.label} href={budget.href} className="group flex min-h-28 flex-col justify-between rounded-[18px] border border-border bg-card dark:bg-card border-border p-5 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md relative overflow-hidden"><span className="text-sm font-medium text-muted-foreground">Gift budget</span><div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="flex items-center justify-between font-heading font-bold text-sp-navy dark:text-white">{budget.label}<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-sp-magenta" /></span></Link>)}</div>
        </div>
      </section>

      <section className="py-20 sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="A considered process" title="How Sterling works" description="A simple way to move a corporate gifting idea from brief to delivery." />
          <StaggerContainer staggerDelay={100} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {workflow.map(([step, title, description], idx) => (
              <Reveal key={step}>
                <article className="group relative rounded-2xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-2 overflow-hidden dark:bg-card/50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full transition-transform duration-500 group-hover:scale-125 dark:bg-primary/10" />
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-xl font-black text-primary mb-6 transition-colors duration-500 group-hover:bg-primary group-hover:text-primary-foreground dark:bg-primary/20 dark:group-hover:bg-primary">
                    {step.replace('#', '')}
                  </div>
                  <h3 className="text-xl font-bold tracking-tight text-sp-navy dark:text-white relative z-10">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground relative z-10">{description}</p>
                </article>
              </Reveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-background border-y border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Custom Branding" title="Make Every Gift Carry Your Brand" description="Logo branding, custom packaging, personalized messages, custom inserts, and branded merchandise." align="center" />
          <div className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="group flex-1 w-full text-center">
              <div className="relative overflow-hidden bg-muted/50 dark:bg-slate-900/50 h-56 rounded-[24px] mb-5 flex items-center justify-center border border-slate-200 dark:border-slate-800 text-slate-400 transition-all duration-500 hover:shadow-lg hover:-translate-y-2">
                <Box className="w-16 h-16 opacity-40 transition-transform duration-500 group-hover:scale-110" />
              </div>
              <h4 className="font-heading font-semibold text-lg text-slate-600 dark:text-slate-300">Blank Product</h4>
            </div>

            <ArrowRight className="hidden md:block w-10 h-10 text-slate-300 dark:text-slate-700 animate-pulse" />

            <div className="group flex-1 w-full text-center">
              <div className="relative overflow-hidden bg-gradient-to-br from-sp-purple/5 to-sp-blue/5 dark:from-sp-purple/10 dark:to-sp-blue/10 h-56 rounded-[24px] mb-5 flex items-center justify-center border border-sp-purple/30 text-sp-purple transition-all duration-500 hover:shadow-xl hover:shadow-sp-purple/20 hover:-translate-y-2">
                <Palette className="w-16 h-16 opacity-80 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
              </div>
              <h4 className="font-heading font-semibold text-lg text-sp-purple dark:text-sp-purple">Branded Product</h4>
            </div>

            <ArrowRight className="hidden md:block w-10 h-10 text-sp-purple/40 animate-pulse delay-150" />

            <div className="group flex-1 w-full text-center">
              <div className="relative overflow-hidden bg-gradient-to-br from-sp-magenta/5 to-sp-orange/5 dark:from-sp-magenta/10 dark:to-sp-orange/10 h-56 rounded-[24px] mb-5 flex items-center justify-center border-2 border-sp-magenta text-sp-magenta transition-all duration-500 hover:shadow-2xl hover:shadow-sp-magenta/30 hover:-translate-y-2">
                <div className="absolute inset-0 bg-gradient-to-br from-sp-magenta/0 to-sp-orange/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <Gift className="w-16 h-16 opacity-90 transition-transform duration-500 group-hover:scale-125 relative z-10" />
              </div>
              <h4 className="font-heading font-semibold text-lg text-sp-magenta">Finished Gift Box</h4>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sp-navy py-20 text-white sm:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading eyebrow="Built for gifting teams" title="The right pathway for every brief" description="Choose the route that best reflects what your team is trying to achieve." inverse />
          <StaggerContainer staggerDelay={70} className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{teams.map((team) => <Reveal key={team.title}><Link href={team.href} className="group flex h-full min-h-60 flex-col rounded-2xl border border-white/15 bg-white/10 dark:bg-white/5 p-6 backdrop-blur-sm transition-ui hover:-translate-y-1 hover:bg-white/20 dark:hover:bg-white/10"><team.icon className="h-6 w-6 text-amber-200" /><h3 className="mt-8 text-xl font-bold">{team.title}</h3><p className="mt-2 text-sm leading-relaxed text-white/72">{team.description}</p><span className="mt-auto pt-6 text-sm font-semibold text-white">{team.cta} <ArrowRight className="ml-1 inline h-4 w-4 transition-transform group-hover:translate-x-1" /></span></Link></Reveal>)}</StaggerContainer>
        </div>
      </section>

      <section className="relative overflow-hidden bg-secondary/45 py-20 sm:py-28">
        <div className="signature-gradient absolute inset-x-0 top-0 h-1" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8"><div className="mx-auto max-w-3xl text-center"><Reveal animationType="fade-up"><span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Need a hand choosing?</span></Reveal><Reveal animationType="mask-text"><h2 className="mt-4 text-4xl font-bold tracking-[-0.04em] text-primary sm:text-5xl">Tell us about the gift you have in mind.</h2></Reveal><Reveal animationType="fade-up"><p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">Share your audience, quantity, budget, and preferred delivery timeline. We’ll help you find a suitable starting point.</p></Reveal><Reveal animationType="fade-up"><div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link href="/request-a-quote" className="btn-primary h-12 px-7 rounded-full font-heading font-semibold text-sm shadow flex items-center justify-center">GET CORPORATE QUOTE <ArrowRight className="ml-2 h-4 w-4" /></Link><Link href="/corporate-gifts" className="btn-secondary h-12 px-7 rounded-full font-heading font-semibold text-sm shadow flex items-center justify-center">EXPLORE COLLECTIONS</Link></div></Reveal></div></div>
      </section>
    </div>
  );
}

function SectionHeading({ eyebrow, title, description, inverse = false, align = "center" }: { eyebrow: string; title: string; description: string; inverse?: boolean; align?: "center" | "left" }) {
  const alignment = align === "center" ? "mx-auto text-center" : "text-left";
  return <div className={`max-w-2xl ${alignment}`}><Reveal animationType="fade-up"><span className={`text-xs font-bold uppercase tracking-[0.16em] ${inverse ? "text-amber-200" : "text-primary"}`}>{eyebrow}</span></Reveal><Reveal animationType="mask-text"><h2 className={`font-heading mt-4 text-3xl font-bold tracking-[-0.04em] sm:text-4xl ${inverse ? "text-white" : "text-sp-navy dark:text-white dark:text-white"}`}>{title}</h2></Reveal><Reveal animationType="fade-up"><p className={`mt-4 text-base leading-relaxed sm:text-lg ${inverse ? "text-white/75" : "text-muted-foreground"}`}>{description}</p></Reveal></div>;
}
