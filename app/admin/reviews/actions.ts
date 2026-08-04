"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { createListItem, deleteListItem, reorderListItems, updateListItem, upsertSingleton } from "@/lib/content/list-crud"
import { reviewSchema, reviewsSectionContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveReviewsSectionContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.ReviewsSectionContent, SINGLETON_IDS.reviewsSection, reviewsSectionContentSchema, input, [
    "/",
  ])
}

export async function createReview(input: unknown) {
  return createListItem(cookiesClient.models.Review, reviewSchema, input, ["/"])
}

export async function updateReview(id: string, input: unknown) {
  return updateListItem(cookiesClient.models.Review, id, reviewSchema, input, ["/"])
}

export async function deleteReview(id: string) {
  return deleteListItem(cookiesClient.models.Review, id, ["/"])
}

export async function reorderReviews(orderedIds: string[]) {
  return reorderListItems(cookiesClient.models.Review, orderedIds, ["/"])
}
