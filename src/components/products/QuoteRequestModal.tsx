"use client";

import React, { useState } from "react";
import { Product, QuoteCalculation, ProductConfiguration } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  CheckCircle2,
  Building,
  Mail,
  User,
  Phone,
  Calendar,
  UploadCloud,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { submitQuoteRequest } from "@/app/products/actions";
import { toast } from "sonner";
import { formatINR } from "@/lib/currency";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createClient } from "@/lib/supabase/client";

const quoteFormSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  companyName: z.string().min(2, "Company name is required"),
  phone: z.string().optional(),
  deliveryDate: z.string().optional(),
  isMultiAddress: z.boolean(),
  notes: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteFormSchema>;

interface QuoteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  configuration: ProductConfiguration;
  quoteCalculation: QuoteCalculation;
}

export function QuoteRequestModal({
  isOpen,
  onClose,
  product,
  configuration,
  quoteCalculation,
}: QuoteRequestModalProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const supabase = createClient();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const uniqueFileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `quote-artworks/${uniqueFileName}`;

      const { data, error } = await supabase.storage
        .from('artworks')
        .upload(filePath, file);

      if (error) {
        toast.error("Failed to upload artwork: " + error.message);
        console.error(error);
        return;
      }

      const { data: urlData } = supabase.storage
        .from('artworks')
        .getPublicUrl(filePath);

      setFileUrl(urlData.publicUrl);
      setFileName(file.name);
      toast.success("Artwork uploaded successfully");
    } catch (err) {
      toast.error("An error occurred during upload");
    } finally {
      setIsUploading(false);
    }
  };

  const { register, handleSubmit, watch, formState: { errors }, reset, getValues } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      companyName: "",
      phone: "",
      deliveryDate: "",
      isMultiAddress: false,
      notes: "",
    }
  });

  const title = product.title || product.name || "Corporate Gift";
  const selectedVariant = product.variants?.find((v: any) => v.id === configuration.variantId);
  const selectedCustomizations = (product.brandingOptions || []).filter((c: any) => 
    configuration.customizations.some(config => config.customizationId === c.id)
  );

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    try {
      const res = await submitQuoteRequest({
        productId: product.id,
        quantity: configuration.quantity,
        fullName: data.fullName,
        workEmail: data.email,
        companyName: data.companyName,
        phone: data.phone || "",
        requiredDeliveryDate: data.deliveryDate,
        notes: data.notes,
        customizationIds: configuration.customizations.map(c => c.customizationId),
        fileUrl: fileUrl || undefined,
        fileName: fileName || undefined,
      });

      if (res.success && res.quoteNumber) {
        setQuoteReference(res.quoteNumber);
        setIsSubmitted(true);
      } else {
        toast.error(res.error || "Failed to submit quote request");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetModal = () => {
    setIsSubmitted(false);
    onClose();
    reset();
  };

  const handleClose = () => {
    onClose();
    if (fileName && !isSubmitted) {
      toast.success("Draft saved", { 
        description: "Your artwork upload and quote details are retained for this session." 
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) handleClose(); }}>
      <DialogContent
        showCloseButton
        aria-label="Request a custom quote"
        className="max-w-xl p-6 max-h-[90vh] overflow-y-auto"
      >
        {!isSubmitted ? (
          <form onSubmit={handleSubmit(onSubmit)} data-testid="submit-quote-form" className="flex flex-col gap-4">
            <input type="hidden" data-testid="quantity-input" name="quantity" value={configuration.quantity} readOnly />
            <div className="mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Direct Corporate Quotation
              </span>
              <h3 className="text-2xl font-serif font-bold text-primary mt-0.5">
                Request a Custom Quote
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Receive formal PDF quotation, invoice breakdown, and digital artwork proofs within 4 business hours.
              </p>
            </div>

            {quoteCalculation?.isBelowMoq && (
              <div data-testid="moq-warning" className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 text-xs flex items-center gap-2">
                <span>Order quantity ({configuration.quantity}) is below minimum order requirement ({product.moq || 25} units).</span>
              </div>
            )}

            {/* Selected Gift Summary Pill */}
            <div className="p-3 rounded-xl bg-secondary/60 border border-border/70 text-xs flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <span className="font-semibold text-primary block line-clamp-1">{title}</span>
                  <span className="text-muted-foreground text-[11px]">
                    Qty: {configuration.quantity} units {selectedVariant ? `• Finish: ${selectedVariant.name}` : ""}
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span data-testid="estimated-total" className="font-bold text-primary text-sm">
                    {formatINR(quoteCalculation.estimatedTotal)}
                  </span>
                  <span data-testid="active-unit-price" className="text-[10px] text-muted-foreground block">
                    ({formatINR(quoteCalculation.effectiveUnitCost)} / unit)
                  </span>
                </div>
              </div>

              {selectedCustomizations.length > 0 && (
                <div className="flex flex-wrap gap-1 pt-1 border-t border-border/40">
                  <span className="text-[11px] text-muted-foreground">Branding:</span>
                  {selectedCustomizations.map((c: any) => (
                    <span key={c.id} className="text-[11px] bg-background px-1.5 py-0.5 rounded border border-border/40 font-medium">
                      {c.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="font-semibold text-foreground block mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    required
                    type="text"
                    placeholder="Sarah Jenkins"
                    {...register("fullName")}
                    className={`pl-8 h-9 text-xs ${errors.fullName ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.fullName && <span className="text-[10px] text-destructive mt-1 block">{errors.fullName.message}</span>}
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">
                  Work Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    required
                    type="email"
                    placeholder="sarah@acme-corp.com"
                    {...register("email")}
                    className={`pl-8 h-9 text-xs ${errors.email ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.email && <span className="text-[10px] text-destructive mt-1 block">{errors.email.message}</span>}
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">
                  Company / Organization *
                </label>
                <div className="relative">
                  <Building className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    required
                    type="text"
                    placeholder="Acme Enterprises"
                    {...register("companyName")}
                    className={`pl-8 h-9 text-xs ${errors.companyName ? "border-destructive" : ""}`}
                  />
                </div>
                {errors.companyName && <span className="text-[10px] text-destructive mt-1 block">{errors.companyName.message}</span>}
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="tel"
                    placeholder="+1 (555) 019-2834"
                    {...register("phone")}
                    className={`pl-8 h-9 text-xs ${errors.phone ? "border-destructive" : ""}`}
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-foreground block mb-1">
                  Target In-Hands Date
                </label>
                <div className="relative">
                  <Calendar className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                  <Input
                    type="date"
                    {...register("deliveryDate")}
                    className="pl-8 h-9 text-xs"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-5 sm:col-span-2">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="multi-address"
                    {...register("isMultiAddress")}
                    className="rounded border-border h-4 w-4 text-primary focus:ring-accent"
                  />
                  <label htmlFor="multi-address" className="text-xs text-foreground cursor-pointer">
                    Requires multi-address drop shipping
                  </label>
                </div>
                {watch("isMultiAddress") && (
                  <div className="pl-6 animate-in slide-in-from-top-2">
                    <div className="border border-dashed border-border/80 rounded-lg p-3 bg-secondary/20 flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-[11px] font-semibold text-foreground">Recipient Addresses</span>
                        <span className="text-[10px] text-muted-foreground">Upload CSV template</span>
                      </div>
                      <Button type="button" variant="outline" size="sm" className="h-7 text-[10px]">
                        <UploadCloud className="mr-1 h-3 w-3" /> Upload CSV
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Artwork Dropzone Mock */}
            <div>
              <label className="font-semibold text-foreground block mb-1 text-xs">
                Upload Logo / Artwork (Vector AI, EPS, SVG, PDF)
              </label>
              <label
                className="border-2 border-dashed border-border/80 hover:border-accent rounded-xl p-3 text-center cursor-pointer transition-colors bg-secondary/30 text-xs block"
              >
                <input 
                  type="file" 
                  className="hidden" 
                  accept=".ai,.eps,.svg,.pdf,.png,.jpg,.jpeg" 
                  onChange={handleFileUpload} 
                  disabled={isUploading}
                />
                <UploadCloud className="h-5 w-5 mx-auto mb-1 text-accent" />
                {isUploading ? (
                  <span className="text-muted-foreground animate-pulse">Uploading...</span>
                ) : fileName ? (
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    Uploaded: {fileName}
                  </span>
                ) : (
                  <span className="text-muted-foreground">
                    Drag & drop artwork file here or click to browse
                  </span>
                )}
              </label>
            </div>

            {/* Additional Notes */}
            <div>
              <label className="font-semibold text-foreground block mb-1 text-xs">
                Special Requests & Artwork Instructions
              </label>
              <textarea
                rows={2}
                placeholder="e.g., We need Pantone 281C logo color matching and 25 individual recipient note cards."
                {...register("notes")}
                className="w-full rounded-lg border border-input bg-transparent px-3 py-2 text-xs focus:ring-1 focus:ring-accent focus:outline-none"
              />
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-border/60">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                data-testid="request-quote-button"
                className="bg-accent text-primary hover:bg-accent/90 px-6 font-semibold"
              >
                {isSubmitting ? "Submitting..." : "Submit Quotation Request"}
              </Button>
            </div>
          </form>
        ) : (
          /* Success Confirmation */
          <div data-testid="quote-success-view" className="flex flex-col items-center justify-center text-center p-6 gap-4">
            <div className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <div>
              <h3 className="text-2xl font-serif font-bold text-primary mb-1">
                Quote Request Received
              </h3>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto leading-relaxed">
                Thank you, <strong>{getValues("fullName") || "Corporate Buyer"}</strong>. Your enquiry for{" "}
                <strong>{configuration.quantity} units</strong> of {title} has been routed to your dedicated Sterling account manager.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-secondary/60 border border-border/70 w-full max-w-xs text-xs">
              <span className="text-muted-foreground block text-[11px]">Quote Reference Number</span>
              <span className="font-mono font-bold text-primary text-base">{quoteReference}</span>
            </div>

            <Button
              onClick={handleResetModal}
              className="bg-primary text-primary-foreground hover:bg-primary/90 px-8"
            >
              Return to Product
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default QuoteRequestModal;
