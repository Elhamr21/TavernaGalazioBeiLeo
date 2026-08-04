import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const SECTIONS = [
  { href: "/admin/hero", title: "Hero", description: "Überschrift, Untertitel, Buttons und Hintergrundbild der Startseite." },
  { href: "/admin/about", title: "Über uns", description: "Geschichte, Textabsätze und Bild des Über-uns-Bereichs." },
  { href: "/admin/experience", title: "Erlebnis", description: "Einleitungstext und die vier Erlebnis-Merkmale." },
  { href: "/admin/menu", title: "Speisekarte", description: "Signature-Gerichte, Kategorien, Preise und Bilder." },
  { href: "/admin/gallery", title: "Galerie", description: "Galeriebilder, Bildunterschriften und Reihenfolge." },
  { href: "/admin/events", title: "Events", description: "Veranstaltungstypen, Beschreibung und Veranstaltungsbild." },
  { href: "/admin/reviews", title: "Bewertungen", description: "Gästebewertungen, Bewertungstext und Gesamtwertung." },
  { href: "/admin/contact", title: "Kontakt", description: "Kontaktbereich-Texte und Reservierungs-CTA." },
  { href: "/admin/footer", title: "Footer", description: "Fußzeile, Schnellzugriff-Labels und Copyright-Text." },
  { href: "/admin/settings", title: "Einstellungen", description: "Navigation, Logo, Telefon, E-Mail, Adresse, Reservierungslink." },
] as const

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-1">Dashboard</h1>
      <p className="text-muted-foreground mb-8">
        Verwalten Sie die Inhalte der Taverna Galazio bei Leo Website.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SECTIONS.map((section) => (
          <Link key={section.href} href={section.href}>
            <Card className="h-full transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
