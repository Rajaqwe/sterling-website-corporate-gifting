import { prisma } from "@/lib/prisma/client";
import { requireUser } from "@/lib/auth/server";
import { notFound } from "next/navigation";
import { formatINR } from "@/lib/currency";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, ExternalLink } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default async function OrderDetailPage(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const auth = await requireUser();
  const user = auth.user;

  const order = await prisma.order.findFirst({
    where: { id: params.id, userId: user.id },
    include: {
      items: {
        include: {
          product: {
            include: {
              media: { orderBy: { sortOrder: 'asc' }, take: 1 }
            }
          }
        }
      },
      shippingAddress: true,
      billingAddress: true,
    }
  });

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/dashboard/orders" className="text-sm text-muted-foreground hover:text-primary flex items-center gap-1 mb-2">
            <ArrowLeft className="h-4 w-4" /> Back to Orders
          </Link>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-serif font-bold text-primary">Order {order.orderNumber}</h1>
            <Badge variant={order.status === 'DELIVERED' ? 'default' : order.status === 'PENDING' ? 'secondary' : 'outline'}>
              {order.status}
            </Badge>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Placed on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href={`/api/orders/${order.id}/pdf`} target="_blank">
            <Button variant="outline" type="button">
              <Download className="h-4 w-4 mr-2" /> Download Invoice
            </Button>
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="border rounded-md bg-background overflow-hidden">
            <div className="p-4 border-b bg-muted/20 font-medium">Items Ordered</div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead className="text-center">Qty</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 bg-muted rounded overflow-hidden relative flex-shrink-0">
                          {item.product?.media?.[0] ? (
                            <Image 
                              src={item.product.media[0].url} 
                              alt={item.productName}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">No img</div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-xs text-muted-foreground">SKU: {item.sku}</p>
                          {item.brandingOption && (
                            <p className="text-xs text-primary mt-0.5">Branding: {item.brandingOption}</p>
                          )}
                          {item.product && (
                            <Link href={`/products/${item.product.slug}`} className="text-xs text-blue-600 hover:underline flex items-center gap-0.5 mt-0.5">
                              View Product <ExternalLink className="h-3 w-3" />
                            </Link>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatINR(item.unitPrice)}</TableCell>
                    <TableCell className="text-center">{item.quantity}</TableCell>
                    <TableCell className="text-right font-medium">{formatINR(item.totalPrice)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="border rounded-md bg-background p-5 space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatINR(order.subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax (GST)</span>
                <span>{formatINR(order.tax)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatINR(order.shippingCost)}</span>
              </div>
              <div className="border-t pt-2 mt-2 flex justify-between font-bold text-base">
                <span>Total</span>
                <span>{formatINR(order.total)}</span>
              </div>
            </div>
          </div>

          <div className="border rounded-md bg-background p-5 space-y-4">
            <h3 className="font-medium text-lg border-b pb-2">Addresses</h3>
            
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Shipping Address</p>
              {order.shippingAddress ? (
                <address className="not-italic text-sm text-foreground/80 space-y-0.5">
                  <p className="font-medium text-foreground">{order.shippingAddress.fullName}</p>
                  <p>{order.shippingAddress.addressLine1}</p>
                  {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="pt-1">Phone: {order.shippingAddress.phone}</p>
                </address>
              ) : (
                <p className="text-sm text-muted-foreground">Not provided</p>
              )}
            </div>

            <div className="pt-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Billing Address</p>
              {order.billingAddress ? (
                <address className="not-italic text-sm text-foreground/80 space-y-0.5">
                  <p className="font-medium text-foreground">{order.billingAddress.fullName}</p>
                  <p>{order.billingAddress.addressLine1}</p>
                  {order.billingAddress.addressLine2 && <p>{order.billingAddress.addressLine2}</p>}
                  <p>{order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}</p>
                  <p>{order.billingAddress.country}</p>
                  <p className="pt-1">Phone: {order.billingAddress.phone}</p>
                </address>
              ) : (
                <p className="text-sm text-muted-foreground">Same as shipping</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
