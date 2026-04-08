"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MenuFlipbook } from "@/components/speisekarte/menu-flipbook"
import { DishModal } from "@/components/speisekarte/dish-modal"
import { Button } from "@/components/ui/button"
import { mainMenu, extraMenu } from "@/lib/menu-data"
import { Home, Phone } from "lucide-react"
import type { MenuItem } from "@/lib/menu-data"

type MenuType = "hauptkarte" | "extrakarte"

export default function SpeisekartePage() {
  const [activeMenu, setActiveMenu] = useState<MenuType>("hauptkarte")
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleMenuSwitch = (menu: MenuType) => {
    setActiveMenu(menu)
  }

  const currentMenu = activeMenu === "hauptkarte" ? mainMenu : extraMenu

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-2">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-2 text-foreground hover:text-accent transition-colors flex-shrink-0"
            >
              <Home className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="font-serif text-sm sm:text-xl hidden xs:inline">Taverna Galazio</span>
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="tel:+493412628561"
                className="flex items-center gap-1 sm:gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone className="w-3 sm:w-4 h-3 sm:h-4" />
                <span className="hidden sm:inline text-xs sm:text-sm">0341 262 856 1</span>
              </a>
              <Button asChild className="rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-xs sm:text-sm px-3 sm:px-4 py-2">
                <Link href="/#reservieren">Reservieren</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="py-6 sm:py-12 lg:py-16">
        <div className="container mx-auto px-3 sm:px-4">
          {/* Back to Homepage Button */}
          <div className="mb-4 sm:mb-8">
            <Button
              asChild
              variant="outline"
              className="rounded-full px-4 sm:px-6 text-xs sm:text-sm"
            >
              <Link href="/">← Home</Link>
            </Button>
          </div>

          {/* Menu Type Selection - Centered */}
          <div className="flex flex-col items-center justify-center gap-4 sm:gap-8 mb-6 sm:mb-8">
            <div>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-foreground font-medium text-center">
                Speisekarte
              </h1>
            </div>

            <div className="flex gap-2 sm:gap-3 flex-wrap justify-center">
              <Button
                variant={activeMenu === "hauptkarte" ? "default" : "outline"}
                onClick={() => handleMenuSwitch("hauptkarte")}
                className="rounded-full px-4 sm:px-6 text-xs sm:text-sm"
              >
                Hauptkarte
              </Button>
              <Button
                variant={activeMenu === "extrakarte" ? "default" : "outline"}
                onClick={() => handleMenuSwitch("extrakarte")}
                className="rounded-full px-4 sm:px-6 text-xs sm:text-sm"
              >
                Extra Karte
              </Button>
            </div>
          </div>

          {/* Flipbook */}
          <MenuFlipbook
            key={activeMenu}
            categories={currentMenu}
            onDishClick={setSelectedDish}
            isMobile={isMobile}
          />
        </div>
      </main>

      {/* Dish Modal */}
      <DishModal dish={selectedDish} onClose={() => setSelectedDish(null)} />
    </div>
  )
}
