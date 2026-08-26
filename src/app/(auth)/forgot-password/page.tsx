import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Mail } from "lucide-react";
import { resetPassword } from "../actions";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";

export default function ForgotPasswordPage({
  searchParams,
}: {
  searchParams: { message: string; type?: 'error' | 'success' };
}) {
  return (
    <Card className="border shadow-sm rounded-xl">
      <CardHeader className="space-y-1 px-8 pt-8 pb-0">
        <CardTitle className="text-2xl text-center font-serif">Reset Password</CardTitle>
        <CardDescription className="text-center">
          Enter your email address and we will send you a password reset link
        </CardDescription>
      </CardHeader>
      <form action={resetPassword}>
        <CardContent className="space-y-5 px-8 pt-6 pb-2">
          {searchParams?.message && (
            <AutoDismissAlert 
              message={searchParams.message} 
              type={searchParams.type === 'success' ? 'success' : 'error'} 
            />
          )}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input id="email" name="email" type="email" placeholder="name@company.com" required className="pl-10 h-11" />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 pt-4 px-8 pb-8">
          <Button type="submit" className="w-full h-11 text-sm font-semibold">Send Reset Link</Button>
          <div className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Back to sign in
            </Link>
          </div>
        </CardFooter>
      </form>
    </Card>
  );
}
