import { z } from "zod"

/**
 * Zod schemas mirroring amplify/data/resource.ts, minus id/createdAt/
 * updatedAt (Amplify-managed). Shared by admin forms (React Hook Form
 * resolvers) and the Server Actions that persist them — one definition of
 * "valid" for each section, validated again server-side even though the
 * form already checked, since a Server Action can be invoked directly.
 */

const requiredText = (label: string) => z.string().trim().min(1, `${label} darf nicht leer sein`)

export const siteSettingsSchema = z.object({
  navAboutLabel: requiredText("Label"),
  navExperienceLabel: requiredText("Label"),
  navMenuLabel: requiredText("Label"),
  navGalleryLabel: requiredText("Label"),
  navEventsLabel: requiredText("Label"),
  navContactLabel: requiredText("Label"),
  reservationButtonLabel: requiredText("Button-Text"),
  logoPath: z.string().nullable().optional(),
})
export type SiteSettingsInput = z.infer<typeof siteSettingsSchema>

export const contactInfoSchema = z.object({
  phone: requiredText("Telefonnummer"),
  email: z.string().trim().email("Ungültige E-Mail-Adresse"),
  addressLine1: requiredText("Adresse"),
  addressLine2: requiredText("Adresse"),
  reservationUrl: z.string().trim().url("Ungültige URL"),
})
export type ContactInfoInput = z.infer<typeof contactInfoSchema>

export const heroContentSchema = z.object({
  ratingValue: requiredText("Bewertung"),
  ratingLabel: requiredText("Label"),
  ratingCountLabel: requiredText("Label"),
  headlinePart1: requiredText("Überschrift"),
  headlineAccent: requiredText("Überschrift"),
  headlinePart2: requiredText("Überschrift"),
  subheadline: requiredText("Unterüberschrift"),
  primaryButtonLabel: requiredText("Button-Text"),
  secondaryButtonLabel: requiredText("Button-Text"),
  backgroundImagePath: z.string().nullable().optional(),
})
export type HeroContentInput = z.infer<typeof heroContentSchema>

export const aboutContentSchema = z.object({
  badgeNumber: requiredText("Abzeichen"),
  badgeLabel: requiredText("Abzeichen-Text"),
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  paragraph1: requiredText("Absatz"),
  paragraph2: requiredText("Absatz"),
  paragraph3: requiredText("Absatz"),
  signature: requiredText("Signatur"),
  imagePath: z.string().nullable().optional(),
  imageAlt: requiredText("Alt-Text"),
})
export type AboutContentInput = z.infer<typeof aboutContentSchema>

export const experienceContentSchema = z.object({
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  intro: requiredText("Einleitung"),
})
export type ExperienceContentInput = z.infer<typeof experienceContentSchema>

export const experienceFeatureSchema = z.object({
  title: requiredText("Titel"),
  description: requiredText("Beschreibung"),
  sortOrder: z.number().int().default(0),
  iconKey: z.string().default("leaf"),
})
export type ExperienceFeatureInput = z.infer<typeof experienceFeatureSchema>

export const menuSectionContentSchema = z.object({
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  linkLabel: requiredText("Link-Text"),
})
export type MenuSectionContentInput = z.infer<typeof menuSectionContentSchema>

export const menuCategorySchema = z.object({
  name: requiredText("Name"),
  sortOrder: z.number().int().default(0),
})
export type MenuCategoryInput = z.infer<typeof menuCategorySchema>

export const menuItemSchema = z.object({
  name: requiredText("Name"),
  description: requiredText("Beschreibung"),
  price: z
    .string()
    .trim()
    .regex(/^\d+([.,]\d{1,2})?$/, "Preis muss z. B. 18,90 sein"),
  imagePath: z.string().nullable().optional(),
  sortOrder: z.number().int().default(0),
  categoryId: requiredText("Kategorie"),
})
export type MenuItemInput = z.infer<typeof menuItemSchema>

export const gallerySectionContentSchema = z.object({
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  description: requiredText("Beschreibung"),
})
export type GallerySectionContentInput = z.infer<typeof gallerySectionContentSchema>

export const galleryImageSchema = z.object({
  imagePath: z.string().nullable().optional(),
  alt: requiredText("Alt-Text"),
  caption: requiredText("Bildunterschrift"),
  sortOrder: z.number().int().default(0),
})
export type GalleryImageInput = z.infer<typeof galleryImageSchema>

export const eventsSectionContentSchema = z.object({
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  description: requiredText("Beschreibung"),
  imagePath: z.string().nullable().optional(),
  imageAlt: requiredText("Alt-Text"),
  statNumber: requiredText("Statistik-Zahl"),
  statLabel: requiredText("Statistik-Text"),
  ctaLabel: requiredText("Button-Text"),
})
export type EventsSectionContentInput = z.infer<typeof eventsSectionContentSchema>

export const eventTypeSchema = z.object({
  title: requiredText("Titel"),
  description: requiredText("Beschreibung"),
  sortOrder: z.number().int().default(0),
  iconKey: z.string().default("cake"),
})
export type EventTypeInput = z.infer<typeof eventTypeSchema>

export const reviewsSectionContentSchema = z.object({
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  aggregateRating: requiredText("Bewertung"),
  aggregateCount: requiredText("Bewertungsanzahl"),
  ctaLabel: requiredText("Button-Text"),
})
export type ReviewsSectionContentInput = z.infer<typeof reviewsSectionContentSchema>

export const reviewSchema = z.object({
  author: requiredText("Name"),
  text: requiredText("Bewertungstext"),
  source: requiredText("Quelle"),
  date: requiredText("Datum"),
  rating: z.number().int().min(1).max(5).default(5),
  sortOrder: z.number().int().default(0),
})
export type ReviewInput = z.infer<typeof reviewSchema>

export const contactSectionContentSchema = z.object({
  eyebrow: requiredText("Kicker"),
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  addressLabel: requiredText("Label"),
  routePlanLabel: requiredText("Link-Text"),
  phoneLabel: requiredText("Label"),
  emailLabel: requiredText("Label"),
  hoursLabel: requiredText("Label"),
  parkingLabel: requiredText("Label"),
  accessibleLabel: requiredText("Label"),
  callNowButtonLabel: requiredText("Button-Text"),
  openMapsButtonLabel: requiredText("Button-Text"),
})
export type ContactSectionContentInput = z.infer<typeof contactSectionContentSchema>

export const reservationCtaContentSchema = z.object({
  heading1: requiredText("Überschrift"),
  heading2: requiredText("Überschrift"),
  description: requiredText("Beschreibung"),
  buttonLabel: requiredText("Button-Text"),
  phoneButtonLabelMobile: requiredText("Button-Text"),
  note: requiredText("Hinweistext"),
})
export type ReservationCtaContentInput = z.infer<typeof reservationCtaContentSchema>

export const footerContentSchema = z.object({
  brandName: requiredText("Markenname"),
  brandSubtitle: requiredText("Untertitel"),
  description: requiredText("Beschreibung"),
  quickLinksHeading: requiredText("Überschrift"),
  contactHeading: requiredText("Überschrift"),
  hoursHeading: requiredText("Überschrift"),
  quickLinkAboutLabel: requiredText("Label"),
  quickLinkMenuLabel: requiredText("Label"),
  quickLinkGalleryLabel: requiredText("Label"),
  quickLinkEventsLabel: requiredText("Label"),
  quickLinkReservationLabel: requiredText("Label"),
  quickLinkContactLabel: requiredText("Label"),
  legalImpressumLabel: requiredText("Label"),
  legalDatenschutzLabel: requiredText("Label"),
  legalCookieLabel: requiredText("Label"),
  developerCreditText: requiredText("Text"),
  copyrightText: requiredText("Text"),
})
export type FooterContentInput = z.infer<typeof footerContentSchema>

export const loginSchema = z.object({
  email: z.string().trim().email("Ungültige E-Mail-Adresse"),
  password: requiredText("Passwort"),
})
export type LoginInput = z.infer<typeof loginSchema>

export const newPasswordSchema = z
  .object({
    password: z.string().min(8, "Mindestens 8 Zeichen"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  })
export type NewPasswordInput = z.infer<typeof newPasswordSchema>

export const forgotPasswordRequestSchema = z.object({
  email: z.string().trim().email("Ungültige E-Mail-Adresse"),
})
export type ForgotPasswordRequestInput = z.infer<typeof forgotPasswordRequestSchema>

export const forgotPasswordConfirmSchema = z
  .object({
    email: z.string().trim().email("Ungültige E-Mail-Adresse"),
    code: requiredText("Bestätigungscode"),
    password: z.string().min(8, "Mindestens 8 Zeichen"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwörter stimmen nicht überein",
    path: ["confirmPassword"],
  })
export type ForgotPasswordConfirmInput = z.infer<typeof forgotPasswordConfirmSchema>
