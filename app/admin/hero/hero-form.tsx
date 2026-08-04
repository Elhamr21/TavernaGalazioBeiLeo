"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { heroContentSchema, type HeroContentInput } from "@/lib/content/schemas"
import { saveHeroContent } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { Form, FormField } from "@/components/ui/form"

export function HeroForm({
  initialValues,
  initialPreviewUrl,
}: {
  initialValues: HeroContentInput
  initialPreviewUrl: string
}) {
  const [resetKey, setResetKey] = useState(0)
  const form = useForm<HeroContentInput>({
    resolver: zodResolver(heroContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: HeroContentInput) {
    try {
      const saved = await saveHeroContent(values)
      form.reset(saved)
      toast.success("Hero-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  function handleCancel() {
    form.reset(initialValues)
    setResetKey((key) => key + 1)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AdminFormCard
          title="Hero"
          description="Erster Bildschirm der Startseite — Überschrift, Untertitel, Buttons und Hintergrundbild."
          footer={
            <FormActions isSubmitting={form.formState.isSubmitting} isDirty={form.formState.isDirty} onCancel={handleCancel} />
          }
        >
          <FormField
            control={form.control}
            name="backgroundImagePath"
            render={({ field }) => (
              <ImageUploadField
                key={resetKey}
                label="Hintergrundbild"
                value={field.value}
                onChange={field.onChange}
                pathPrefix="hero/"
                previewUrl={initialPreviewUrl}
              />
            )}
          />

          <div className="grid gap-4 sm:grid-cols-3">
            <TextField control={form.control} name="ratingValue" label="Bewertung (z. B. 4,9)" />
            <TextField control={form.control} name="ratingLabel" label="Bewertungs-Label" />
            <TextField control={form.control} name="ratingCountLabel" label="Bewertungsanzahl-Text" />
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <TextField control={form.control} name="headlinePart1" label="Überschrift Teil 1" />
            <TextField control={form.control} name="headlineAccent" label="Überschrift Akzent" />
            <TextField control={form.control} name="headlinePart2" label="Überschrift Teil 2" />
          </div>

          <TextField control={form.control} name="subheadline" label="Unterüberschrift" textarea />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="primaryButtonLabel" label="Primärer Button" />
            <TextField control={form.control} name="secondaryButtonLabel" label="Sekundärer Button" />
          </div>
        </AdminFormCard>
      </form>
    </Form>
  )
}
