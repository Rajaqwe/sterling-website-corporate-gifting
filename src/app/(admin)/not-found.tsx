import { FileQuestion } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function AdminNotFound() {
 return (
 <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
 <div className="rounded-full bg-secondary/30 p-6 mb-6">
 <FileQuestion className="h-12 w-12 text-primary" />
 </div>
 <h1 className="text-3xl font-serif font-bold tracking-tight text-primary sm:text-4xl">Page Not Found</h1>
 <p className="mt-4 text-muted-foreground max-w-md">
 We couldn't find the admin page you're looking for. It might have been moved or deleted.
 </p>
 <div className="mt-8">
 <Link href="/admin" className={buttonVariants()}>
 Back to Dashboard
 </Link>
 </div>
 </div>
 );
}
