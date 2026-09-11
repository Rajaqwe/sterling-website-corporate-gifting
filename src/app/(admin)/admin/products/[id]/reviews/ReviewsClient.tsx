'use client';

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { addReview, updateReview, deleteReview } from "./actions";
import { Star, Trash2, Edit } from "lucide-react";

export function ReviewsClient({ productId, initialReviews, users }: { productId: string, initialReviews: any[], users: any[] }) {
  const [reviews, setReviews] = useState(initialReviews);
  const [isPending, startTransition] = useTransition();
  const [isOpen, setIsOpen] = useState(false);
  const [editingReview, setEditingReview] = useState<any | null>(null);

  const [formData, setFormData] = useState({
    userId: "",
    rating: 5,
    title: "",
    content: "",
    isVerified: true
  });

  const handleOpenAdd = () => {
    setEditingReview(null);
    setFormData({ userId: users[0]?.id || "", rating: 5, title: "", content: "", isVerified: true });
    setIsOpen(true);
  };

  const handleOpenEdit = (review: any) => {
    setEditingReview(review);
    setFormData({
      userId: review.userId,
      rating: review.rating,
      title: review.title || "",
      content: review.content || "",
      isVerified: review.isVerified
    });
    setIsOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this review?")) {
      startTransition(async () => {
        await deleteReview(id);
        setReviews(reviews.filter((r) => r.id !== id));
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      if (editingReview) {
        await updateReview(editingReview.id, formData);
        setReviews(reviews.map((r) => r.id === editingReview.id ? { ...r, ...formData } : r));
      } else {
        await addReview(productId, formData);
        // Quick local state update or could rely on revalidatePath to refresh page data
        // For simplicity, we just reload window or assume revalidatePath does it
        window.location.reload();
      }
      setIsOpen(false);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customer Reviews</h2>
        <Button onClick={handleOpenAdd}>Add Review</Button>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No reviews found for this product.
                </TableCell>
              </TableRow>
            ) : (
              reviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>
                    {review.user?.fullName || review.user?.email || review.userId}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"}`} />
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{review.title}</TableCell>
                  <TableCell className="max-w-[200px] truncate" title={review.content}>{review.content}</TableCell>
                  <TableCell>{review.isVerified ? "Yes" : "No"}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon" onClick={() => handleOpenEdit(review)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleDelete(review.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingReview ? "Edit Review" : "Add Review"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!editingReview && (
              <div className="space-y-2">
                <Label>User</Label>
                <Select value={formData.userId} onValueChange={(val) => setFormData({ ...formData, userId: val ?? "" })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a user" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((u) => (
                      <SelectItem key={u.id} value={u.id}>
                        {u.fullName ? `${u.fullName} (${u.email})` : u.email}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            
            <div className="space-y-2">
              <Label>Rating (1-5)</Label>
              <Input 
                type="number" 
                min={1} max={5} 
                value={formData.rating} 
                onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })} 
                required 
              />
            </div>

            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                value={formData.title} 
                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
              />
            </div>

            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea 
                value={formData.content} 
                onChange={(e) => setFormData({ ...formData, content: e.target.value })} 
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                id="isVerified"
                checked={formData.isVerified}
                onChange={(e) => setFormData({ ...formData, isVerified: e.target.checked })}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="isVerified">Verified Purchase</Label>
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? "Saving..." : "Save Review"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
