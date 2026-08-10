import "server-only"

import { publicClient } from "@/lib/amplify/client"
import { resolveImageUrl } from "@/lib/amplify/resolve-image"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import * as defaults from "@/lib/content/defaults"
import type { Schema } from "@/amplify/data/resource"

const GENERIC_IMAGE_FALLBACK = "/placeholder.jpg"

async function fetchSingleton<T>(
  fetcher: () => Promise<{ data: T | null; errors?: readonly unknown[] }>,
  fallback: T,
): Promise<T> {
  try {
    const { data, errors } = await fetcher()
    if (errors && errors.length > 0) {
      console.error("CMS singleton fetch returned errors, using fallback:", errors)
      return fallback
    }
    return data ?? fallback
  } catch (error) {
    console.error("CMS singleton fetch threw, using fallback:", error)
    return fallback
  }
}

async function fetchList<T>(
  fetcher: () => Promise<{ data: T[]; errors?: readonly unknown[] }>,
): Promise<T[]> {
  try {
    const { data, errors } = await fetcher()
    if (errors && errors.length > 0) {
      console.error("CMS list fetch returned errors, using fallback:", errors)
      return []
    }
    return data
  } catch (error) {
    console.error("CMS list fetch threw, using fallback:", error)
    return []
  }
}

function byOrder<T extends { sortOrder: number }>(list: T[]): T[] {
  return [...list].sort((a, b) => a.sortOrder - b.sortOrder)
}

export async function getHomepageContent() {
  const [
    siteSettingsRecord,
    contactInfoRecord,
    heroRecord,
    aboutRecord,
    experienceRecord,
    experienceFeatures,
    menuSectionRecord,
    menuCategories,
    menuItems,
    gallerySectionRecord,
    galleryImages,
    eventsSectionRecord,
    eventTypes,
    reviewsSectionRecord,
    reviews,
    contactSectionRecord,
    reservationCtaRecord,
    footerRecord,
  ] = await Promise.all([
    fetchSingleton(() => publicClient.models.SiteSettings.get({ id: SINGLETON_IDS.siteSettings }), null),
    fetchSingleton(() => publicClient.models.ContactInfo.get({ id: SINGLETON_IDS.contactInfo }), null),
    fetchSingleton(() => publicClient.models.HeroContent.get({ id: SINGLETON_IDS.hero }), null),
    fetchSingleton(() => publicClient.models.AboutContent.get({ id: SINGLETON_IDS.about }), null),
    fetchSingleton(() => publicClient.models.ExperienceContent.get({ id: SINGLETON_IDS.experience }), null),
    fetchList(() => publicClient.models.ExperienceFeature.list()),
    fetchSingleton(() => publicClient.models.MenuSectionContent.get({ id: SINGLETON_IDS.menuSection }), null),
    fetchList(() => publicClient.models.MenuCategory.list()),
    fetchList(() => publicClient.models.MenuItem.list()),
    fetchSingleton(() => publicClient.models.GallerySectionContent.get({ id: SINGLETON_IDS.gallerySection }), null),
    fetchList(() => publicClient.models.GalleryImage.list()),
    fetchSingleton(() => publicClient.models.EventsSectionContent.get({ id: SINGLETON_IDS.eventsSection }), null),
    fetchList(() => publicClient.models.EventType.list()),
    fetchSingleton(() => publicClient.models.ReviewsSectionContent.get({ id: SINGLETON_IDS.reviewsSection }), null),
    fetchList(() => publicClient.models.Review.list()),
    fetchSingleton(() => publicClient.models.ContactSectionContent.get({ id: SINGLETON_IDS.contactSection }), null),
    fetchSingleton(() => publicClient.models.ReservationCtaContent.get({ id: SINGLETON_IDS.reservationCta }), null),
    fetchSingleton(() => publicClient.models.FooterContent.get({ id: SINGLETON_IDS.footer }), null),
  ])

  const siteSettings = siteSettingsRecord ?? defaults.siteSettingsDefaults
  const contactInfo = contactInfoRecord ?? defaults.contactInfoDefaults
  const hero = heroRecord ?? defaults.heroDefaults
  const about = aboutRecord ?? defaults.aboutDefaults
  const experience = experienceRecord ?? defaults.experienceDefaults
  const menuSection = menuSectionRecord ?? defaults.menuSectionDefaults
  const gallerySection = gallerySectionRecord ?? defaults.gallerySectionDefaults
  const eventsSection = eventsSectionRecord ?? defaults.eventsSectionDefaults
  const reviewsSection = reviewsSectionRecord ?? defaults.reviewsSectionDefaults
  const contactSection = contactSectionRecord ?? defaults.contactSectionDefaults
  const reservationCta = reservationCtaRecord ?? defaults.reservationCtaDefaults
  const footer = footerRecord ?? defaults.footerDefaults

  // Resolve from the raw *Record (null when no DB row exists at all), never
  // from the post-`??` merged object above — when a record is missing, its
  // merged stand-in is the defaults object, whose image field is a local
  // /public path string, not an S3 key. Passing that into resolveImageUrl
  // would treat it as a real S3 path and produce a broken presigned URL
  // instead of falling back to the local asset.
  const [logoUrl, heroBackgroundUrl, aboutImageUrl, eventsImageUrl] = await Promise.all([
    resolveImageUrl(siteSettingsRecord?.logoPath, defaults.siteSettingsLogoFallback),
    resolveImageUrl(heroRecord?.backgroundImagePath, defaults.heroDefaults.backgroundImagePath),
    resolveImageUrl(aboutRecord?.imagePath, defaults.aboutDefaults.imagePath),
    resolveImageUrl(eventsSectionRecord?.imagePath, defaults.eventsSectionDefaults.imagePath),
  ])

  const experienceFeatureList =
    experienceFeatures.length > 0 ? byOrder(experienceFeatures) : defaults.experienceFeaturesDefaults

  const eventTypeList = eventTypes.length > 0 ? byOrder(eventTypes) : defaults.eventTypesDefaults

  const reviewList = reviews.length > 0 ? byOrder(reviews) : defaults.reviewsDefaults

  const menuItemList =
    menuItems.length > 0
      ? await (async () => {
          const categoryNameById = new Map(menuCategories.map((category) => [category.id, category.name]))
          return Promise.all(
            byOrder(menuItems).map(async (item) => ({
              name: item.name,
              description: item.description,
              price: item.price,
              category: categoryNameById.get(item.categoryId) ?? "",
              imageUrl: await resolveImageUrl(item.imagePath, GENERIC_IMAGE_FALLBACK),
            })),
          )
        })()
      : await Promise.all(
          defaults.menuItemsDefaults.map(async (item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            imageUrl: await resolveImageUrl(null, item.imagePath),
          })),
        )

  const galleryImageList =
    galleryImages.length > 0
      ? await Promise.all(
          byOrder(galleryImages).map(async (image) => ({
            imageUrl: await resolveImageUrl(image.imagePath, GENERIC_IMAGE_FALLBACK),
            alt: image.alt,
            caption: image.caption,
          })),
        )
      : await Promise.all(
          defaults.galleryImagesDefaults.map(async (image) => ({
            imageUrl: await resolveImageUrl(null, image.imagePath),
            alt: image.alt,
            caption: image.caption,
          })),
        )

  return {
    siteSettings: { ...siteSettings, logoUrl },
    contactInfo,
    hero: { ...hero, backgroundImageUrl: heroBackgroundUrl },
    about: { ...about, imageUrl: aboutImageUrl },
    experience: { ...experience, features: experienceFeatureList },
    menu: { ...menuSection, items: menuItemList },
    gallery: { ...gallerySection, images: galleryImageList },
    events: { ...eventsSection, imageUrl: eventsImageUrl, types: eventTypeList },
    reviews: { ...reviewsSection, items: reviewList },
    contactSection,
    reservationCta,
    footer,
  }
}

export type HomepageContent = Awaited<ReturnType<typeof getHomepageContent>>
export type MenuItemView = HomepageContent["menu"]["items"][number]
export type GalleryImageView = HomepageContent["gallery"]["images"][number]
export type ExperienceFeatureView = Schema["ExperienceFeature"]["type"] | (typeof defaults.experienceFeaturesDefaults)[number]
export type EventTypeView = Schema["EventType"]["type"] | (typeof defaults.eventTypesDefaults)[number]
export type ReviewView = Schema["Review"]["type"] | (typeof defaults.reviewsDefaults)[number]
