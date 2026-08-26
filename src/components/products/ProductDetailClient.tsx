/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { calculateQuotePricing } from "@/lib/utils/pricing";
import { ProductGallery } from "@/components/products/ProductGallery";
import { TieredPricingTable } from "@/components/products/TieredPricingTable";
import { ProductCustomization } from "@/components/products/ProductCustomization";
import { ProductSpecifications } from "@/components/products/ProductSpecifications";
import { QuoteRequestModal } from "@/components/products/QuoteRequestModal";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Heart, ShoppingCart, Share2, MessageCircle, Ghost, Link2 } from "lucide-react";
import { addToCart, toggleWishlist, toggleLike } from "@/app/products/actions";
import { toast } from "sonner";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ProductDetailClient({
  product,
  relatedProducts,
  initialIsWishlisted = false,
  initialIsLiked = false,
  isLoggedIn = false
}: {
  product: any,
  relatedProducts: any[],
  initialIsWishlisted?: boolean,
  initialIsLiked?: boolean,
  isLoggedIn?: boolean
}) {
  // State for quantity, variant, and customizations
  const [quantity, setQuantity] = useState<number>(product.minimumOrderQuantity);
  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants?.[0]?.id || ""
  );

  const availableCustomizations = product.brandingOptions || [];
  const [selectedCustomizationIds, setSelectedCustomizationIds] = useState<string[]>(() => {
    const defaults = availableCustomizations.filter((c: any) => c.isDefault).map((c: any) => c.id);
    return defaults.length > 0 ? defaults : availableCustomizations.slice(0, 1).map((c: any) => c.id);
  });

  const [selectedPlacements, setSelectedPlacements] = useState<Record<string, string>>({});
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(product.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [isPending, startTransition] = useTransition();

  const selectedVariant = product.variants?.find((v: any) => v.id === selectedVariantId);
  const selectedCustomizations = availableCustomizations.filter((c: any) =>
    selectedCustomizationIds.includes(c.id)
  );

  const displayPrice = selectedVariant?.price || product.price;
  const displaySku = selectedVariant?.sku || product.sku;

  const handleWishlist = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to save items to your wishlist.");
      return;
    }

    // Optimistic UI update
    setIsWishlisted(!isWishlisted);

    startTransition(async () => {
      const res = await toggleWishlist(product.id);
      if (!res.success) {
        setIsWishlisted(isWishlisted); // Revert on error
        toast.error(res.error || "Failed to update wishlist");
      } else {
        toast.success(isWishlisted ? "Removed from wishlist" : "Added to wishlist");
      }
    });
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to add items to cart.");
      return;
    }

    startTransition(async () => {
      const res = await addToCart(product.id, quantity, selectedVariantId);
      if (res.success) {
        toast.success("Added to cart successfully!");
      } else {
        toast.error(res.error || "Failed to add to cart");
      }
    });
  };

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to like items.");
      return;
    }

    // Optimistically update
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prev: number) => newIsLiked ? prev + 1 : prev - 1);
    setIsLiking(true);

    try {
      const res = await toggleLike(product.id);
      if (res.success && res.likes !== undefined) {
        setLikeCount(res.likes); // sync with server
        setIsLiked(res.isLiked);
      } else {
        toast.error(res.error || "Failed to register like.");
        // Revert
        setIsLiked(!newIsLiked);
        setLikeCount((prev: number) => !newIsLiked ? prev + 1 : prev - 1);
      }
    } catch (err) {
      toast.error("Failed to register like.");
      // Revert
      setIsLiked(!newIsLiked);
      setLikeCount((prev: number) => !newIsLiked ? prev + 1 : prev - 1);
    } finally {
      setIsLiking(false);
    }
  };

  const title = product.name || "Corporate Gift";
  const shareText = `Check out this amazing corporate gift: ${title}`;
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    toast.success("Link copied to clipboard!");
  };

  const handleNativeShare = () => {
    if (navigator.share) {
      navigator.share({
        title: title,
        text: shareText,
        url: shareUrl,
      }).catch(console.error);
    } else {
      handleCopyLink();
    }
  };

  // Dynamic live quote calculation
  const quoteCalculation = useMemo(() => {
    // For now we map DB product back to the old mock format shape that calculateQuotePricing expects
    // We will refactor calculateQuotePricing in Phase 4 (Pricing & Checkout Engine)
    const legacyProductFormat = {
      ...product,
      moq: product.minimumOrderQuantity,
      basePrice: Number(product.price),
      startingPrice: Number(product.price),
      priceTiers: product.bulkPricingTiers || [],
    };
    return calculateQuotePricing(legacyProductFormat, quantity, selectedCustomizations);
  }, [product, quantity, selectedCustomizations]);

  const handleToggleCustomization = (id: string) => {
    setSelectedCustomizationIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handlePlacementChange = (customizationId: string, placement: string) => {
    setSelectedPlacements((prev) => ({ ...prev, [customizationId]: placement }));
  };

  const handleSelectTierQuantity = (minQty: number) => {
    setQuantity(minQty);
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24">
      {/* Breadcrumb Navigation Strip */}
      <div className="border-b border-border/40 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/corporate-gifts" className="hover:text-primary transition-colors">Corporate Gifts</Link>
            <ChevronRight className="h-3 w-3" />
            <Link
              href={`/corporate-gifts?category=${product.category?.slug}`}
              className="hover:text-primary transition-colors"
            >
              {product.category?.name}
            </Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-foreground font-medium truncate max-w-[200px] sm:max-w-xs">
              {title}
            </span>
          </nav>
        </div>
      </div>

      {/* Main PDP Grid */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          <div className="lg:col-span-7 flex flex-col gap-10">
            <ProductGallery
              images={product.media?.map((m: any) => m.url) || []}
              title={title}
              badge={product.isFeatured ? "Featured" : ""}
              moq={product.minimumOrderQuantity}
            />

            <ProductSpecifications
              specifications={{
                materials: [product.material || "Premium Grade"],
                dimensions: product.dimensions,
                weight: product.weight ? `${product.weight} kg` : undefined,
                imprintArea: "Standard Logo Sizing",
                countryOfOrigin: "Imported"
              }}
              leadTime={`${product.leadTimeDays} business days`}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6 lg:sticky lg:top-24">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.category?.name}
                </span>

                {product.rating && (
                  <div className="flex items-center gap-1 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span>{product.rating.toFixed(1)}</span>
                  </div>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-primary leading-tight">
                {title}
              </h1>

              <p className="text-sm text-muted-foreground leading-relaxed mt-2">
                {product.description}
              </p>
            </div>

            {product.variants && product.variants.length > 1 && (
              <div className="flex flex-col gap-2 pt-2 border-t border-border/50">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-foreground">
                    Colorway / Material Finish
                  </span>
                  <span className="text-muted-foreground">
                    {selectedVariant?.name || "Select finish"}
                  </span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.variants.map((variant: any) => {
                    const isSelected = selectedVariantId === variant.id;
                    return (
                      <button
                        key={variant.id}
                        type="button"
                        onClick={() => setSelectedVariantId(variant.id)}
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-medium transition-all ${isSelected
                            ? "border-primary bg-primary text-primary-foreground shadow-xs"
                            : "border-border/60 bg-background text-foreground hover:bg-secondary/60"
                          }`}
                      >
                        {variant.colorHex && (
                          <span
                            className="h-3.5 w-3.5 rounded-full border border-white/20 shrink-0"
                            style={{ backgroundColor: variant.colorHex }}
                          />
                        )}
                        <span>{variant.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-2">
              <div><span className="font-semibold text-foreground">SKU:</span> {displaySku}</div>
              <div><span className="font-semibold text-foreground">Availability:</span> {product.stockStatus === 'IN_STOCK' ? <span className="text-emerald-600 font-semibold">In Stock</span> : <span className="text-amber-600 font-semibold">{product.stockStatus}</span>}</div>
            </div>

            <div className="pt-2 border-t border-border/50 flex flex-col sm:flex-row gap-3">
              <Button
                onClick={handleAddToCart}
                disabled={isPending}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-12 shadow-sm font-semibold"
              >
                <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={`h-12 flex-1 sm:flex-none sm:w-16 flex items-center justify-center gap-1 transition-all ${isLiked ? "border-red-200 bg-red-50/50 dark:bg-red-950/20" : ""}`}
                  onClick={handleLike}
                  aria-label="Like Product"
                >
                  <Heart className={`h-5 w-5 ${isLiking ? "scale-110" : ""} ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                  {likeCount > 0 && <span className={`text-xs font-semibold ${isLiked ? "text-red-600" : "text-foreground"}`}>{likeCount}</span>}
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger className="h-12 w-12 flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md shadow-sm" aria-label="Share">
                    <Share2 className="h-5 w-5" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-card shadow-lg rounded-xl border border-border/60">
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2.5" onClick={() => window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank')}>
                      <MessageCircle className="h-4 w-4 text-green-500" /> WhatsApp
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2.5" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}>
                      Facebook
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2.5" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, '_blank')}>
                      Twitter (X)
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2.5" onClick={() => {
                      handleCopyLink();
                      window.open('https://instagram.com', '_blank');
                    }}>
                      Instagram
                    </DropdownMenuItem>
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2.5" onClick={() => {
                      handleCopyLink();
                      window.open('https://snapchat.com', '_blank');
                    }}>
                      <Ghost className="h-4 w-4 text-yellow-500" /> Snapchat
                    </DropdownMenuItem>
                    {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                      <DropdownMenuItem className="cursor-pointer gap-2 py-2.5 border-t border-border/50" onClick={handleNativeShare}>
                        <Share2 className="h-4 w-4" /> System Share
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem className="cursor-pointer gap-2 py-2.5" onClick={handleCopyLink}>
                      <Link2 className="h-4 w-4" /> Copy Link
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            <div className="pt-2 border-t border-border/50">
              <ProductCustomization
                customizations={availableCustomizations}
                selectedIds={selectedCustomizationIds}
                onToggle={handleToggleCustomization}
                selectedPlacements={selectedPlacements}
                onPlacementChange={handlePlacementChange}
              />
            </div>

            <div className="pt-2 border-t border-border/50">
              <TieredPricingTable
                priceTiers={product.bulkPricingTiers || []}
                selectedQuantity={quantity}
                basePrice={Number(product.price)}
                onSelectTierQuantity={handleSelectTierQuantity}
              />
            </div>

            <QuoteRequestModal
              product={{ ...product, moq: product.minimumOrderQuantity, price: displayPrice }}
              quantity={quantity}
              onQuantityChange={setQuantity}
              selectedVariant={selectedVariant}
              selectedCustomizations={selectedCustomizations}
              quoteCalculation={quoteCalculation}
            />

            <ProductReviews
              productId={product.id}
              reviews={product.reviews || []}
              isLoggedIn={isLoggedIn}
            />

          </div>
        </div>

        {relatedProducts.length > 0 && (
          <section className="mt-20 pt-12 border-t border-border/60">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-primary">
                  Similar Gifts in {product.category?.name}
                </h2>
              </div>
              <Link href={`/corporate-gifts?category=${product.category?.slug}`}>
                <Button variant="link" className="text-primary p-0">
                  View Category &rarr;
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id || p.slug} product={{ ...p, category: p.category?.name, moq: p.minimumOrderQuantity, price: p.price }} />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
