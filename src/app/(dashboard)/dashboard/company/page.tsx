import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { requireUser } from "@/lib/auth/server";
import { prisma } from "@/lib/prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { SavedBanner } from "@/components/dashboard/SavedBanner";
import { CompanyForm } from "@/components/dashboard/CompanyForm";
import { Building2, Mail } from "lucide-react";
import Link from "next/link";

export default async function CompanyPage() {
  const auth = await requireUser();

  const membership = await prisma.companyMember.findFirst({
    where: { userId: auth.user.id },
    include: { company: true },
  });

  const company = membership?.company;

  async function updateCompany(prevState: unknown, formData: FormData) {
    "use server";
    const auth = await requireUser();
    const companyId = formData.get("companyId") as string;

    const membership = await prisma.companyMember.findUnique({
      where: { companyId_userId: { companyId, userId: auth.user.id } },
    });
    if (!membership || !membership.isActive || membership.role !== "COMPANY_ADMIN") {
      return { error: "You don't have permission to edit this company." };
    }

    const name = (formData.get("name") as string)?.trim() ?? "";
    const website = (formData.get("website") as string)?.trim() || null;
    const gstNumber = (formData.get("gstNumber") as string)?.trim() || null;
    const industry = (formData.get("industry") as string)?.trim() || null;

    if (name.length < 2 || name.length > 150) {
      return { error: "Company name must be between 2 and 150 characters." };
    }
    if (website && !/^https?:\/\/.+\..+/.test(website)) {
      return { error: "Website must be a valid URL starting with http:// or https://" };
    }
    if (gstNumber && (gstNumber.length < 5 || gstNumber.length > 20)) {
      return { error: "GST number must be between 5 and 20 characters." };
    }

    await prisma.company.update({
      where: { id: companyId },
      data: { name, industry, website, gstNumber },
    });

    revalidatePath("/dashboard/company");
    redirect("/dashboard/company?saved=1");
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-serif font-medium">Company Profile</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your company details and billing information.
        </p>
      </div>

      <Suspense>
        <SavedBanner message="Company details saved successfully!" />
      </Suspense>

      {company ? (
        <Card className="max-w-lg">
          <CardHeader>
            <CardTitle>Company Details</CardTitle>
            <CardDescription>
              Keep your company information accurate for invoicing and quote processing.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CompanyForm
              companyId={company.id}
              name={company.name ?? ""}
              industry={company.industry ?? ""}
              website={company.website ?? ""}
              gstNumber={company.gstNumber ?? ""}
              updateCompany={updateCompany}
            />
          </CardContent>
        </Card>
      ) : (
        /* ── Not linked to a company ── */
        <Card className="max-w-lg">
          <CardContent className="flex flex-col items-center py-12 text-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Building2 className="h-8 w-8 text-primary/60" />
            </div>
            <div>
              <p className="text-base font-medium">No Company Profile Linked</p>
              <p className="text-sm text-muted-foreground mt-1 max-w-xs">
                Your account isn&apos;t linked to a company yet. Contact our support team to
                create or connect a company profile for bulk ordering and GST invoicing.
              </p>
            </div>
            <Button variant="outline" size="sm">
              <Link href="mailto:support@sterlinggifting.com" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Contact Support
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
