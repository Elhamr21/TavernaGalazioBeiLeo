"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const FlipBookAny = HTMLFlipBook as any
const PAGE_RATIO = 1190 / 1684

const MENU_PAGES = Array.from({ length: 10 }, (_, index) => {
  const pageNumber = index.toString().padStart(2, "0")

  return {
    src: `/menu/menu-page-${pageNumber}.png`,
    alt:
      index === 0
        ? "Taverna Galazio Speisekarte Cover"
        : `Taverna Galazio Speisekarte Seite ${index}`,
  }
})

type BookDimensions = {
  width: number
  height: number
}

function getInitialBookDimensions(isMobile: boolean): BookDimensions {
  return isMobile ? { width: 340, height: 481 } : { width: 520, height: 736 }
}

function calculateBookDimensions(isMobile: boolean): BookDimensions {
  if (typeof window === "undefined") {
    return getInitialBookDimensions(isMobile)
  }

  const viewportWidth = Math.floor(window.visualViewport?.width ?? window.innerWidth)
  const viewportHeight = Math.floor(window.visualViewport?.height ?? window.innerHeight)
  const horizontalReserve = isMobile ? 20 : 48
  const verticalReserve = isMobile ? 190 : 170
  const maxPageWidth = isMobile ? 680 : 1180
  const availableWidth = Math.max(240, viewportWidth - horizontalReserve)
  const availableHeight = Math.max(isMobile ? 390 : 500, viewportHeight - verticalReserve)
  const widthByBook = isMobile ? availableWidth : availableWidth / 2
  const widthByHeight = availableHeight * PAGE_RATIO
  const pageWidth = Math.floor(Math.max(240, Math.min(maxPageWidth, widthByBook, widthByHeight)))

  return {
    width: pageWidth,
    height: Math.floor(pageWidth / PAGE_RATIO),
  }
}

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)")
    const update = () => setIsMobile(media.matches)

    update()
    media.addEventListener("change", update)

    return () => media.removeEventListener("change", update)
  }, [])

  return isMobile
}

function useBookDimensions(isMobile: boolean) {
  const [dimensions, setDimensions] = useState<BookDimensions>(() =>
    getInitialBookDimensions(isMobile),
  )

  useEffect(() => {
    const update = () => setDimensions(calculateBookDimensions(isMobile))
    const visualViewport = window.visualViewport

    update()
    window.addEventListener("resize", update)
    visualViewport?.addEventListener("resize", update)

    return () => {
      window.removeEventListener("resize", update)
      visualViewport?.removeEventListener("resize", update)
    }
  }, [isMobile])

  return dimensions
}

export function MenuFlipbook() {
  const bookRef = useRef<any>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const isMobile = useIsMobile()
  const dimensions = useBookDimensions(isMobile)
  const totalPages = MENU_PAGES.length
  const progress = ((currentPage + 1) / totalPages) * 100
  const visiblePageCount = isMobile ? 1 : 2
  const bookWidth = dimensions.width * visiblePageCount

  const goToPrevPage = useCallback(() => {
    if (currentPage <= 0) return
    bookRef.current?.pageFlip()?.flipPrev()
  }, [currentPage])

  const goToNextPage = useCallback(() => {
    if (currentPage >= totalPages - 1) return
    bookRef.current?.pageFlip()?.flipNext()
  }, [currentPage, totalPages])

  const handleFlip = useCallback(
    (event: { data: number }) => {
      setCurrentPage(Math.max(0, Math.min(event.data, totalPages - 1)))
    },
    [totalPages],
  )

  useEffect(() => {
    const preloadIndexes = [currentPage - 1, currentPage + 1, currentPage + 2]

    preloadIndexes.forEach((index) => {
      const page = MENU_PAGES[index]

      if (!page) return

      const image = new window.Image()
      image.decoding = "async"
      image.src = page.src
    })
  }, [currentPage])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault()
        goToPrevPage()
      }

      if (event.key === "ArrowRight") {
        event.preventDefault()
        goToNextPage()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [goToNextPage, goToPrevPage])

  const flipbookKey = useMemo(
    () => `${isMobile ? "mobile" : "desktop"}-${dimensions.width}-${dimensions.height}`,
    [dimensions.height, dimensions.width, isMobile],
  )

  return (
    <section className="flex min-h-[calc(100svh-7rem)] w-full flex-col items-center justify-center gap-4 py-3 sm:gap-5 lg:py-4">
      <div className="text-center">
        <p className="font-serif text-2xl font-medium text-foreground sm:text-3xl lg:text-4xl">
          Speisekarte
        </p>
        <div className="mx-auto mt-3 h-px w-24 bg-accent/70" />
      </div>

      <div
        className="relative mx-auto flex max-w-full items-center justify-center"
        style={{ width: bookWidth, height: dimensions.height }}
      >
        <div
          className="relative flex items-center justify-center overflow-visible rounded-[10px] shadow-[0_24px_70px_rgba(23,30,44,0.22)]"
          style={{ width: bookWidth, height: dimensions.height }}
        >
          <FlipBookAny
            key={flipbookKey}
            ref={bookRef}
            width={dimensions.width}
            height={dimensions.height}
            size="fixed"
            minWidth={dimensions.width}
            maxWidth={dimensions.width}
            minHeight={dimensions.height}
            maxHeight={dimensions.height}
            maxShadowOpacity={0.42}
            showCover={isMobile}
            mobileScrollSupport={true}
            onFlip={handleFlip}
            className="luxury-menu-book"
            style={{ width: bookWidth, height: dimensions.height }}
            startPage={Math.min(currentPage, totalPages - 1)}
            drawShadow={true}
            flippingTime={950}
            usePortrait={isMobile}
            startZIndex={30}
            autoSize={false}
            clickEventForward={true}
            useMouseEvents={true}
            swipeDistance={35}
            showPageCorners={true}
            disableFlipByClick={false}
          >
            {MENU_PAGES.map((page, index) => (
              <div
                key={page.src}
                className="luxury-menu-page"
                data-density={index === 0 ? "hard" : "soft"}
              >
                <div className="h-full w-full bg-[#fffdf8] p-[clamp(4px,1vw,12px)]">
                  <img
                    src={page.src}
                    alt={page.alt}
                    className="h-full w-full select-none object-contain"
                    loading={index <= 1 ? "eager" : "lazy"}
                    decoding={index <= 1 ? "sync" : "async"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    draggable={false}
                  />
                </div>
              </div>
            ))}
          </FlipBookAny>
        </div>

        <Button
          type="button"
          aria-label="Vorherige Seite"
          onClick={goToPrevPage}
          disabled={currentPage === 0}
          size="icon"
          variant="outline"
          className="absolute left-2 top-1/2 z-40 size-10 -translate-y-1/2 rounded-full border-primary/15 bg-background/95 text-primary shadow-lg backdrop-blur-md hover:bg-background sm:left-3 xl:-left-14"
        >
          <ChevronLeft className="size-5" />
        </Button>

        <Button
          type="button"
          aria-label="Naechste Seite"
          onClick={goToNextPage}
          disabled={currentPage === totalPages - 1}
          size="icon"
          variant="outline"
          className="absolute right-2 top-1/2 z-40 size-10 -translate-y-1/2 rounded-full border-primary/15 bg-background/95 text-primary shadow-lg backdrop-blur-md hover:bg-background sm:right-3 xl:-right-14"
        >
          <ChevronRight className="size-5" />
        </Button>
      </div>

      <div className="flex w-full max-w-md flex-col items-center gap-3 px-4">
        <span className="font-serif text-sm text-muted-foreground">
          {currentPage + 1} / {totalPages}
        </span>

        <div className="h-1.5 w-full overflow-hidden rounded-full bg-primary/10">
          <div
            className="h-full origin-left rounded-full bg-accent transition-transform duration-500 ease-out"
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>
    </section>
  )
}
