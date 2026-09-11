'use client';

import { Button } from "@/components/ui/button";
import { approveReview, rejectReview } from "./actions";
import { toast } from "sonner";
import { useState } from "react";

export function ReviewActions({ reviewId, isVerified }: { reviewId: string, isVerified: boolean }) {
 const [loading, setLoading] = useState(false);

 const handleApprove = async () => {
 setLoading(true);
 const res = await approveReview(reviewId);
 if (res.error) toast.error(res.error);
 else toast.success("Review approved.");
 setLoading(false);
 };

 const handleReject = async () => {
 setLoading(true);
 const res = await rejectReview(reviewId);
 if (res.error) toast.error(res.error);
 else toast.success("Review rejected and deleted.");
 setLoading(false);
 };

 return (
 <div className="flex gap-2">
 {!isVerified && (
 <Button size="sm" onClick={handleApprove} disabled={loading}>Approve</Button>
 )}
 <Button size="sm" variant="destructive" onClick={handleReject} disabled={loading}>Reject (Delete)</Button>
 </div>
 );
}
