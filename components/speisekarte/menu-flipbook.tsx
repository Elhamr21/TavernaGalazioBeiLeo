"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import HTMLFlipBook from "react-pageflip"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { MenuItem, MenuCategory } from "@/lib/menu-data"

const FlipBookAny = HTMLFlipBook as any
interface MenuFlipbookProps {
  categories: MenuCategory[]
  onDishClick: (dish: MenuItem) => void
  isMobile: boolean
}

interface PageContent {
  type: "cover" | "category" | "end"
  title?: string
  items?: MenuItem[]
  description?: string
}

export function MenuFlipbook({ categories, onDishClick, isMobile }: MenuFlipbookProps) {
  const bookRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [pages, setPages] = useState<PageContent[]>([])

  useEffect(() => {
    const builtPages: PageContent[] = []

    builtPages.push({
      type: "cover",
      title: "Unsere Speisekarte",
      description: "Kulinarische Reise durch Griechenland",
    })

    categories.forEach((category) => {
      builtPages.push({
        type: "category",
        title: category.name,
        items: category.items,
      })
    })

    builtPages.push({
      type: "end",
      title: "Gutes Essen,\nGutes Leben",
      description: "Vielen Dank für Ihren Besuch",
    })

    setPages(builtPages)
    setTotalPages(builtPages.length)
  }, [categories])

  const handleFlip = (e: any) => {
    setCurrentPage(e.data)
  }

  const goToNextPage = () => {
    if (bookRef.current && currentPage < totalPages - 1) {
      bookRef.current.pageFlip().flipNext()
    }
  }

  const goToPrevPage = () => {
    if (bookRef.current && currentPage > 0) {
      bookRef.current.pageFlip().flipPrev()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    const startX = e.touches[0].clientX
    ;(e.currentTarget as any).dataset.start = startX
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    const startX = Number((e.currentTarget as any).dataset.start)
    const endX = e.changedTouches[0].clientX
    const diff = startX - endX

    if (Math.abs(diff) > 50) {
      diff > 0 ? goToNextPage() : goToPrevPage()
    }
  }

  if (pages.length === 0) return null

  return (
    <div className="space-y-6">

      {/* Flipbook */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex justify-center"
      >
        
        <FlipBookAny
          ref={bookRef}
          width={isMobile ? 280 : 400}
          height={isMobile ? 400 : 560}
          size="stretch"
          showCover={true}
          useMouseEvents={true}
          onFlip={handleFlip}
          flippingTime={900}
          className="book"
        >
          {pages.map((page, idx) => (
            <div
              key={idx}
              className="w-full h-full p-6 sm:p-8 bg-white flex flex-col text-foreground"
            >
              <BookPage page={page} onDishClick={onDishClick} />
            </div>
          ))}
        </FlipBookAny>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4">
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          variant="outline"
        >
          <ChevronLeft />
        </Button>

        <span className="text-sm text-muted-foreground">
          {currentPage + 1} / {totalPages}
        </span>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          variant="outline"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}

/* ========================= */
/* BOOK PAGE DESIGN */
/* ========================= */

function BookPage({
  page,
  onDishClick,
}: {
  page: PageContent
  onDishClick: (dish: MenuItem) => void
}) {
  /* ================= COVER ================= */
  if (page.type === "cover") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-6 bg-[#f1f5f9] relative overflow-hidden">

        {/* top navy accent */}
        <div className="absolute top-0 left-0 w-full h-[1px] bg-blue-200/50" />

        {/* side accents */}
        <div className="absolute left-0 top-0 h-full w-2 bg-blue-200/60" />
        <div className="absolute right-0 top-0 h-full w-2 bg-blue-200/60" />

        {/* logo */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 relative z-10">
          <Image
            src="/images/logo.png"
            alt="logo"
            fill
            className="object-contain"
          />
        </div>

        {/* title */}
        <h1 className="font-serif text-3xl sm:text-4xl font-semibold text-blue-950 z-10">
          {page.title}
        </h1>

        {/* description */}
        <p className="text-blue-800/80 z-10">
          {page.description}
        </p>

        {/* swipe hint */}
        <p className="text-xs italic text-blue-900/60 z-10">
          Sie können wischen, um die Speisekarte anzusehen
        </p>
      </div>
    )
  }

  /* ================= END PAGE ================= */
  if (page.type === "end") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center gap-4">
        <h1 className="font-serif text-2xl text-blue-950 whitespace-pre-line">
          {page.title}
        </h1>
        <p className="text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  /* ================= CATEGORY PAGE (BROCHURE DESIGN) ================= */
  return (
    <div className="h-full flex flex-col bg-[#f8fafc] p-5 relative overflow-hidden">

      {/* top line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900" />

      {/* title */}
      <h2 className="font-serif text-xl font-semibold text-blue-950 border-b border-blue-200 pb-3 mb-4">
        {page.title}
      </h2>

      {/* items */}
      <div className="flex-1 overflow-y-auto space-y-3">

        {page.items?.map((item) => (
          <button
            key={item.id}
            onClick={() => onDishClick(item)}
            className="w-full text-left bg-white/80 border border-blue-100 rounded-lg p-3 shadow-sm hover:shadow-md transition-all"
          >
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-semibold text-blue-950">
                {item.name}
              </h3>
              <span className="text-sm font-serif text-blue-900 font-semibold">
                {item.price}€
              </span>
            </div>

            <p className="text-xs text-blue-800/70 line-clamp-2">
              {item.description}
            </p>
          </button>
        ))}

      </div>
    </div>
  )
}