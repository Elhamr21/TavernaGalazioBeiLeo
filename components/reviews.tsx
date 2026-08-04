import { Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

// External destination — not restaurant content, stays under developer control.
const GOOGLE_REVIEWS_URL = "https://maps.app.goo.gl/62snmRvMneN4TrLy7"

interface ReviewsProps {
  content: HomepageContent["reviews"]
}

export function Reviews({ content }: ReviewsProps) {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 px-4">
          <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
            {content.eyebrow}
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-4 sm:mb-6 text-balance">
            {content.heading1}
            <br className="hidden sm:inline" />
            {content.heading2}
          </h2>

          {/* Rating Badge */}
          <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-4 bg-secondary px-4 sm:px-8 py-3 sm:py-4 rounded-full text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="text-3xl sm:text-4xl font-serif font-semibold text-foreground">{content.aggregateRating}</span>
              <div className="flex flex-col items-center sm:items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 sm:h-4 w-3 sm:w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs whitespace-nowrap">{content.aggregateCount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
          {content.items.map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-3 sm:mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="h-3 sm:h-4 w-3 sm:w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-4 sm:mb-6 line-clamp-4 sm:line-clamp-5 text-sm sm:text-base">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-3 sm:pt-4 border-t border-border">
                <span className="font-medium text-foreground text-sm sm:text-base">{review.author}</span>
                <span className="text-muted-foreground text-xs sm:text-sm whitespace-nowrap">
                  {review.source} · {review.date}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <Link
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {content.ctaLabel}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
