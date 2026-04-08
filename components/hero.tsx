import Link from "next/link"
import { Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=2074&auto=format&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="text-card font-semibold">4,9</span>
              </div>
              <span className="text-card/80 text-sm">Bewertung</span>
            </div>
            <div className="bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-card text-sm">423 Google Bewertungen</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-card font-medium leading-tight mb-6 text-balance">
            Authentisch griechisch
            <br />
            <span className="text-accent">genießen</span> in Leipzig
          </h1>

          {/* Subheadline */}
          <p className="text-card/90 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
            Erleben Sie die Wärme mediterraner Gastfreundschaft mit frischen Zutaten, 
            traditionellen Rezepten und einer eleganten Atmosphäre, die Sie an die Küsten 
            Griechenlands entführt.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 py-6 text-lg font-medium"
            >
              <Link href="#reservieren">Tisch reservieren</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-card/50 text-card hover:bg-card/10 hover:text-card rounded-full px-8 py-6 text-lg font-medium"
            >
              <Link href="#speisekarte">Speisekarte ansehen</Link>
            </Button>
          </div>

          {/* Info Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-card/80 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>Altes Dorf 16, 04349 Leipzig</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span>Di-Sa: 17:00 - 23:00 | So: 11:30 - 23:00</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-card/60">
          <span className="text-xs uppercase tracking-widest">Entdecken</span>
          <div className="w-px h-12 bg-gradient-to-b from-card/60 to-transparent" />
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
