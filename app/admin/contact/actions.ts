"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { upsertSingleton } from "@/lib/content/list-crud"
import { contactSectionContentSchema, reservationCtaContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveContactSectionContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.ContactSectionContent, SINGLETON_IDS.contactSection, contactSectionContentSchema, input, [
    "/",
  ])
}

export async function saveReservationCtaContent(input: unknown) {
  return upsertSingleton(
    cookiesClient.models.ReservationCtaContent,
    SINGLETON_IDS.reservationCta,
    reservationCtaContentSchema,
    input,
    ["/"],
  )
}
