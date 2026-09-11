"use client";

import React, { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ShoppingCart, Trash2, ArrowRight, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { useCart } from "./CartContext";
import { getCartItems, removeCartItem, updateCartItemQuantity } from "@/app/cart/actions";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { formatINR } from "@/lib/currency";

export function CartDrawer({ isLightText = false }: { isLightText?: boolean }) {
  const { cartCount, incrementCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState<string | null>(null);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

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

  useEffect(() => {
    if (isOpen) {
      loadCart();
    }
  }, [isOpen]);

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

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger 
        render={
          <Button variant="ghost" size="icon" aria-label="Open cart" className={`relative ${isLightText ? "text-white hover:bg-background/20 hover:text-white" : "hover:bg-primary/10 text-foreground hover:text-primary"}`} />
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

        <div className="flex-1 overflow-y-scroll p-6 flex flex-col gap-6">
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <Loader2 className="h-8 w-8 animate-spin" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4 text-muted-foreground">
              <ShoppingCart className="h-12 w-12 opacity-20" />
              <div><p className="font-semibold text-foreground">Your gifting shortlist is empty.</p><p className="mt-1 text-sm">Explore gifts to begin building a requirement.</p></div>
              <Link href="/corporate-gifts" onClick={() => setIsOpen(false)} className={buttonVariants({ variant: "outline", className: "mt-2" })}>Explore gifts</Link>
            </div>
          ) : (
            items.map((item, idx) => (
              <div 
                key={item.id} 
                className="flex gap-4 items-start border-b border-border/20 pb-4 last:border-0 animate-fade-left"
                style={{ animationDelay: `${idx * 80}ms`, animationFillMode: 'both' }}
              >
                <div className="relative h-14 w-14 rounded-md overflow-hidden bg-secondary/50 shrink-0 border border-border/40">
                  {item.product?.media?.[0]?.url ? (
                    <Image
                      src={item.product.media[0].url}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
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
                    <div className="flex items-center border border-border/40 rounded-md">
                      <button 
                        disabled={isUpdating === item.id || item.quantity <= 1}
                        onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-xs font-medium w-6 text-center">
                        {isUpdating === item.id ? <Loader2 className="h-3 w-3 animate-spin mx-auto" /> : item.quantity}
                      </span>
                      <button 
                        disabled={isUpdating === item.id}
                        onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                        className="px-2 py-1 text-muted-foreground hover:text-foreground disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <span className="font-semibold text-sm">
                      {formatINR(item.quantity * Number(item.unitPrice || item.product?.price || 0))}
                    </span>
                  </div>
                  {item.quantity > getStock(item) && (
                    <span className="text-[10px] font-medium text-destructive mt-1 bg-destructive/10 px-1.5 py-0.5 rounded-sm inline-block w-fit">
                      Backordered (Only {getStock(item)} in stock)
                    </span>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Remove item from cart"
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

        {items.length > 2 && (
          <div className="flex flex-col border-t border-border/20">
            <Link href="/cart" className="p-2 text-center bg-primary/5 text-primary text-xs font-semibold hover:bg-primary/10 transition-colors uppercase tracking-wider" onClick={() => setIsOpen(false)}>
              View Full Cart
            </Link>
          </div>
        )}
        
        {items.length > 0 && !isLoading && (
          <div className="p-4 border-t border-border/40 bg-secondary/20 shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] relative z-10">
            <div className="flex items-center justify-between mb-1">
              <span className="font-medium text-sm text-muted-foreground">Subtotal</span>
              <span className="text-lg font-bold">{formatINR(subtotal)}</span>
            </div>
            <p className="text-[11px] text-muted-foreground mb-3">Taxes and shipping calculated at checkout.</p>
            <div className="flex flex-col gap-2">
              <Link href="/checkout" onClick={() => setIsOpen(false)}>
                <Button variant="premium" className="w-full h-10 text-sm font-semibold">
                  Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
