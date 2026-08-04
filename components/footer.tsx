import Link from "next/link"
import { toTelHref } from "@/lib/content/phone"
import type { HomepageContent } from "@/lib/content/get-homepage-content"

// Opening hours stay hardcoded per the CMS content rules (not admin-managed).
const openingHours = [
  { day: "Montag", hours: "Geschlossen" },
  { day: "Di - Fr", hours: "17:00 - 23:00" },
  { day: "Samstag", hours: "11:30 - 23:00" },
  { day: "Sonntag", hours: "11:30 - 23:00" },
]

interface FooterProps {
  content: HomepageContent["footer"]
  contact: HomepageContent["contactInfo"]
}

export function Footer({ content, contact }: FooterProps) {
  const quickLinks = [
    { href: "#uber-uns", label: content.quickLinkAboutLabel },
    { href: "#speisekarte", label: content.quickLinkMenuLabel },
    { href: "#galerie", label: content.quickLinkGalleryLabel },
    { href: "#events", label: content.quickLinkEventsLabel },
    { href: "#reservieren", label: content.quickLinkReservationLabel },
    { href: "#kontakt", label: content.quickLinkContactLabel },
  ]

  return (
    <footer className="bg-foreground text-background py-16 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="mb-4 sm:mb-6">
              <span className="font-serif text-xl sm:text-2xl font-semibold block">{content.brandName}</span>
              <span className="text-background/60 text-xs sm:text-sm">{content.brandSubtitle}</span>
            </div>
            <p className="text-background/70 text-xs sm:text-sm leading-relaxed">
              {content.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">{content.quickLinksHeading}</h3>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-background/70 text-xs sm:text-sm hover:text-background transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">{content.contactHeading}</h3>
            <address className="text-background/70 text-xs sm:text-sm not-italic space-y-2 sm:space-y-3">
              <p>
                {contact.addressLine1}
                <br />
                {contact.addressLine2}, Deutschland
              </p>
              <p>
                <a href={toTelHref(contact.phone)} className="hover:text-background transition-colors">
                  {contact.phone}
                </a>
              </p>
            </address>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="font-medium mb-3 sm:mb-4 text-sm sm:text-base">{content.hoursHeading}</h3>
            <div className="space-y-1 sm:space-y-2">
              {openingHours.map((item) => (
                <div key={item.day} className="flex justify-between text-xs sm:text-sm">
                  <span className="text-background/70">{item.day}</span>
                  <span className={item.hours === "Geschlossen" ? "text-background/50" : "text-background/70"}>
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

{/* Divider */}
<div className="border-t border-background/10 pt-6 sm:pt-8">
  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">

    {/* Left Side */}
    <p className="text-background/50 text-xs sm:text-sm text-center md:text-left">
      © {new Date().getFullYear()} {content.copyrightText}
    </p>


    {/* Right Side */}
    <div className="flex flex-wrap items-center justify-center md:justify-end gap-4 sm:gap-6">
      <Link
        href="/impressum"
        className="text-background/50 text-xs sm:text-sm hover:text-background transition-colors"
      >
        {content.legalImpressumLabel}
      </Link>

      <Link
        href="/datenschutz"
        className="text-background/50 text-xs sm:text-sm hover:text-background transition-colors"
      >
        {content.legalDatenschutzLabel}
      </Link>

      <Link
        href="/cookie-einstellungen"
        className="text-background/50 text-xs sm:text-sm hover:text-background transition-colors"
      >
        {content.legalCookieLabel}
      </Link>
    </div>
  </div>
</div>

        {/* Powered By */}
        <div className="text-center mt-6 sm:mt-8">
          <p className="text-background/50 text-xs">
            Powered by{" "}
            <a
              href="https://clearline-ai.tech/en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-background hover:text-white transition-colors"
            >
              {content.developerCreditText}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
