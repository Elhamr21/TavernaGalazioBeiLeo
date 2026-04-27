"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

const galleryImages = [
  {
    src: "images/ambient1.png",
    alt: "Restaurant Innenbereich",
    caption: "Elegantes Ambiente",
  },
  {
    src: "images/ambient2.jpg",
    alt: "Außenterrasse mit Tischen",
    caption: "Stilvolles Ambiente",
  },
  {
    src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2070&auto=format&fit=crop",
    alt: "Frische Meeresfrüchteplatte",
    caption: "Frische Meeresfrüchte",
  },
  {
    src: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2070&auto=format&fit=crop",
    alt: "Weingläser und Tischdekoration",
    caption: "Erlesene Weine",
  },
  {
    src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?q=80&w=2074&auto=format&fit=crop",
    alt: "Mediterraner Salat",
    caption: "Frische Salate",
  },
  {
    src: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2077&auto=format&fit=crop",
    alt: "Koch bei der Arbeit",
    caption: "Unsere Küche",
  },
]

export function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
            Galerie
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6 text-balance">
            Ein Einblick in
            <br />
            unsere Welt
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed">
            Entdecken Sie das Ambiente, die Küche und die Momente, die Taverna Galazio 
            zu einem besonderen Ort für jeden Anlass machen.
          </p>
        </div>

        {/* Main Gallery Slider */}
        <div className="relative">
          <div className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden">
            <img
              src={galleryImages[currentIndex].src}
              alt={galleryImages[currentIndex].alt}
              className="w-full h-full object-cover transition-opacity duration-500"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary/80 to-transparent p-6 md:p-8">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-primary-foreground/60 text-sm">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(galleryImages.length).padStart(2, "0")}
                  </span>
                  <h3 className="font-serif text-xl md:text-2xl mt-1">
                    {galleryImages[currentIndex].caption}
                  </h3>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={prevSlide}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                    aria-label="Vorheriges Bild"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-primary-foreground/30 flex items-center justify-center hover:bg-primary-foreground/10 transition-colors"
                    aria-label="Nächstes Bild"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail Grid */}
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-6">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`relative aspect-square rounded-lg overflow-hidden transition-all ${
                currentIndex === index
                  ? "ring-2 ring-accent ring-offset-2 ring-offset-primary"
                  : "opacity-60 hover:opacity-100"
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
