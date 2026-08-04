"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { Schema } from "@/amplify/data/resource"
import { eventTypeSchema, eventsSectionContentSchema, type EventTypeInput, type EventsSectionContentInput } from "@/lib/content/schemas"
import { saveEventsSectionContent, createEventType, updateEventType, deleteEventType, reorderEventTypes } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { ListManager } from "@/components/admin/list-manager"
import { Form, FormField } from "@/components/ui/form"

type EventType = Schema["EventType"]["type"]

export function EventsForm({
  initialValues,
  initialPreviewUrl,
  eventTypes,
}: {
  initialValues: EventsSectionContentInput
  initialPreviewUrl: string
  eventTypes: EventType[]
}) {
  const [resetKey, setResetKey] = useState(0)
  const form = useForm<EventsSectionContentInput>({
    resolver: zodResolver(eventsSectionContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: EventsSectionContentInput) {
    try {
      const saved = await saveEventsSectionContent(values)
      form.reset(saved)
      toast.success("Events-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  function handleCancel() {
    form.reset(initialValues)
    setResetKey((key) => key + 1)
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdminFormCard
            title="Events"
            description="Private-Veranstaltungen-Bereich der Startseite."
            footer={
              <FormActions isSubmitting={form.formState.isSubmitting} isDirty={form.formState.isDirty} onCancel={handleCancel} />
            }
          >
            <FormField
              control={form.control}
              name="imagePath"
              render={({ field }) => (
                <ImageUploadField
                  key={resetKey}
                  label="Bild"
                  value={field.value}
                  onChange={field.onChange}
                  pathPrefix="events/"
                  previewUrl={initialPreviewUrl}
                />
              )}
            />
            <TextField control={form.control} name="imageAlt" label="Alt-Text (Bildbeschreibung)" />

            <TextField control={form.control} name="eyebrow" label="Kicker" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField control={form.control} name="heading1" label="Überschrift Zeile 1" />
              <TextField control={form.control} name="heading2" label="Überschrift Zeile 2" />
            </div>
            <TextField control={form.control} name="description" label="Beschreibung" textarea />

            <div className="grid gap-4 sm:grid-cols-3">
              <TextField control={form.control} name="statNumber" label="Statistik-Zahl (z. B. 100+)" />
              <TextField control={form.control} name="statLabel" label="Statistik-Text" />
              <TextField control={form.control} name="ctaLabel" label="Button-Text" />
            </div>
          </AdminFormCard>
        </form>
      </Form>

      <AdminFormCard title="Veranstaltungstypen" description="Die vier Karten. Symbole bleiben fest im Design hinterlegt.">
        <ListManager<EventType, EventTypeInput>
          items={eventTypes}
          schema={eventTypeSchema}
          defaultValues={{ title: "", description: "", sortOrder: eventTypes.length, iconKey: "cake" }}
          toFormValues={(item) => ({ title: item.title, description: item.description, sortOrder: item.sortOrder, iconKey: item.iconKey })}
          summary={(item) => ({ title: item.title, subtitle: item.description })}
          renderFields={(control) => (
            <>
              <TextField control={control} name="title" label="Titel" />
              <TextField control={control} name="description" label="Beschreibung" textarea />
            </>
          )}
          onCreate={createEventType}
          onUpdate={updateEventType}
          onDelete={deleteEventType}
          onReorder={reorderEventTypes}
          addLabel="Veranstaltungstyp hinzufügen"
        />
      </AdminFormCard>
    </div>
  )
}
