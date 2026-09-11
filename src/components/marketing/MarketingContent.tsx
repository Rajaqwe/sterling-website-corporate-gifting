import React from "react";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

export function MarketingContent({ children }: { children: React.ReactNode }) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer staggerDelay={100}>
          <div className="max-w-3xl mx-auto prose prose-lg prose-slate dark:prose-invert prose-headings:font-serif prose-headings:text-primary prose-a:text-accent hover:prose-a:text-gold-hover">
            {children}
          </div>
        </StaggerContainer>
      </div>
    </section>
  );
}
