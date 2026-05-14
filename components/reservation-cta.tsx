import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

const reservationUrl = "https://reservation.dish.co/widget/hydra-56ceb440-f22d-11ec-a5b8-61d0b9e3e1b5"

export function ReservationCTA() {
  return (
    <section id="reservieren" className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop')`,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4 sm:mb-6 text-balance">
            Bereit für ein authentisch
            <br className="hidden sm:inline" />
            <span className="text-accent">griechisches Erlebnis?</span>
          </h2>
          <p className="text-primary-foreground/80 text-base sm:text-lg md:text-xl leading-relaxed mb-6 sm:mb-10 max-w-2xl mx-auto px-4">
            Erleben Sie einen unvergesslichen Abend mit mediterranen Aromen, herzlicher 
            Gastfreundschaft und elegantem Ambiente. Reservieren Sie noch heute Ihren Tisch.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 w-full px-4 sm:px-0">
            <Button
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-8 sm:px-10 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
            >
              <a href={reservationUrl}>Online buchen</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-8 sm:px-10 py-3 sm:py-6 text-base sm:text-lg font-medium w-full sm:w-auto"
            >
              <a href="tel:+4934156113223" className="flex items-center justify-center gap-2">
                <Phone className="h-4 sm:h-5 w-4 sm:w-5" />
                <span className="hidden sm:inline">+49 341 56113223</span>
                <span className="sm:hidden">Anrufen</span>
              </a>
            </Button>
          </div>
          
          <p className="text-primary-foreground/60 text-xs sm:text-sm">
            Für Gruppen ab 8 Personen rufen Sie uns bitte direkt an
          </p>
        </div>
      </div>
    </section>
  )
}
