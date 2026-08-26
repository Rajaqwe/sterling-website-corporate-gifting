'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Lock } from "lucide-react";
import { updatePassword } from "../actions";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";
import { createBrowserClient } from "@supabase/ssr";
import { useEffect } from "react";

export default function ResetPasswordPage({
  searchParams,
}: {
  searchParams: { message: string; type?: 'error' | 'success' };
}) {
  useEffect(() => {
    // This automatically parses any #access_token fragments in the URL from the email link
    // and sets the secure session cookies so the Server Action can read them!
    createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }, []);
  return (
    <Card className="border shadow-sm rounded-xl">
      <CardHeader className="space-y-1 px-8 pt-8 pb-0">
        <CardTitle className="text-2xl text-center font-serif">Set New Password</CardTitle>
        <CardDescription className="text-center">
          Please enter your new password below.
        </CardDescription>
      </CardHeader>
      <form action={updatePassword}>
        <CardContent className="space-y-5 px-8 pt-6 pb-2">
          {searchParams?.message && (
            <AutoDismissAlert 
              message={searchParams.message} 
              type={searchParams.type === 'success' ? 'success' : 'error'} 
            />
          )}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="password" name="password" type="password" placeholder="••••••••" required className="pl-10 h-11" minLength={6} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4 px-8 pb-8">
          <Button type="submit" className="w-full h-11 text-sm font-semibold">Update Password</Button>
          <div className="text-center text-sm text-muted-foreground">
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
