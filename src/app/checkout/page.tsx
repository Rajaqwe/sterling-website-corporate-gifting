import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";
import { CheckoutForm } from "./CheckoutForm";
import { CartCheckoutForm } from "./CartCheckoutForm";

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
              include: { media: true, variants: true }
            }
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      redirect("/corporate-gifts");
    }

    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-5xl">
        <h1 className="text-3xl font-serif font-bold text-primary mb-8">Secure Direct Checkout</h1>
        <CartCheckoutForm cart={JSON.parse(JSON.stringify(cart))} />
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

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-12 max-w-5xl">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Secure B2B Checkout</h1>
      <CheckoutForm quote={JSON.parse(JSON.stringify(quote))} />
    </div>
  );
}
