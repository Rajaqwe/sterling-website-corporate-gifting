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

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: { quoteId: string };
}) {
  const quoteId = searchParams.quoteId;
  const auth = await requireUser();

  if (!quoteId) {
    redirect("/dashboard/quotes");
  }

  const quote = await prisma.quoteRequest.findUnique({
    where: { id: quoteId },
    include: { items: true }
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

  const itemsTotal = quote.items.reduce((acc, item) => acc + Number(item.totalPrice), 0);
  const totalQuantity = quote.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 max-w-5xl">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Secure B2B Checkout</h1>
      <CheckoutForm quote={quote as any} />
    </div>
  );
}
