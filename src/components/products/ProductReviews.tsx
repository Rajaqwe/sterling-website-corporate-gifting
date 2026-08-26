"use client";

import React, { useState, useTransition } from "react";
import { Star, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { submitReview } from "@/app/products/actions";

export function ProductReviews({ productId, reviews, isLoggedIn }: { productId: string, reviews: any[], isLoggedIn: boolean }) {
  const [isPending, startTransition] = useTransition();
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [showForm, setShowForm] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please log in to submit a review");
      return;
    }

    startTransition(async () => {
      const res = await submitReview(productId, rating, content, title);
      if (res.success) {
        toast.success("Review submitted successfully!");
        setShowForm(false);
        setContent("");
        setTitle("");
        setRating(5);
      } else {
        toast.error(res.error || "Failed to submit review");
      }
    });
  };

  if (!reviews || reviews.length === 0) {
    return (
      <div className="w-full bg-card rounded-2xl border border-border/60 p-6 shadow-xs mt-10">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Customer Reviews</h3>
          <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
            Write a Review
          </Button>
        </div>
        {showForm && (
          <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-4 border-t border-border/40 pt-4">
             <div className="flex items-center gap-2">
               <span className="text-sm font-semibold">Rating:</span>
               {[1,2,3,4,5].map(star => (
                 <button key={star} type="button" onClick={() => setRating(star)}>
                   <Star className={`h-5 w-5 ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                 </button>
               ))}
             </div>
             <input 
               type="text" 
               placeholder="Review Title" 
               value={title} 
               onChange={(e) => setTitle(e.target.value)}
               className="p-2 border border-border/60 rounded-md text-sm bg-background"
               required
             />
             <textarea 
               placeholder="Share your thoughts..."
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="p-2 border border-border/60 rounded-md text-sm min-h-[100px] bg-background"
               required
             />
             <Button type="submit" disabled={isPending} className="self-end bg-accent text-primary font-bold">
               {isPending ? "Submitting..." : "Submit Review"}
             </Button>
          </form>
        )}
        {!showForm && (
          <p className="text-sm text-muted-foreground mt-4">No reviews yet. Be the first to review this product!</p>
        )}
      </div>
    );
  }

  return (
    <div className="w-full bg-card rounded-2xl border border-border/60 p-6 shadow-xs mt-10">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-serif font-bold text-primary">Customer Reviews ({reviews.length})</h3>
        <Button variant="outline" size="sm" onClick={() => setShowForm(!showForm)}>
          Write a Review
        </Button>
      </div>
      
      {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-4 border-b border-border/40 pb-6">
             <div className="flex items-center gap-2">
               <span className="text-sm font-semibold">Rating:</span>
               {[1,2,3,4,5].map(star => (
                 <button key={star} type="button" onClick={() => setRating(star)}>
                   <Star className={`h-5 w-5 ${rating >= star ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground'}`} />
                 </button>
               ))}
             </div>
             <input 
               type="text" 
               placeholder="Review Title" 
               value={title} 
               onChange={(e) => setTitle(e.target.value)}
               className="p-2 border border-border/60 rounded-md text-sm bg-background"
               required
             />
             <textarea 
               placeholder="Share your thoughts..."
               value={content}
               onChange={(e) => setContent(e.target.value)}
               className="p-2 border border-border/60 rounded-md text-sm min-h-[100px] bg-background"
               required
             />
             <Button type="submit" disabled={isPending} className="self-end bg-accent text-primary font-bold">
               {isPending ? "Submitting..." : "Submit Review"}
             </Button>
          </form>
      )}

      <div className="flex flex-col gap-6">
        {reviews.map((r: any) => (
          <div key={r.id} className="flex flex-col gap-2 pb-4 border-b border-border/40 last:border-0">
            <div className="flex items-center gap-2">
               <div className="flex">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className={`h-3.5 w-3.5 ${i < r.rating ? 'fill-amber-400 text-amber-400' : 'text-muted-foreground/30'}`} />
                 ))}
               </div>
               <span className="text-xs font-semibold">{r.title}</span>
            </div>
            <p className="text-sm text-muted-foreground">{r.content}</p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
              <User className="h-3 w-3" />
              <span>{r.user?.fullName || r.user?.email || 'Verified Customer'}</span>
              <span>•</span>
              <span>{new Date(r.createdAt).toLocaleDateString()}</span>
              {r.isVerified && <span className="text-emerald-600 font-semibold">• Verified Purchase</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
