"use client";

import { useFormState, useFormStatus } from "react-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Building2, Users, MapPin, CheckCircle, AlertCircle } from "lucide-react";
import { submitQuoteForm, type FormState } from "@/app/actions/forms";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} size="lg" className="w-full h-12 text-base font-semibold gap-2">
      {pending ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Submitting...
        </>
      ) : (
        <>
          <Send className="h-4 w-4" />
          Submit Quote Request
        </>
      )}
    </Button>
  );
}

export default function RequestQuotePage() {
  const [state, formAction] = useFormState<FormState, FormData>(submitQuoteForm, null);

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <section className="relative bg-primary text-white py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Get Started
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Request a Corporate Quote
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Tell us about your gifting needs and our team will craft a personalized proposal within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-3xl -mt-8 relative z-10">
        <Card className="shadow-lg border-0">
          <CardContent className="p-8 md:p-10">

            {/* Success/Error Banner */}
            {state && (
              <div
                className={`flex items-start gap-3 p-4 rounded-lg mb-8 ${
                  state.success
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {state.success ? (
                  <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                )}
                <p className="text-sm">{state.message}</p>
              </div>
            )}

            <form action={formAction} className="space-y-8">
              {/* Contact Information */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-primary">Contact Information</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input id="fullName" name="fullName" placeholder="John Doe" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company Name *</Label>
                    <Input id="companyName" name="companyName" placeholder="Acme Corporation" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workEmail">Work Email *</Label>
                    <Input id="workEmail" name="workEmail" type="email" placeholder="john@acme.com" required className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" required className="h-11" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Gift Requirements */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-primary">Gift Requirements</h2>
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
                    <Input id="eventType" name="eventType" placeholder="e.g. Diwali, Onboarding, Annual Day" className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="requiredDeliveryDate">Required Delivery Date</Label>
                    <Input id="requiredDeliveryDate" name="requiredDeliveryDate" type="date" min="2024-01-01" max="2030-12-31" className="h-11" />
                  </div>
                </div>
              </div>

              <div className="h-px bg-border" />

              {/* Delivery & Notes */}
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h2 className="text-lg font-semibold text-primary">Delivery &amp; Additional Notes</h2>
                </div>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryLocation">Delivery Location</Label>
                    <Input id="deliveryLocation" name="deliveryLocation" placeholder="Mumbai, Delhi, Bangalore..." className="h-11" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="additionalRequirements">Additional Requirements</Label>
                    <Textarea
                      id="additionalRequirements"
                      name="additionalRequirements"
                      placeholder="Tell us about any specific products, custom branding, packaging preferences, or other details..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="brandingRequired" name="brandingRequired" className="rounded border-gray-300" />
                    <Label htmlFor="brandingRequired" className="text-sm font-normal cursor-pointer">
                      I need custom branding / logo placement on the gifts
                    </Label>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <SubmitButton />

              <p className="text-xs text-center text-muted-foreground">
                Our gifting specialists will review your requirements and respond within 24 business hours.
              </p>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
