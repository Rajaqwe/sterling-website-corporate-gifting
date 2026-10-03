import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Box,
  BriefcaseBusiness,
  CheckCircle2,
  Gift,
  Palette,
  PartyPopper,
  Sparkles,
  Truck,
  Users,
} from "lucide-react";
import { prisma } from "@/lib/prisma/client";
import { serializeData } from "@/lib/utils/serialize";
import { ProductCard } from "@/components/products/ProductCard";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";
import { DemoVideoCarousel } from "@/components/home/DemoVideoCarousel";
import { CorporateProcurementTrust } from "@/components/home/CorporateProcurementTrust";
import { VerifiedTestimonials } from "@/components/home/VerifiedTestimonials";
import { ProjectGallery } from "@/components/home/ProjectGallery";

const solutions = [
  { title: "Corporate Kits", description: "Polished gifting programs for teams, clients, and milestones.", href: "/corporate-gifts", icon: Box },
  { title: "Festive Hampers", description: "Celebration-ready selections with premium presentation.", href: "/gift-collections", icon: PartyPopper },
  { title: "Employee Rewards", description: "Useful, memorable gifts for recognition and appreciation.", href: "/employee-gifting", icon: Users },
  { title: "Client Gifts", description: "Thoughtful relationship gifting built around your brand.", href: "/corporate-gifts", icon: BriefcaseBusiness },
  { title: "Gift Finder", description: "Narrow the catalogue by budget, quantity and gifting goal.", href: "/gift-finder", icon: Sparkles },
];

const occasions = [
  { title: "Employee Welcome", image: "/videos/posters/demo-3.jpg", href: "/employee-gifting" },
  { title: "Festive Gifting", image: "/videos/posters/demo-5.jpg", href: "/gift-collections" },
  { title: "Events & Conferences", image: "/videos/posters/demo-4.jpg", href: "/event-gifts" },
  { title: "Client Thank-you", image: "/videos/posters/demo-2.jpg", href: "/corporate-gifts" },
  { title: "Custom Branding", image: "/videos/posters/demo-1.jpg", href: "/custom-branding" },
];

const process = [
  ["01", "Choose", "Share your gift type, occasion, quantity, budget and deadline."],
  ["02", "Customise", "Add your logo, branding method, packaging and personalisation."],
  ["03", "Approve", "Review the proposed selection and branding before production."],
  ["04", "Delivered", "Coordinate dispatches for teams, clients, or events."],
];

const features = [
  [Sparkles, "Premium quality", "Curated products and presentation-ready options."],
  [Palette, "Custom branding", "Laser, print, packaging and other available finishes."],
  [Box, "Bulk friendly", "Built around corporate quantities and repeat programmes."],
  [Truck, "Delivery coordination", "Plan dispatches for multiple recipient locations."],
] as const;

async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { status: "ACTIVE" },
      include: { category: true, media: true },
      take: 8,
    });
    return serializeData(products as any[]);
  } catch {
    return [];
  }
}

export default async function SterlingPrimeHome() {
  const products = await getFeaturedProducts();

  return (
    <div className="overflow-hidden">
      <section className="relative bg-background">
        <div className="absolute inset-x-0 top-0 h-1 bg-[linear-gradient(90deg,#E13D46_0%,#E2CD27_30%,#A93694_65%,#0F75BC_100%)]" />
        <div className="container mx-auto px-4 pb-10 pt-20 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40">
          <div className="grid items-center gap-7 lg:grid-cols-[1.02fr_.98fr] lg:gap-14">
            <StaggerContainer staggerDelay={80} className="max-w-2xl">
              <Reveal animationType="fade-up">
                <span className="inline-flex items-center rounded-full bg-[#C4161C]/8 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4161C] sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.24em]">
                  Prime gifting
                </span>
              </Reveal>
              <Reveal animationType="mask-text">
                <h1 className="mt-4 font-heading text-3xl font-bold leading-[1.06] tracking-[-0.04em] text-[#1B1F3B] dark:text-white sm:mt-5 sm:text-5xl sm:leading-[1.04] sm:tracking-[-0.045em] lg:text-6xl xl:text-7xl">
                  Gifts that make every <span className="italic text-[#0F75BC]">moment</span> unforgettable.
                </h1>
              </Reveal>
              <Reveal animationType="fade-up">
                <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#5B6280] dark:text-slate-300 sm:mt-6 sm:text-lg sm:leading-8">
                  Premium, custom-branded gifts for teams, clients and celebrations, designed around your brief and delivered with clear coordination.
                </p>
              </Reveal>
              <Reveal animationType="fade-up">
                <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:gap-3">
                  <Link href="/request-a-quote" className="btn-gold h-11 rounded-full px-5 text-sm font-bold uppercase tracking-[0.06em] sm:h-12 sm:px-7 sm:tracking-[0.08em]">
                    Get a quote <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                  <Link href="/gift-finder" data-track-event="gift_finder_start" className="inline-flex h-11 items-center justify-center rounded-full border border-[#0F75BC] bg-background px-5 text-sm font-semibold text-[#0F75BC] sm:h-12 sm:px-7">
                    Browse gifts
                  </Link>
                </div>
              </Reveal>
              <Reveal animationType="fade-up">
                <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5 text-[11px] font-medium text-[#5B6280] dark:text-slate-300 sm:mt-8 sm:gap-x-6 sm:gap-y-3 sm:text-xs">
                  {["Corporate-first buying", "Bulk order support", "Custom branding", "GST-ready billing"].map((item) => (
                    <span key={item} className="inline-flex items-center gap-1.5 sm:gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#1E9E5A] sm:h-4 sm:w-4" /> {item}
                    </span>
                  ))}
                </div>
              </Reveal>
            </StaggerContainer>

            <Reveal animationType="fade-left" className="relative">
              <div className="absolute -left-8 top-6 h-24 w-24 rounded-full bg-[#C33B83]/18 blur-3xl sm:-left-14 sm:top-10 sm:h-36 sm:w-36" />
              <div className="absolute -right-6 bottom-2 h-28 w-28 rounded-full bg-[#EB7925]/18 blur-3xl sm:-right-10 sm:bottom-3 sm:h-40 sm:w-40" />
              <div className="relative overflow-hidden rounded-[22px] border border-[#E4E1EE] bg-[#F7F5FB] p-2 shadow-[0_14px_40px_rgba(27,31,59,.10)] sm:rounded-[28px] sm:p-3 sm:shadow-[0_18px_55px_rgba(27,31,59,.12)] dark:border-white/10 dark:bg-[#101d2c]">
                <div className="relative aspect-[4/3] overflow-hidden rounded-[17px] sm:rounded-[22px]">
                  <DemoVideoCarousel />
                </div>
                <div className="absolute left-4 top-4 rounded-xl border border-white/60 bg-white/90 px-3 py-2 text-[9px] font-bold uppercase tracking-[0.14em] text-[#5B6280] shadow-lg backdrop-blur sm:left-6 sm:top-6 sm:rounded-2xl sm:px-4 sm:py-3 sm:text-[10px] sm:tracking-[0.16em] dark:border-white/10 dark:bg-[#0b1624]/90 dark:text-slate-200">
                  Custom branding
                </div>
                <div className="absolute bottom-4 right-4 rounded-xl bg-white px-3 py-2 shadow-lg sm:bottom-6 sm:right-6 sm:rounded-2xl sm:px-4 sm:py-3 dark:bg-[#0b1624]">
                  <div className="text-[9px] font-bold uppercase tracking-[0.14em] text-[#C4161C] sm:text-[10px] sm:tracking-[0.16em]">Sterling Prime</div>
                  <div className="mt-0.5 text-[11px] font-semibold text-[#1B1F3B] sm:mt-1 sm:text-xs dark:text-white">Premium corporate gifting</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-24" id="solutions">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4161C] sm:text-xs sm:tracking-[0.22em]">What we offer</span>
            <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-[#1B1F3B] dark:text-white sm:mt-3 sm:text-4xl">
              Find the perfect gift
            </h2>
            <p className="mt-3 text-[15px] leading-6 text-[#5B6280] dark:text-slate-300 sm:mt-4 sm:text-base sm:leading-7">
              Start with the occasion or audience, then refine the product, branding, budget and delivery details.
            </p>
          </div>
          <StaggerContainer staggerDelay={70} className="mt-7 grid gap-3.5 sm:mt-10 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
            {solutions.map(({ title, description, href, icon: Icon }) => (
              <Reveal key={title}>
                <Link href={href} className="group block h-full rounded-[18px] border border-[#E4E1EE] bg-white p-5 shadow-[0_6px_20px_rgba(27,31,59,.05)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-[#A93694]/45 hover:shadow-[0_14px_32px_rgba(27,31,59,.12)] sm:rounded-[20px] sm:p-6 dark:border-white/10 dark:bg-[#101d2c]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#A93694]/10 text-[#0F75BC] transition-colors duration-300 sm:h-12 sm:w-12 group-hover:bg-[#A93694] group-hover:text-white">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-heading text-base font-semibold text-[#1B1F3B] sm:mt-5 sm:text-lg dark:text-white">{title}</h3>
                  <p className="mt-1.5 text-sm leading-6 text-[#5B6280] sm:mt-2 dark:text-slate-300">{description}</p>
                  <span className="mt-4 inline-flex items-center text-sm font-semibold text-[#0F75BC] sm:mt-5">
                    Explore <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="border-y border-[#E4E1EE] bg-[#F7F5FB] py-14 sm:py-24 dark:border-white/10 dark:bg-[#101d2c]" id="products">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4161C] sm:text-xs sm:tracking-[0.22em]">Curated picks</span>
              <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-[#1B1F3B] sm:mt-3 sm:text-4xl dark:text-white">Featured products</h2>
              <p className="mt-2.5 max-w-2xl text-[15px] leading-6 text-[#5B6280] sm:mt-3 sm:text-base sm:leading-7 dark:text-slate-300">Real catalogue products from your current Sterling product database.</p>
            </div>
            <Link href="/corporate-gifts" className="inline-flex items-center text-sm font-bold text-[#0F75BC]">See all products <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </div>

          {products.length > 0 ? (
            <div className="mt-7 grid gap-4 sm:mt-9 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
              {(products as any[]).map((product, index) => (
                <Reveal key={product.id} className="h-full">
                  <ProductCard product={product as any} priority={index < 4} />
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="mt-7 rounded-[18px] border border-dashed border-[#E4E1EE] bg-white p-7 text-center sm:mt-9 sm:rounded-[20px] sm:p-10 dark:border-white/10 dark:bg-[#0b1624]">
              <Gift className="mx-auto h-9 w-9 text-[#A93694] sm:h-10 sm:w-10" />
              <p className="mt-3 font-semibold text-[#1B1F3B] sm:mt-4 dark:text-white">Featured products will appear here from the catalogue.</p>
              <Link href="/corporate-gifts" className="mt-2.5 inline-flex text-sm font-bold text-[#0F75BC] sm:mt-3">Open catalogue <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4161C] sm:text-xs sm:tracking-[0.22em]">Simple process</span>
            <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-[#1B1F3B] sm:mt-3 sm:text-4xl dark:text-white">From brief to delivery</h2>
          </div>
          <div className="relative mt-9 grid gap-6 md:mt-12 md:grid-cols-4 md:gap-7">
            <div className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-[linear-gradient(90deg,#E13D46,#E2CD27)] md:block" />
            {process.map(([number, title, description]) => (
              <Reveal key={number} className="relative z-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#A93694,#D6303F)] text-xs font-bold text-white shadow-lg sm:h-14 sm:w-14">{number}</div>
                <h3 className="mt-3 font-heading text-base font-semibold text-[#1B1F3B] sm:mt-4 sm:text-lg dark:text-white">{title}</h3>
                <p className="mx-auto mt-1.5 max-w-[230px] text-sm leading-6 text-[#5B6280] sm:mt-2 dark:text-slate-300">{description}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[#E4E1EE] bg-[#EAF4FB] py-14 sm:py-24 dark:border-white/10 dark:bg-[#102538]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-7 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-10">
            <Reveal animationType="fade-up">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4161C] sm:text-xs sm:tracking-[0.22em]">Why Sterling Prime</span>
              <h2 className="mt-2.5 max-w-xl font-heading text-2xl font-bold tracking-tight text-[#1B1F3B] sm:mt-3 sm:text-4xl dark:text-white">
                Premium without the complicated process.
              </h2>
              <p className="mt-4 max-w-xl text-[15px] leading-6 text-[#5B6280] sm:mt-5 sm:text-base sm:leading-7 dark:text-slate-300">
                Keep product choice, branding, quantity, budget and delivery requirements in one clear corporate workflow.
              </p>
              <Link href="/request-a-quote" className="btn-gold mt-6 h-11 rounded-full px-5 text-sm font-bold sm:mt-7 sm:h-12 sm:px-6">
                Start your brief <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Reveal>
            <StaggerContainer staggerDelay={70} className="grid gap-3.5 sm:grid-cols-2 sm:gap-4">
              {features.map(([Icon, title, description]) => (
                <Reveal key={title}>
                  <article className="h-full rounded-[18px] border border-[#E4E1EE] bg-white p-5 shadow-[0_6px_20px_rgba(27,31,59,.05)] sm:rounded-[20px] sm:p-6 dark:border-white/10 dark:bg-[#101d2c]">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#A93694]/10 text-[#0F75BC]"><Icon className="h-5 w-5" /></div>
                    <h3 className="mt-3.5 font-heading text-base font-semibold text-[#1B1F3B] sm:mt-4 dark:text-white">{title}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-[#5B6280] sm:mt-2 dark:text-slate-300">{description}</p>
                  </article>
                </Reveal>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </section>

      <section className="py-14 sm:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between sm:gap-5">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#C4161C] sm:text-xs sm:tracking-[0.22em]">Moments</span>
              <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tight text-[#1B1F3B] sm:mt-3 sm:text-4xl dark:text-white">Every occasion, covered</h2>
            </div>
            <Link href="/gift-collections" className="inline-flex items-center text-sm font-bold text-[#0F75BC]">Browse collections <ArrowRight className="ml-1.5 h-4 w-4" /></Link>
          </div>
          <div className="mt-7 grid gap-3.5 sm:mt-9 sm:grid-cols-2 sm:gap-4 lg:grid-cols-5">
            {occasions.map((occasion, index) => (
              <Reveal key={occasion.title}>
                <Link href={occasion.href} className="group relative block min-h-56 overflow-hidden rounded-[18px] sm:min-h-64 sm:rounded-[20px]">
                  <Image src={occasion.image} alt={occasion.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" sizes="(max-width: 1024px) 50vw, 20vw" priority={index < 2} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B2A4A]/90 via-[#0B2A4A]/20 to-transparent" />
                  <span className="absolute inset-x-4 bottom-4 font-heading text-sm font-semibold text-white sm:inset-x-5 sm:bottom-5 sm:text-base">{occasion.title}</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CorporateProcurementTrust />
      <VerifiedTestimonials limit={3} />
      <ProjectGallery />

      <section className="bg-[linear-gradient(160deg,#0B2A4A_0%,#0F75BC_140%)] py-12 text-white sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between lg:gap-7">
            <div className="max-w-2xl">
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/75 sm:text-xs sm:tracking-[0.22em]">Ready when you are</span>
              <h2 className="mt-2.5 font-heading text-2xl font-bold tracking-tight sm:mt-3 sm:text-4xl">Ready to delight your team and clients?</h2>
              <p className="mt-3 text-[15px] leading-6 text-white/80 sm:mt-4 sm:text-base sm:leading-7">Share your brief and let Sterling turn it into practical gift options.</p>
            </div>
            <div className="flex flex-col gap-2.5 sm:flex-row sm:gap-3">
              <Link href="/request-a-quote" className="inline-flex h-11 items-center justify-center rounded-full bg-white px-5 text-sm font-bold text-[#0B2A4A] shadow-lg transition-transform duration-200 hover:-translate-y-0.5 sm:h-12 sm:px-6">
                Request a quote
              </Link>
              <a href="tel:+917041614713" className="inline-flex h-11 items-center justify-center rounded-full border border-white/30 px-5 text-sm font-semibold text-white hover:bg-white/10 sm:h-12 sm:px-6">
                Call Sterling
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
