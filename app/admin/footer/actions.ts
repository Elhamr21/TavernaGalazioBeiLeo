"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { upsertSingleton } from "@/lib/content/list-crud"
import { footerContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveFooterContent(input: unknown) {
  const saved = await upsertSingleton(
    cookiesClient.models.FooterContent,
    SINGLETON_IDS.footer,
    footerContentSchema,
    input,
    ["/"],
  )
  return saved
}
