"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShieldCheck, Building, CheckCircle2, Lock } from "lucide-react";
import { toast } from "sonner";
import { formatINR } from "@/lib/currency";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Script from "next/script";
import { createOrderFromCart } from "@/app/checkout/actions";

const checkoutSchema = z.object({
  companyName: z.string().min(2, "Company name is required"),
  fullName: z.string().min(2, "Contact name is required"),
  workEmail: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  addressLine1: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(4, "Postal code is required"),
});

type CheckoutValues = z.infer<typeof checkoutSchema>;

export function CartCheckoutForm({ cart }: { cart: any }) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const itemsTotal = cart.items.reduce((acc: number, item: any) => acc + (item.quantity * Number(item.product.price)), 0);
  const totalQuantity = cart.items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  const { register, handleSubmit, formState: { errors } } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
  });

  const onSubmit = async (data: CheckoutValues) => {
    setIsProcessing(true);

    try {
      const shippingData = {
        companyName: data.companyName,
        fullName: data.fullName,
        workEmail: data.workEmail,
        phone: data.phone,
        addressLine1: data.addressLine1,
        city: data.city,
        state: data.state,
        postalCode: data.postalCode,
      };

      // 1. Create DB Order
      const orderRes = await createOrderFromCart(shippingData);
      
      if (!orderRes.success || !orderRes.orderId) {
        toast.error(orderRes.error || "Failed to create order");
        setIsProcessing(false);
        return;
      }

      // 2. Create Razorpay Order
      const rpRes = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderRes.orderId }),
      });

      const rpData = await rpRes.json();

      if (!rpRes.ok) {
        toast.error(rpData.error || "Failed to initialize payment");
        setIsProcessing(false);
        return;
      }

      // 3. Open Razorpay Widget
      const options = {
        key: rpData.key_id,
        amount: rpData.amount,
        currency: rpData.currency,
        name: "Sterling Corporate Gifting",
        description: `Order Payment`,
        order_id: rpData.id,
        handler: function (response: any) {
          toast.success("Payment Successful!");
          window.location.href = `/dashboard/orders/${orderRes.orderId}`;
        },
        prefill: {
          name: shippingData.fullName,
          email: shippingData.workEmail,
          contact: shippingData.phone,
        },
        theme: {
          color: "#1e293b",
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp1.open();
      
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during checkout");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Card className="border-border/60 shadow-xs">
            <CardHeader className="bg-secondary/20 pb-4 border-b border-border/40">
              <CardTitle className="flex items-center gap-2 font-serif"><Building className="h-5 w-5 text-accent" /> Delivery & Shipping</CardTitle>
              <CardDescription>Enter the primary shipping destination for your order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label>Company Name *</Label>
                <Input {...register("companyName")} className={`bg-secondary/10 ${errors.companyName ? "border-destructive" : ""}`} />
                {errors.companyName && <span className="text-xs text-destructive">{errors.companyName.message}</span>}
              </div>
              <div className="space-y-2">
                <Label>Contact Name *</Label>
                <Input {...register("fullName")} className={`bg-secondary/10 ${errors.fullName ? "border-destructive" : ""}`} />
                {errors.fullName && <span className="text-xs text-destructive">{errors.fullName.message}</span>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Email *</Label>
                  <Input {...register("workEmail")} type="email" className={`bg-secondary/10 ${errors.workEmail ? "border-destructive" : ""}`} />
                  {errors.workEmail && <span className="text-xs text-destructive">{errors.workEmail.message}</span>}
                </div>
                <div className="space-y-2">
                  <Label>Phone *</Label>
                  <Input {...register("phone")} type="tel" className={`bg-secondary/10 ${errors.phone ? "border-destructive" : ""}`} />
                  {errors.phone && <span className="text-xs text-destructive">{errors.phone.message}</span>}
                </div>
              </div>
              <div className="space-y-2 pt-4 border-t border-border/40">
                <Label>Address Line 1 *</Label>
                <Input placeholder="Building, Street, Area" {...register("addressLine1")} className={`bg-secondary/10 ${errors.addressLine1 ? "border-destructive" : ""}`} />
                {errors.addressLine1 && <span className="text-xs text-destructive">{errors.addressLine1.message}</span>}
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 space-y-2">
                  <Label>City *</Label>
                  <Input {...register("city")} className={`bg-secondary/10 ${errors.city ? "border-destructive" : ""}`} />
                  {errors.city && <span className="text-xs text-destructive">{errors.city.message}</span>}
                </div>
                <div className="col-span-1 space-y-2">
                  <Label>State *</Label>
                  <Input {...register("state")} className={`bg-secondary/10 ${errors.state ? "border-destructive" : ""}`} />
                  {errors.state && <span className="text-xs text-destructive">{errors.state.message}</span>}
                </div>
                <div className="col-span-1 space-y-2">
                  <Label>ZIP Code *</Label>
                  <Input {...register("postalCode")} className={`bg-secondary/10 ${errors.postalCode ? "border-destructive" : ""}`} />
                  {errors.postalCode && <span className="text-xs text-destructive">{errors.postalCode.message}</span>}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/60 shadow-xs">
            <CardHeader className="bg-secondary/20 pb-4 border-b border-border/40">
              <CardTitle className="flex items-center gap-2 font-serif"><ShieldCheck className="h-5 w-5 text-accent" /> 100% Secure Payment</CardTitle>
              <CardDescription>Select how you would like to settle this order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-accent bg-accent/5 ring-1 ring-accent/30' : 'border-border/60 hover:bg-secondary/20'}`}>
                <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="mt-1 mr-4 accent-accent" />
                <div>
                  <div className="font-semibold text-primary">Credit or Debit Card</div>
                  <div className="text-xs text-muted-foreground mt-1">Pay instantly and securely online using any major card.</div>
                </div>
              </label>

              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'upi' ? 'border-accent bg-accent/5 ring-1 ring-accent/30' : 'border-border/60 hover:bg-secondary/20'}`}>
                <input type="radio" name="payment" value="upi" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} className="mt-1 mr-4 accent-accent" />
                <div>
                  <div className="font-semibold text-primary">Scan and Pay with UPI</div>
                  <div className="text-xs text-muted-foreground mt-1">Pay via Google Pay, PhonePe, Paytm, or any UPI app.</div>
                </div>
              </label>

              <label className={`flex items-start p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'netbanking' ? 'border-accent bg-accent/5 ring-1 ring-accent/30' : 'border-border/60 hover:bg-secondary/20'}`}>
                <input type="radio" name="payment" value="netbanking" checked={paymentMethod === 'netbanking'} onChange={() => setPaymentMethod('netbanking')} className="mt-1 mr-4 accent-accent" />
                <div>
                  <div className="font-semibold text-primary">Netbanking</div>
                  <div className="text-xs text-muted-foreground mt-1">Directly transfer via your bank's portal.</div>
                </div>
              </label>
            </CardContent>
          </Card>
        </form>
      </div>

      <div className="md:col-span-1">
        <Card className="sticky top-24 border-border/60 shadow-lg">
          <CardHeader className="pb-4">
            <CardTitle className="font-serif">Order Summary</CardTitle>
            <CardDescription className="text-xs">Direct Checkout</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            
            <div className="bg-secondary/20 rounded-lg p-3 space-y-3 mb-4 max-h-64 overflow-y-auto">
              {cart.items.map((item: any, idx: number) => (
                <div key={idx} className="flex justify-between text-xs pb-3 border-b border-border/50 last:border-0 last:pb-0">
                  <div className="flex-1 pr-4">
                    <span className="font-semibold text-foreground block truncate">{item.product?.name || `Product #${item.productId}`}</span>
                    <span className="text-muted-foreground">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-medium text-right">{formatINR(Number(item.product.price) * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Items ({totalQuantity} units)</span>
              <span className="font-medium">{formatINR(itemsTotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Shipping</span>
              <span className="font-medium">Free</span>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between items-end">
              <span className="font-bold text-foreground">Total</span>
              <div className="text-right">
                <span className="font-bold text-xl text-primary block">{formatINR(itemsTotal)}</span>
                <span className="text-[10px] text-muted-foreground">Inclusive of GST</span>
              </div>
            </div>
            
            <div className="pt-4 space-y-2">
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <CheckCircle2 className="h-3 w-3 text-emerald-500" /> GST Invoice provided
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Lock className="h-3 w-3 text-emerald-500" /> Secure 256-bit encryption
              </div>
            </div>
          </CardContent>
          
          <div className="p-6 pt-0">
            <Button 
              type="submit" 
              form="checkout-form" 
              disabled={isProcessing}
              className="w-full bg-accent text-primary hover:bg-gold-hover h-12 font-bold shadow-md text-sm transition-all"
            >
              {isProcessing ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/50 border-t-primary mr-2" />
                  Processing...
                </>
              ) : (
                <>Pay Securely</>
              )}
            </Button>
          </div>
        </Card>
      </div>
    </div>
    </>
  );
}
