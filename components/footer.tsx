import Link from "next/link"

const quickLinks = [
  { href: "#uber-uns", label: "Über uns" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#events", label: "Private Events" },
  { href: "#reservieren", label: "Reservierung" },
  { href: "#kontakt", label: "Kontakt" },
]

const openingHours = [
  { day: "Montag", hours: "Geschlossen" },
  { day: "Di - Fr", hours: "17:00 - 23:00" },
  { day: "Samstag", hours: "11:30 - 23:00" },
  { day: "Sonntag", hours: "11:30 - 23:00" },
]

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-6">
              <span className="font-serif text-2xl font-semibold block">Taverna Galazio</span>
              <span className="text-background/60 text-sm">bei Leo</span>
            </div>
            <p className="text-background/70 text-sm leading-relaxed">
              Authentische griechische Küche im Herzen von Leipzig. Erleben Sie mediterrane 
              Gastfreundschaft vom Feinsten.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4">Schnellzugriff</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link 
                    href={link.href}
                    className="text-background/70 text-sm hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-4">Kontakt</h3>
            <address className="text-background/70 text-sm not-italic space-y-3">
              <p>
                Altes Dorf 16
                <br />
                04349 Leipzig, Deutschland
              </p>
              <p>
                <a href="tel:+4934156113223" className="hover:text-background transition-colors">
                  +49 341 56113223
                </a>
              </p>
            </address>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-medium mb-4">Öffnungszeiten</h3>
            <div className="space-y-2">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between text-sm">
                  <span className="text-background/70">{item.day}</span>
                  <span className={item.hours === "Geschlossen" ? "text-background/50" : "text-background/70"}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-background/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-background/50 text-sm">
              © {new Date().getFullYear()} Taverna Galazio bei Leo. Alle Rechte vorbehalten.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/datenschutz" className="text-background/50 text-sm hover:text-background transition-colors">
                Datenschutz
              </Link>
              <Link href="/impressum" className="text-background/50 text-sm hover:text-background transition-colors">
                Impressum
              </Link>
              <Link href="/agb" className="text-background/50 text-sm hover:text-background transition-colors">
                AGB
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
