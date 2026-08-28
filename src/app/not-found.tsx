import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Search, Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <div className="space-y-6 max-w-md">
        <h1 className="text-8xl font-black text-slate-200">404</h1>
        
        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Page not found
          </h2>
          <p className="text-slate-500">
            Sorry, we couldn't find the page you're looking for. It might have been moved or doesn't exist.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="default" className="w-full">
              <Home className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <Link href="/corporate-gifts" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Browse Gifts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
