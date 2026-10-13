import type { HomepageContent } from "@/lib/content/get-homepage-content"

const VIRTUAL_TOUR_URL = "https://tourmkr.com/F1GvmfgeH2"

interface AboutProps {
  content: HomepageContent["about"]
}

export function About(_props: AboutProps) {
  return (
    <section id="uber-uns" className="py-12 lg:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">
            Virtueller Rundgang
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-4 text-balance">
            Entdecken Sie unsere Taverne in 360°
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
            Schauen Sie sich schon vor Ihrem Besuch bei uns um – ziehen Sie das Bild, um sich umzusehen.
          </p>
        </div>
        <div className="relative w-full h-[80vh] min-h-[480px] lg:h-auto lg:aspect-video rounded-2xl overflow-hidden bg-muted">
          <iframe
            src={VIRTUAL_TOUR_URL}
            title="360° Rundgang durch die Taverna Galazio"
            className="absolute inset-0 w-full h-full border-0"
            allow="fullscreen; accelerometer; gyroscope; magnetometer; xr-spatial-tracking"
            allowFullScreen
            loading="lazy"
          />
        </div>
      </div>
    </section>
  )
}
