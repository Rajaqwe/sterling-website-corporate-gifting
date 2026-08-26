import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const auth = await requireUser();
  
  const user = await prisma.user.findUnique({
    where: { id: auth.user.id }
  });

  async function updateProfile(formData: FormData) {
    'use server';
    const auth = await requireUser();
    
    await prisma.user.update({
      where: { id: auth.user.id },
      data: {
        fullName: formData.get('fullName') as string,
        phone: formData.get('phone') as string,
      }
    });

    revalidatePath('/dashboard/settings');
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-serif font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground">
          Manage your personal account preferences and password.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Update your personal information.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateProfile} className="space-y-4 max-w-md">
            <div className="space-y-2">
              <Label>Email</Label>
              <Input disabled defaultValue={user?.email} className="bg-muted" />
              <p className="text-xs text-muted-foreground">Email changes must be done via Support.</p>
            </div>
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input name="fullName" defaultValue={user?.fullName || ""} />
            </div>
            <div className="space-y-2">
              <Label>Phone Number</Label>
              <Input name="phone" defaultValue={user?.phone || ""} />
            </div>
            <Button type="submit">Update Profile</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
