import "server-only"

import { revalidatePath } from "next/cache"
import { requireAdmin } from "@/lib/amplify/server"

/**
 * Shared auth + validation + error-handling + revalidation for every list
 * model's Server Actions (ExperienceFeature, MenuCategory, MenuItem,
 * GalleryImage, EventType, Review). Next.js requires each exported "use
 * server" function to be a static, individually-named export — so the
 * per-section actions.ts files stay explicit, thin wrappers that call these
 * generics rather than a dynamically generated factory.
 */

type DataResult<T> = { data: T | null; errors?: readonly unknown[] }

function assertNoErrors<T>(result: DataResult<T>, fallbackMessage: string): T {
  if (result.errors && result.errors.length > 0) {
    throw new Error(String((result.errors[0] as { message?: string })?.message ?? fallbackMessage))
  }
  if (!result.data) {
    throw new Error(fallbackMessage)
  }
  return result.data
}

// Amplify's generated per-model client methods take a model-specific
// required-fields type, not a generic Record — `any` here is the adapter
// boundary that lets one generic helper accept every model's client;
// runtime correctness is guaranteed by the Zod `schema.parse()` call above
// it, not by this parameter type.
interface SingletonModelClient<T> {
  get: (input: { id: string }) => Promise<DataResult<T>>
  create: (input: any) => Promise<DataResult<T>>
  update: (input: any) => Promise<DataResult<T>>
}

export async function upsertSingleton<TInput extends Record<string, unknown>, TResult>(
  model: SingletonModelClient<TResult>,
  id: string,
  schema: { parse: (input: unknown) => TInput },
  input: unknown,
  revalidatePaths: string[],
): Promise<TResult> {
  await requireAdmin()
  const parsed = schema.parse(input)
  const { data: existing } = await model.get({ id })
  const result = existing ? await model.update({ id, ...parsed }) : await model.create({ id, ...parsed })
  const saved = assertNoErrors(result, "Speichern fehlgeschlagen")
  revalidatePaths.forEach((path) => revalidatePath(path))
  return saved
}

interface ListModelClient<T> {
  create: (input: any) => Promise<DataResult<T>>
  update: (input: any) => Promise<DataResult<T>>
  delete: (input: { id: string }) => Promise<DataResult<T>>
}

export async function createListItem<TInput extends Record<string, unknown>, TResult>(
  model: ListModelClient<TResult>,
  schema: { parse: (input: unknown) => TInput },
  input: unknown,
  revalidatePaths: string[],
): Promise<TResult> {
  await requireAdmin()
  const parsed = schema.parse(input)
  const result = await model.create(parsed)
  const saved = assertNoErrors(result, "Erstellen fehlgeschlagen")
  revalidatePaths.forEach((path) => revalidatePath(path))
  return saved
}

export async function updateListItem<TInput extends Record<string, unknown>, TResult>(
  model: ListModelClient<TResult>,
  id: string,
  schema: { parse: (input: unknown) => TInput },
  input: unknown,
  revalidatePaths: string[],
): Promise<TResult> {
  await requireAdmin()
  const parsed = schema.parse(input)
  const result = await model.update({ id, ...parsed })
  const saved = assertNoErrors(result, "Aktualisieren fehlgeschlagen")
  revalidatePaths.forEach((path) => revalidatePath(path))
  return saved
}

export async function deleteListItem<TResult>(
  model: ListModelClient<TResult>,
  id: string,
  revalidatePaths: string[],
): Promise<void> {
  await requireAdmin()
  const result = await model.delete({ id })
  assertNoErrors(result, "Löschen fehlgeschlagen")
  revalidatePaths.forEach((path) => revalidatePath(path))
}

export async function reorderListItems<TResult>(
  model: Pick<ListModelClient<TResult>, "update">,
  orderedIds: string[],
  revalidatePaths: string[],
): Promise<void> {
  await requireAdmin()
  await Promise.all(
    orderedIds.map((id, index) => model.update({ id, sortOrder: index }).then((r) => assertNoErrors(r, "Sortieren fehlgeschlagen"))),
  )
  revalidatePaths.forEach((path) => revalidatePath(path))
}
