import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export default async function CompanyPage() {
  const auth = await requireUser();
  
  // Find the first company the user is a member of
  const membership = await prisma.companyMember.findFirst({
    where: { userId: auth.user.id },
    include: { company: true }
  });

  const company = membership?.company;

  async function updateCompany(formData: FormData) {
    'use server';
    const auth = await requireUser();
    const companyId = formData.get('companyId') as string;
    
    // Validate authorization
    const isMember = await prisma.companyMember.findUnique({
      where: { companyId_userId: { companyId, userId: auth.user.id } }
    });
    
    if (!isMember) {
      throw new Error("Unauthorized");
    }

    await prisma.company.update({
      where: { id: companyId },
      data: {
        name: formData.get('name') as string,
        industry: formData.get('industry') as string,
        website: formData.get('website') as string,
        gstNumber: formData.get('gstNumber') as string,
      }
    });

    revalidatePath('/dashboard/company');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-serif font-medium">Company Profile</h3>
        <p className="text-sm text-muted-foreground">
          Manage your company details, billing addresses, and team members.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>
            View and update your company information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {company ? (
            <form action={updateCompany} className="space-y-4 max-w-md">
              <input type="hidden" name="companyId" value={company.id} />
              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input name="name" defaultValue={company.name} required />
              </div>
              <div className="space-y-2">
                <Label>Industry</Label>
                <Input name="industry" defaultValue={company.industry || ""} />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input name="website" defaultValue={company.website || ""} />
              </div>
              <div className="space-y-2">
                <Label>GST Number</Label>
                <Input name="gstNumber" defaultValue={company.gstNumber || ""} />
              </div>
              <Button type="submit">Update Details</Button>
            </form>
          ) : (
            <div className="text-sm text-muted-foreground">
              You are not currently linked to any company profile.
              <div className="mt-4">
                <Button variant="outline">Create Company Profile</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
