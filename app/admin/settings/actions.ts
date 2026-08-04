"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { upsertSingleton } from "@/lib/content/list-crud"
import { contactInfoSchema, siteSettingsSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveSiteSettings(input: unknown) {
  return upsertSingleton(cookiesClient.models.SiteSettings, SINGLETON_IDS.siteSettings, siteSettingsSchema, input, ["/"])
}

export async function saveContactInfo(input: unknown) {
  return upsertSingleton(cookiesClient.models.ContactInfo, SINGLETON_IDS.contactInfo, contactInfoSchema, input, ["/"])
}
