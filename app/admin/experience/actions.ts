"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { createListItem, deleteListItem, reorderListItems, updateListItem, upsertSingleton } from "@/lib/content/list-crud"
import { experienceContentSchema, experienceFeatureSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveExperienceContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.ExperienceContent, SINGLETON_IDS.experience, experienceContentSchema, input, ["/"])
}

export async function createExperienceFeature(input: unknown) {
  return createListItem(cookiesClient.models.ExperienceFeature, experienceFeatureSchema, input, ["/"])
}

export async function updateExperienceFeature(id: string, input: unknown) {
  return updateListItem(cookiesClient.models.ExperienceFeature, id, experienceFeatureSchema, input, ["/"])
}

export async function deleteExperienceFeature(id: string) {
  return deleteListItem(cookiesClient.models.ExperienceFeature, id, ["/"])
}

export async function reorderExperienceFeatures(orderedIds: string[]) {
  return reorderListItems(cookiesClient.models.ExperienceFeature, orderedIds, ["/"])
}
