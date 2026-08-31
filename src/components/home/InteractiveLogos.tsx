"use client";

import React, { useState, useEffect, useRef } from "react";
import { Reveal } from "@/components/ui/reveal";

const COMPANIES = [
  {
    id: "tcs",
    name: "TCS",
    logoUrl: "/logos/tcs.svg",
    category: "IT Services",
    description: "Global technology, digital and business services company helping enterprises transform.",
    tags: ["GLOBAL", "ENTERPRISE", "AI"],
  },
  {
    id: "wipro",
    name: "Wipro",
    logoUrl: "/logos/wipro.svg",
    category: "Consulting • AI",
    description: "AI-powered technology services focused on complex digital transformation needs.",
    tags: ["AI-POWERED", "CONSULTING"],
  },
  {
    id: "infosys",
    name: "Infosys",
    logoUrl: "/logos/infosys.svg",
    category: "Digital Services",
    description: "Global leader in next-generation digital services and consulting.",
    tags: ["DIGITAL", "CLOUD"],
  },
  {
    id: "reliance",
    name: "Reliance",
    logoUrl: "/logos/reliance.svg",
    category: "Diversified",
    description: "Large Indian enterprise operating across energy, retail, digital services, and media.",
    tags: ["ENERGY", "RETAIL", "JIO"],
  },
  {
    id: "tata",
    name: "Tata Group",
    logoUrl: "/logos/tata.svg",
    category: "Conglomerate",
    description: "Global enterprise group operating across multiple industries and business verticals.",
    tags: ["AUTO", "STEEL", "TECH"],
  },
  {
    id: "hcltech",
    name: "HCLTech",
    logoUrl: "/logos/hcltech.svg",
    category: "Engineering • Cloud",
    description: "Global technology company delivering capabilities across AI, digital, and engineering.",
    tags: ["ENGINEERING", "SOFTWARE"],
  },
  {
    id: "techmahindra",
    name: "Tech Mahindra",
    logoUrl: "/logos/techmahindra.svg",
    category: "IT Services",
    description: "Innovative and customer-centric digital experiences, enabling enterprises to transform globally.",
    tags: ["IT SERVICES", "DIGITAL"],
  },
  {
    id: "adityabirla",
    name: "Aditya Birla",
    logoUrl: "/logos/adityabirla.svg",
    category: "Conglomerate",
    description: "Premium multinational conglomerate operating globally across metals, cement, fashion, and retail.",
    tags: ["CONGLOMERATE", "GLOBAL"],
  },
];

function CompanyCard({ 
  company, 
  isActive, 
  onMouseEnter, 
  onClick, 
  animationType = "default" 
}: { 
  company: typeof COMPANIES[0], 
  isActive: boolean, 
  onMouseEnter: () => void, 
  onClick: () => void, 
  animationType?: "default" | "flip" 
}) {
  
  if (animationType === "flip") {
    return (
      <div 
        className={`relative flex items-center justify-center h-[380px] md:h-[420px] border-r border-b border-border/40 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary ${isActive ? 'z-50' : 'z-10'}`}
        style={{ perspective: "1200px" }}
        tabIndex={0}
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        }}
        role="button"
        aria-expanded={isActive}
      >
        <div 
          className="w-full h-full relative duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
          style={{ 
            transformStyle: "preserve-3d", 
            transform: isActive ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-background group"
            style={{ backfaceVisibility: "hidden" }}
          >
            <img 
              src={company.logoUrl} 
              alt={`${company.name} logo`} 
              className="w-20 h-20 md:w-28 md:h-28 object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
            />
            <span className="text-2xl md:text-3xl font-bold tracking-wide text-foreground font-serif">
              {company.name}
            </span>
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-1 md:inset-2 bg-[#0A192F] rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between p-8 md:p-10"
            style={{ 
              backfaceVisibility: "hidden", 
              transform: "rotateY(180deg)"
            }}
          >
            {/* Header: Name and Category */}
            <div>
              <h3 className="text-3xl md:text-4xl font-sans font-bold text-white mb-3 tracking-tight">
                {company.name}
              </h3>
              <p className="text-white/80 leading-relaxed text-sm md:text-base font-sans">
                {company.description}
              </p>
            </div>

            {/* Footer: Tags / Pills */}
            <div className="flex flex-wrap gap-2 mt-8">
              {company.tags.map((tag: string) => (
                <span key={tag} className="px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-wider text-white bg-white/10 rounded-md border border-white/20">
                  {tag}
                </span>
              ))}
              <span className="flex items-center gap-2 px-3 py-1.5 text-[10px] md:text-xs font-bold tracking-wider text-white bg-white/10 rounded-md border border-white/20">
                <img src="/logos/india.svg" alt="India" className="w-4 h-3 object-cover rounded-sm shadow-sm" /> INDIA
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default standard fallback animation
  return (
    <div 
      className={`relative flex items-center justify-center h-[380px] md:h-[420px] border-r border-b border-border/40 bg-background cursor-pointer outline-none transition-colors duration-300 ${isActive ? 'z-50' : 'z-10'}`}
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
    >
      <div className={`absolute inset-0 flex flex-col items-center justify-center gap-6 transition-opacity duration-700 ${isActive ? "opacity-0" : "opacity-100"}`}>
        <img src={company.logoUrl} alt={`${company.name} logo`} className="w-20 h-20 md:w-28 md:h-28 object-contain" />
        <span className="text-2xl md:text-3xl font-bold tracking-wide text-foreground font-serif">{company.name}</span>
      </div>
      <div className={`absolute inset-0 bg-background flex flex-col justify-between p-8 md:p-10 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div>
          <h3 className="text-3xl md:text-4xl font-sans font-bold text-foreground mb-3">{company.name}</h3>
          <p className="text-foreground/70 text-sm md:text-base">{company.description}</p>
        </div>
      </div>
    </div>
  );
}

export function InteractiveLogos() {
  const [activeCompanyId, setActiveCompanyId] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Close panel if touched outside on mobile
  useEffect(() => {
    const handleTouchOutside = (e: TouchEvent) => {
      if (gridRef.current && !gridRef.current.contains(e.target as Node)) {
        setActiveCompanyId(null);
      }
    };
    document.addEventListener("touchstart", handleTouchOutside);
    return () => document.removeEventListener("touchstart", handleTouchOutside);
  }, []);

  return (
    <section className="pt-16 pb-32 bg-background relative border-t border-border/40 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl relative z-10">
        
        <Reveal>
          <div 
            ref={gridRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-l border-t border-border/40"
            onMouseLeave={() => setActiveCompanyId(null)}
          >
            {COMPANIES.map((company) => (
              <CompanyCard 
                key={company.id}
                company={company}
                isActive={activeCompanyId === company.id}
                onMouseEnter={() => setActiveCompanyId(company.id)}
                onClick={() => setActiveCompanyId(activeCompanyId === company.id ? null : company.id)}
                animationType="flip" // Applying the new flip animation exclusively to these products as requested
              />
            ))}
          </div>
        </Reveal>

      </div>
    </section>
  );
}

