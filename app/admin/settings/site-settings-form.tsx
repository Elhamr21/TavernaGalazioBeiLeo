"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { siteSettingsSchema, type SiteSettingsInput } from "@/lib/content/schemas"
import { saveSiteSettings } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { Form, FormField } from "@/components/ui/form"

export function SiteSettingsForm({
  initialValues,
  initialLogoPreviewUrl,
}: {
  initialValues: SiteSettingsInput
  initialLogoPreviewUrl: string
}) {
  const [resetKey, setResetKey] = useState(0)
  const form = useForm<SiteSettingsInput>({
    resolver: zodResolver(siteSettingsSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: SiteSettingsInput) {
    try {
      const saved = await saveSiteSettings(values)
      form.reset(saved)
      toast.success("Einstellungen gespeichert.")
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
          title="Navigation & Branding"
          description="Logo und Navigationslabels im Header. Ziele der Links bleiben im Quellcode festgelegt."
          footer={
            <FormActions isSubmitting={form.formState.isSubmitting} isDirty={form.formState.isDirty} onCancel={handleCancel} />
          }
        >
          <FormField
            control={form.control}
            name="logoPath"
            render={({ field }) => (
              <ImageUploadField
                key={resetKey}
                label="Logo"
                value={field.value}
                onChange={field.onChange}
                pathPrefix="settings/"
                previewUrl={initialLogoPreviewUrl}
              />
            )}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="navAboutLabel" label="Nav: Über uns" />
            <TextField control={form.control} name="navExperienceLabel" label="Nav: Erlebnis" />
            <TextField control={form.control} name="navMenuLabel" label="Nav: Speisekarte" />
            <TextField control={form.control} name="navGalleryLabel" label="Nav: Galerie" />
            <TextField control={form.control} name="navEventsLabel" label="Nav: Events" />
            <TextField control={form.control} name="navContactLabel" label="Nav: Kontakt" />
          </div>

          <TextField control={form.control} name="reservationButtonLabel" label="Reservierungs-Button (Header)" />
        </AdminFormCard>
      </form>
    </Form>
  )
}
