"use client";

import React, { useState } from "react";
import { ProductSpecification } from "@/types/product";
import { FileText, Box, Clock, Shield, Sparkles } from "lucide-react";

interface ProductSpecificationsProps {
  specifications: ProductSpecification;
  leadTime?: string;
}

export function ProductSpecifications({
  specifications,
  leadTime,
}: ProductSpecificationsProps) {
  const [activeTab, setActiveTab] = useState<"specs" | "branding" | "shipping">("specs");

  if (!specifications) return null;

  const materialsDisplay =
    specifications.materials?.join(", ") || specifications.material || "Premium Grade";

  const turnaroundDisplay =
    specifications.turnaroundTime || leadTime || `${specifications.productionTimeDays || 7} business days`;

  const complianceList = specifications.compliance || ["BPA Free", "RoHS Compliant", "FDA Approved"];

  return (
    <div data-testid="product-specifications" className="w-full bg-card rounded-2xl border border-border/60 p-6 shadow-xs">
      {/* Tabs Header */}
      <div className="flex items-center gap-2 border-b border-border/60 pb-3 mb-6 overflow-x-auto">
        <button
          type="button"
          onClick={() => setActiveTab("specs")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "specs"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          <FileText className="h-4 w-4" />
          Technical Specifications
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("branding")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "branding"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          <Sparkles className="h-4 w-4 text-accent" />
          Branding & Imprint Details
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors cursor-pointer ${
            activeTab === "shipping"
              ? "bg-primary text-primary-foreground shadow-xs"
              : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
          }`}
        >
          <Box className="h-4 w-4" />
          Packaging & Logistics
        </button>
      </div>

      {/* Tab 1: Technical Specifications */}
      {activeTab === "specs" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
          <div className="flex flex-col py-2 border-b border-border/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Materials & Construction
            </span>
            <span className="text-foreground font-medium mt-1">{materialsDisplay}</span>
          </div>

          {specifications.dimensions && (
            <div className="flex flex-col py-2 border-b border-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Dimensions
              </span>
              <span className="text-foreground font-medium mt-1">{specifications.dimensions}</span>
            </div>
          )}

          {specifications.weight && (
            <div className="flex flex-col py-2 border-b border-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Item Weight
              </span>
              <span className="text-foreground font-medium mt-1">{specifications.weight}</span>
            </div>
          )}

          <div className="flex flex-col py-2 border-b border-border/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Standard Production Lead Time
            </span>
            <span className="text-foreground font-medium mt-1 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-accent" />
              {turnaroundDisplay}
            </span>
          </div>

          {specifications.countryOfOrigin && (
            <div className="flex flex-col py-2 border-b border-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Origin & Assembly
              </span>
              <span className="text-foreground font-medium mt-1">{specifications.countryOfOrigin}</span>
            </div>
          )}

          {/* Custom key-value pairs */}
          {specifications.customKeyValues &&
            Object.entries(specifications.customKeyValues).map(([key, val]) => (
              <div key={key} className="flex flex-col py-2 border-b border-border/40">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {key}
                </span>
                <span className="text-foreground font-medium mt-1">{val}</span>
              </div>
            ))}
        </div>
      )}

      {/* Tab 2: Branding & Imprint */}
      {activeTab === "branding" && (
        <div className="flex flex-col gap-4 text-sm">
          <div className="p-4 rounded-xl bg-secondary/40 border border-border/50">
            <h4 className="font-semibold text-primary mb-2">Accepted Artwork Formats</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We accept vector formats: <strong>.AI, .EPS, .SVG, .PDF</strong> (all fonts converted to outlines / curves).
              Complimentary digital proofs with exact Pantone matching provided within 24 hours of enquiry.
            </p>
          </div>

          {specifications.imprintArea && (
            <div className="py-2 border-b border-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Maximum Imprint Area
              </span>
              <span className="text-foreground font-medium">{specifications.imprintArea}</span>
            </div>
          )}

          {specifications.brandingMethods && specifications.brandingMethods.length > 0 && (
            <div className="py-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
                Supported Branding Techniques
              </span>
              <div className="flex flex-wrap gap-2">
                {specifications.brandingMethods.map((method, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-xs font-medium border border-border/60"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Packaging & Logistics */}
      {activeTab === "shipping" && (
        <div className="flex flex-col gap-4 text-sm">
          {specifications.packaging && (
            <div className="py-2 border-b border-border/40">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
                Standard Presentation Packaging
              </span>
              <span className="text-foreground font-medium">{specifications.packaging}</span>
            </div>
          )}

          <div className="py-2 border-b border-border/40">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-1">
              Multi-Address Split Drop Shipping
            </span>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We provide individual direct-to-door delivery worldwide for remote teams, client gifts, and conference attendees. Simply upload an Excel/CSV recipient roster.
            </p>
          </div>

          <div className="py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground block mb-2">
              Regulatory Compliance & Certifications
            </span>
            <div className="flex flex-wrap gap-2">
              {complianceList.map((comp, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 text-xs font-medium border border-emerald-200 dark:border-emerald-800"
                >
                  <Shield className="h-3 w-3" />
                  {comp}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductSpecifications;
