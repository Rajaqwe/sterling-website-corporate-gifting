'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toggleCustomerStatus, updateCustomerProfile } from "../actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CustomerActions({ userId, isActive, fullName, phone }: { userId: string, isActive: boolean, fullName?: string | null, phone?: string | null }) {
 const [loading, setLoading] = useState(false);
 const [open, setOpen] = useState(false);
 const [formData, setFormData] = useState({ fullName: fullName || '', phone: phone || '' });

 const handleToggle = async () => {
 setLoading(true);
 const res = await toggleCustomerStatus(userId, !isActive);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success(isActive ? "Account deactivated." : "Account activated.");
 }
 setLoading(false);
 };

 const handleEditSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 const res = await updateCustomerProfile(userId, formData);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Profile updated.");
 setOpen(false);
 }
 setLoading(false);
 };

 return (
 <div className="flex gap-2 mt-4 flex-wrap">
 <Button 
 variant={isActive ? "destructive" : "default"}
 onClick={handleToggle}
 disabled={loading}
 >
 {isActive ? 'Deactivate Account' : 'Activate Account'}
 </Button>

 <Dialog open={open} onOpenChange={setOpen}>
 <DialogTrigger render={<Button variant="outline">Edit Profile</Button>} />
 <DialogContent>
 <DialogHeader>
 <DialogTitle>Edit Customer Profile</DialogTitle>
 </DialogHeader>
 <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
 <div className="space-y-2">
 <Label htmlFor="fullName">Full Name</Label>
 <Input 
 id="fullName" 
 value={formData.fullName} 
 onChange={e => setFormData(p => ({ ...p, fullName: e.target.value }))}
 placeholder="John Doe" 
 />
 </div>
 <div className="space-y-2">
 <Label htmlFor="phone">Phone</Label>
 <Input 
 id="phone" 
 value={formData.phone} 
 onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
 placeholder="+1 555-0100" 
 />
 </div>
 <DialogFooter>
 <Button type="submit" disabled={loading}>
 {loading ? "Saving..." : "Save Changes"}
 </Button>
 </DialogFooter>
 </form>
 </DialogContent>
 </Dialog>
 </div>
 );
}
