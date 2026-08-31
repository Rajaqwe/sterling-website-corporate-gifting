"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "./CartContext";
import { getCartItems, removeCartItem } from "@/app/cart/actions";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

export function CartDrawer({ isLightText = false }: { isLightText?: boolean }) {
  const { cartCount, incrementCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

  const loadCart = async () => {
    setIsLoading(true);
    try {
      const res = await getCartItems();
      if (res.success) {
        setItems(res.items || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

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

  const subtotal = items.reduce((acc, item) => {
    return acc + (item.quantity * Number(item.product?.price || 0));
  }, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger 
        render={
          <Button variant="ghost" size="icon" className={`relative ${isLightText ? "text-white hover:bg-background/20 hover:text-white" : "hover:bg-primary/10 text-foreground hover:text-primary"}`} />
        }
      >
        <ShoppingCart className="h-5 w-5" />
        {cartCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
            {cartCount > 99 ? "99+" : cartCount}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0">
        <div className="p-6 border-b border-border/40">
          <SheetHeader>
            <SheetTitle className="text-xl font-serif text-primary">Your Cart</SheetTitle>
          </SheetHeader>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 hide-scrollbar">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <p>Your cart is empty.</p>
              <Button onClick={() => setIsOpen(false)} variant="outline" className="mt-2">
                Continue Shopping
              </Button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 items-start border-b border-border/20 pb-4 last:border-0">
                <div className="relative h-20 w-20 rounded-md overflow-hidden bg-secondary/50 shrink-0 border border-border/40">
                  {item.product?.media?.[0]?.url ? (
                    <Image
                      src={item.product.media[0].url}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  ) : (
                    <div className="w-full h-full bg-secondary" />
                  )}
                </div>
                <div className="flex-1 flex flex-col gap-1">
                  <h4 className="font-semibold text-sm line-clamp-2 leading-tight">
                    {item.product?.name}
                  </h4>
                  {item.variantId && (
                    <span className="text-xs text-muted-foreground">
                      Variant: {item.product?.variants?.find((v: any) => v.id === item.variantId)?.name}
                    </span>
                  )}
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-medium text-muted-foreground">
                      Qty: {item.quantity}
                    </span>
                    <span className="font-semibold text-sm">
                      ₹{(item.quantity * Number(item.product?.price || 0)).toLocaleString()}
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                  onClick={() => handleRemove(item.id, item.quantity)}
                  disabled={isRemoving === item.id}
                >
                  {isRemoving === item.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Trash2 className="h-4 w-4" />
                  )}
                </Button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && !isLoading && (
          <div className="p-6 border-t border-border/40 bg-secondary/20">
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-muted-foreground">Subtotal</span>
              <span className="text-xl font-bold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex flex-col gap-3">
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button className="w-full h-12 text-base font-semibold shadow-sm">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/request-a-quote" onClick={() => setIsOpen(false)}>
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 text-primary h-12 font-medium">
                  Convert to Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
