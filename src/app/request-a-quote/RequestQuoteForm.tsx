"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import { createQuote } from "@/app/actions/quotes";
import { useEffect, useRef, useState } from "react";
import { RecipientCsvUploader } from "@/components/forms/RecipientCsvUploader";
import { MarketingHero } from "@/components/marketing/MarketingHero";

export function RequestQuoteForm() {
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showShipping, setShowShipping] = useState(false);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\+?[0-9\s\-\(\)]{10,}$/.test(phone.trim());
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (!value) return;

    if (name === "workEmail" && !validateEmail(value)) {
      setErrors(prev => ({ ...prev, workEmail: "Please enter a valid email address." }));
    } else if (name === "phone" && !validatePhone(value)) {
      setErrors(prev => ({ ...prev, phone: "Please enter a valid phone number." }));
    } else {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const savedDraft = window.localStorage.getItem("sterling-quote-preferences");
    if (!savedDraft || !formRef.current) return;

    try {
      const values = JSON.parse(savedDraft) as Record<string, string | boolean>;
      Object.entries(values).forEach(([name, value]) => {
        const element = formRef.current?.elements.namedItem(name) as HTMLInputElement | HTMLTextAreaElement | null;
        if (!element) return;
        if (element instanceof HTMLInputElement && element.type === "checkbox") element.checked = Boolean(value);
        else element.value = String(value);
      });
    } catch (e) {
      // Ignored
    }
  }, []);

  async function clientAction(formData: FormData) {
    setIsPending(true);

    // Save draft
    const values = Object.fromEntries(formData.entries());
    window.localStorage.setItem("sterling-quote-preferences", JSON.stringify({
      ...values,
      brandingRequired: formData.get("brandingRequired") === "on",
    }));

    try {
      const result = await createQuote(formData);
      setState({ success: result.success, message: result.error || "Quote requested successfully." });
      if (result.success) {
        window.localStorage.removeItem("sterling-quote-preferences");
        if (formRef.current) formRef.current.reset();
      }
    } finally {
      setIsPending(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  return (
    <div className="min-h-screen bg-muted/50 dark:bg-background">
      <MarketingHero
        title="Request a Quote"
        subtitle="Tell us about your gifting needs and our team will review the right next step with you."
      />

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16 lg:py-24 max-w-4xl -mt-12 relative z-20">
        <Card className="rounded-[24px] border-none shadow-2xl bg-white dark:bg-card overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-sp-purple via-sp-magenta to-sp-orange" />

          <CardContent className="p-8 md:p-12">
            {state?.success ? (
              <div className="text-center py-16">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-50 text-green-600 mb-8 shadow-sm">
                  <CheckCircle className="h-12 w-12" />
                </div>
                <h3 className="text-3xl font-heading font-bold text-sp-navy dark:text-white mb-4">Request Submitted Successfully</h3>
                <p className="text-muted-foreground max-w-md mx-auto text-lg mb-8">
                  {state.message}
                </p>
                <Button onClick={() => setState(null)} variant="outline" className="border-sp-purple text-sp-purple hover:bg-sp-purple hover:text-white rounded-full px-8 h-12">
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form ref={formRef} action={clientAction} className="space-y-12">

                {state && !state.success && (
                  <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-900/50 text-sm">
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                    <p>{state.message}</p>
                  </div>
                )}

                <div className="text-center mb-8">
                  <p className="text-sm text-muted-foreground">Your gifting preferences are saved on this device automatically.</p>
                </div>

                {/* Section 1: Contact Details */}
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-bold text-sp-navy dark:text-white border-b border-border pb-2 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sp-purple/10 text-sp-purple text-sm">1</span>
                    Contact Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" name="fullName" placeholder="e.g. Asha Mehta" required className="h-12 focus-visible:ring-sp-purple bg-muted/50 dark:bg-slate-900/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input id="companyName" name="companyName" placeholder="e.g. Acme Pvt Ltd" required className="h-12 focus-visible:ring-sp-purple bg-muted/50 dark:bg-slate-900/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email *</Label>
                      <Input id="workEmail" name="workEmail" type="email" placeholder="asha@company.com" required onBlur={handleBlur} className={`h-12 focus-visible:ring-sp-purple bg-muted/50 dark:bg-slate-900/50 ${errors.workEmail ? "border-red-500" : ""}`} />
                      {errors.workEmail && <span className="text-xs text-red-500 font-medium">{errors.workEmail}</span>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required onBlur={handleBlur} className={`h-12 focus-visible:ring-sp-purple bg-muted/50 dark:bg-slate-900/50 ${errors.phone ? "border-red-500" : ""}`} />
                      {errors.phone && <span className="text-xs text-red-500 font-medium">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                {/* Section 2: Requirements */}
                <div className="space-y-6">
                  <h3 className="text-xl font-heading font-bold text-sp-navy dark:text-white border-b border-border pb-2 flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sp-magenta/10 text-sp-magenta text-sm">2</span>
                    Gift Requirements
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="numberOfRecipients">Number of Recipients *</Label>
                      <Input id="numberOfRecipients" name="numberOfRecipients" type="number" placeholder="50" min="1" required className="h-12 focus-visible:ring-sp-magenta bg-muted/50 dark:bg-slate-900/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetPerRecipient">Budget Per Recipient (&#8377;)</Label>
                      <Input id="budgetPerRecipient" name="budgetPerRecipient" type="number" placeholder="2,000" className="h-12 focus-visible:ring-sp-magenta bg-muted/50 dark:bg-slate-900/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event / Occasion</Label>
                      <Input id="eventType" name="eventType" placeholder="e.g. Diwali, Onboarding" className="h-12 focus-visible:ring-sp-magenta bg-muted/50 dark:bg-slate-900/50" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requiredDeliveryDate">Required Delivery Date</Label>
                      <Input id="requiredDeliveryDate" name="requiredDeliveryDate" type="date" className="h-12 focus-visible:ring-sp-magenta bg-muted/50 dark:bg-slate-900/50" />
                    </div>
                  </div>

                  {/* Checkbox to reveal Section 3 */}
                  <label className="flex items-start gap-4 mt-4 p-5 bg-gradient-to-r from-sp-orange/5 to-sp-magenta/5 border border-sp-orange/20 rounded-xl cursor-pointer hover:border-sp-orange/40 transition-colors group" onClick={() => setShowShipping(v => !v)}>
                    <span className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-all duration-300 ${showShipping ? 'bg-sp-orange border-sp-orange text-white' : 'border-border bg-background'}`}>
                      {showShipping && <svg className="w-3.5 h-3.5" viewBox="0 0 12 10" fill="none"><path d="M1 5L4.5 8.5L11 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-sp-navy dark:text-white">I have specific shipping or delivery requirements</div>
                      <div className="text-xs text-muted-foreground mt-1">Delivery location, direct-to-recipient shipping, additional notes, or custom branding.</div>
                    </div>
                  </label>
                </div>

                {/* Section 3: Shipping Details - shown when checkbox is ticked */}
                <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${showShipping ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                  <div className="overflow-hidden">
                    <div className="space-y-6 pt-2">
                      <h3 className="text-xl font-heading font-bold text-sp-navy dark:text-white border-b border-border pb-2 flex items-center gap-3">
                        <span className="flex items-center justify-center w-8 h-8 rounded-full bg-sp-orange/10 text-sp-orange text-sm">3</span>
                        Shipping & Additional Details
                      </h3>
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="deliveryLocation">Primary Delivery Location (If bulk shipping)</Label>
                          <Input id="deliveryLocation" name="deliveryLocation" placeholder="Mumbai, Delhi, Bangalore..." className="h-12 focus-visible:ring-sp-orange bg-muted/50 dark:bg-slate-900/50" />
                        </div>

                        <div className="space-y-3 p-6 rounded-xl border border-border bg-muted/50/50 dark:bg-card">
                          <Label className="text-base text-sp-navy dark:text-white">Or Ship Direct to Recipients</Label>
                          <RecipientCsvUploader />
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                          <Textarea
                            id="additionalRequirements"
                            name="additionalRequirements"
                            placeholder="Tell us about any specific products, custom branding, packaging preferences..."
                            rows={4}
                            className="resize-none focus-visible:ring-sp-orange bg-muted/50 dark:bg-slate-900/50"
                          />
                        </div>

                        <label className="flex items-start space-x-3 p-5 bg-gradient-to-r from-sp-purple/5 to-sp-magenta/5 border border-sp-purple/20 rounded-xl cursor-pointer hover:border-sp-purple/40 transition-colors">
                          <input type="checkbox" id="brandingRequired" name="brandingRequired" className="mt-1 h-5 w-5 rounded border-sp-purple text-sp-purple focus:ring-sp-purple bg-white dark:bg-background" />
                          <div>
                            <div className="text-sm font-semibold text-sp-navy dark:text-white">I need custom branding</div>
                            <div className="text-xs text-muted-foreground mt-1">Logo placement, custom packaging, inserts, or personalized messages on the gifts.</div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-8 border-t border-border/40 text-center">
                  <Button type="submit" disabled={isPending || Object.values(errors).some(e => e !== "")} className="w-full sm:w-auto min-w-64 h-14 rounded-full bg-gradient-to-r from-sp-purple via-sp-magenta to-sp-orange text-white hover:opacity-90 font-bold text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 gap-2">
                    {isPending ? (
                      <>
                        <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/50 border-t-white" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Request Quote
                      </>
                    )}
                  </Button>
                </div>

              </form>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
