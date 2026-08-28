"use client";

import React, { useState } from "react";
import { Product, ProductVariant, CustomizationOption, QuoteCalculation } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AlertTriangle,
  Send,
  CheckCircle2,
  Building,
  Mail,
  User,
  Phone,
  Calendar,
  UploadCloud,
  X,
} from "lucide-react";
import { submitQuoteRequest } from "@/app/products/actions";
import { toast } from "sonner";
import { formatINR } from "@/lib/currency";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

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
  product: Product;
  quantity: number;
  onQuantityChange: (qty: number) => void;
  selectedVariant?: ProductVariant;
  selectedCustomizations: CustomizationOption[];
  quoteCalculation: QuoteCalculation;
}

export function QuoteRequestModal({
  product,
  quantity,
  onQuantityChange,
  selectedVariant,
  selectedCustomizations,
  quoteCalculation,
}: QuoteRequestModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [quoteReference, setQuoteReference] = useState("");
  const [mockFileName, setMockFileName] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, getValues } = useForm<QuoteFormValues>({
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
  const isBelowMoq = quantity < product.moq;

  const handleIncrement = () => {
    onQuantityChange(quantity + 5);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange(Math.max(1, quantity - 5));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    if (!isNaN(val)) {
      onQuantityChange(val);
    } else if (e.target.value === "") {
      onQuantityChange(0);
    }
  };

  const onSubmit = async (data: QuoteFormValues) => {
    setIsSubmitting(true);
    
    try {
      const res = await submitQuoteRequest({
        productId: product.id,
        quantity,
        fullName: data.fullName,
        workEmail: data.email,
        companyName: data.companyName,
        phone: data.phone || "",
        requiredDeliveryDate: data.deliveryDate,
        notes: data.notes,
        customizationIds: selectedCustomizations.map(c => c.id),
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
    setIsOpen(false);
    reset();
  };

  return (
    <div data-testid="quote-request-container" className="flex flex-col gap-5 p-6 rounded-2xl bg-card border border-border/80 shadow-md">
      {/* Price & MOQ Headline */}
      <div className="flex items-baseline justify-between gap-2 border-b border-border/60 pb-4">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-muted-foreground block">
            Bulk Unit Price
          </span>
          <div className="flex items-baseline gap-2">
            <span data-testid="active-unit-price" className="text-3xl font-serif font-bold text-primary">
              {formatINR(quoteCalculation.tierUnitPrice)}
            </span>
            <span className="text-sm text-muted-foreground">/ unit</span>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs text-muted-foreground block">Order Minimum</span>
          <span className="text-sm font-bold text-accent">
            MOQ: {product.moq} units
          </span>
        </div>
      </div>

      {/* Quantity Stepper & Slider */}
      <div className="flex flex-col gap-4">
        <label htmlFor="pdp-quantity-input" className="text-xs font-bold uppercase tracking-wider text-foreground">
          Order Quantity
        </label>
        
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-xl border border-border/80 bg-background overflow-hidden shadow-2xs">
              <button
                type="button"
                data-testid="qty-decrement"
                onClick={handleDecrement}
                aria-label="Decrease quantity"
                className="h-11 w-11 flex items-center justify-center text-lg font-bold hover:bg-secondary/80 text-foreground transition-colors disabled:opacity-40"
                disabled={quantity <= 1}
              >
                -
              </button>
              <input
                id="pdp-quantity-input"
                data-testid="quantity-input"
                type="number"
                min={1}
                value={quantity || ""}
                onChange={handleInputChange}
                aria-label="Order Quantity"
                className="h-11 w-20 text-center font-bold text-base bg-transparent border-x border-border/80 focus:outline-none focus:ring-1 focus:ring-accent text-foreground"
              />
              <button
                type="button"
                data-testid="qty-increment"
                onClick={handleIncrement}
                aria-label="Increase quantity"
                className="h-11 w-11 flex items-center justify-center text-lg font-bold hover:bg-secondary/80 text-foreground transition-colors"
              >
                +
              </button>
            </div>

            <div className="text-xs text-muted-foreground leading-tight">
              <span>
                {quoteCalculation.activeTier
                  ? quoteCalculation.activeTier.maxQuantity
                    ? `Active Tier: ${quoteCalculation.activeTier.minQuantity}-${quoteCalculation.activeTier.maxQuantity} pcs`
                    : `Active Tier: ${quoteCalculation.activeTier.minQuantity}+ pcs`
                  : ""}
              </span>
            </div>
          </div>
          
          <input 
            type="range" 
            min={1} 
            max={Math.max(product.moq * 10, 1000)} 
            step={Math.max(1, Math.floor(product.moq / 10))}
            value={quantity || 0}
            onChange={(e) => onQuantityChange(Number(e.target.value))}
            className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-accent outline-none"
          />
        </div>

        {/* Below MOQ Warning Notice */}
        {isBelowMoq && (
          <div
            data-testid="moq-warning"
            className="flex items-start gap-2.5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-900 dark:text-amber-300 text-xs mt-1"
          >
            <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Order is below MOQ ({product.moq} units).</strong> Sample or lower volume requests may require custom quote approval.
            </div>
          </div>
        )}
      </div>

      {/* Live Cost Breakdown Matrix */}
      <div className="flex flex-col gap-2 p-4 rounded-xl bg-secondary/40 border border-border/60 text-xs">
        <div className="flex justify-between items-center text-muted-foreground">
          <span>Base Product Subtotal ({quantity} × {formatINR(quoteCalculation.tierUnitPrice)})</span>
          <span className="font-semibold text-foreground">{formatINR(quoteCalculation.productSubtotal)}</span>
        </div>

        {quoteCalculation.customizationSetupTotal > 0 && (
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Branding Setup & Tooling Fee (One-Time)</span>
            <span className="font-semibold text-foreground">+{formatINR(quoteCalculation.customizationSetupTotal)}</span>
          </div>
        )}

        {quoteCalculation.customizationUnitTotal > 0 && (
          <div className="flex justify-between items-center text-muted-foreground">
            <span>Custom Branding Run ({quantity} units)</span>
            <span className="font-semibold text-foreground">+{formatINR(quoteCalculation.customizationUnitTotal)}</span>
          </div>
        )}

        {quoteCalculation.savingsTotal > 0 && (
          <div className="flex justify-between items-center text-emerald-600 dark:text-emerald-400 font-semibold pt-1 border-t border-border/40">
            <span>Bulk Volume Savings</span>
            <span>-{formatINR(quoteCalculation.savingsTotal)} ({quoteCalculation.savingsPercent}%)</span>
          </div>
        )}

        <div className="flex justify-between items-baseline pt-2 border-t border-border/60">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary block">
              Estimated Order Total
            </span>
            <span className="text-[10px] text-muted-foreground">
              Effective unit cost: {formatINR(quoteCalculation.effectiveUnitCost)} / unit
            </span>
          </div>
          <span data-testid="estimated-total" className="text-xl font-bold text-primary">
            {formatINR(quoteCalculation.estimatedTotal)}
          </span>
        </div>
      </div>

      {/* Primary Request Quote CTA Button */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border/60 z-40 sm:relative sm:bottom-auto sm:left-auto sm:right-auto sm:p-0 sm:bg-transparent sm:border-0 sm:backdrop-blur-none sm:z-auto shadow-[0_-10px_40px_rgba(0,0,0,0.1)] sm:shadow-none">
        <Button
          data-testid="request-quote-button"
          size="lg"
          onClick={() => setIsOpen(true)}
          className="w-full bg-accent text-primary hover:bg-gold-hover h-14 font-bold shadow-md transition-colors text-[15px]"
        >
          <Send className="mr-2 h-4 w-4" />
          Request Corporate Quote
        </Button>
      </div>

      {/* Interactive Modal Dialog */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="relative w-full max-w-xl bg-card rounded-2xl border border-border shadow-2xl p-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground p-1 rounded-lg"
              aria-label="Close quote modal"
            >
              <X className="h-5 w-5" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
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

                {/* Selected Gift Summary Pill */}
                <div className="p-3 rounded-xl bg-secondary/60 border border-border/70 text-xs flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <span className="font-semibold text-primary block line-clamp-1">{title}</span>
                      <span className="text-muted-foreground text-[11px]">
                        Qty: {quantity} units {selectedVariant ? `• Finish: ${selectedVariant.name}` : ""}
                      </span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="font-bold text-primary text-sm">
                        {formatINR(quoteCalculation.estimatedTotal)}
                      </span>
                      <span className="text-[10px] text-muted-foreground block">
                        ({formatINR(quoteCalculation.effectiveUnitCost)} / unit)
                      </span>
                    </div>
                  </div>

                  {selectedCustomizations.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-1 border-t border-border/40">
                      <span className="text-[11px] text-muted-foreground">Branding:</span>
                      {selectedCustomizations.map((c) => (
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

                  <div className="flex items-center gap-2 pt-5">
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
                </div>

                {/* Artwork Dropzone Mock */}
                <div>
                  <label className="font-semibold text-foreground block mb-1 text-xs">
                    Upload Logo / Artwork (Vector AI, EPS, SVG, PDF)
                  </label>
                  <div
                    onClick={() => setMockFileName("company_logo_vector.svg")}
                    className="border-2 border-dashed border-border/80 hover:border-accent rounded-xl p-3 text-center cursor-pointer transition-colors bg-secondary/30 text-xs"
                  >
                    <UploadCloud className="h-5 w-5 mx-auto mb-1 text-accent" />
                    {mockFileName ? (
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        Uploaded: {mockFileName}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">
                        Drag & drop artwork file here or click to browse
                      </span>
                    )}
                  </div>
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
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    data-testid="submit-quote-form"
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
                    <strong>{quantity} units</strong> of {title} has been routed to your dedicated Sterling account manager.
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
          </div>
        </div>
      )}
    </div>
  );
}

export default QuoteRequestModal;
