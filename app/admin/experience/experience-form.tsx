"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { Schema } from "@/amplify/data/resource"
import {
  experienceContentSchema,
  experienceFeatureSchema,
  type ExperienceContentInput,
  type ExperienceFeatureInput,
} from "@/lib/content/schemas"
import {
  saveExperienceContent,
  createExperienceFeature,
  updateExperienceFeature,
  deleteExperienceFeature,
  reorderExperienceFeatures,
} from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ListManager } from "@/components/admin/list-manager"
import { Form } from "@/components/ui/form"

type ExperienceFeature = Schema["ExperienceFeature"]["type"]

export function ExperienceForm({
  initialValues,
  features,
}: {
  initialValues: ExperienceContentInput
  features: ExperienceFeature[]
}) {
  const form = useForm<ExperienceContentInput>({
    resolver: zodResolver(experienceContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: ExperienceContentInput) {
    try {
      const saved = await saveExperienceContent(values)
      form.reset(saved)
      toast.success("Erlebnis-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdminFormCard
            title="Erlebnis"
            description="Einleitungstext des Erlebnis-Bereichs."
            footer={
              <FormActions
                isSubmitting={form.formState.isSubmitting}
                isDirty={form.formState.isDirty}
                onCancel={() => form.reset(initialValues)}
              />
            }
          >
            <TextField control={form.control} name="eyebrow" label="Kicker" />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField control={form.control} name="heading1" label="Überschrift Zeile 1" />
              <TextField control={form.control} name="heading2" label="Überschrift Zeile 2" />
            </div>
            <TextField control={form.control} name="intro" label="Einleitung" textarea />
          </AdminFormCard>
        </form>
      </Form>

      <AdminFormCard title="Erlebnis-Merkmale" description="Die vier Merkmal-Karten. Symbole bleiben fest im Design hinterlegt.">
        <ListManager<ExperienceFeature, ExperienceFeatureInput>
          items={features}
          schema={experienceFeatureSchema}
          defaultValues={{ title: "", description: "", sortOrder: features.length, iconKey: "sparkles" }}
          toFormValues={(item) => ({ title: item.title, description: item.description, sortOrder: item.sortOrder, iconKey: item.iconKey })}
          summary={(item) => ({ title: item.title, subtitle: item.description })}
          renderFields={(control) => (
            <>
              <TextField control={control} name="title" label="Titel" />
              <TextField control={control} name="description" label="Beschreibung" textarea />
            </>
          )}
          onCreate={createExperienceFeature}
          onUpdate={updateExperienceFeature}
          onDelete={deleteExperienceFeature}
          onReorder={reorderExperienceFeatures}
          addLabel="Merkmal hinzufügen"
        />
      </AdminFormCard>
    </div>
  )
}
