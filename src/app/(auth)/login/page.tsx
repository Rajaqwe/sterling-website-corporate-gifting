import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { login } from "../actions";
import { Mail, Lock } from "lucide-react";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";
import { GoogleLoginButton } from "@/components/auth/google-login-button";

export default async function LoginPage(
  props: {
    searchParams: Promise<{ message: string; type?: 'error' | 'success' }>;
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-primary">
          User Login
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Welcome back. Login to your corporate gifting account.
        </p>
      </div>

      <Card className="border shadow-sm rounded-xl">
        <CardContent className="space-y-5 px-8 pt-8 pb-2">
          {searchParams?.message && (
            <AutoDismissAlert
              message={searchParams.message}
              type={searchParams.type === 'success' ? 'success' : 'error'}
            />
          )}

          <div className="flex flex-col gap-3">
            <GoogleLoginButton />
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or login with email</span>
            </div>
          </div>

          <form action={login}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="name@company.com" required className="pl-10 h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <Link href="/forgot-password" className="text-xs font-medium text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" name="password" type="password" required className="pl-10 h-11" />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-sm font-semibold mt-2">Login with Email</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
