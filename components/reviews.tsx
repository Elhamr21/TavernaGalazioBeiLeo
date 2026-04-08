import { Star } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    text: "The best restaurant!! The food was perfect!! The best in town!! The atmosphere beautiful music and calm. Leo the owner of Galazio very friendly guy!! I will go there every time I go in Germany!! Keep going guys! You are the best! Danke Leo!",
    author: "Ester-katerina M.",
    source: "Google",
    date: "Mai 2025",
  },
  {
    text: "Wunderbares Essen und fantastischer Service! Das Lamm war perfekt zubereitet und die Atmosphäre war genau richtig für einen romantischen Abend. Wir kommen definitiv wieder!",
    author: "Thomas K.",
    source: "Google",
    date: "April 2025",
  },
  {
    text: "Ein Stück Griechenland mitten in Leipzig. Die Qualität der Zutaten schmeckt man in jedem Bissen. Besonders der Oktopus ist ein Gedicht!",
    author: "Maria S.",
    source: "Google",
    date: "März 2025",
  },
]

export function Reviews() {
  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
            Gästebewertungen
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-6 text-balance">
            Was unsere Gäste
            <br />
            über uns sagen
          </h2>
          
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-4 bg-secondary px-8 py-4 rounded-full">
            <div className="flex items-center gap-2">
              <span className="text-4xl font-serif font-semibold text-foreground">4,9</span>
              <div className="flex flex-col items-start">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>
                <span className="text-muted-foreground text-xs">423 Bewertungen auf Google</span>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex gap-0.5 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 line-clamp-5">
                &ldquo;{review.text}&rdquo;
              </p>
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-medium text-foreground">{review.author}</span>
                <span className="text-muted-foreground text-sm">
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
              href="https://www.google.com/maps/place/Taverna+Galazio" 
              target="_blank"
              rel="noopener noreferrer"
            >
              Alle Bewertungen auf Google lesen
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
