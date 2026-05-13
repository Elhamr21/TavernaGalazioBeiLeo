"use client"

import Link from "next/link"
import { MenuFlipbook } from "@/components/speisekarte/menu-flipbook"
import { Button } from "@/components/ui/button"
import { Home, Phone } from "lucide-react"

export default function SpeisekartePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 text-foreground hover:text-accent transition-colors flex-shrink-0"
            >
              <Home className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-serif text-sm sm:text-xl hidden xs:inline">Taverna Galazio</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="tel:+493412628561"
                className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="hidden sm:inline text-xs sm:text-sm">0341 262 856 1</span>
              </a>
              <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm px-3 sm:px-4 py-2">
                <Link href="/#reservieren">Reservieren</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden bg-background">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-[1800px] flex-col px-3 py-4 sm:px-5 lg:px-8">
          {/* Back to Homepage Button */}
          <div className="mb-2 sm:mb-3">
            <Button
              asChild
              variant="outline"
              className="rounded-full border-primary/15 bg-background/80 px-4 text-xs shadow-sm backdrop-blur-sm hover:bg-background sm:px-6 sm:text-sm"
            >
              <Link href="/">← Home</Link>
            </Button>
          </div>

          {/* Flipbook */}
          <MenuFlipbook />
        </div>
      </main>
    </div>
  )
}
