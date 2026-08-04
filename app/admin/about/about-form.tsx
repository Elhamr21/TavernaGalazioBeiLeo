"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { aboutContentSchema, type AboutContentInput } from "@/lib/content/schemas"
import { saveAboutContent } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { Form, FormField } from "@/components/ui/form"

export function AboutForm({
  initialValues,
  initialPreviewUrl,
}: {
  initialValues: AboutContentInput
  initialPreviewUrl: string
}) {
  const [resetKey, setResetKey] = useState(0)
  const form = useForm<AboutContentInput>({
    resolver: zodResolver(aboutContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: AboutContentInput) {
    try {
      const saved = await saveAboutContent(values)
      form.reset(saved)
      toast.success("Über uns gespeichert.")
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
          title="Über uns"
          description="Geschichte, Textabsätze und Bild des Über-uns-Bereichs."
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
                pathPrefix="about/"
                previewUrl={initialPreviewUrl}
              />
            )}
          />
          <TextField control={form.control} name="imageAlt" label="Alt-Text (Bildbeschreibung)" />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="badgeNumber" label="Abzeichen-Zahl (z. B. 25+)" />
            <TextField control={form.control} name="badgeLabel" label="Abzeichen-Text" />
          </div>

          <TextField control={form.control} name="eyebrow" label="Kicker" />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="heading1" label="Überschrift Zeile 1" />
            <TextField control={form.control} name="heading2" label="Überschrift Zeile 2" />
          </div>

          <TextField control={form.control} name="paragraph1" label="Absatz 1" textarea />
          <TextField control={form.control} name="paragraph2" label="Absatz 2" textarea />
          <TextField control={form.control} name="paragraph3" label="Absatz 3" textarea />

          <TextField control={form.control} name="signature" label="Signatur" />
        </AdminFormCard>
      </form>
    </Form>
  )
}
