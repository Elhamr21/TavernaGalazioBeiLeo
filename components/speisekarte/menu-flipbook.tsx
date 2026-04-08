"use client"

import { useEffect, useRef, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { MenuItem, MenuCategory } from "@/lib/menu-data"

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

  // Build pages from menu categories
  useEffect(() => {
    const builtPages: PageContent[] = []

    // Add cover page
    builtPages.push({
      type: "cover",
      title: "Unsere Speisekarte",
      description: "Kulinarische Reise durch Griechenland",
    })

    // Add category pages
    categories.forEach((category) => {
      builtPages.push({
        type: "category",
        title: category.name,
        items: category.items,
      })
    })

    // Add end page
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
      bookRef.current.pageFlip().next()
    }
  }

  const goToPrevPage = () => {
    if (bookRef.current && currentPage > 0) {
      bookRef.current.pageFlip().prev()
    }
  }

  // Touch/swipe support
  const [touchStart, setTouchStart] = useState<number | null>(null)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        goToNextPage()
      } else {
        goToPrevPage()
      }
    }
    setTouchStart(null)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goToNextPage()
      if (e.key === "ArrowLeft") goToPrevPage()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentPage, totalPages])

  if (pages.length === 0) return null

  const currentPageData = pages[currentPage]
  const leftPageNum = currentPage + 1
  const rightPageNum = currentPage + 2

  if (isMobile) {
    // Mobile: vertical scroll view
    return (
      <div className="space-y-12 py-8">
        {pages.map((page, idx) => (
          <MobilePageView
            key={idx}
            page={page}
            onDishClick={onDishClick}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Flipbook Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex justify-center"
      >
        <HTMLFlipBook
          ref={bookRef as any}
          width={400}
          height={560}
          size="stretch"
          minWidth={300}
          maxWidth={1000}
          minHeight={400}
          maxHeight={1533}
          maxShadowOpacity={0.5}
          showCover={true}
          useMouseEvents={true}
          onFlip={handleFlip}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={false}
          startZIndex={1}
          autoSize={true}
          className="book"
          mobileScrollSupport={false}
          clickEventForward={false}
          swipeDistance={100}
          showPageCorners={true}
          disableFlipByClick={false}
          style={{}}
        >
          {pages.map((page, idx) => (
            <div
              key={idx}
              className="w-full h-full p-8 bg-card text-foreground flex flex-col overflow-y-auto"
              style={{ pageBreakAfter: "always" }}
            >
              <BookPage page={page} onDishClick={onDishClick} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between gap-4">
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        <div className="text-center">
          <p className="text-sm text-muted-foreground font-medium">
            Seite {currentPageNum(currentPage, totalPages)} / {totalPages}
          </p>
        </div>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          variant="outline"
          size="icon"
          className="rounded-full"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}

function currentPageNum(current: number, total: number): string {
  if (current === 0) return "Deckblatt"
  if (current === total - 1) return "Letzte"
  return `${current}–${current + 1}`
}

interface BookPageProps {
  page: PageContent
  onDishClick: (dish: MenuItem) => void
}

function BookPage({ page, onDishClick }: BookPageProps) {
  if (page.type === "cover") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-accent mx-auto opacity-30" />
        </div>
        <h1 className="font-serif text-4xl font-medium mb-2 text-foreground">
          {page.title}
        </h1>
        <p className="font-serif text-lg text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  if (page.type === "end") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-accent mx-auto opacity-30" />
        </div>
        <h1 className="font-serif text-3xl font-medium mb-4 text-foreground whitespace-pre-line">
          {page.title}
        </h1>
        <p className="font-serif text-lg text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  // Category page
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-serif text-2xl font-semibold mb-6 text-accent border-b border-border pb-4">
        {page.title}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-3 pr-2">
        {page.items?.map((item) => (
          <button
            key={item.id}
            onClick={() => onDishClick(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors text-sm">
                {item.name}
              </h3>
              <span className="font-serif text-sm text-accent font-semibold flex-shrink-0">
                {item.price}€
              </span>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

interface MobilePageViewProps {
  page: PageContent
  onDishClick: (dish: MenuItem) => void
}

function MobilePageView({ page, onDishClick }: MobilePageViewProps) {
  if (page.type === "cover") {
    return (
      <div className="text-center py-12 px-4">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-accent mx-auto opacity-30" />
        </div>
        <h1 className="font-serif text-3xl font-medium mb-2 text-foreground">
          {page.title}
        </h1>
        <p className="font-serif text-lg text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  if (page.type === "end") {
    return (
      <div className="text-center py-12 px-4">
        <div className="mb-8">
          <div className="w-16 h-16 rounded-full border-2 border-accent mx-auto opacity-30" />
        </div>
        <h1 className="font-serif text-2xl font-medium mb-4 text-foreground whitespace-pre-line">
          {page.title}
        </h1>
        <p className="font-serif text-lg text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  // Category on mobile
  return (
    <div className="px-4">
      <h2 className="font-serif text-2xl font-semibold mb-4 text-accent border-b border-border pb-4">
        {page.title}
      </h2>

      <div className="space-y-3">
        {page.items?.map((item) => (
          <button
            key={item.id}
            onClick={() => onDishClick(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                {item.name}
              </h3>
              <span className="font-serif text-accent font-semibold flex-shrink-0">
                {item.price}€
              </span>
            </div>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}
