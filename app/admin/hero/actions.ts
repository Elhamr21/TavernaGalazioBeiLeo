"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { upsertSingleton } from "@/lib/content/list-crud"
import { heroContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveHeroContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.HeroContent, SINGLETON_IDS.hero, heroContentSchema, input, ["/"])
}
