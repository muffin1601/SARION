import Link from "next/link";
import { Home } from "lucide-react";

import { Button } from "@/components/ui/button";

/**
 * Root 404 page. Renders inside the root layout (theme-aware, dark-mode ready).
 */
export default function NotFound() {
  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center bg-background px-4 text-center text-foreground">
      <p className="font-heading text-5xl font-bold tracking-tight text-primary">
        404
      </p>
      <h1 className="mt-3 font-heading text-2xl font-bold tracking-tight">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <div className="mt-6">
        <Button asChild variant="brand">
          <Link href="/">
            <Home aria-hidden /> Back home
          </Link>
        </Button>
      </div>
      <nav aria-label="Popular pages" className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <Link href="/search" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Search the site
        </Link>
        <Link href="/blog" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Blog
        </Link>
        <Link href="/pricing" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Pricing
        </Link>
        <Link href="/contact" className="text-muted-foreground underline-offset-4 hover:text-foreground hover:underline">
          Contact
        </Link>
      </nav>
    </main>
  );
}
