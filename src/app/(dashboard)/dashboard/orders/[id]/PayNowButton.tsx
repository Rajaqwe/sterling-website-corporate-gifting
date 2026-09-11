"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Script from "next/script";

export function PayNowButton({ 
  orderId, 
  amount, 
  customerName, 
  customerEmail, 
  customerPhone 
}: { 
  orderId: string;
  amount: number;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
}) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);
    try {
      // 1. Create Razorpay Order
      const rpRes = await fetch("/api/checkout/razorpay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId }),
      });

      const rpData = await rpRes.json();

      if (!rpRes.ok) {
        toast.error(rpData.error || "Failed to initialize payment");
        setIsProcessing(false);
        return;
      }

      // 2. Open Razorpay Widget
      const options = {
        key: rpData.key_id,
        amount: rpData.amount,
        currency: rpData.currency,
        name: "Sterling Corporate Gifting",
        description: `Order Payment - ${orderId}`,
        order_id: rpData.id,
        handler: function (response: any) {
          toast.success("Payment Successful! Confirming your order...");
          window.location.href = `/dashboard/orders/${orderId}?payment_success=1`;
        },
        prefill: {
          name: customerName || "",
          email: customerEmail || "",
          contact: customerPhone || "",
        },
        theme: {
          color: "#1e293b",
        },
        modal: {
          ondismiss: function () {
            setIsProcessing(false);
            toast.info("Payment window closed. You can try again when ready.");
          }
        }
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on("payment.failed", function (response: any) {
        toast.error(`Payment failed: ${response.error.description}`);
        setIsProcessing(false);
      });
      rzp1.open();
    } catch (error) {
      console.error(error);
      toast.error("An unexpected error occurred during payment");
      setIsProcessing(false);
    }
  };

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      <Button 
        onClick={handlePayment} 
        disabled={isProcessing}
        className="btn-primary"
      >
        {isProcessing ? (
          <>
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/50 border-t-primary mr-2" />
            Processing...
          </>
        ) : (
          "Pay Now"
        )}
      </Button>
    </>
  );
}
