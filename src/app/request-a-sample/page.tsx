import type { Metadata } from "next";
import { prisma } from "@/lib/prisma/client";
import { SampleRequestForm } from "./SampleRequestForm";

export const metadata: Metadata = { title: "Request a Sample | Sterling Corporate Gifting", description: "Request a product sample from Sterling before committing to a corporate gifting order." };

export default async function RequestSamplePage({ searchParams }: { searchParams: Promise<{ product?: string }> }) {
  const params = await searchParams;
  const slug = typeof params.product === "string" ? params.product : "";
  let productId = ""; let productName = "";
  if (slug) { try { const product = await prisma.product.findUnique({ where: { slug }, select: { id: true, name: true, status: true } }); if (product?.status === "ACTIVE") { productId = product.id; productName = product.name; } } catch {} }
  return <main className="min-h-screen bg-muted/50 pb-20 pt-24 dark:bg-background"><div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8"><div className="mx-auto mb-8 max-w-2xl text-center"><span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">Sample-first buying</span><h1 className="mt-3 text-4xl font-serif font-bold tracking-tight text-primary sm:text-5xl">See it before the bulk order.</h1><p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">Request a sample for your team to evaluate the product, finish and fit before moving ahead with a larger corporate order.</p></div><SampleRequestForm productId={productId} productName={productName} /></div></main>;
}
