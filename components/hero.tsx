import Link from "next/link"
import { Star, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

interface HeroProps {
  content: HomepageContent["hero"]
  contact: HomepageContent["contactInfo"]
}

export function Hero({ content, contact }: HeroProps) {
  return (
    <section className="relative min-h-screen flex justify-start overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${content.backgroundImageUrl}')`,
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

                <span className="text-card font-semibold">{content.ratingValue}</span>
              </div>
              <span className="text-card/80 text-sm">{content.ratingLabel}</span>
            </div>
            <div className="bg-card/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <span className="text-card text-sm">{content.ratingCountLabel}</span>
            </div>
          </div>

          {/* Main Headline */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-card font-medium leading-tight mb-4 sm:mb-6 text-balance">
            {content.headlinePart1}
            <br />
            <span className="text-accent">{content.headlineAccent}</span>{content.headlinePart2}
          </h1>

          {/* Subheadline */}
          <p className="text-left text-card/90 text-base sm:text-lg md:text-xl max-w-2xl mb-6 sm:mb-10 leading-relaxed text-pretty px-2">
            {content.subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-start gap-3 sm:gap-4 mb-8 sm:mb-12 w-full px-4 sm:px-0">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
            >
              <Link href={contact.reservationUrl}>{content.primaryButtonLabel}</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-card/50 text-card hover:bg-card/10 hover:text-card rounded-full px-6 sm:px-8 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
            >
              <Link href="#speisekarte">{content.secondaryButtonLabel}</Link>
            </Button>
          </div>

          {/* Info Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-start items-start text-left gap-3 sm:gap-8 text-card/80 text-xs sm:text-sm px-4 text-center">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>{contact.addressLine1}, {contact.addressLine2}</span>
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
