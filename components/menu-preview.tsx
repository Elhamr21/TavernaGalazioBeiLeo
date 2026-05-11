import Link from "next/link"
import { Button } from "@/components/ui/button"
import { featuredDishes } from "@/lib/menu-data"
import { ArrowRight } from "lucide-react"

const dishImages: Record<number, string> = {
  2: "images/food2.png",
  57: "images/food5.png",
  89: "images/food1.png",
  41: "images/food3.png",
}


export function MenuPreview() {
  return (
    <section id="speisekarte" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 px-2 sm:px-0">
          <div>
            <span className="text-accent font-medium text-xs sm:text-sm uppercase tracking-widest mb-2 sm:mb-4 block">
              Unsere Highlights
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight text-balance">
              Signature
              <br />
              Griechische Gerichte
            </h2>
          </div>
          <Button
            asChild
            variant="outline"
            className="rounded-full px-8 self-start md:self-auto border-foreground text-foreground hover:bg-foreground hover:text-background"
          >
            <Link href="/speisekarte">
              Komplette Speisekarte
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {featuredDishes.map((item) => (
            <Link
              key={item.id}
              href="/speisekarte"
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row h-full">
                {/* Image */}
                <div className="w-full sm:w-2/5 aspect-square sm:aspect-auto relative overflow-hidden">
                  <img
                    src={dishImages[item.id]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="w-full sm:w-3/5 p-4 sm:p-6 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-1 sm:mb-2 gap-2">
                    <span className="text-accent text-xs font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-foreground font-semibold whitespace-nowrap">
                      {item.price} €
                    </span>
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl text-foreground font-medium mb-1 sm:mb-2">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-xs sm:text-sm leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {item.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
