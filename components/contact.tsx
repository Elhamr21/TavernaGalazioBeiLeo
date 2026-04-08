import { MapPin, Phone, Clock, Car, Accessibility } from "lucide-react"
import { Button } from "@/components/ui/button"

const openingHours = [
  { day: "Montag", hours: "Geschlossen" },
  { day: "Dienstag - Freitag", hours: "17:00 - 23:00" },
  { day: "Samstag", hours: "11:30 - 14:30, 17:00 - 23:00" },
  { day: "Sonntag", hours: "11:30 - 14:30, 17:00 - 23:00" },
]

export function Contact() {
  return (
    <section id="kontakt" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
            Besuchen Sie uns
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight text-balance">
            Finden Sie den Weg zur
            <br />
            Taverna Galazio
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Map Placeholder */}
          <div className="relative aspect-square lg:aspect-auto rounded-2xl overflow-hidden bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2490.8!2d12.4!3d51.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTHCsDI0JzAwLjAiTiAxMsKwMjQnMDAuMCJF!5e0!3m2!1sde!2sde!4v1"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: "400px" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Taverna Galazio Standort"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Address */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Adresse</h3>
                <p className="text-muted-foreground">
                  Altes Dorf 16
                  <br />
                  04349 Leipzig, Deutschland
                </p>
                <a 
                  href="https://maps.google.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-accent text-sm font-medium hover:underline mt-2 inline-block"
                >
                  Route planen →
                </a>
              </div>
            </div>

            {/* Phone */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6 text-accent" />
              </div>
              <div>
                <h3 className="font-medium text-foreground mb-1">Telefon</h3>
                <a 
                  href="tel:+4934156113223" 
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  +49 341 56113223
                </a>
              </div>
            </div>

            {/* Opening Hours */}
            <div className="flex gap-4">
              <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-foreground mb-3">Öffnungszeiten</h3>
                <div className="space-y-2">
                  {openingHours.map((item) => (
                    <div key={item.day} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{item.day}</span>
                      <span className={item.hours === "Geschlossen" ? "text-muted-foreground" : "text-foreground"}>
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div className="flex gap-6 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Car className="h-4 w-4" />
                <span>Kostenlose Parkplätze</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Accessibility className="h-4 w-4" />
                <span>Barrierefrei</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8 flex-1"
              >
                <a href="tel:+4934156113223">Jetzt anrufen</a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full px-8 flex-1 border-foreground text-foreground hover:bg-foreground hover:text-background"
              >
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer">
                  In Maps öffnen
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
