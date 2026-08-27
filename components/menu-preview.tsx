import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

interface MenuPreviewProps {
  content: HomepageContent["menu"]
}

export function MenuPreview({ content }: MenuPreviewProps) {
  return (
    <section id="speisekarte" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
          <div>
            <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
              {content.eyebrow}
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight text-balance">
              {content.heading1}
              <br />
              {content.heading2}
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 self-start md:self-auto border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <Link href="/speisekarte">
              {content.linkLabel}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Menu Grid — image-only gallery */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {content.items.map((item, index) => (
            <Link
              key={index}
              href="/speisekarte"
              className="group relative block aspect-square overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-lg transition-all"
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
