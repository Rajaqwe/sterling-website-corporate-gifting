import type { Metadata } from "next";
import { MarketingHero } from "@/components/marketing/MarketingHero";
import { QuoteShortlistClient } from "@/components/shortlist/QuoteShortlistClient";

export const metadata: Metadata = {
  title: "Quote Shortlist",
  description: "Save corporate gift ideas in one shortlist before requesting a bulk quote from Sterling.",
  alternates: { canonical: "/quote-shortlist" },
};

export default function QuoteShortlistPage() {
  return (
    <div className="min-h-screen bg-muted/40 dark:bg-background">
      <MarketingHero
        title="Build your quote shortlist"
        subtitle="Save the products worth pricing, then send one focused brief to the Sterling team."
      />
      <section className="container mx-auto -mt-10 max-w-5xl px-4 pb-16 pt-16 relative z-20 sm:px-6 lg:px-8 lg:pb-24">
        <QuoteShortlistClient />
      </section>
    </div>
  );
}
