"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { footerContentSchema, type FooterContentInput } from "@/lib/content/schemas"
import { saveFooterContent } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { Form } from "@/components/ui/form"

export function FooterForm({ initialValues }: { initialValues: FooterContentInput }) {
  const form = useForm<FooterContentInput>({
    resolver: zodResolver(footerContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: FooterContentInput) {
    try {
      const saved = await saveFooterContent(values)
      form.reset(saved)
      toast.success("Footer gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AdminFormCard
          title="Footer"
          description="Fußzeile der Website."
          footer={
            <FormActions
              isSubmitting={form.formState.isSubmitting}
              isDirty={form.formState.isDirty}
              onCancel={() => form.reset(initialValues)}
            />
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="brandName" label="Markenname" />
            <TextField control={form.control} name="brandSubtitle" label="Untertitel" />
          </div>
          <TextField control={form.control} name="description" label="Beschreibung" textarea />

          <div className="grid gap-4 sm:grid-cols-3">
            <TextField control={form.control} name="quickLinksHeading" label="Überschrift: Schnellzugriff" />
            <TextField control={form.control} name="contactHeading" label="Überschrift: Kontakt" />
            <TextField control={form.control} name="hoursHeading" label="Überschrift: Öffnungszeiten" />
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Schnellzugriff-Labels</p>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField control={form.control} name="quickLinkAboutLabel" label="Über uns" />
              <TextField control={form.control} name="quickLinkMenuLabel" label="Speisekarte" />
              <TextField control={form.control} name="quickLinkGalleryLabel" label="Galerie" />
              <TextField control={form.control} name="quickLinkEventsLabel" label="Events" />
              <TextField control={form.control} name="quickLinkReservationLabel" label="Reservierung" />
              <TextField control={form.control} name="quickLinkContactLabel" label="Kontakt" />
            </div>
          </div>

          <div>
            <p className="text-sm font-medium mb-3">Rechtliche Links</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField control={form.control} name="legalImpressumLabel" label="Impressum" />
              <TextField control={form.control} name="legalDatenschutzLabel" label="Datenschutz" />
              <TextField control={form.control} name="legalCookieLabel" label="Cookie-Einstellungen" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="copyrightText" label="Copyright-Text (nach der Jahreszahl)" />
            <TextField control={form.control} name="developerCreditText" label="Entwickler-Hinweis" />
          </div>
        </AdminFormCard>
      </form>
    </Form>
  )
}
