import Link from "next/link"
import { Cake, Users, Wine, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"

const eventTypes = [
  {
    icon: Cake,
    title: "Geburtstagsfeiern",
    description: "Machen Sie Ihren besonderen Tag unvergesslich mit griechischer Gastfreundschaft",
  },
  {
    icon: Users,
    title: "Private Dinner",
    description: "Exklusiver Raum für intime Feiern mit bis zu 30 Gästen",
  },
  {
    icon: Wine,
    title: "Weinverkostungen",
    description: "Entdecken Sie erlesene griechische Weine mit fachkundiger Begleitung",
  },
  {
    icon: Briefcase,
    title: "Firmenveranstaltungen",
    description: "Professionelles Ambiente für Geschäftsessen und Meetings",
  },
]

export function Events() {
  return (
    <section id="events" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content Side */}
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
              Private Veranstaltungen
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-6 text-balance">
              Feiern Sie Ihre
              <br />
              besonderen Momente
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Von intimen Geburtstagsessen bis hin zu großen Feiern – Taverna Galazio bietet 
              den perfekten Rahmen für Ihre wertvollsten Anlässe. Unser engagiertes Team sorgt 
              dafür, dass jedes Detail Ihre Erwartungen übertrifft.
            </p>

            {/* Event Types Grid */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {eventTypes.map((event) => (
                <div key={event.title} className="flex gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <event.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                    <p className="text-muted-foreground text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              <Link href="#kontakt">Anfrage für Events</Link>
            </Button>
          </div>

          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?q=80&w=2070&auto=format&fit=crop"
                alt="Private Dinner Veranstaltung"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats Badge */}
            <div className="absolute -bottom-6 -left-6 lg:bottom-8 lg:-left-8 bg-accent text-accent-foreground p-6 lg:p-8 rounded-2xl shadow-xl">
              <span className="block text-4xl lg:text-5xl font-serif font-semibold">100+</span>
              <span className="text-sm lg:text-base">Events pro Jahr</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
