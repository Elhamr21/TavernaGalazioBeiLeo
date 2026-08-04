import type { HomepageContent } from "@/lib/content/get-homepage-content"

interface AboutProps {
  content: HomepageContent["about"]
}

export function About({ content }: AboutProps) {
  return (
    <section id="uber-uns" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* Image Side */}
          <div className="relative">
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src={content.imageUrl}
                alt={content.imageAlt}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Experience Badge */}
            <div className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:bottom-8 lg:-right-8 bg-primary text-primary-foreground p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl">
              <span className="block text-3xl sm:text-4xl lg:text-5xl font-serif font-semibold">{content.badgeNumber}</span>
              <span className="text-xs sm:text-sm lg:text-base opacity-90">{content.badgeLabel}</span>
            </div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-3 sm:mb-4 block">
              {content.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-4 sm:mb-6 text-balance">
              {content.heading1}
              <br />
              {content.heading2}
            </h2>
            <div className="space-y-4 sm:space-y-6 text-muted-foreground leading-relaxed text-sm sm:text-base">
              <p>{content.paragraph1}</p>
              <p>{content.paragraph2}</p>
              <p>{content.paragraph3}</p>
            </div>
            <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border">
              <p className="font-serif text-lg sm:text-xl text-foreground italic">{content.signature}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
