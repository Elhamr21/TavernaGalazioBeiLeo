/**
 * Fixed record ids for every singleton content model. The seed script
 * creates exactly one row per id; admin forms only ever get()/update()
 * that id — there is no "create a second Hero" path.
 */
export const SINGLETON_IDS = {
  siteSettings: "site-settings",
  contactInfo: "contact-info",
  hero: "hero",
  about: "about",
  experience: "experience",
  menuSection: "menu-section",
  gallerySection: "gallery-section",
  eventsSection: "events-section",
  reviewsSection: "reviews-section",
  contactSection: "contact-section",
  reservationCta: "reservation-cta",
  footer: "footer",
} as const
