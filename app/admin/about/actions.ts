"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { upsertSingleton } from "@/lib/content/list-crud"
import { aboutContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveAboutContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.AboutContent, SINGLETON_IDS.about, aboutContentSchema, input, ["/"])
}
