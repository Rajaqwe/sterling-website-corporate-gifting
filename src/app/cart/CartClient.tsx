"use client";
import { buttonVariants } from "@/components/ui/button";

import React, { useState } from "react";
import { ShoppingCart, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeCartItem, updateCartItemQuantity } from "./actions";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { formatINR } from "@/lib/currency";
import { useCart } from "@/components/cart/CartContext";

export function CartClient({ initialItems }: { initialItems: any[] }) {
  const { incrementCart } = useCart();
  const [items, setItems] = useState<any[]>(initialItems);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  const handleRemove = async (itemId: string, quantity: number) => {
    setIsRemoving(itemId);
    try {
      const res = await removeCartItem(itemId);
      if (res.success) {
        setItems(items.filter(i => i.id !== itemId));
        incrementCart(-quantity);
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsRemoving(null);
    }
  };

  const handleQuantityChange = async (itemId: string, currentQuantity: number, delta: number) => {
    const newQuantity = currentQuantity + delta;
    if (newQuantity < 1) return;
    
    setIsUpdating(itemId);
    try {
      const res = await updateCartItemQuantity(itemId, newQuantity);
      if (res.success) {
        setItems(items.map(i => i.id === itemId ? { ...i, quantity: newQuantity } : i));
        incrementCart(delta);
      } else {
        toast.error(res.error || "Failed to update quantity");
      }
    } catch (e) {
      toast.error("An error occurred");
    } finally {
      setIsUpdating(null);
    }
  };

  const getStock = (item: any) => {
    if (item.variantId) {
      const variant = item.product?.variants?.find((v: any) => v.id === item.variantId);
      if (variant && variant.stockQuantity !== null) return variant.stockQuantity;
    }
    return item.product?.stockQuantity || 0;
  };

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.quantity * Number(item.unitPrice || item.product?.price || 0));
  }, 0);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20 bg-secondary/10 rounded-xl border border-border/40">
        <ShoppingCart className="h-16 w-16 opacity-20 mb-4" />
        <h2 className="text-xl font-semibold text-foreground">Your gifting shortlist is empty.</h2>
        <p className="mt-2 text-muted-foreground max-w-md">Explore our curated collection of corporate gifts to begin building your requirement.</p>
        <Link href="/corporate-gifts" className={buttonVariants({ variant: "outline", className: "mt-6 border-primary/20 hover:bg-primary/5" })}>Explore gifts</Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item, idx) => (
          <div 
            key={item.id} 
            className="flex gap-4 sm:gap-6 p-4 sm:p-6 bg-card border border-border/40 rounded-xl shadow-sm animate-fade-in"
            style={{ animationDelay: `${idx * 50}ms`, animationFillMode: 'both' }}
          >
            <div className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-lg overflow-hidden bg-secondary/50 shrink-0 border border-border/40">
              {item.product?.media?.[0]?.url ? (
                <Image
                  src={item.product.media[0].url}
                  alt={item.product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 128px"
                />
              ) : (
                <div className="w-full h-full bg-secondary" />
              )}
            </div>
            
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold text-base sm:text-lg text-foreground line-clamp-2">
                    {item.product?.name}
                  </h3>
                  {item.variantId && (
                    <p className="text-sm text-muted-foreground mt-1">
                      Variant: {item.product?.variants?.find((v: any) => v.id === item.variantId)?.name}
                    </p>
                  )}
                  {item.quantity > getStock(item) && (
                    <span className="text-xs font-medium text-destructive mt-2 bg-destructive/10 px-2 py-1 rounded-sm inline-block w-fit">
                      Backordered (Only {getStock(item)} in stock)
                    </span>
                  )}
                </div>
                
                <span className="font-semibold text-lg hidden sm:block">
                  {formatINR(item.quantity * Number(item.unitPrice || item.product?.price || 0))}
                </span>
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center border border-border/40 rounded-md bg-background">
                  <button 
                    disabled={isUpdating === item.id || item.quantity <= 1}
                    onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                    className="px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 disabled:opacity-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="text-sm font-medium w-10 text-center">
                    {isUpdating === item.id ? <Loader2 className="h-4 w-4 animate-spin mx-auto" /> : item.quantity}
                  </span>
                  <button 
                    disabled={isUpdating === item.id}
                    onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                    className="px-3 py-1.5 text-muted-foreground hover:text-foreground hover:bg-secondary/50 disabled:opacity-50 transition-colors"
                  >
                    +
                  </button>
                </div>
                
                <span className="font-semibold text-base sm:hidden">
                  {formatINR(item.quantity * Number(item.unitPrice || item.product?.price || 0))}
                </span>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleRemove(item.id, item.quantity)}
                  disabled={isRemoving === item.id}
                >
                  {isRemoving === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Trash2 className="h-4 w-4 sm:mr-2" />
                  )}
                  <span className="hidden sm:inline">Remove</span>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="lg:col-span-1">
        <div className="bg-card border border-border/40 rounded-xl shadow-sm p-6 sticky top-24">
          <h3 className="font-serif text-xl font-medium mb-4">Order Summary</h3>
          <div className="space-y-3 mb-6 pb-6 border-b border-border/40">
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Items ({items.length})</span>
              <span>{formatINR(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between text-muted-foreground">
              <span>Shipping & Taxes</span>
              <span>Calculated at checkout</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between font-semibold text-xl mb-6">
            <span>Subtotal</span>
            <span>{formatINR(subtotal)}</span>
          </div>

          <div className="flex flex-col gap-3">
            <Link href="/checkout" className={buttonVariants({ variant: "premium", className: "w-full h-12 text-base font-semibold" })}>
                Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/40" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">or for bulk orders</span>
              </div>
            </div>
            <Link href="/request-a-quote" className={buttonVariants({ variant: "outline", className: "w-full border-primary/20 hover:bg-primary/5 text-primary h-12 font-medium" })}>
                Convert to Quote
              </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
