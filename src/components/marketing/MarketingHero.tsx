"use client";

import React from "react";
import { Reveal, StaggerContainer } from "@/components/ui/reveal";

interface MarketingHeroProps {
  title: React.ReactNode;
  subtitle?: string;
  backgroundImage?: string;
}

export function MarketingHero({ title, subtitle, backgroundImage }: MarketingHeroProps) {
  return (
    <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50 dark:bg-card border-b border-border/40">
      {backgroundImage && (
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center opacity-10 dark:opacity-20"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <StaggerContainer staggerDelay={100}>
          <Reveal animationType="mask-text">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-6 max-w-4xl mx-auto leading-tight text-sp-navy dark:text-white">
              {title}
            </h1>
          </Reveal>
          {subtitle && (
            <Reveal>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                {subtitle}
              </p>
            </Reveal>
          )}
        </StaggerContainer>
      </div>
    </section>
  );
}
