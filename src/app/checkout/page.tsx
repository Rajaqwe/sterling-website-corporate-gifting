import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatINR } from "@/lib/currency";
import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { redirect } from "next/navigation";

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
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-3xl font-serif font-bold text-primary mb-8">Secure B2B Checkout</h1>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Delivery & Shipping</CardTitle>
              <CardDescription>Enter the primary shipping destination for this bulk order.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form action={async () => {
                'use server';
                // Here we would call createOrderFromQuote
              }}>
                <div className="space-y-2">
                  <Label>Company Name</Label>
                  <Input defaultValue={quote.companyName} name="companyName" />
                </div>
                <div className="space-y-2">
                  <Label>Contact Name</Label>
                  <Input defaultValue={quote.fullName} name="fullName" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue={quote.workEmail} name="workEmail" />
                  </div>
                  <div className="space-y-2">
                    <Label>Phone</Label>
                    <Input defaultValue={quote.phone} name="phone" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Address Line 1</Label>
                  <Input placeholder="Building, Street" name="addressLine1" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-1 space-y-2">
                    <Label>City</Label>
                    <Input name="city" />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <Label>State</Label>
                    <Input name="state" />
                  </div>
                  <div className="col-span-1 space-y-2">
                    <Label>ZIP Code</Label>
                    <Input name="postalCode" />
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Method</CardTitle>
              <CardDescription>Select how you would like to settle this invoice.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center p-4 border rounded-lg bg-secondary/20">
                <input type="radio" name="payment" id="po" defaultChecked className="mr-4" />
                <label htmlFor="po" className="font-medium">Corporate Purchase Order (PO)</label>
              </div>
              <div className="flex items-center p-4 border rounded-lg">
                <input type="radio" name="payment" id="card" className="mr-4" />
                <label htmlFor="card" className="font-medium">Credit Card / ACH</label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="md:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
              <CardDescription>Based on approved quote {quote.quoteNumber}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Items ({totalQuantity} units)</span>
                <span>{formatINR(itemsTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>TBD</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Subtotal</span>
                <span>{formatINR(itemsTotal)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Confirm Corporate Order</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
