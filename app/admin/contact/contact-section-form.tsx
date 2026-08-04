"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { contactSectionContentSchema, type ContactSectionContentInput } from "@/lib/content/schemas"
import { saveContactSectionContent } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { Form } from "@/components/ui/form"

export function ContactSectionForm({ initialValues }: { initialValues: ContactSectionContentInput }) {
  const form = useForm<ContactSectionContentInput>({
    resolver: zodResolver(contactSectionContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: ContactSectionContentInput) {
    try {
      const saved = await saveContactSectionContent(values)
      form.reset(saved)
      toast.success("Kontakt-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AdminFormCard
          title="Kontakt-Bereich"
          description="Telefon, E-Mail und Adresse selbst werden unter Einstellungen gepflegt — hier nur Überschriften und Labels."
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
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField control={form.control} name="addressLabel" label="Label: Adresse" />
            <TextField control={form.control} name="phoneLabel" label="Label: Telefon" />
            <TextField control={form.control} name="emailLabel" label="Label: E-Mail" />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <TextField control={form.control} name="hoursLabel" label="Label: Öffnungszeiten" />
            <TextField control={form.control} name="parkingLabel" label="Label: Parkplätze" />
            <TextField control={form.control} name="accessibleLabel" label="Label: Barrierefrei" />
          </div>
          <TextField control={form.control} name="routePlanLabel" label="Link-Text: Route planen" />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="callNowButtonLabel" label="Button: Jetzt anrufen" />
            <TextField control={form.control} name="openMapsButtonLabel" label="Button: In Maps öffnen" />
          </div>
        </AdminFormCard>
      </form>
    </Form>
  )
}
