import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { signup, signInWithOAuth } from "../actions";
import { User, Building2, Mail, Lock } from "lucide-react";
import { AutoDismissAlert } from "@/components/ui/auto-dismiss-alert";

export default async function RegisterPage(
  props: {
    searchParams: Promise<{ message: string; type?: 'error' | 'success' }>;
  }
) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-serif font-bold text-primary">
          Create an Account
        </h2>
        <p className="mt-2 text-muted-foreground text-sm">
          Sign up to manage your corporate gifting account
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
            <form action={signInWithOAuth.bind(null, 'google')}>
              <Button variant="outline" className="w-full bg-background text-black hover:bg-gray-50 font-medium h-11" type="submit">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Sign up with Google
              </Button>
            </form>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or sign up with email</span>
            </div>
          </div>

          <form action={signup}>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="text-sm font-medium">First name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input id="firstName" name="firstName" required className="pl-10 h-11" placeholder="Jane" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last name</Label>
                  <Input id="lastName" name="lastName" required className="h-11" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyName" className="text-sm font-medium">Company name</Label>
                <div className="relative">
                  <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="companyName" name="companyName" required className="pl-10 h-11" placeholder="Acme Corporation" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Work Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="email" name="email" type="email" placeholder="name@company.com" required className="pl-10 h-11" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input id="password" name="password" type="password" required className="pl-10 h-11" placeholder="••••••••" />
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-sm font-semibold mt-2">Create account</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 px-8 pb-8">
          <div className="text-center text-sm text-muted-foreground pt-2 w-full">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
