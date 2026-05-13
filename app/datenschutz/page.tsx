import type { Metadata } from "next"
import Link from "next/link"
import { Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Datenschutzerklärung | Taverna Galazio bei Leo",
  description: "Datenschutzerklärung der Taverna Galazio in Leipzig Portitz.",
}

export default function DatenschutzPage() {
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
              Taverna Galazio
            </p>
            <h1 className="mt-4 font-serif text-4xl font-medium text-foreground sm:text-5xl">
              Datenschutzerklärung
            </h1>
            <div className="mx-auto mt-5 h-px w-24 bg-accent/70" />
          </div>

          <div className="space-y-8 rounded-lg border border-border/70 bg-card/80 p-5 leading-relaxed shadow-sm sm:p-8">
            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-medium text-foreground">1. Allgemeines</h2>
              <p className="text-muted-foreground">
                Diese Website wird von Taverna Galazio, Altes Dorf 16, 04349 Leipzig, Germany,
                Tavernagalazio@gmail.com (nachfolgend „wir“ oder „uns“) betrieben. Bei Fragen zum
                Datenschutz können Sie uns unter den vorstehend genannten Kontaktdaten erreichen.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-medium text-foreground">
                2. Verarbeitung personenbezogener Daten und Übermittlung an Dritte
              </h2>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">2.1</strong> Einige personenbezogene
                Daten werden bei Nutzung unserer Website automatisch über ihr Endgerät (Computer,
                Mobiltelefon, Tablet etc.) erfasst. Erfasst werden die aktuell von Ihrem Endgerät
                verwendete IP-Adresse, Datum und Uhrzeit, der Browsertyp und das Betriebssystem
                Ihres Endgeräts sowie die aufgerufenen Seiten. Dies erfolgt für Zwecke der
                Datensicherheit und zur Optimierung unseres Angebots sowie der Verbesserung unserer
                Website. Die Verarbeitung dieser personenbezogenen Daten erfolgt auf Grundlage von
                Artikel 6 Absatz 1 Satz 1 Buchstabe f) DSGVO (Datenschutzgrundverordnung). Der
                Schutz unserer Website und die Optimierung unserer Dienste stellen ein legitimes
                Interesse unsererseits dar.
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">2.2</strong> Sofern Sie in Kontakt
                mit uns treten (etwa über eine Anfrage unter den von uns genannten Kontaktdaten),
                verarbeiten wir nur diejenigen personenbezogenen Daten, die Sie uns mitgeteilt haben
                und die zur Bearbeitung und Beantwortung Ihrer Anfrage erforderlich sind.
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">2.3</strong> Um die in dieser
                Datenschutzerklärung genannten Datenverarbeitungsvorgänge zu ermöglichen, etwa zum
                Hosting und zur Wartung unserer Website, setzen wir externe Dienstleister ein.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-medium text-foreground">3. Cookies</h2>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">3.1</strong> Um unsere Dienste
                attraktiv zu gestalten und die Nutzung bestimmter Funktionen zu ermöglichen,
                verwenden wir sogenannte Cookies. Hierbei handelt es sich um kleine Textdateien, die
                auf Ihrem Endgerät abgelegt werden. Einige der von uns verwendeten Cookies werden
                nach dem Ende der Browser-Sitzung, also nach Schließen Ihres Browsers, wieder
                gelöscht (sog. Sitzungs-Cookies). Andere Cookies verbleiben auf Ihrem Endgerät und
                ermöglichen uns, Ihren Browser beim nächsten Besuch wiederzuerkennen (persistente
                Cookies). Sie können Ihren Browser so einstellen, dass Sie über das Setzen von
                Cookies informiert werden und einzeln über deren Annahme entscheiden oder die
                Annahme von Cookies für bestimmte Fälle oder generell ausschließen. Nähere
                Informationen hierzu erhalten Sie in der Hilfefunktion Ihres Internet Browsers. Bei
                der Nichtannahme von Cookies kann die Funktionalität unserer Website eingeschränkt
                sein. Indem Sie unser „Cookie-Banner“ akzeptieren, stimmen Sie der Verarbeitung
                Ihrer personenbezogenen Daten durch Cookies zu. Die Verarbeitung dieser
                personenbezogenen Daten erfolgt auf Grundlage von Artikel 6 Absatz 1 Satz 1
                Buchstabe a) DSGVO. Im Folgenden gehen wir auf konkrete Cookies ein.
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">3.2</strong> Wir verwenden Adobe
                Analytics, einen Dienst von Adobe Systems Software Ireland Limited (4-6 Riverwalk
                Citywest Business Campus, Dublin 24, Republic of Ireland; &quot;Adobe&quot;). Dieser
                Dienst verwendet Cookies, die auf Ihrem Endgerät gespeichert werden und die eine
                Analyse der Benutzung der Website durch Sie ermöglichen. Die durch den Cookie
                erzeugten Informationen über Ihre Benutzung dieser Website (einschließlich Ihrer
                IP-Adresse) werden an Server von Adobe in Irland übertragen und dort anonymisiert
                und sodann in anonymisierter Form zur weiteren Verarbeitung an Server in den USA
                übertragen und dort gespeichert. Adobe nutzt diese Informationen, um Ihre Nutzung
                der Website auszuwerten, um Reports über die Websiteaktivitäten für die
                Websitebetreiber zusammenzustellen und um weitere mit der Websitenutzung und der
                Internetnutzung verbundene Dienstleistungen zu erbringen. Soweit gesetzlich
                vorgeschrieben oder soweit Dritte diese Daten im Auftrag von Adobe verarbeiten,
                können diese Informationen gegebenenfalls an Dritte übertragen werden. In keinem
                Fall wird Ihre IP-Adresse mit anderen Daten von Adobe in Verbindung gebracht. Sie
                können die Installation der Cookies durch eine entsprechende Einstellung Ihrer
                Browser Software verhindern; wir weisen Sie jedoch darauf hin, dass Sie in diesem
                Fall gegebenenfalls nicht sämtliche Funktionen dieser Website voll umfänglich nutzen
                können. Durch die Nutzung dieser Website erklären Sie sich mit der Bearbeitung der
                über Sie erhobenen Daten in der zuvor beschriebenen Art und Weise und zu dem zuvor
                benannten Zweck einverstanden. Der Datenerhebung durch Adobe kann jederzeit mit
                Wirkung für die Zukunft widersprochen werden. Näheres über den Widerruf erfahren
                Sie unter{" "}
                <a
                  href="http://www.adobe.com/privacy/opt-out.html"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  http://www.adobe.com/privacy/opt-out.html
                </a>
                .
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">3.3</strong> Zudem setzen wir
                Google Analytics ein, einen Webanalysedienst der Google Inc. („Google“). Google
                Analytics verwendet gleichfalls Cookies. Die durch die Cookies erzeugten
                Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server
                von Google in den USA übertragen und dort gespeichert. Ihre IP-Adresse wird von
                Google jedoch innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen
                Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum zuvor gekürzt.
                Nur in Ausnahmefällen wird die volle IP-Adresse an einen Server von Google in den
                USA übertragen und dort gekürzt. Im Auftrag des Betreibers dieser Website wird
                Google diese Informationen benutzen, um Ihre Nutzung der Website auszuwerten, um
                Reports über die Websiteaktivitäten zusammenzustellen und um weitere mit der
                Websitenutzung und der Internetnutzung verbundene Dienstleistungen gegenüber dem
                Websitebetreiber zu erbringen. Die im Rahmen von Google Analytics von Ihrem Browser
                übermittelte IP-Adresse wird nicht mit anderen Daten von Google zusammengeführt.
                Sie können die Speicherung der Cookies durch eine entsprechende Einstellung Ihrer
                Browser-Software verhindern. Sie können darüber hinaus die Erfassung der durch die
                Cookies erzeugten und auf Ihre Nutzung der Website bezogenen Daten (inkl. Ihrer
                IP-Adresse) an Google sowie die Verarbeitung dieser Daten durch Google verhindern,
                indem sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und
                installieren:{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout?hl=de"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  https://tools.google.com/dlpage/gaoptout?hl=de
                </a>
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">3.4</strong> Zu Werbezwecken
                setzen wir ferner Werbe-Cookies von Drittanbietern ein. Diese Cookies ermöglichen es
                uns, Ihnen im Browser angezeigte Werbung anhand Ihres Surfverhaltens gezielt auf
                Ihre Interessen hin zuzuschneiden. Wir setzen folgende Werbe-Cookies ein:
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">a)</strong> Wir nutzen auf unserer
                Website Facebook Pixel, a tool operated by Facebook Inc, 1 Hacker Way, Menlo Park,
                CA 94025, USA, or, if you are an EU resident, by Facebook Ireland Ltd, 4 Grand Canal
                Square, Grand Canal Harbour, Dublin 2, Ireland (“ein von Facebook Inc., 1 Hacker
                Way, Menlo Park, CA 94025, USA, oder, falls Sie in der EU ansässig sind, von
                Facebook Ireland Ltd, 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland
                („Facebook”), betriebenes Tool, zur Analyse, zur Optimierung und zum wirtschaftlichen
                Betrieb der Website. Mit Hilfe von Facebook Pixel kann Facebook zudem die Besucher
                unserer Website als Zielgruppe für die Darstellung von Facebook-Anzeigen bestimmen.
                Daher verwenden wir Facebook Pixel zur Darstellung der von uns veröffentlichten
                Facebook-Anzeigen nur für Facebook-Nutzer, die Interesse an unserer Website gezeigt
                haben. Das bedeutet, dass wir mit Hilfe von Facebook Pixel dafür sorgen, dass unsere
                Facebook-Anzeigen dem potenziellen Interesse der Nutzer entsprechen und keine
                Belästigung darstellen. Wir können Facebook Pixel auch dazu einsetzen, die
                Wirksamkeit von Facebook-Anzeigen zu statistischen und Marktforschungszwecken zu
                verfolgen, indem wir uns ansehen, ob Nutzer nach dem Anklicken einer
                Facebook-Anzeige auf unsere Website weitergeleitet wurden (so genannte „Konversion”
                oder “Nutzer-Interaktion”). In diesem Fall basiert die Verarbeitung rechtlich auf
                Artikel 6 Absatz 1 S. 1 Buchstabe a) DSGVO. Facebook Pixel wird von Facebook direkt
                eingesetzt, wenn Sie unsere Website besuchen, und kann einen Cookie auf Ihrem Gerät
                setzen. Wenn Sie sich dann in Facebook einloggen oder Facebook besuchen, während Sie
                eingeloggt sind, wird der Besuch auf unserer Website in Ihrem Profil aufgezeichnet.
                Die über Sie erhobenen Daten sind für uns anonym, also erhalten wir dadurch keine
                Informationen über die Identität der Nutzer. Facebook speichert und verarbeitet
                jedoch die Daten, so dass eine Verbindung zu dem jeweiligen Nutzerprofil möglich
                ist. Das bedeutet, dass aus den verarbeiteten Daten Nutzerprofile erstellt werden
                können. Facebook verarbeitet die Daten in Übereinstimmung mit Facebooks
                Datenschutzerklärung. Weitere Informationen dazu, wie Facebook Pixel arbeitet und
                wie Facebook-Anzeigen dargestellt werden, finden Sie in Facebooks
                Datenschutzerklärung:{" "}
                <a
                  href="https://www.facebook.com/policy"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  https://www.facebook.com/policy
                </a>
                . Sie können sich gegen die Erhebung und Verwendung Ihrer Daten durch Facebook Pixel
                zur Anzeige von Facebook-Ads entscheiden. Um zu konfigurieren, welche Arten von
                Anzeigen Sie bei Facebook sehen, können Sie zu der von Facebook eingerichteten Seite
                gehen und die Anweisungen über die Einstellungen für nutzungsabhängige Anzeigen
                befolgen:{" "}
                <a
                  href="https://www.facebook.com/adpreferences/ad_settings"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  https://www.facebook.com/adpreferences/ad_settings
                </a>
                . Die Einstellungen sind Plattform-unabhängig, d.h. sie sind auf alle Geräte
                anwendbar, wie etwa Desktop-Computer oder mobile Geräte. Sie können auch der
                Verwendung von Cookies zur Tracking- und Werbezwecken widersprechen: über die
                Opt-out-Seite der Network Advertising Initiative{" "}
                <a
                  href="http://optout.networkadvertising.org"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  http://optout.networkadvertising.org
                </a>{" "}
                und zusätzlich über die US-Website{" "}
                <a
                  href="http://www.aboutads.info/choices"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  http://www.aboutads.info/choices
                </a>{" "}
                oder die europäische Website{" "}
                <a
                  href="http://www.youronlinechoices.com/uk/your-ad-choices/"
                  className="text-foreground underline underline-offset-4 hover:text-accent"
                >
                  http://www.youronlinechoices.com/uk/your-ad-choices/
                </a>
                . Sie können Ihre Datenschutzeinstellungen über den Onsite-Button unserer
                Webangebots verwalten.
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">3.5</strong> Die über Sie durch
                Analyse- und/oder Werbe-Cookies erhobenen Daten werden von uns durch technische
                Vorkehrungen pseudonymisiert. Nach erfolgter Pseudonymisierung ist eine direkte
                Zuordnung der Daten zum aufrufenden Nutzer nicht mehr möglich.
              </p>
              <p className="text-muted-foreground">
                <strong className="font-medium text-foreground">3.6</strong> Indem Sie in unserem
                „Cookie-Banner“ auf „akzeptieren“ klicken, stimmen Sie der Verarbeitung Ihrer
                personenbezogenen Daten mit Hilfe von Analyse- und Werbe-Cookies zu den oben
                genannten Zwecken zu. Die Verarbeitung dieser personenbezogenen Daten erfolgt dann
                auf Grundlage von Artikel 6 Abs. 1 S. 1 Buchst. a) DSGVO.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="font-serif text-2xl font-medium text-foreground">
                4. Bereitstellung von personenbezogenen Daten und Aufbewahrungsfristen
              </h2>
              <p className="text-muted-foreground">
                Die Bereitstellung Ihrer persönlichen Daten geschieht freiwillig. Sie sind
                gesetzlich nicht verpflichtet, uns Ihre personenbezogenen Daten zur Verfügung zu
                stellen. Wenn Sie uns Ihre persönlichen Daten nicht zur Verfügung stellen, hat dies
                keine Konsequenzen für Sie, außer dass Sie unsere Dienste nicht nutzen können.
                Personenbezogene Daten, die Sie uns über unsere Website mitteilen, werden nur so
                lange gespeichert, bis der Zweck, zu dem sie verarbeitet wurden, erfüllt ist.
                Abweichende Aufbewahrungsfristen können sich auch aus einem berechtigten Interesse
                unsererseits ergeben (z.B. zur Gewährleistung der Datensicherheit und zur
                Verhinderung von Missbrauch). Personenbezogene Daten, die wir aufgrund gesetzlicher
                oder vertraglicher Aufbewahrungspflichten speichern müssen, werden gesperrt.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-serif text-2xl font-medium text-foreground">5. Ihre Rechte</h2>
              <p className="text-muted-foreground">
                Zur Ausübung Ihrer Rechte gemäß der DSGVO auf
              </p>
              <ul className="space-y-3 pl-5 text-muted-foreground">
                <li className="list-disc">
                  Auskunft über die Verarbeitung Ihrer personenbezogenen Daten sowie auf eine Kopie
                  dieser Daten (Art. 15 DSGVO),
                </li>
                <li className="list-disc">
                  Berichtigung unrichtiger und Vervollständigung unvollständiger personenbezogener
                  Daten (Art. 16 DSGVO),
                </li>
                <li className="list-disc">
                  Löschung Ihrer personenbezogenen Daten und sofern diese öffentlich gemacht wurden,
                  darauf, dass wir andere Verantwortliche über den Löschantrag informieren (Art. 17
                  DSGVO),
                </li>
                <li className="list-disc">
                  Einschränkung der Verarbeitung Ihrer personenbezogenen Daten (Art. 18 DSGVO),
                </li>
                <li className="list-disc">
                  Datenübertragbarkeit, so dass Ihnen Ihre personenbezogenen Daten in einem
                  strukturierten, gängigen und maschinenlesbaren Format übergeben werden und das
                  Recht darauf, diese Daten einem anderen Verantwortlichen ohne Behinderung durch uns
                  zu übermitteln (Art. 20 DSGVO)
                </li>
                <li className="list-disc">
                  Widerruf einer erteilten Einwilligung; der Widerruf berührt nicht die
                  Rechtmäßigkeit der aufgrund der Einwilligung bis zum Widerruf erfolgten
                  Verarbeitung (Art. 7 DSGVO) und
                </li>
                <li className="list-disc">
                  auf Widerspruch gegen die Datenverarbeitung (Art. 21 DSGVO)
                </li>
              </ul>
              <p className="text-muted-foreground">
                können Sie sich jederzeit unter den in Ziffer 1 genannten Kontaktdaten an uns
                wenden. Sie haben zudem das Recht, sich bei der zuständigen Aufsichtsbehörde zu
                beschweren, soweit Sie die Datenverarbeitung als nicht vereinbar mit der DSGVO
                betrachten (Art. 77 DSGVO).
              </p>
            </section>
          </div>
        </article>
      </section>
    </main>
  )
}
