import type { Metadata } from "next"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Cookie Einstellungen ändern | Taverna Galazio bei Leo",
  description: "Privatsphäre Optionen und Cookie-Einstellungen der Taverna Galazio Website.",
}

const cookieOptions = [
  {
    title: "Notwendig",
    text: "Diese Cookies sind erforderlich, damit die Hauptfunktionen unserer Website funktionieren, z. sicherheitsbezogene oder unterstützende Funktionen. Einige unserer Cookies werden gelöscht, wenn Ihre Browsersitzung beendet wird, z. wenn Sie Ihren Browser schließen (sog. „Session-Cookies“. Andere bleiben auf Ihrem Gerät gespeichert, damit wir Ihren Browser beim nächsten Besuch unserer Website wiedererkennen können („dauerhafte Cookies“).",
  },
  {
    title: "Statistik",
    text: "Um unsere Kunden besser zu verstehen, speichern wir Daten zu Analysezwecken. Beispielsweise können wir diese Daten verwenden, um Klickmuster zu verstehen und unsere Dienste und Inhalte entsprechend zu optimieren.",
  },
  {
    title: "Marketing",
    text: "Wir erlauben auch Drittanbietern, Cookies auf unseren Seiten zu platzieren. Die dort gesammelten Informationen werden beispielsweise für personalisierte Werbung in sozialen Medien oder für andere Marketingzwecke verwendet. Diese Cookies sind für den tatsächlichen Betrieb unserer Dienste nicht erforderlich.",
  },
]

export default function CookieSettingsPage() {
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

        <article className="mx-auto w-full max-w-3xl">
          <div className="mb-10 text-center">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-accent">
              Cookie Einstellungen ändern
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium text-foreground sm:text-5xl">
              Privatsphäre Optionen
            </h1>
            <div className="mx-auto mt-5 h-px w-24 bg-accent/70" />
          </div>

          <div className="space-y-8 rounded-lg border border-border/70 bg-card/80 p-5 leading-relaxed shadow-sm sm:p-8">
            <p className="text-muted-foreground">
              Wir verwenden Cookies, um unsere Dienste so attraktiv wie möglich zu gestalten und
              bestimmte Funktionen anzubieten. Cookies sind kleine Textdateien, die auf Ihrem
              Computer oder Gerät gespeichert sind. Wir verwenden verschiedene Arten von Cookies.
              Dies können Cookies sein, die für das reibungslose Funktionieren unserer Website
              erforderlich sind, Cookies für statistische Analysezwecke, Marketing-Cookies und
              Cookies für soziale Medien. Sie können die Arten von Cookies auswählen, die Sie
              akzeptieren möchten.
            </p>

            {cookieOptions.map((option) => (
              <section key={option.title} className="space-y-3">
                <h2 className="font-serif text-2xl font-medium text-foreground">
                  {option.title}
                </h2>
                <p className="text-muted-foreground">{option.text}</p>
              </section>
            ))}

            <p className="text-muted-foreground">
              Weiterführende Informationen können Sie unserer{" "}
              <Link
                href="/datenschutz"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                Datenschutzerklärung
              </Link>{" "}
              entnehmen.
            </p>
          </div>
        </article>
      </section>
    </main>
  )
}
