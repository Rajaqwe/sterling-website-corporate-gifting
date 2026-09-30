import { buttonVariants } from "@/components/ui/button";
import Link from 'next/link'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center motion-safe:animate-fade-up">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-black tracking-[-0.05em] text-primary/10">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-primary sm:text-3xl">
            Page not found
          </h2>
          <p className="text-muted-foreground">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/" className={buttonVariants({ variant: "default", className: "w-full sm:w-auto" })}>
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          <Link href="/corporate-gifts" className={buttonVariants({ variant: "outline", className: "w-full sm:w-auto" })}>
              <Search className="mr-2 h-4 w-4" />
              Browse Gifts
            </Link>
        </div>
      </div>
    </div>
  )
}
