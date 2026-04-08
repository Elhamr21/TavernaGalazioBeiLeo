"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "#uber-uns", label: "Über uns" },
  { href: "#erlebnis", label: "Erlebnis" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#galerie", label: "Galerie" },
  { href: "#events", label: "Events" },
  { href: "#kontakt", label: "Kontakt" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-card/95 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex flex-col">
          <span className={cn(
            "font-serif text-xl font-semibold tracking-tight transition-colors",
            isScrolled ? "text-foreground" : "text-card"
          )}>
            Taverna Galazio
          </span>
          <span className={cn(
            "text-xs tracking-widest uppercase transition-colors",
            isScrolled ? "text-muted-foreground" : "text-card/80"
          )}>
            bei Leo
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:opacity-70",
                isScrolled ? "text-foreground" : "text-card"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:+4934156113223"
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70",
              isScrolled ? "text-foreground" : "text-card"
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">+49 341 56113223</span>
          </a>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6"
          >
            <Link href="#reservieren">Tisch reservieren</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 transition-colors",
            isScrolled ? "text-foreground" : "text-card"
          )}
          aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
        >
          {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-card shadow-lg">
          <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-foreground text-lg font-medium py-2 border-b border-border last:border-0"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4">
              <a
                href="tel:+4934156113223"
                className="flex items-center gap-2 text-foreground font-medium"
              >
                <Phone className="h-5 w-5" />
                +49 341 56113223
              </a>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-full"
              >
                <Link href="#reservieren" onClick={() => setIsMobileMenuOpen(false)}>
                  Tisch reservieren
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
