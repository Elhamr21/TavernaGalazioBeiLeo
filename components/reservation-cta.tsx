import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

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
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6 text-balance">
            Bereit für ein authentisch
            <br />
            <span className="text-accent">griechisches Erlebnis?</span>
          </h2>
          <p className="text-primary-foreground/80 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">
            Erleben Sie einen unvergesslichen Abend mit mediterranen Aromen, herzlicher 
            Gastfreundschaft und elegantem Ambiente. Reservieren Sie noch heute Ihren Tisch.
          </p>
          
          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-10 py-6 text-lg font-medium"
            >
              <a href="#reservieren">Online buchen</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-primary-foreground/50 text-primary-foreground hover:bg-primary-foreground/10 rounded-full px-10 py-6 text-lg font-medium"
            >
              <a href="tel:+4934156113223" className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                +49 341 56113223
              </a>
            </Button>
          </div>
          
          <p className="text-primary-foreground/60 text-sm">
            Für Gruppen ab 8 Personen rufen Sie uns bitte direkt an
          </p>
        </div>
      </div>
    </section>
  )
}
