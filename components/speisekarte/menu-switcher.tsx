"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EXTRA_MENU_PAGES, MAIN_MENU_PAGES, MenuFlipbook } from "@/components/speisekarte/menu-flipbook"

const MENUS = [
  { id: "main", title: "Speisekarte", pages: MAIN_MENU_PAGES },
  { id: "extra", title: "Extra-Karte", pages: EXTRA_MENU_PAGES },
] as const

type MenuId = (typeof MENUS)[number]["id"]

/** Home button + switch between the main Speisekarte and the separate Extra-Karte flipbook. */
export function MenuSwitcher() {
  const [activeMenu, setActiveMenu] = useState<MenuId>("main")
  const current = MENUS.find((menu) => menu.id === activeMenu) ?? MENUS[0]

  return (
    <>
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 sm:mb-3">
        <Button
          asChild
          variant="outline"
          className="rounded-full border-primary/15 bg-background/80 px-4 text-xs shadow-sm backdrop-blur-sm hover:bg-background sm:px-6 sm:text-sm"
        >
          <Link href="/">← Home</Link>
        </Button>

        <div
          role="tablist"
          aria-label="Karte auswählen"
          className="flex items-center gap-1 rounded-full border border-primary/15 bg-background/80 p-1 shadow-sm backdrop-blur-sm"
        >
          {MENUS.map((menu) => (
            <button
              key={menu.id}
              type="button"
              role="tab"
              aria-selected={activeMenu === menu.id}
              onClick={() => setActiveMenu(menu.id)}
              className={`rounded-full px-3 py-1.5 text-xs transition-colors sm:px-5 sm:text-sm ${
                activeMenu === menu.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {menu.title}
            </button>
          ))}
        </div>
      </div>

      {/* Remount on switch so the book starts at its cover */}
      <MenuFlipbook key={current.id} pages={current.pages} title={current.title} />
    </>
  )
}
