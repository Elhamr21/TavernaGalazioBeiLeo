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

  return (
    <div className="space-y-4 sm:space-y-8">
      {/* Flipbook Container */}
      <div
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="flex justify-center w-full overflow-x-auto pb-4"
      >
        <HTMLFlipBook
          ref={bookRef as any}
          width={isMobile ? 280 : 400}
          height={isMobile ? 400 : 560}
          size="stretch"
          minWidth={240}
          maxWidth={1000}
          minHeight={300}
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
              className="w-full h-full p-4 sm:p-8 bg-card text-foreground flex flex-col overflow-y-auto"
              style={{ pageBreakAfter: "always" }}
            >
              <BookPage page={page} onDishClick={onDishClick} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-2 sm:gap-4">
        <Button
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          variant="outline"
          size="sm"
          className="rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0"
        >
          <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>

        <div className="text-center min-w-[100px] sm:min-w-fit">
          <p className="text-xs sm:text-sm text-muted-foreground font-medium">
            Seite {currentPageNum(currentPage, totalPages)} / {totalPages}
          </p>
        </div>

        <Button
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          variant="outline"
          size="sm"
          className="rounded-full h-8 w-8 sm:h-10 sm:w-10 p-0"
        >
          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
        </Button>
      </div>
    </div>
  )
}

interface BookPageProps {
  page: PageContent
  onDishClick: (dish: MenuItem) => void
}

function BookPage({ page, onDishClick }: BookPageProps) {
  if (page.type === "cover") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="mb-4 sm:mb-8">
          <div className="w-10 sm:w-16 h-10 sm:h-16 rounded-full border-2 border-accent mx-auto opacity-30" />
        </div>
        <h1 className="font-serif text-xl sm:text-4xl font-medium mb-2 text-foreground">
          {page.title}
        </h1>
        <p className="font-serif text-sm sm:text-lg text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  if (page.type === "end") {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center">
        <div className="mb-4 sm:mb-8">
          <div className="w-10 sm:w-16 h-10 sm:h-16 rounded-full border-2 border-accent mx-auto opacity-30" />
        </div>
        <h1 className="font-serif text-lg sm:text-3xl font-medium mb-2 sm:mb-4 text-foreground whitespace-pre-line">
          {page.title}
        </h1>
        <p className="font-serif text-sm sm:text-lg text-muted-foreground">
          {page.description}
        </p>
      </div>
    )
  }

  // Category page
  return (
    <div className="h-full flex flex-col">
      <h2 className="font-serif text-lg sm:text-2xl font-semibold mb-3 sm:mb-6 text-accent border-b border-border pb-2 sm:pb-4">
        {page.title}
      </h2>

      <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3 pr-1 sm:pr-2">
        {page.items?.map((item) => (
          <button
            key={item.id}
            onClick={() => onDishClick(item)}
            className="w-full text-left p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="flex items-start justify-between gap-1 sm:gap-2 mb-0.5 sm:mb-1">
              <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors text-xs sm:text-sm">
                {item.name}
              </h3>
              <span className="font-serif text-xs sm:text-sm text-accent font-semibold flex-shrink-0">
                {item.price}€
              </span>
            </div>
            <p className="text-xs sm:text-xs text-muted-foreground line-clamp-1 sm:line-clamp-2">
              {item.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  )
}

interface PageProps {
  page: PageContent
  onDishClick: (dish: MenuItem) => void
}

function currentPageNum(current: number, total: number): string {
  if (current === 0) return "Cover"
  if (current === total - 1) return "End"
  return `${current}–${current + 1}`
}
