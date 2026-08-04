import Link from "next/link"
import { Cake, Users, Wine, Briefcase, type LucideIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

// Icon choice is a design decision and stays under developer control — the
// CMS only edits title/description/order for each event type, keyed by iconKey.
const ICONS: Record<string, LucideIcon> = {
  cake: Cake,
  users: Users,
  wine: Wine,
  briefcase: Briefcase,
}

interface EventsProps {
  content: HomepageContent["events"]
}

export function Events({ content }: EventsProps) {
  return (
    <section id="events" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Content Side */}
          <div className="order-2 lg:order-1">
            <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
              {content.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-4 sm:mb-6 text-balance">
              {content.heading1}
              <br className="hidden sm:inline" />
              {content.heading2}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6 sm:mb-10 text-sm sm:text-base">
              {content.description}
            </p>

            {/* Event Types Grid */}
            <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-10">
              {content.types.map((event) => {
                const Icon = ICONS[event.iconKey] ?? Cake
                return (
                  <div key={event.title} className="flex gap-3 sm:gap-4">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="h-4 sm:h-5 w-4 sm:w-5 text-accent" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-medium text-foreground mb-0.5 sm:mb-1 text-sm sm:text-base">{event.title}</h3>
                      <p className="text-muted-foreground text-xs sm:text-sm">{event.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Button
              asChild
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full px-8"
            >
              <Link href="#kontakt">{content.ctaLabel}</Link>
            </Button>
          </div>

          {/* Image Side */}
          <div className="relative order-1 lg:order-2">
            <div className="relative aspect-[4/5] rounded-xl sm:rounded-2xl overflow-hidden">
              <img
                src={content.imageUrl}
                alt={content.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Stats Badge */}
            <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 lg:bottom-8 lg:-left-8 bg-accent text-accent-foreground p-4 sm:p-6 lg:p-8 rounded-xl sm:rounded-2xl shadow-xl">
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-serif font-semibold">{content.statNumber}</span>
              <span className="text-xs sm:text-sm lg:text-base">{content.statLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
