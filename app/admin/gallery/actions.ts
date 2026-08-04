"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { createListItem, deleteListItem, reorderListItems, updateListItem, upsertSingleton } from "@/lib/content/list-crud"
import { galleryImageSchema, gallerySectionContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

export async function saveGallerySectionContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.GallerySectionContent, SINGLETON_IDS.gallerySection, gallerySectionContentSchema, input, [
    "/",
  ])
}

export async function createGalleryImage(input: unknown) {
  return createListItem(cookiesClient.models.GalleryImage, galleryImageSchema, input, ["/"])
}

export async function updateGalleryImage(id: string, input: unknown) {
  return updateListItem(cookiesClient.models.GalleryImage, id, galleryImageSchema, input, ["/"])
}

export async function deleteGalleryImage(id: string) {
  return deleteListItem(cookiesClient.models.GalleryImage, id, ["/"])
}

export async function reorderGalleryImages(orderedIds: string[]) {
  return reorderListItems(cookiesClient.models.GalleryImage, orderedIds, ["/"])
}
