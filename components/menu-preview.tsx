import Link from "next/link"
import { Button } from "@/components/ui/button"
import { featuredDishes } from "@/lib/menu-data"
import { ArrowRight } from "lucide-react"

const dishImages: Record<number, string> = {
  2: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=2069&auto=format&fit=crop", // Pikilia
  57: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?q=80&w=2070&auto=format&fit=crop", // Mix Grill
  89: "https://images.unsplash.com/photo-1574484284002-952d92456975?q=80&w=2074&auto=format&fit=crop", // Moussaka
  41: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?q=80&w=2070&auto=format&fit=crop", // Lamb
}

export function MenuPreview() {
  return (
    <section id="speisekarte" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
              Unsere Highlights
            </span>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight text-balance">
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
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {featuredDishes.map((item) => (
            <Link
              key={item.id}
              href="/speisekarte"
              className="group bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex flex-col sm:flex-row">
                {/* Image */}
                <div className="sm:w-2/5 aspect-square sm:aspect-auto relative overflow-hidden">
                  <img
                    src={dishImages[item.id]}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                {/* Content */}
                <div className="sm:w-3/5 p-6 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-accent text-xs font-medium uppercase tracking-wider">
                      {item.category}
                    </span>
                    <span className="font-serif text-xl text-foreground font-semibold">
                      {item.price} €
                    </span>
                  </div>
                  <h3 className="font-serif text-xl text-foreground font-medium mb-2">
                    {item.name}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed line-clamp-3">
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
