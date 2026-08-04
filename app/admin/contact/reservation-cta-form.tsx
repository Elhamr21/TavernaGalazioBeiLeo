"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { reservationCtaContentSchema, type ReservationCtaContentInput } from "@/lib/content/schemas"
import { saveReservationCtaContent } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { Form } from "@/components/ui/form"

export function ReservationCtaForm({ initialValues }: { initialValues: ReservationCtaContentInput }) {
  const form = useForm<ReservationCtaContentInput>({
    resolver: zodResolver(reservationCtaContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: ReservationCtaContentInput) {
    try {
      const saved = await saveReservationCtaContent(values)
      form.reset(saved)
      toast.success("Reservierungs-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AdminFormCard
          title="Reservierungs-CTA"
          description="Abschließender Aufruf zur Reservierung vor dem Footer."
          footer={
            <FormActions
              isSubmitting={form.formState.isSubmitting}
              isDirty={form.formState.isDirty}
              onCancel={() => form.reset(initialValues)}
            />
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="heading1" label="Überschrift Zeile 1" />
            <TextField control={form.control} name="heading2" label="Überschrift Zeile 2 (Akzentfarbe)" />
          </div>
          <TextField control={form.control} name="description" label="Beschreibung" textarea />
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="buttonLabel" label="Button: Online buchen" />
            <TextField control={form.control} name="phoneButtonLabelMobile" label="Telefon-Button (mobil, z. B. Anrufen)" />
          </div>
          <TextField control={form.control} name="note" label="Hinweistext (Gruppen)" />
        </AdminFormCard>
      </form>
    </Form>
  )
}
