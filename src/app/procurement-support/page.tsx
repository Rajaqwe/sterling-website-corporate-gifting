import type { Metadata } from "next";
import { ProcurementSupport } from "@/components/procurement/ProcurementSupport";

export const metadata: Metadata = {
  title: "Procurement Support | Sterling Corporate Gifting",
  description: "Find Sterling guidance for company details, GST, approved quotes, purchase orders and invoice access.",
};

export default function ProcurementSupportPage() {
  return <main className="min-h-screen bg-background pb-20 pt-24"><div className="border-b border-border/60 bg-secondary/15 py-16"><div className="container mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"><span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">For finance & procurement teams</span><h1 className="mt-4 max-w-3xl text-4xl font-serif font-bold tracking-tight text-primary sm:text-5xl">Clear steps from company details to corporate order.</h1><p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">Use your company profile for business details, review quotes in your account, carry your purchase-order reference into checkout, and access the invoice from the resulting order record.</p></div></div><ProcurementSupport /></main>;
}
