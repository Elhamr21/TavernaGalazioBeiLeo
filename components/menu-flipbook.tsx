"use client"

import { useState, useRef, useCallback } from "react"
import HTMLFlipBook from "react-pageflip"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, X, Phone, Calendar, UtensilsCrossed } from "lucide-react"
import { mainMenu, extraMenu, allergenInfo, type MenuItem, type MenuCategory } from "@/lib/menu-data"
import { cn } from "@/lib/utils"

interface DishModalProps {
  dish: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

function DishModal({ dish, isOpen, onClose }: DishModalProps) {
  if (!isOpen || !dish) return null

  const scrollToSection = (sectionId: string) => {
    onClose()
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      }
    }, 100)
  }

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-card rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative bg-primary p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary-foreground/80 hover:text-primary-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <span className="text-accent text-xs font-medium uppercase tracking-wider block mb-2">
            {dish.category}
          </span>
          <h3 className="font-serif text-2xl text-primary-foreground font-medium">
            {dish.name}
          </h3>
          <div className="mt-2 text-accent font-serif text-xl font-semibold">
            {dish.price} EUR
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-muted-foreground leading-relaxed mb-4">
            {dish.description}
          </p>
          
          {dish.allergens && (
            <div className="mb-6 p-3 bg-secondary rounded-lg">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1">
                Allergene
              </span>
              <p className="text-sm text-foreground">
                {dish.allergens.split("-").map(code => allergenInfo[code] || code).join(", ")}
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => scrollToSection("speisekarte")}
              variant="outline"
              className="w-full rounded-full border-foreground text-foreground hover:bg-foreground hover:text-background"
            >
              <UtensilsCrossed className="w-4 h-4 mr-2" />
              Zur Speisekarte
            </Button>
            <Button
              onClick={() => scrollToSection("kontakt")}
              className="w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Tisch reservieren
            </Button>
            <Button
              asChild
              variant="ghost"
              className="w-full rounded-full text-muted-foreground hover:text-foreground"
            >
              <a href="tel:+493419129678">
                <Phone className="w-4 h-4 mr-2" />
                Anrufen: 0341 9129678
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

interface MenuPageProps {
  category: MenuCategory
  onDishClick: (dish: MenuItem) => void
}

const MenuPage = ({ category, onDishClick }: MenuPageProps) => {
  return (
    <div className="bg-[#faf8f5] h-full p-6 md:p-8 overflow-hidden">
      {/* Category Header */}
      <div className="mb-4 pb-3 border-b border-border">
        <h3 className="font-serif text-xl md:text-2xl text-foreground font-medium">
          {category.name}
        </h3>
        {category.nameGreek && (
          <span className="text-accent text-sm italic">
            {category.nameGreek}
          </span>
        )}
      </div>

      {/* Menu Items */}
      <div className="space-y-3 overflow-y-auto max-h-[calc(100%-4rem)]">
        {category.items.map((item) => (
          <button
            key={item.id}
            onClick={() => onDishClick(item)}
            className="w-full text-left p-3 rounded-lg hover:bg-secondary/50 transition-colors group cursor-pointer"
          >
            <div className="flex justify-between items-start gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-muted-foreground text-xs">
                    {item.id}.
                  </span>
                  <h4 className="font-medium text-foreground text-sm group-hover:text-accent transition-colors truncate">
                    {item.name}
                  </h4>
                </div>
                <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                  {item.description}
                </p>
              </div>
              <span className="font-serif text-foreground font-semibold text-sm whitespace-nowrap">
                {item.price} €
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

const CoverPage = ({ title, subtitle }: { title: string; subtitle: string }) => {
  return (
    <div className="bg-primary h-full flex flex-col items-center justify-center p-8 text-center">
      <div className="w-16 h-16 mb-6 border-2 border-accent rounded-full flex items-center justify-center">
        <UtensilsCrossed className="w-8 h-8 text-accent" />
      </div>
      <h2 className="font-serif text-3xl md:text-4xl text-primary-foreground font-medium mb-2">
        {title}
      </h2>
      <p className="text-accent text-sm uppercase tracking-widest">
        {subtitle}
      </p>
      <div className="mt-8 text-primary-foreground/60 text-sm">
        Klicken Sie zum Blättern
      </div>
    </div>
  )
}

export function MenuFlipbook() {
  const [activeMenu, setActiveMenu] = useState<"main" | "extra">("main")
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState(0)
  const flipBookRef = useRef<any>(null)

  const currentMenuData = activeMenu === "main" ? mainMenu : extraMenu

  const handleDishClick = useCallback((dish: MenuItem) => {
    setSelectedDish(dish)
    setIsModalOpen(true)
  }, [])

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false)
  }, [])

  const handlePrevPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipPrev()
    }
  }

  const handleNextPage = () => {
    if (flipBookRef.current) {
      flipBookRef.current.pageFlip().flipNext()
    }
  }

  const onFlip = useCallback((e: { data: number }) => {
    setCurrentPage(e.data)
  }, [])

  const totalPages = currentMenuData.length + 1 // +1 for cover

  return (
    <section id="speisekarte" className="py-16 lg:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-accent font-medium text-sm uppercase tracking-widest mb-4 block">
            Unsere Speisekarte
          </span>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-foreground font-medium leading-tight mb-6 text-balance">
            Kulinarische Reise durch Griechenland
          </h2>
          
          {/* Menu Toggle */}
          <div className="inline-flex bg-background rounded-full p-1 shadow-sm">
            <button
              onClick={() => {
                setActiveMenu("main")
                setCurrentPage(0)
              }}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                activeMenu === "main"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Hauptkarte
            </button>
            <button
              onClick={() => {
                setActiveMenu("extra")
                setCurrentPage(0)
              }}
              className={cn(
                "px-6 py-2 rounded-full text-sm font-medium transition-all",
                activeMenu === "extra"
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Extra Karte
            </button>
          </div>
        </div>

        {/* Flipbook Container */}
        <div className="flex flex-col items-center">
          {/* Desktop Flipbook */}
          <div className="hidden md:block relative">
            <div className="shadow-2xl rounded-lg overflow-hidden">
              <HTMLFlipBook
                ref={flipBookRef}
                width={400}
                height={550}
                size="stretch"
                minWidth={300}
                maxWidth={500}
                minHeight={400}
                maxHeight={600}
                maxShadowOpacity={0.5}
                showCover={true}
                mobileScrollSupport={true}
                onFlip={onFlip}
                className="flipbook"
                style={{}}
                startPage={0}
                drawShadow={true}
                flippingTime={600}
                usePortrait={false}
                startZIndex={0}
                autoSize={true}
                clickEventForward={true}
                useMouseEvents={true}
                swipeDistance={30}
                showPageCorners={true}
                disableFlipByClick={false}
              >
                {/* Cover Page */}
                <div className="page">
                  <CoverPage 
                    title={activeMenu === "main" ? "Speisekarte" : "Extra Karte"} 
                    subtitle="Taverna Galazio bei Leo" 
                  />
                </div>

                {/* Menu Pages */}
                {currentMenuData.map((category, index) => (
                  <div key={`${activeMenu}-${index}`} className="page">
                    <MenuPage category={category} onDishClick={handleDishClick} />
                  </div>
                ))}
              </HTMLFlipBook>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <span className="text-muted-foreground text-sm min-w-[80px] text-center">
                Seite {currentPage + 1} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={handleNextPage}
                disabled={currentPage >= totalPages - 1}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Mobile Menu (Scrollable) */}
          <div className="md:hidden w-full">
            <div className="bg-card rounded-2xl shadow-lg overflow-hidden">
              <div className="bg-primary p-6 text-center">
                <h3 className="font-serif text-2xl text-primary-foreground font-medium">
                  {activeMenu === "main" ? "Speisekarte" : "Extra Karte"}
                </h3>
                <p className="text-accent text-sm">Taverna Galazio bei Leo</p>
              </div>
              <div className="divide-y divide-border">
                {currentMenuData.map((category, index) => (
                  <div key={`mobile-${activeMenu}-${index}`} className="p-4">
                    <h4 className="font-serif text-lg text-foreground font-medium mb-1">
                      {category.name}
                    </h4>
                    {category.nameGreek && (
                      <span className="text-accent text-xs italic block mb-3">
                        {category.nameGreek}
                      </span>
                    )}
                    <div className="space-y-2">
                      {category.items.map((item) => (
                        <button
                          key={item.id}
                          onClick={() => handleDishClick(item)}
                          className="w-full text-left p-3 rounded-lg bg-secondary/30 hover:bg-secondary transition-colors"
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div className="flex-1">
                              <h5 className="font-medium text-foreground text-sm">
                                {item.id}. {item.name}
                              </h5>
                              <p className="text-muted-foreground text-xs mt-0.5 line-clamp-2">
                                {item.description}
                              </p>
                            </div>
                            <span className="font-serif text-foreground font-semibold text-sm">
                              {item.price} €
                            </span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Allergen Info */}
          <div className="mt-8 text-center max-w-2xl">
            <p className="text-muted-foreground text-xs">
              Bei Fragen zu Allergenen sprechen Sie bitte unser freundliches Personal an.
              Verpackungskosten für nicht verzehrte Speisen zum Mitnehmen: 1,00 €
            </p>
          </div>
        </div>
      </div>

      {/* Dish Modal */}
      <DishModal 
        dish={selectedDish} 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
      />
    </section>
  )
}
