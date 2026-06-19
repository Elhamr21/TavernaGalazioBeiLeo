import Link from "next/link"
import { Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  return (
    <section className="relative min-h-screen flex justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('images/photoforevents.jpg')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/50 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16">
        <div className="max-w-4xl text-left">
          <br></br>
                <br></br>
                <br></br>
          {/* Trust Bar */}
          <div className="flex flex-wrap items-center justify-start gap-4 md:gap-8 mb-8">
            <div className="flex items-center gap-2 bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                
                <span className="text-card font-semibold">4,9</span>
              </div>
              <span className="text-card/80 text-sm">Bewertung</span>
            </div>
            <div className="bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-card text-sm">533 Google Bewertungen</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-card font-medium leading-tight mb-4 sm:mb-6 text-balance">
            Authentisch griechisch
            <br />
            <span className="text-accent">genießen</span> in Leipzig
          </h1>

          {/* Subheadline */}
          <p className="text-left text-card/90 text-base sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-10 leading-relaxed text-pretty px-2">
  Erleben Sie die Wärme mediterraner Gastfreundschaft mit frischen Zutaten,
  traditionellen Rezepten und einer eleganten Atmosphäre, die Sie an die Küsten
  Griechenlands entführt.
</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 w-full px-4 sm:px-0">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
            >
              <Link href="https://reservation.dish.co/widget/hydra-56ceb440-f22d-11ec-a5b8-61d0b9e3e1b5">Tisch reservieren</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-card/50 text-card hover:bg-card/10 hover:text-card rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
            >
              <Link href="#speisekarte">Speisekarte ansehen</Link>
            </Button>
{/* <Button
  asChild
  className="bg-slate-900 text-white hover:bg-slate-800 rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
>
  <Link href="https://main.d108ethabimuhp.amplifyapp.com/">
    Cafe La Vita
  </Link>
</Button> */}
          </div>

          {/* Info Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-start items-start text-left gap-3 sm:gap-8 text-card/80 text-xs sm:text-sm px-4 text-center">
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
