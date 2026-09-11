'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { toggleCompanyStatus, updateCompanyProfile } from "../actions";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CompanyActions({ companyId, isActive, companyData }: { companyId: string, isActive: boolean, companyData: any }) {
 const [loading, setLoading] = useState(false);
 const [open, setOpen] = useState(false);
 const [formData, setFormData] = useState({
 industry: companyData.industry || '',
 size: companyData.size || '',
 website: companyData.website || '',
 phone: companyData.phone || '',
 email: companyData.email || '',
 gstNumber: companyData.gstNumber || ''
 });

 const handleToggle = async () => {
 setLoading(true);
 const res = await toggleCompanyStatus(companyId, !isActive);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success(isActive ? "Company deactivated." : "Company activated.");
 }
 setLoading(false);
 };

 const handleEditSubmit = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoading(true);
 const res = await updateCompanyProfile(companyId, formData);
 if (res?.error) {
 toast.error(res.error);
 } else {
 toast.success("Company profile updated.");
 setOpen(false);
 }
 setLoading(false);
 };

 return (
 <div className="flex flex-col gap-2 mt-4">
 <Dialog open={open} onOpenChange={setOpen}>
 <DialogTrigger render={<Button variant="outline" className="w-full">Edit Profile</Button>} />
 <DialogContent>
 <DialogHeader>
 <DialogTitle>Edit Company Profile</DialogTitle>
 </DialogHeader>
 <form onSubmit={handleEditSubmit} className="space-y-4 py-4">
 <div className="grid grid-cols-2 gap-4">
 <div className="space-y-2">
 <Label htmlFor="industry">Industry</Label>
 <Input id="industry" value={formData.industry} onChange={e => setFormData(p => ({ ...p, industry: e.target.value }))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="size">Size</Label>
 <Input id="size" value={formData.size} onChange={e => setFormData(p => ({ ...p, size: e.target.value }))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="website">Website</Label>
 <Input id="website" value={formData.website} onChange={e => setFormData(p => ({ ...p, website: e.target.value }))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="email">Email</Label>
 <Input id="email" type="email" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="phone">Phone</Label>
 <Input id="phone" value={formData.phone} onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))} />
 </div>
 <div className="space-y-2">
 <Label htmlFor="gstNumber">GST Number</Label>
 <Input id="gstNumber" value={formData.gstNumber} onChange={e => setFormData(p => ({ ...p, gstNumber: e.target.value }))} />
 </div>
 </div>
 <DialogFooter>
 <Button type="submit" disabled={loading}>
 {loading ? "Saving..." : "Save Changes"}
 </Button>
 </DialogFooter>
 </form>
 </DialogContent>
 </Dialog>
 
 <Button 
 variant={isActive ? "destructive" : "default"}
 onClick={handleToggle}
 disabled={loading}
 className="w-full"
 >
 {isActive ? 'Deactivate Company' : 'Activate Company'}
 </Button>
 </div>
 );
}
