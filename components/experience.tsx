import { Leaf, BookOpen, Sparkles, Heart, type LucideIcon } from "lucide-react"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

// Icon choice is a design decision and stays under developer control — the
// CMS only edits title/description/order for each feature, keyed by iconKey.
const ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  "book-open": BookOpen,
  sparkles: Sparkles,
  heart: Heart,
}

interface ExperienceProps {
  content: HomepageContent["experience"]
}

export function Experience({ content }: ExperienceProps) {
  return (
    <section id="erlebnis" className="py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
          <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
            {content.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-3 sm:mb-6 text-balance">
            {content.heading1}
            <br className="hidden sm:inline" />
            {content.heading2}
          </h2>
          <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{content.intro}</p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {content.features.map((feature) => {
            const Icon = ICONS[feature.iconKey] ?? Leaf
            return (
              <div
                key={feature.title}
                className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-3 sm:mb-6">
                  <Icon className="h-5 sm:h-6 w-5 sm:w-6 text-accent" />
                </div>
                <h3 className="font-serif text-lg sm:text-xl text-foreground font-medium mb-2 sm:mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
