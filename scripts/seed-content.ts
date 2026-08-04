/**
 * Seeds DynamoDB with the EXACT content that was hardcoded in the site
 * before the CMS migration (see lib/content/defaults.ts — the single
 * source shared with the runtime fallback logic), and uploads the
 * matching images from public/ to S3 so every record gets a real storage
 * path from day one.
 *
 * Prerequisites:
 *   1. `npx ampx sandbox` (or a real deploy) has already run, producing
 *      amplify_outputs.json.
 *   2. The admin user has been created (see README) and has already signed
 *      in once via /login in the browser to complete the initial
 *      force-new-password challenge — this script signs in with a
 *      permanent password, it does not handle that challenge itself.
 *   3. SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD are set (e.g. in
 *      .env.local, loaded automatically below).
 *
 * Safe to re-run: singleton records are skipped if they already exist,
 * and each list is skipped entirely if it already has any rows.
 *
 * Usage: npx tsx scripts/seed-content.ts
 */

import { existsSync, readFileSync } from "node:fs"
import path from "node:path"
import { Amplify } from "aws-amplify"
import { signIn } from "aws-amplify/auth"
import { generateClient } from "aws-amplify/data"
import { uploadData } from "aws-amplify/storage"
import type { Schema } from "../amplify/data/resource"
import outputs from "../amplify_outputs.json"
import { SINGLETON_IDS } from "../lib/content/singleton-ids"
import * as defaults from "../lib/content/defaults"

function loadDotEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local")
  if (!existsSync(envPath)) return
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith("#")) continue
    const eq = trimmed.indexOf("=")
    if (eq === -1) continue
    const key = trimmed.slice(0, eq).trim()
    let value = trimmed.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (!(key in process.env)) process.env[key] = value
  }
}
loadDotEnvLocal()

const CONTENT_TYPES: Record<string, string> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  webp: "image/webp",
}

/** Uploads public/<localPath> to S3 under <s3Prefix>/<filename>, returns the S3 path. */
async function uploadPublicImage(localPath: string, s3Prefix: string): Promise<string> {
  const absolutePath = path.join(process.cwd(), "public", localPath)
  const fileData = readFileSync(absolutePath)
  const extension = path.extname(localPath).slice(1).toLowerCase()
  const s3Path = `${s3Prefix}/${path.basename(localPath)}`
  await uploadData({
    path: s3Path,
    data: fileData,
    options: { contentType: CONTENT_TYPES[extension] ?? "application/octet-stream" },
  }).result
  console.log(`  uploaded ${localPath} -> ${s3Path}`)
  return s3Path
}

async function main() {
  const adminEmail = process.env.SEED_ADMIN_EMAIL
  const adminPassword = process.env.SEED_ADMIN_PASSWORD

  if (!adminEmail || !adminPassword) {
    console.error("Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD (e.g. in .env.local) before running the seed script.")
    process.exit(1)
  }
  if (!existsSync(path.join(process.cwd(), "amplify_outputs.json"))) {
    console.error("amplify_outputs.json not found. Run `npx ampx sandbox` first.")
    process.exit(1)
  }

  Amplify.configure(outputs)

  console.log(`Signing in as ${adminEmail}...`)
  const signInResult = await signIn({ username: adminEmail, password: adminPassword })
  if (!signInResult.isSignedIn) {
    console.error(`Sign-in did not complete (next step: ${signInResult.nextStep.signInStep}).`)
    console.error("Sign in once via /login in the browser first to complete any pending challenge, then re-run this script.")
    process.exit(1)
  }

  const client = generateClient<Schema>({ authMode: "userPool" })

  async function seedSingleton<TModel extends { get: (k: { id: string }) => Promise<any>; create: (v: any) => Promise<any> }>(
    label: string,
    model: TModel,
    id: string,
    data: Record<string, unknown>,
  ) {
    const { data: existing } = await model.get({ id })
    if (existing) {
      console.log(`skip ${label} (already exists)`)
      return
    }
    const { errors } = await model.create({ id, ...data })
    if (errors?.length) throw new Error(`${label}: ${errors[0]?.message}`)
    console.log(`seeded ${label}`)
  }

  async function seedListIfEmpty<TModel extends { list: () => Promise<any> }>(
    label: string,
    model: TModel,
    seedFn: () => Promise<void>,
  ) {
    const { data } = await model.list()
    if (data.length > 0) {
      console.log(`skip ${label} (${data.length} row(s) already present)`)
      return
    }
    await seedFn()
    console.log(`seeded ${label}`)
  }

  console.log("\nSingleton content:")

  await seedSingleton("SiteSettings", client.models.SiteSettings, SINGLETON_IDS.siteSettings, {
    ...defaults.siteSettingsDefaults,
    logoPath: await uploadPublicImage(defaults.siteSettingsLogoFallback.replace(/^\//, ""), "settings"),
  })

  await seedSingleton("ContactInfo", client.models.ContactInfo, SINGLETON_IDS.contactInfo, defaults.contactInfoDefaults)

  await seedSingleton("HeroContent", client.models.HeroContent, SINGLETON_IDS.hero, {
    ...defaults.heroDefaults,
    backgroundImagePath: await uploadPublicImage(defaults.heroDefaults.backgroundImagePath, "hero"),
  })

  await seedSingleton("AboutContent", client.models.AboutContent, SINGLETON_IDS.about, {
    ...defaults.aboutDefaults,
    imagePath: await uploadPublicImage(defaults.aboutDefaults.imagePath, "about"),
  })

  await seedSingleton("ExperienceContent", client.models.ExperienceContent, SINGLETON_IDS.experience, defaults.experienceDefaults)

  await seedSingleton("MenuSectionContent", client.models.MenuSectionContent, SINGLETON_IDS.menuSection, defaults.menuSectionDefaults)

  await seedSingleton(
    "GallerySectionContent",
    client.models.GallerySectionContent,
    SINGLETON_IDS.gallerySection,
    defaults.gallerySectionDefaults,
  )

  await seedSingleton("EventsSectionContent", client.models.EventsSectionContent, SINGLETON_IDS.eventsSection, {
    ...defaults.eventsSectionDefaults,
    imagePath: await uploadPublicImage(defaults.eventsSectionDefaults.imagePath, "events"),
  })

  await seedSingleton(
    "ReviewsSectionContent",
    client.models.ReviewsSectionContent,
    SINGLETON_IDS.reviewsSection,
    defaults.reviewsSectionDefaults,
  )

  await seedSingleton(
    "ContactSectionContent",
    client.models.ContactSectionContent,
    SINGLETON_IDS.contactSection,
    defaults.contactSectionDefaults,
  )

  await seedSingleton(
    "ReservationCtaContent",
    client.models.ReservationCtaContent,
    SINGLETON_IDS.reservationCta,
    defaults.reservationCtaDefaults,
  )

  await seedSingleton("FooterContent", client.models.FooterContent, SINGLETON_IDS.footer, defaults.footerDefaults)

  console.log("\nList content:")

  await seedListIfEmpty("ExperienceFeature", client.models.ExperienceFeature, async () => {
    for (const feature of defaults.experienceFeaturesDefaults) {
      const { errors } = await client.models.ExperienceFeature.create(feature)
      if (errors?.length) throw new Error(`ExperienceFeature: ${errors[0]?.message}`)
    }
  })

  await seedListIfEmpty("EventType", client.models.EventType, async () => {
    for (const eventType of defaults.eventTypesDefaults) {
      const { errors } = await client.models.EventType.create(eventType)
      if (errors?.length) throw new Error(`EventType: ${errors[0]?.message}`)
    }
  })

  await seedListIfEmpty("Review", client.models.Review, async () => {
    for (const review of defaults.reviewsDefaults) {
      const { errors } = await client.models.Review.create(review)
      if (errors?.length) throw new Error(`Review: ${errors[0]?.message}`)
    }
  })

  await seedListIfEmpty("GalleryImage", client.models.GalleryImage, async () => {
    for (const image of defaults.galleryImagesDefaults) {
      const imagePath = await uploadPublicImage(image.imagePath, "gallery")
      const { errors } = await client.models.GalleryImage.create({ ...image, imagePath })
      if (errors?.length) throw new Error(`GalleryImage: ${errors[0]?.message}`)
    }
  })

  await seedListIfEmpty("MenuCategory + MenuItem", client.models.MenuCategory, async () => {
    const categoryIdByName = new Map<string, string>()
    for (const category of defaults.menuCategoriesDefaults) {
      const { data, errors } = await client.models.MenuCategory.create(category)
      if (errors?.length || !data) throw new Error(`MenuCategory: ${errors?.[0]?.message}`)
      categoryIdByName.set(category.name, data.id)
    }

    for (const item of defaults.menuItemsDefaults) {
      const categoryId = categoryIdByName.get(item.category)
      if (!categoryId) throw new Error(`MenuItem "${item.name}": unknown category "${item.category}"`)
      const imagePath = await uploadPublicImage(item.imagePath, "menu")
      const { errors } = await client.models.MenuItem.create({
        name: item.name,
        description: item.description,
        price: item.price,
        sortOrder: item.sortOrder,
        categoryId,
        imagePath,
      })
      if (errors?.length) throw new Error(`MenuItem: ${errors[0]?.message}`)
    }
  })

  console.log("\nDone. The public site now renders from DynamoDB/S3 instead of the hardcoded fallback.")
}

main().catch((error) => {
  console.error("\nSeed failed:", error)
  process.exit(1)
})
