"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { createListItem, deleteListItem, reorderListItems, updateListItem, upsertSingleton } from "@/lib/content/list-crud"
import { eventTypeSchema, eventsSectionContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveEventsSectionContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.EventsSectionContent, SINGLETON_IDS.eventsSection, eventsSectionContentSchema, input, [
    "/",
  ])
}

export async function createEventType(input: unknown) {
  return createListItem(cookiesClient.models.EventType, eventTypeSchema, input, ["/"])
}

export async function updateEventType(id: string, input: unknown) {
  return updateListItem(cookiesClient.models.EventType, id, eventTypeSchema, input, ["/"])
}

export async function deleteEventType(id: string) {
  return deleteListItem(cookiesClient.models.EventType, id, ["/"])
}

export async function reorderEventTypes(orderedIds: string[]) {
  return reorderListItems(cookiesClient.models.EventType, orderedIds, ["/"])
}
