"use client";
import { useState } from "react";
import { CalendarDays, CheckCircle2, MapPin, PackageCheck, Send } from "lucide-react";
import { createSampleRequest } from "@/app/request-a-sample/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function SampleRequestForm({ productId = "", productName = "" }: { productId?: string; productName?: string }) {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; referenceNumber?: string; productName?: string | null; error?: string } | null>(null);
  async function submit(formData: FormData) { setPending(true); setResult(null); const response = await createSampleRequest(formData); setResult(response); setPending(false); }
  if (result?.success) return (
    <Card className="rounded-[24px] border-border/60 bg-card shadow-xl"><CardContent className="px-6 py-12 text-center sm:px-12">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"><CheckCircle2 className="h-8 w-8" /></div>
      <h2 className="mt-6 text-3xl font-serif font-bold text-primary">Sample request received.</h2>
      <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">Reference <strong className="text-foreground">{result.referenceNumber}</strong> has been created. Sterling will confirm sample availability, timing, delivery details and any applicable sample charges with you.</p>
      {result.productName && <p className="mt-3 text-sm font-semibold text-foreground">{result.productName}</p>}
      <Button onClick={() => setResult(null)} variant="outline" className="mt-7 rounded-full px-7">Submit another request</Button>
    </CardContent></Card>
  );
  return (
    <Card className="overflow-hidden rounded-[24px] border-none bg-card shadow-2xl"><div className="h-2 bg-gradient-to-r from-sp-purple via-sp-magenta to-sp-orange" /><CardContent className="p-6 sm:p-10">
      {result?.error && <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">{result.error}</div>}
      <form action={submit} className="space-y-8"><input type="hidden" name="productId" value={productId} />
        <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">Before you commit to a bulk order</p><h2 className="mt-2 text-2xl font-serif font-bold text-primary">Request a sample.</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">Share the product and requirement. We&apos;ll review the request and confirm the practical next step with your team.</p></div>
        {productName && <div className="flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/35 p-4"><PackageCheck className="h-5 w-5 shrink-0 text-accent" /><div><p className="text-xs text-muted-foreground">Selected product</p><p className="text-sm font-semibold text-foreground">{productName}</p></div></div>}
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Full Name *" name="fullName" placeholder="Asha Mehta" />
          <Field label="Company Name *" name="companyName" placeholder="Acme Pvt Ltd" />
          <Field label="Work Email *" name="workEmail" type="email" placeholder="asha@company.com" />
          <Field label="Phone Number *" name="phone" type="tel" placeholder="+91 98765 43210" />
          <div className="sm:col-span-2"><label className="text-sm font-semibold text-foreground">Estimated bulk quantity *</label><Input name="estimatedQuantity" type="number" min="1" defaultValue="25" required className="mt-2 h-12 bg-background" /><p className="mt-1 text-xs text-muted-foreground">Helps the team assess the sample and production context.</p></div>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div><label className="text-sm font-semibold text-foreground">Sample type *</label><select name="sampleType" defaultValue="PHYSICAL_SAMPLE" className="mt-2 flex h-12 w-full rounded-md border border-input bg-background px-3 text-sm"><option value="PHYSICAL_SAMPLE">Physical sample</option><option value="BRANDED_SAMPLE">Branded sample / proof</option></select></div>
          <Field label="Required by" name="requiredBy" type="date" icon={<CalendarDays className="h-4 w-4" />} />
          <Field label="Delivery location" name="deliveryLocation" placeholder="Mumbai, Maharashtra" icon={<MapPin className="h-4 w-4" />} />
          <label className="flex items-center gap-3 rounded-xl border border-border/70 bg-secondary/25 px-4 py-3.5"><input type="checkbox" name="brandingRequired" className="h-4 w-4 rounded border-border" /><span><span className="block text-sm font-semibold text-foreground">I need custom branding</span><span className="block text-xs text-muted-foreground">Logo, packaging, inserts or personalization.</span></span></label>
        </div>
        <div><label className="text-sm font-semibold text-foreground">What should we know?</label><Textarea name="notes" rows={4} placeholder="Colour, finish, packaging, internal deadline, recipient profile, or anything else..." className="mt-2 resize-none bg-background" /></div>
        <div className="flex flex-col gap-4 border-t border-border/50 pt-6 sm:flex-row sm:items-center sm:justify-between"><p className="text-xs leading-relaxed text-muted-foreground">Sample availability, timing and any applicable charges are confirmed by Sterling after review.</p><Button disabled={pending} type="submit" className="h-12 rounded-full bg-gradient-to-r from-sp-purple via-sp-magenta to-sp-orange px-7 font-bold text-white shadow-lg">{pending ? "Submitting..." : <><Send className="mr-2 h-4 w-4" /> Request sample</>}</Button></div>
      </form>
    </CardContent></Card>
  );
}
function Field({ label, name, placeholder, type = "text", icon }: { label: string; name: string; placeholder?: string; type?: string; icon?: React.ReactNode }) { return <div><label htmlFor={name} className="text-sm font-semibold text-foreground">{label}</label><div className="relative mt-2">{icon && <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">{icon}</span>}<Input id={name} name={name} type={type} placeholder={placeholder} required className={icon ? "h-12 pl-9 bg-background" : "h-12 bg-background"} /></div></div>; }
