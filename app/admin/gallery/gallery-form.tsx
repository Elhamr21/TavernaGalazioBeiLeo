"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { Schema } from "@/amplify/data/resource"
import { galleryImageSchema, gallerySectionContentSchema, type GalleryImageInput, type GallerySectionContentInput } from "@/lib/content/schemas"
import { saveGallerySectionContent, createGalleryImage, updateGalleryImage, deleteGalleryImage, reorderGalleryImages } from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { ListManager } from "@/components/admin/list-manager"
import { Form, FormField } from "@/components/ui/form"

type GalleryImage = Schema["GalleryImage"]["type"]

export function GalleryForm({ initialValues, images }: { initialValues: GallerySectionContentInput; images: GalleryImage[] }) {
  const form = useForm<GallerySectionContentInput>({
    resolver: zodResolver(gallerySectionContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: GallerySectionContentInput) {
    try {
      const saved = await saveGallerySectionContent(values)
      form.reset(saved)
      toast.success("Galerie-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdminFormCard
            title="Galerie"
            description="Einleitungstext des Galerie-Bereichs."
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
            <TextField control={form.control} name="description" label="Beschreibung" textarea />
          </AdminFormCard>
        </form>
      </Form>

      <AdminFormCard title="Galeriebilder" description="Bilder im Slider — per Ziehpunkt sortierbar.">
        <ListManager<GalleryImage, GalleryImageInput>
          items={images}
          schema={galleryImageSchema}
          defaultValues={{ imagePath: null, alt: "", caption: "", sortOrder: images.length }}
          toFormValues={(item) => ({ imagePath: item.imagePath, alt: item.alt, caption: item.caption, sortOrder: item.sortOrder })}
          summary={(item) => ({ title: item.caption, subtitle: item.alt })}
          renderFields={(control) => (
            <>
              <FormField
                control={control}
                name="imagePath"
                render={({ field }) => (
                  <ImageUploadField label="Bild" value={field.value} onChange={field.onChange} pathPrefix="gallery/" />
                )}
              />
              <TextField control={control} name="caption" label="Bildunterschrift" />
              <TextField control={control} name="alt" label="Alt-Text (Bildbeschreibung)" />
            </>
          )}
          onCreate={createGalleryImage}
          onUpdate={updateGalleryImage}
          onDelete={deleteGalleryImage}
          onReorder={reorderGalleryImages}
          addLabel="Bild hinzufügen"
        />
      </AdminFormCard>
    </div>
  )
}
