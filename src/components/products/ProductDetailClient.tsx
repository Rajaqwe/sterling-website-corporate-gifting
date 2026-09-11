"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ProductGallery } from "@/components/products/ProductGallery";
import { ProductSpecifications } from "@/components/products/ProductSpecifications";
import { ProductReviews } from "@/components/products/ProductReviews";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, Star, Heart, Share2, MessageCircle, Ghost, Link2, Clock3, PackageCheck, Palette } from "lucide-react";
import { toggleWishlist, toggleLike } from "@/app/products/actions";
import { toast } from "sonner";
import { useTransition } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatINR } from "@/lib/currency";
import { ProductConfiguratorClient } from "@/components/products/ProductConfiguratorClient";

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
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likeCount, setLikeCount] = useState(product.likes || 0);
  const [isLiking, setIsLiking] = useState(false);
  const [isPending, startTransition] = useTransition();

  const title = product.name || "Corporate Gift";
  const displayPrice = product.price;
  const displaySku = product.sku;
  const leadTimeLabel = product.leadTimeDays ? `${product.leadTimeDays} business days` : "Lead time confirmed with your quote";
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

  const handleLike = async () => {
    if (!isLoggedIn) {
      toast.error("Please log in to like items.");
      return;
    }

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikeCount((prev: number) => newIsLiked ? prev + 1 : prev - 1);
    setIsLiking(true);

    try {
      const res = await toggleLike(product.id);
      if (res.success) {
        setLikeCount(res.likes); 
        setIsLiked(res.isLiked);
      } else {
        toast.error(res.error || "Failed to register like.");
        setIsLiked(!newIsLiked);
        setLikeCount((prev: number) => !newIsLiked ? prev + 1 : prev - 1);
      }
    } catch (err) {
      toast.error("Failed to register like.");
      setIsLiked(!newIsLiked);
      setLikeCount((prev: number) => !newIsLiked ? prev + 1 : prev - 1);
    } finally {
      setIsLiking(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background pb-24 pt-20">
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

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-10">
            <ProductGallery
              images={product.media?.map((m: any) => m.url) || []}
              title={title}
              badge={product.isFeatured ? "Featured" : ""}
              moq={product.minimumOrderQuantity}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
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

            <div className="rounded-2xl border border-primary/15 bg-primary/[0.035] p-5">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Starting at</span>
                  <div className="mt-1 flex items-baseline gap-1.5"><span className="text-3xl font-bold tracking-tight text-primary">{formatINR(Number(displayPrice))}</span><span className="text-sm text-muted-foreground">/ unit</span></div>
                </div>
                <span className="rounded-full bg-card px-3 py-1.5 text-xs font-semibold text-primary shadow-sm ring-1 ring-border/70">MOQ {product.minimumOrderQuantity} units</span>
              </div>
              <div className="mt-5 grid gap-3 border-t border-primary/10 pt-4 sm:grid-cols-3">
                <div className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><Palette className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong className="block text-foreground">{product.brandingAvailable !== false ? "Branding available" : "Branding availability"}</strong>{product.brandingAvailable !== false ? "Choose options below." : "Confirm with our team."}</span></div>
                <div className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong className="block text-foreground">Lead time</strong>{leadTimeLabel}</span></div>
                <div className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><PackageCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><span><strong className="block text-foreground">Bulk-ready</strong>Volume pricing shown below.</span></div>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-xs text-muted-foreground mt-2">
              <div><span className="font-semibold text-foreground">SKU:</span> {displaySku}</div>
              <div><span className="font-semibold text-foreground">Availability:</span> {product.stockStatus === 'IN_STOCK' ? <span className="text-emerald-600 font-semibold">In Stock</span> : <span className="text-amber-600 font-semibold">{product.stockStatus}</span>}</div>
            </div>

            <div className="pt-2 border-t border-border/50 flex items-center gap-2">
              <Button
                variant="outline"
                className={`h-10 flex items-center justify-center gap-1.5 transition-all px-3 ${isLiked ? "border-red-200 bg-red-50/50 dark:bg-red-950/20" : ""}`}
                onClick={handleLike}
                disabled={isLiking}
                aria-label="Like Product"
              >
                <Heart className={`h-4 w-4 ${isLiking ? "scale-110" : ""} ${isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                {likeCount > 0 && <span className={`text-xs font-semibold ${isLiked ? "text-red-600" : "text-foreground"}`}>{likeCount}</span>}
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger className="h-10 w-10 flex items-center justify-center border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md" aria-label="Share">
                  <Share2 className="h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48 bg-card shadow-lg rounded-xl border border-border/60">
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

              <p className="text-xs text-muted-foreground ml-1">
                Scroll down to configure &amp; add to cart
              </p>
            </div>

            <ProductSpecifications
              specifications={{
                materials: product.material ? [product.material] : undefined,
                dimensions: product.dimensions,
                weight: product.weight ? `${product.weight} kg` : undefined,
                imprintArea: product.technicalSpecifications?.imprintArea,
                countryOfOrigin: product.technicalSpecifications?.countryOfOrigin
              }}
              leadTime={leadTimeLabel}
            />
          </div>
        </div>

        {/* Configuration and Live Estimator */}
        <div className="mt-16">
          <ProductConfiguratorClient 
            product={product} 
            availableCustomizations={product.brandingOptions || []} 
            initialVariantId={product.variants?.[0]?.id || ""}
          />
        </div>

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 flex flex-col gap-10">
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
              <Link href={`/corporate-gifts?category=${product.category?.slug}`} className="text-primary hover:underline text-sm font-medium">
                  View Category &rarr;
              </Link>
            </div>

            <div className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-6 pb-4 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:overflow-visible sm:snap-none">
              {relatedProducts.map((p) => (
                <div key={p.id || p.slug} className="min-w-[280px] w-[80vw] sm:w-auto sm:min-w-0 snap-center shrink-0">
                  <ProductCard product={{ ...p, category: p.category?.name, moq: p.minimumOrderQuantity, price: p.price }} />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
