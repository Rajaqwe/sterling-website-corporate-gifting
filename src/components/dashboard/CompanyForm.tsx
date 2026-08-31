"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButton";

interface CompanyFormProps {
  companyId: string;
  name: string;
  industry: string;
  website: string;
  gstNumber: string;
  updateCompany: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | void>;
}

export function CompanyForm({
  companyId,
  name,
  industry,
  website,
  gstNumber,
  updateCompany,
}: CompanyFormProps) {
  const [cur, setCur] = useState({ name, industry, website, gstNumber });
  const [state, formAction] = useActionState(updateCompany, null as any);

  const isComplete =
    cur.name.trim().length > 0 &&
    cur.industry.trim().length > 0 &&
    cur.website.trim().length > 0 &&
    cur.gstNumber.trim().length > 0;

  const isDirty =
    cur.name.trim() !== name.trim() ||
    cur.industry.trim() !== industry.trim() ||
    cur.website.trim() !== website.trim() ||
    cur.gstNumber.trim() !== gstNumber.trim();

  const buttonVariant = isDirty ? "default" : isComplete ? "outline" : "default";

  const set = (field: keyof typeof cur) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setCur((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
          {state.error}
        </div>
      )}
      <input type="hidden" name="companyId" value={companyId} />

      {/* Company Name */}
      <div className="space-y-1.5">
        <Label htmlFor="name">
          Company Name <span className="text-destructive">*</span>
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="e.g. Acme Pvt. Ltd."
          value={cur.name}
          onChange={set("name")}
          required
        />
      </div>

      {/* Industry */}
      <div className="space-y-1.5">
        <Label htmlFor="industry">Industry</Label>
        <Input
          id="industry"
          name="industry"
          placeholder="e.g. Technology, FMCG, Finance"
          value={cur.industry}
          onChange={set("industry")}
        />
      </div>

      {/* Website */}
      <div className="space-y-1.5">
        <Label htmlFor="website">Website</Label>
        <Input
          id="website"
          name="website"
          type="url"
          placeholder="https://yourcompany.com"
          value={cur.website}
          onChange={set("website")}
        />
      </div>

      {/* GST */}
      <div className="space-y-1.5">
        <Label htmlFor="gstNumber">GST Number</Label>
        <Input
          id="gstNumber"
          name="gstNumber"
          placeholder="e.g. 29ABCDE1234F1Z5"
          value={cur.gstNumber}
          onChange={set("gstNumber")}
        />
        <p className="text-xs text-muted-foreground">
          Required for GST invoicing on bulk orders.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton variant={buttonVariant as any} className="w-full sm:w-auto">
          {isComplete && !isDirty ? "✓ Details Complete" : "Save Company Details"}
        </SubmitButton>
        {isComplete && !isDirty && (
          <p className="text-xs text-muted-foreground">All company details are up to date.</p>
        )}
      </div>
    </form>
  );
}
