"use client"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { toTelHref } from "@/lib/content/phone"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

const navAnchors = ["uber-uns", "erlebnis", "speisekarte", "galerie", "events", "kontakt"] as const

interface HeaderProps {
  settings: HomepageContent["siteSettings"]
  contact: HomepageContent["contactInfo"]
}

export function Header({ settings, contact }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navLinks = [
    { href: `#${navAnchors[0]}`, label: settings.navAboutLabel },
    { href: `#${navAnchors[1]}`, label: settings.navExperienceLabel },
    { href: `#${navAnchors[2]}`, label: settings.navMenuLabel },
    { href: `#${navAnchors[3]}`, label: settings.navGalleryLabel },
    { href: `#${navAnchors[4]}`, label: settings.navEventsLabel },
    { href: `#${navAnchors[5]}`, label: settings.navContactLabel },
  ]

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
      <div className="container mx-auto px-3 sm:px-4 flex items-center justify-between">
<div className="flex items-center space-x-1">
  <Link href="/" className="flex items-center flex-shrink-0">
    <Image
      src={settings.logoUrl}
      alt="Taverna Galazio bei Leo"
      width={84}
      height={84}
      className="h-14 sm:h-18 w-auto object-contain"
      priority
    />
  </Link>

  <Link href="https://main.d108ethabimuhp.amplifyapp.com/" className="flex items-center flex-shrink-0">
    <Image
      src="/images/logo-cafe.png"
      alt="Taverna Galazio bei Leo"
      width={84}
      height={84}
      className="h-14 sm:h-18 w-auto object-contain"
      priority
    />
  </Link>
</div>

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
            href={toTelHref(contact.phone)}
            className={cn(
              "flex items-center gap-2 text-sm font-medium transition-colors hover:opacity-70",
              isScrolled ? "text-foreground" : "text-card"
            )}
          >
            <Phone className="h-4 w-4" />
            <span className="hidden xl:inline">{contact.phone}</span>
          </a>
          <Button
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full px-6"
          >
            <Link href={contact.reservationUrl}>{settings.reservationButtonLabel}</Link>
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
                href={toTelHref(contact.phone)}
                className="flex items-center gap-2 text-foreground font-medium"
              >
                <Phone className="h-5 w-5" />
                {contact.phone}
              </a>
              <Button
                asChild
                className="bg-accent text-accent-foreground hover:bg-accent/90 rounded-full w-full"
              >
                <Link href={contact.reservationUrl} onClick={() => setIsMobileMenuOpen(false)}>
                  {settings.reservationButtonLabel}
                </Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
