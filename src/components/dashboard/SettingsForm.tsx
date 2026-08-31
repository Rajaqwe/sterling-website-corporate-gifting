"use client";

import { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SubmitButton } from "./SubmitButton";

interface SettingsFormProps {
  email: string;
  fullName: string;
  phone: string;
  updateProfile: (prevState: unknown, formData: FormData) => Promise<{ error?: string } | void>;
}

export function SettingsForm({ email, fullName, phone, updateProfile }: SettingsFormProps) {
  const [currentName, setCurrentName] = useState(fullName);
  const [currentPhone, setCurrentPhone] = useState(phone);
  const [state, formAction] = useActionState(updateProfile, null as any);

  // "Complete" means both editable fields have content
  const isComplete = currentName.trim().length > 0 && currentPhone.trim().length > 0;

  // "Dirty" means values differ from what was saved
  const isDirty = currentName.trim() !== fullName.trim() || currentPhone.trim() !== phone.trim();

  // Highlight (primary) only if something changed; outline when all is already saved and complete
  const buttonVariant = isDirty ? "default" : isComplete ? "outline" : "default";

  return (
    <form action={formAction} className="space-y-5">
      {state?.error && (
        <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive border border-destructive/20">
          {state.error}
        </div>
      )}
      {/* Email — read-only */}
      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          disabled
          defaultValue={email}
          className="bg-muted cursor-not-allowed"
        />
        <p className="text-xs text-muted-foreground">
          Email changes require contacting Support.
        </p>
      </div>

      {/* Full Name */}
      <div className="space-y-1.5">
        <Label htmlFor="fullName">Full Name</Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="e.g. Rahul Sharma"
          value={currentName}
          onChange={(e) => setCurrentName(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="space-y-1.5">
        <Label htmlFor="phone">Mobile Number</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          placeholder="e.g. +91 98765 43210"
          value={currentPhone}
          onChange={(e) => setCurrentPhone(e.target.value)}
        />
        <p className="text-xs text-muted-foreground">
          Used for order updates and quote follow-ups.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <SubmitButton variant={buttonVariant as any} className="w-full sm:w-auto">
          {isComplete && !isDirty ? "✓ Profile Complete" : "Save Changes"}
        </SubmitButton>
        {isComplete && !isDirty && (
          <p className="text-xs text-muted-foreground">All details are up to date.</p>
        )}
      </div>
    </form>
  );
}
