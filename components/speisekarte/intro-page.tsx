"use client"

import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

interface IntroPageProps {
  onOpen: () => void
}

export function IntroPage({ onOpen }: IntroPageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-muted/30 px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Decorative circle */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full border-2 border-accent opacity-30" />
        </div>

        {/* Title */}
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-foreground font-light mb-4 text-balance leading-tight">
          Unsere<br />
          <span className="text-accent font-semibold">Speisekarte</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground font-serif mb-6 text-balance">
          Kulinarische Reise durch Griechenland
        </p>

        {/* Description */}
        <p className="text-lg text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
          Blättern Sie durch unsere Menüs wie durch ein echtes Buch. 
          Entdecken Sie traditionelle griechische Gerichte und moderne Kreationen.
        </p>

        {/* CTA Button */}
        <Button
          onClick={onOpen}
          size="lg"
          className="rounded-full px-8 py-6 text-base font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-all shadow-lg hover:shadow-xl"
        >
          Speisekarte öffnen
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>

        {/* Footer hint */}
        <p className="mt-16 text-sm text-muted-foreground">
          Wischen Sie auf Mobilgeräten oder verwenden Sie die Pfeile
        </p>
      </div>
    </div>
  )
}
