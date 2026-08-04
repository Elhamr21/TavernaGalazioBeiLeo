"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { contactInfoSchema, type ContactInfoInput } from "@/lib/content/schemas"
import { saveContactInfo } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { Form } from "@/components/ui/form"

export function ContactInfoForm({ initialValues }: { initialValues: ContactInfoInput }) {
  const form = useForm<ContactInfoInput>({
    resolver: zodResolver(contactInfoSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: ContactInfoInput) {
    try {
      const saved = await saveContactInfo(values)
      form.reset(saved)
      toast.success("Kontaktdaten gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <AdminFormCard
          title="Kontaktdaten"
          description="Telefon, E-Mail, Adresse und Reservierungslink — werden im Header, Hero, Footer, Kontakt- und Reservierungsbereich verwendet."
          footer={
            <FormActions
              isSubmitting={form.formState.isSubmitting}
              isDirty={form.formState.isDirty}
              onCancel={() => form.reset(initialValues)}
            />
          }
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="phone" label="Telefon (z. B. +49 341 56113223)" />
            <TextField control={form.control} name="email" label="E-Mail" type="email" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <TextField control={form.control} name="addressLine1" label="Adresse Zeile 1 (Straße)" />
            <TextField control={form.control} name="addressLine2" label="Adresse Zeile 2 (PLZ, Stadt)" />
          </div>
          <TextField control={form.control} name="reservationUrl" label="Reservierungslink" />
        </AdminFormCard>
      </form>
    </Form>
  )
}
