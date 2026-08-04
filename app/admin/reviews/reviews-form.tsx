"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { Schema } from "@/amplify/data/resource"
import { reviewSchema, reviewsSectionContentSchema, type ReviewInput, type ReviewsSectionContentInput } from "@/lib/content/schemas"
import { saveReviewsSectionContent, createReview, updateReview, deleteReview, reorderReviews } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ListManager } from "@/components/admin/list-manager"
import { Form } from "@/components/ui/form"

type Review = Schema["Review"]["type"]

export function ReviewsForm({ initialValues, reviews }: { initialValues: ReviewsSectionContentInput; reviews: Review[] }) {
  const form = useForm<ReviewsSectionContentInput>({
    resolver: zodResolver(reviewsSectionContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: ReviewsSectionContentInput) {
    try {
      const saved = await saveReviewsSectionContent(values)
      form.reset(saved)
      toast.success("Bewertungen-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdminFormCard
            title="Bewertungen"
            description="Überschrift und Gesamtwertung des Bewertungsbereichs."
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
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField control={form.control} name="aggregateRating" label="Gesamtwertung (z. B. 4,9)" />
              <TextField control={form.control} name="aggregateCount" label="Bewertungsanzahl (z. B. 423 Bewertungen)" />
            </div>
            <TextField control={form.control} name="ctaLabel" label="Button-Text" />
          </AdminFormCard>
        </form>
      </Form>

      <AdminFormCard title="Gästebewertungen" description="Einzelne Bewertungen, die im Raster angezeigt werden.">
        <ListManager<Review, ReviewInput>
          items={reviews}
          schema={reviewSchema}
          defaultValues={{ author: "", text: "", source: "Google", date: "", rating: 5, sortOrder: reviews.length }}
          toFormValues={(item) => ({
            author: item.author,
            text: item.text,
            source: item.source,
            date: item.date,
            rating: item.rating,
            sortOrder: item.sortOrder,
          })}
          summary={(item) => ({ title: item.author, subtitle: item.text })}
          renderFields={(control) => (
            <>
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField control={control} name="author" label="Name" />
                <TextField control={control} name="source" label="Quelle" />
              </div>
              <TextField control={control} name="text" label="Bewertungstext" textarea />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField control={control} name="date" label="Datum (z. B. Mai 2025)" />
                <TextField control={control} name="rating" label="Bewertung (1-5)" type="number" />
              </div>
            </>
          )}
          onCreate={createReview}
          onUpdate={updateReview}
          onDelete={deleteReview}
          onReorder={reorderReviews}
          addLabel="Bewertung hinzufügen"
        />
      </AdminFormCard>
    </div>
  )
}
