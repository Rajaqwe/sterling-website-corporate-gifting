"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function PaymentConfirming() {
  const router = useRouter();

  useEffect(() => {
    // Poll the server every 3 seconds to check if webhook has updated the order status
    const interval = setInterval(() => {
      router.refresh();
    }, 3000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="flex items-center gap-2 text-primary font-medium p-3 bg-primary/10 rounded-md animate-pulse">
      <Loader2 className="h-5 w-5 animate-spin" />
      <span>Payment received &mdash; confirming your order...</span>
    </div>
  );
}
