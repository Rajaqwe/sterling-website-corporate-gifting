"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Building2, Gift, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { createQuote } from "@/app/actions/quotes";
import { useState } from "react";
import { RecipientCsvUploader } from "@/components/forms/RecipientCsvUploader";

export default function RequestQuotePage() {
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    
    // Add quantity mapping which is required by createQuote
    const quantity = formData.get('numberOfRecipients') || '1';
    formData.append('quantity', quantity as string);
    
    const result = await createQuote(formData);
    
    if (result.success) {
      setState({ success: true, message: "Quote request submitted successfully!" });
    } else {
      setState({ success: false, message: result.error || "An error occurred. Please try again." });
    }
    setIsPending(false);
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      <section className="relative bg-primary text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Request a Quote
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us about your gifting needs and our team will craft a personalized proposal within 24 hours.
          </p>
        </div>
      </section>

      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl -mt-12 relative z-10">
        <Card className="shadow-xl border-0 overflow-hidden">
          <CardContent className="p-8 md:p-10">
            {state?.success ? (
              <div className="text-center py-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mb-6">
                  <CheckCircle className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-primary mb-2">Quote Request Received</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                  {state.message} Our gifting specialists will review your requirements and respond within 24 business hours.
                </p>
                <Button onClick={() => window.location.href = "/"} variant="outline">
                  Return to Home
                </Button>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-6">
                
                {state && !state.success && (
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-red-50 text-red-800 border border-red-200 text-sm mb-6">
                    <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <p>{state.message}</p>
                  </div>
                )}

                <div className="space-y-12">
                  {/* Step 1: Contact Information */}
                  <div className="animate-in fade-in">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                      <Building2 className="h-5 w-5 text-accent" />
                      <h2 className="text-xl font-serif font-semibold text-primary">Contact Details</h2>
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input id="fullName" name="fullName" placeholder="e.g. Sarah Jenkins" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input id="companyName" name="companyName" placeholder="e.g. Acme Corp" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="workEmail">Work Email *</Label>
                      <Input id="workEmail" name="workEmail" type="email" placeholder="sarah@acme.com" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+1 555 123 4567" required className="h-11" />
                    </div>
                  </div>
                </div>

                  {/* Step 2: Gift Requirements */}
                  <div className="animate-in fade-in">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                      <Gift className="h-5 w-5 text-accent" />
                      <h2 className="text-xl font-serif font-semibold text-primary">Gift Requirements</h2>
                    </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="numberOfRecipients">Number of Recipients *</Label>
                      <Input id="numberOfRecipients" name="numberOfRecipients" type="number" placeholder="50" min="1" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budgetPerRecipient">Budget Per Recipient (&#8377;)</Label>
                      <Input id="budgetPerRecipient" name="budgetPerRecipient" type="number" placeholder="2,000" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="eventType">Event / Occasion</Label>
                      <Input id="eventType" name="eventType" placeholder="e.g. Diwali, Onboarding" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="requiredDeliveryDate">Required Delivery Date</Label>
                      <Input id="requiredDeliveryDate" name="requiredDeliveryDate" type="date" className="h-11" />
                    </div>
                  </div>
                </div>

                  {/* Step 3: Shipping & Submit */}
                  <div className="animate-in fade-in">
                    <div className="flex items-center gap-2 mb-6 pb-2 border-b border-border/40">
                      <MapPin className="h-5 w-5 text-accent" />
                      <h2 className="text-xl font-serif font-semibold text-primary">Shipping & Notes</h2>
                    </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="deliveryLocation">Primary Delivery Location (If bulk shipping)</Label>
                      <Input id="deliveryLocation" name="deliveryLocation" placeholder="Mumbai, Delhi, Bangalore..." className="h-11" />
                    </div>
                    
                    <div className="space-y-3">
                      <Label>Or Ship Direct to Recipients</Label>
                      <RecipientCsvUploader />
                    </div>

                    <div className="space-y-2 mt-4">
                      <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                      <Textarea
                        id="additionalRequirements"
                        name="additionalRequirements"
                        placeholder="Tell us about any specific products, custom branding, packaging preferences..."
                        rows={3}
                        className="resize-none"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-3 p-4 bg-secondary/30 rounded-lg border border-border/50">
                      <input type="checkbox" id="brandingRequired" name="brandingRequired" className="h-4 w-4 rounded border-gray-300 text-accent focus:ring-accent" />
                      <Label htmlFor="brandingRequired" className="text-sm font-medium cursor-pointer">
                        I need custom branding / logo placement on the gifts
                      </Label>
                    </div>
                  </div>
                </div>

                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 mt-8 border-t border-border/40">
                  <Button type="submit" disabled={isPending} className="gap-2 bg-accent text-primary hover:bg-gold-hover font-bold px-8 py-6 text-lg w-full md:w-auto">
                    {isPending ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/50 border-t-primary" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" /> Submit Request
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
