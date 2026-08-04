"use server"

import { cookiesClient } from "@/lib/amplify/server"
import { createListItem, deleteListItem, reorderListItems, updateListItem, upsertSingleton } from "@/lib/content/list-crud"
import { menuCategorySchema, menuItemSchema, menuSectionContentSchema } from "@/lib/content/schemas"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"

// MenuCategory/MenuItem have hasMany/belongsTo relations, whose generated
// types include a lazy-loader function field (e.g. `category()`) that
// doesn't structurally fit the generic ListModelClient shape used by
// list-crud.ts's helpers. Cast at the boundary — Zod already validates
// runtime correctness, this only affects compile-time inference.
const menuCategoryModel = cookiesClient.models.MenuCategory as any
const menuItemModel = cookiesClient.models.MenuItem as any

export async function saveMenuSectionContent(input: unknown) {
  return upsertSingleton(cookiesClient.models.MenuSectionContent, SINGLETON_IDS.menuSection, menuSectionContentSchema, input, ["/"])
}

export async function createMenuCategory(input: unknown) {
  return createListItem(menuCategoryModel, menuCategorySchema, input, ["/"])
}

export async function updateMenuCategory(id: string, input: unknown) {
  return updateListItem(menuCategoryModel, id, menuCategorySchema, input, ["/"])
}

export async function deleteMenuCategory(id: string) {
  return deleteListItem(menuCategoryModel, id, ["/"])
}

export async function reorderMenuCategories(orderedIds: string[]) {
  return reorderListItems(menuCategoryModel, orderedIds, ["/"])
}

export async function createMenuItem(input: unknown) {
  return createListItem(menuItemModel, menuItemSchema, input, ["/"])
}

export async function updateMenuItem(id: string, input: unknown) {
  return updateListItem(menuItemModel, id, menuItemSchema, input, ["/"])
}

export async function deleteMenuItem(id: string) {
  return deleteListItem(menuItemModel, id, ["/"])
}

export async function reorderMenuItems(orderedIds: string[]) {
  return reorderListItems(menuItemModel, orderedIds, ["/"])
}
