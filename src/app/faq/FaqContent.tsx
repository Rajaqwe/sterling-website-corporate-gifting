"use client";
import { buttonVariants } from "@/components/ui/button";

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { HelpCircle } from "lucide-react";

const faqCategories = [
  {
    category: "Orders & Pricing",
    questions: [
      {
        q: "What is your Minimum Order Quantity (MOQ)?",
        a: "Standard MOQs depend on the product and customization type. Unbranded products can be ordered in smaller quantities. Generally, custom-branded items require a minimum of 25-50 units.Contact us for product-specific MOQ details.",
      },
      {
        q: "Can I order a sample before placing a bulk order?",
        a: "Absolutely. Paid samples are available for quality checking before you commit to a bulk order. Sample costs are often adjusted against the final bulk invoice, so you're not paying extra.",
      },
      {
        q: "Do you provide GST invoices for corporate purchases?",
        a: "Yes, we provide valid GST invoices for all B2B orders to enable input tax credit claims. We also provide proforma invoices, delivery challans, and other procurement documentation as needed.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept bank transfers (NEFT/RTGS), UPI, corporate credit cards, and Razorpay for online payments. For large orders, we offer flexible payment terms including 50/50 splits and net-30 terms for verified businesses.",
      },
    ],
  },
  {
    category: "Customization & Branding",
    questions: [
      {
        q: "Do you offer custom branding on gifts?",
        a: "Yes, we offer multiple branding options including laser engraving, screen printing, UV printing, embossing, and custom packaging boxes — all tailored to your brand identity and guidelines.",
      },
      {
        q: "Can I see a mockup before production?",
        a: "Yes. For all custom-branded orders, we provide digital mockups for your approval before production begins. Physical samples can also be arranged for an additional fee.",
      },
      {
        q: "What file formats do you need for logo printing?",
        a: "We work best with vector files (AI, SVG, EPS, or high-resolution PDF). For screen printing and UV printing, we also accept high-resolution PNG files (minimum 300 DPI).",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    questions: [
      {
        q: "Do you deliver across India?",
        a: "Yes, we deliver pan-India — from metros to tier-2 and tier-3 cities. We can ship to a single corporate address or directly to individual recipient addresses across the country.",
      },
      {
        q: "What is the typical delivery timeline?",
        a: "Standard orders ship within 7-10 business days. Custom-branded orders typically take 10-15 business days depending on complexity. Express production (48-hour turnaround) is available for select products at an additional charge.",
      },
      {
        q: "Can you deliver to multiple addresses?",
        a: "Absolutely. We specialize in multi-address delivery for distributed teams. Simply share a spreadsheet with recipient names and addresses, and we handle individual dispatches with tracking for each.",
      },
    ],
  },
];

export function FaqContent() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqCategories.flatMap(cat => 
      cat.questions.map(q => ({
        "@type": "Question",
        "name": q.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": q.a
        }
      }))
    )
  };

  return (
    <div className="flex flex-col min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Hero */}
      <section className="relative bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground pt-32 pb-20 md:py-15	 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Help Center
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 max-w-3xl mx-auto leading-tight">
            Frequently Asked <br className="hidden md:block" />Questions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about our corporate gifting services. 
            Can&apos;t find what you&apos;re looking for? We&apos;re just a message away.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <div className="space-y-12">
            {faqCategories.map((category, catIdx) => (
              <div key={catIdx}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <HelpCircle className="h-5 w-5" />
                  </div>
                  <h2 className="text-2xl font-serif font-bold text-primary">{category.category}</h2>
                </div>
                <Accordion multiple={false} className="rounded-xl border bg-background shadow-sm overflow-hidden">
                  {category.questions.map((item, qIdx) => (
                    <AccordionItem key={qIdx} className="px-6">
                      <AccordionTrigger className="py-5 text-base font-semibold text-primary hover:no-underline">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent>
                        <p className="text-muted-foreground leading-relaxed pb-4">
                          {item.a}
                        </p>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-20 bg-muted/50 dark:bg-card border-b border-border/40 text-sp-navy dark:text-foreground text-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Still have questions?
          </h2>
          <p className="text-lg text-muted-foreground mb-10">
            Our team is happy to help with any questions about our products, pricing, or process.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/contact" className={buttonVariants({ variant: "default", size: "lg", className: "btn-primary w-full sm:w-auto    h-12 px-8 text-base font-semibold" })}>
                Contact Us
              </Link>
            <Link href="/request-a-quote" className={buttonVariants({ variant: "outline", size: "lg", className: "btn-primary w-full sm:w-auto border-white hover:bg-background h-12 px-8 text-base" })}>
                Request a Quote
              </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
