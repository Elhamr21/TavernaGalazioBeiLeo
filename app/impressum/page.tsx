import type { Metadata } from "next"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Impressum | Taverna Galazio bei Leo",
  description: "Impressum und Anbieterkennzeichnung der Taverna Galazio in Leipzig Portitz.",
}

const businessDetails = [
  { label: "Name of the business", value: "Taverna Galazio" },
  { label: "Firmenname und Rechtsform", value: "Taverna Galazio" },
  { label: "Vorname", value: "Leonard" },
  { label: "Nachname", value: "Muca" },
  { label: "Adresse", value: "Altes Dorf 16" },
  { label: "Postleitzahl", value: "04349" },
  { label: "Stadt", value: "Leipzig Portitz" },
  { label: "Ländercode", value: "De" },
  { label: "Telefonnummer", value: "+4915202091211", href: "tel:+4915202091211" },
  {
    label: "E-Mail-Adresse",
    value: "Tavernagalazio@gmail.com",
    href: "mailto:Tavernagalazio@gmail.com",
  },
  { label: "Registereintrag", value: "123456789" },
  { label: "Registrierungsnummer", value: "15082340" },
  { label: "Lokale Steuernummer", value: "123456789" },
]

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto flex min-h-screen w-full max-w-5xl flex-col px-4 py-6 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-primary/15 bg-background/80 px-4 text-xs shadow-sm backdrop-blur-sm hover:bg-background sm:px-6 sm:text-sm"
          >
            <Link href="/">
              <Home className="size-4" />
              Home
            </Link>
          </Button>
        </div>

        <div className="mx-auto w-full max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">
              Taverna Galazio
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium text-foreground sm:text-5xl">
              Impressum
            </h1>
            <div className="mx-auto mt-5 h-px w-24 bg-accent/70" />
          </div>

          <div className="rounded-lg border border-border/70 bg-card/80 p-5 shadow-sm sm:p-8">
            <dl className="divide-y divide-border/70">
              {businessDetails.map((item) => (
                <div
                  key={item.label}
                  className="grid gap-1 py-4 sm:grid-cols-[minmax(0,240px)_1fr] sm:gap-6"
                >
                  <dt className="text-sm font-medium text-muted-foreground">{item.label}</dt>
                  <dd className="text-base text-foreground">
                    {item.href ? (
                      <a href={item.href} className="transition-colors hover:text-accent">
                        {item.value}
                      </a>
                    ) : (
                      item.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </main>
  )
}
