import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SavedBanner } from "@/components/dashboard/SavedBanner";
import { SettingsForm } from "@/components/dashboard/SettingsForm";

export default async function SettingsPage() {
  const auth = await requireUser();

  const user = await prisma.user.findUnique({
    where: { id: auth.user.id },
    select: { email: true, fullName: true, phone: true },
  });

  async function updateProfile(prevState: unknown, formData: FormData) {
    "use server";
    const auth = await requireUser();

    const fullName = (formData.get("fullName") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();

    await prisma.user.update({
      where: { id: auth.user.id },
      data: { fullName: fullName || null, phone: phone || null },
    });

    revalidatePath("/dashboard/settings");
    redirect("/dashboard/settings?saved=1");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-serif font-medium">Account Settings</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal account preferences.
        </p>
      </div>

      <Suspense>
        <SavedBanner message="Profile updated successfully!" />
      </Suspense>

      <Card className="max-w-lg">
        <CardHeader>
          <CardTitle>Profile Details</CardTitle>
          <CardDescription>
            Update your name and mobile number — changes are saved to your account immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SettingsForm
            email={user?.email ?? ""}
            fullName={user?.fullName ?? ""}
            phone={user?.phone ?? ""}
            updateProfile={updateProfile}
          />
        </CardContent>
      </Card>
    </div>
  );
}
