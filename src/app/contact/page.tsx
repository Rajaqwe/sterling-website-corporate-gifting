"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, AlertCircle } from "lucide-react";
import { createQuote } from "@/app/actions/quotes";
import { useState } from "react";

function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <Button type="submit" disabled={pending} className="w-full sm:w-auto h-12 px-8 text-base font-semibold">
      {pending ? (
        <>
          <span className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
          Sending...
        </>
      ) : (
        <>
          <Send className="mr-2 h-4 w-4" />
          Send Message
        </>
      )}
    </Button>
  );
}

export default function ContactPage() {
  const [state, setState] = useState<{ success: boolean; message: string } | null>(null);
  const [isPending, setIsPending] = useState(false);

  async function handleSubmit(formData: FormData) {
    setIsPending(true);
    
    // Map contact form to quote request shape
    const fullName = `${formData.get('firstName')} ${formData.get('lastName') || ''}`.trim();
    
    const mappedData = new FormData();
    mappedData.append('fullName', fullName);
    mappedData.append('workEmail', formData.get('email') as string);
    mappedData.append('phone', formData.get('phone') as string || '0000000000');
    mappedData.append('companyName', formData.get('company') as string || 'N/A');
    mappedData.append('additionalRequirements', formData.get('message') as string);
    mappedData.append('numberOfRecipients', '1');
    mappedData.append('quantity', '1');

    const result = await createQuote(mappedData);
    
    if (result.success) {
      setState({ success: true, message: "Thank you for reaching out! We will get back to you shortly." });
    } else {
      setState({ success: false, message: result.error || "An error occurred. Please try again." });
    }
    setIsPending(false);
  }

  return (
    <div className="min-h-screen bg-secondary/20">
      {/* Header */}
      <section className="relative bg-primary text-white py-20 md:py-15	  overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/80" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="inline-block mb-4 text-sm font-medium tracking-widest text-accent uppercase">
            Get In Touch
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 tracking-tight">
            Contact Us
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto leading-relaxed">
            Have questions about our corporate gifting solutions? Our dedicated team is ready to assist you with customized proposals, bulk orders, and general inquiries.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 max-w-6xl -mt-8 relative z-10">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-sm border-0 bg-background">
              <CardContent className="p-6 md:p-8 space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-primary mb-6">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-1">Office Location</h3>
                        <p className="text-muted-foreground text-sm">Sterling Corporate Gifting</p>
                        <p className="text-muted-foreground text-sm">India</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <Mail className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-1">Email Us</h3>
                        <a href="mailto:hello@sterlinggifts.com" className="text-accent hover:underline text-sm block mb-1">
                          hello@sterlinggifts.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <Phone className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-1">Call Us</h3>
                        <a href="tel:+9118001234567" className="text-muted-foreground hover:text-primary text-sm block mb-1">
                          +91 1800 123 4567
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="bg-primary/10 p-3 rounded-full mr-4 text-primary shrink-0">
                        <Clock className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-primary mb-1">Business Hours</h3>
                        <p className="text-muted-foreground text-sm">Monday-Saturday</p>
                        <p className="text-muted-foreground text-sm">9:00 AM-6:00 PM IST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-0 bg-background">
              <CardContent className="p-6 md:p-10">
                <h2 className="text-2xl font-bold text-primary mb-6">Send us a Message</h2>

                {/* Success/Error Banner */}
                {state && (
                  <div
                    className={`flex items-start gap-3 p-4 rounded-lg mb-6 ${
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

                <form action={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" name="firstName" placeholder="Enter your first name" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" name="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Work Email *</Label>
                      <Input id="email" name="email" type="email" placeholder="example@gmail.com" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="company">Company Name</Label>
                    <Input id="company" name="company" placeholder="Your organization name" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">How can we help? *</Label>
                    <Textarea 
                      id="message"
                      name="message" 
                      placeholder="Tell us about your gifting requirements, budget, or any specific products you are looking for..." 
                      className="min-h-[150px]"
                      required
                    />
                  </div>

                  <SubmitButton pending={isPending} />
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
