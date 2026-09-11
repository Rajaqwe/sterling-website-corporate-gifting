import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your corporate gifting order.",
  robots: { index: false, follow: false },
};
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { CartCheckoutForm } from "./CartCheckoutForm";
import { getLineItemPrice } from "@/lib/pricing/line-item";
import { TaxService } from "@/lib/pricing/TaxService";
import { Money } from "@/lib/money";

export default async function CheckoutPage(
  props: {
    searchParams: Promise<{ quoteId?: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const quoteId = searchParams.quoteId;
  const auth = await requireUser();

  if (!quoteId) {
    // Standard Cart Checkout Flow
    const cart = await prisma.cart.findUnique({
      where: { userId: auth.user.id },
      include: {
        items: {
          include: {
            product: {
              include: { media: true, variants: true, bulkPricingTiers: true }
            }
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      redirect("/corporate-gifts");
    }

    const cartWithPrices = {
      ...cart,
      items: cart.items.map((item) => {
        const variant = item.variantId ? item.product.variants.find(v => v.id === item.variantId) : null;
        const unitPrice = getLineItemPrice({
          quantity: item.quantity,
          productId: item.productId,
          variantId: item.variantId,
          product: item.product,
          variant,
        });
        return {
          ...item,
          unitPrice,
        };
      })
    };

    const cartTotalAmount = cartWithPrices.items.reduce((acc, item) => acc + (item.quantity * Number(item.unitPrice)), 0);
    const cartSubtotalMoney = Money.fromDecimal(cartTotalAmount);
    const cartTaxCalc = TaxService.calculateGST(cartSubtotalMoney);
    const cartSummary = {
      itemsTotal: cartTotalAmount,
      subtotal: cartTaxCalc.subtotal.toDecimal(),
      tax: cartTaxCalc.taxAmount.toDecimal(),
      total: cartTaxCalc.total.toDecimal(),
      shipping: 0
    };

    return (
      <div className="container mx-auto max-w-5xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
        <div className="mb-8"><span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Direct checkout</span><h1 className="mt-2 text-3xl font-serif font-bold text-primary">Review your gifting shortlist.</h1><p className="mt-2 text-muted-foreground">Confirm your order and delivery details before completing checkout.</p></div>
        <CartCheckoutForm cart={JSON.parse(JSON.stringify(cartWithPrices))} summary={cartSummary} />
      </div>
    );
  }

  // Quote Checkout Flow
  const quote = await prisma.quoteRequest.findUnique({
    where: { id: quoteId },
    include: { items: { include: { product: true } } }
  });

  if (!quote) {
    redirect("/dashboard/quotes");
  }

  const isAdmin = auth.user.role === 'ADMIN' || auth.user.role === 'SUPER_ADMIN';
  if (quote.userId !== auth.user.id && !isAdmin) {
    redirect("/dashboard/quotes");
  }

  if (quote.status !== 'APPROVED') {
    redirect(`/dashboard/quotes/${quote.id}`);
  }

  const quoteItemsTotal = quote.items.reduce((acc: number, item: any) => acc + Number(item.totalPrice), 0);
  const quoteSubtotalMoney = Money.fromDecimal(quoteItemsTotal);
  const quoteTaxCalc = TaxService.calculateGST(quoteSubtotalMoney);
  const quoteSummary = {
    itemsTotal: quoteItemsTotal,
    subtotal: quoteTaxCalc.subtotal.toDecimal(),
    tax: quoteTaxCalc.taxAmount.toDecimal(),
    total: quoteTaxCalc.total.toDecimal(),
    shipping: 0
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 pb-12 pt-32 sm:px-6 lg:px-8">
      <div className="mb-8"><span className="text-xs font-bold uppercase tracking-[0.14em] text-primary">Approved quote</span><h1 className="mt-2 text-3xl font-serif font-bold text-primary">Complete your approved order.</h1><p className="mt-2 text-muted-foreground">Review the agreed details before moving to payment.</p></div>
      <CheckoutForm quote={JSON.parse(JSON.stringify(quote))} summary={quoteSummary} />
    </div>
  );
}
