"use client"

import { useState, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { useForm, type Control } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { ZodType } from "zod"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { SortableList } from "@/components/admin/sortable-list"
import { ConfirmDeleteButton } from "@/components/admin/confirm-delete-button"

interface ListManagerProps<TItem extends { id: string; sortOrder: number }, TInput extends Record<string, unknown>> {
  items: TItem[]
  schema: ZodType<TInput, any, any>
  defaultValues: TInput
  toFormValues: (item: TItem) => TInput
  renderFields: (control: Control<TInput>) => ReactNode
  summary: (item: TItem) => { title: string; subtitle?: string }
  onCreate: (input: TInput) => Promise<unknown>
  onUpdate: (id: string, input: TInput) => Promise<unknown>
  onDelete: (id: string) => Promise<void>
  onReorder: (orderedIds: string[]) => Promise<void>
  addLabel: string
  emptyMessage?: string
}

/**
 * Shared CRUD + reorder UI for every repeatable CMS list (Experience
 * features, Reviews, Event types, Gallery images, Menu categories/items).
 * Field layout is customized per section via renderFields; create/edit
 * always route through the section's own Server Actions passed in as
 * props, so validation/auth stays in list-crud.ts.
 */
export function ListManager<TItem extends { id: string; sortOrder: number }, TInput extends Record<string, unknown>>({
  items,
  schema,
  defaultValues,
  toFormValues,
  renderFields,
  summary,
  onCreate,
  onUpdate,
  onDelete,
  onReorder,
  addLabel,
  emptyMessage,
}: ListManagerProps<TItem, TInput>) {
  const router = useRouter()
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isAdding, setIsAdding] = useState(false)

  async function handleReorder(orderedIds: string[]) {
    try {
      await onReorder(orderedIds)
      router.refresh()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Sortieren fehlgeschlagen.")
    }
  }

  return (
    <div className="space-y-4">
      {items.length === 0 && !isAdding && emptyMessage && <p className="text-sm text-muted-foreground">{emptyMessage}</p>}

      {items.length > 0 && (
        <SortableList
          items={items}
          onReorder={handleReorder}
          renderItem={(item) =>
            editingId === item.id ? (
              <ItemForm
                schema={schema}
                defaultValues={toFormValues(item)}
                renderFields={renderFields}
                onCancel={() => setEditingId(null)}
                onSubmit={async (values) => {
                  await onUpdate(item.id, values)
                  setEditingId(null)
                  router.refresh()
                }}
              />
            ) : (
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-medium text-sm truncate">{summary(item).title}</p>
                  {summary(item).subtitle && <p className="text-xs text-muted-foreground truncate">{summary(item).subtitle}</p>}
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setEditingId(item.id)}>
                    Bearbeiten
                  </Button>
                  <ConfirmDeleteButton
                    itemLabel={summary(item).title}
                    onConfirm={async () => {
                      await onDelete(item.id)
                      router.refresh()
                    }}
                  />
                </div>
              </div>
            )
          }
        />
      )}

      {isAdding ? (
        <div className="rounded-lg border bg-card p-3">
          <ItemForm
            schema={schema}
            defaultValues={defaultValues}
            renderFields={renderFields}
            onCancel={() => setIsAdding(false)}
            onSubmit={async (values) => {
              await onCreate(values)
              setIsAdding(false)
              router.refresh()
            }}
          />
        </div>
      ) : (
        <Button type="button" variant="outline" onClick={() => setIsAdding(true)}>
          <Plus className="h-4 w-4" />
          {addLabel}
        </Button>
      )}
    </div>
  )
}

function ItemForm<TInput extends Record<string, unknown>>({
  schema,
  defaultValues,
  renderFields,
  onCancel,
  onSubmit,
}: {
  schema: ZodType<TInput, any, any>
  defaultValues: TInput
  renderFields: (control: Control<TInput>) => ReactNode
  onCancel: () => void
  onSubmit: (values: TInput) => Promise<void>
}) {
  const form = useForm<TInput>({ resolver: zodResolver(schema), defaultValues: defaultValues as never })
  const [isSubmitting, setIsSubmitting] = useState(false)

  async function handleSubmit(values: TInput) {
    setIsSubmitting(true)
    try {
      await onSubmit(values)
      toast.success("Gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
        {renderFields(form.control)}
        <div className="flex items-center gap-2">
          <Button type="submit" size="sm" disabled={isSubmitting}>
            Speichern
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={onCancel} disabled={isSubmitting}>
            Abbrechen
          </Button>
        </div>
      </form>
    </Form>
  )
}
