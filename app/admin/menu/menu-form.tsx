"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import type { Schema } from "@/amplify/data/resource"
import {
  menuCategorySchema,
  menuItemSchema,
  menuSectionContentSchema,
  type MenuCategoryInput,
  type MenuItemInput,
  type MenuSectionContentInput,
} from "@/lib/content/schemas"
import {
  saveMenuSectionContent,
  createMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
  reorderMenuCategories,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
  reorderMenuItems,
} from "./actions"
import { AdminFormCard } from "@/components/admin/admin-form-card"
import { FormActions } from "@/components/admin/form-actions"
import { TextField } from "@/components/admin/text-field"
import { SelectField } from "@/components/admin/select-field"
import { ImageUploadField } from "@/components/admin/image-upload-field"
import { ListManager } from "@/components/admin/list-manager"
import { Form, FormField } from "@/components/ui/form"

type MenuCategory = Schema["MenuCategory"]["type"]
type MenuItem = Schema["MenuItem"]["type"]

export function MenuForm({
  initialValues,
  categories,
  items,
}: {
  initialValues: MenuSectionContentInput
  categories: MenuCategory[]
  items: MenuItem[]
}) {
  const form = useForm<MenuSectionContentInput>({
    resolver: zodResolver(menuSectionContentSchema),
    defaultValues: initialValues,
  })

  async function onSubmit(values: MenuSectionContentInput) {
    try {
      const saved = await saveMenuSectionContent(values)
      form.reset(saved)
      toast.success("Speisekarten-Bereich gespeichert.")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Speichern fehlgeschlagen.")
    }
  }

  const categoryOptions = categories.map((category) => ({ value: category.id, label: category.name }))

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <AdminFormCard
            title="Speisekarte (Startseite)"
            description="Überschrift des 'Signature Gerichte'-Bereichs auf der Startseite. Die vollständige gedruckte Speisekarte bleibt unverändert."
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
            <TextField control={form.control} name="linkLabel" label="Link-Text (zur vollständigen Speisekarte)" />
          </AdminFormCard>
        </form>
      </Form>

      <AdminFormCard title="Kategorien" description="Kategorien der Signature-Gerichte, per Ziehpunkt sortierbar.">
        <ListManager<MenuCategory, MenuCategoryInput>
          items={categories}
          schema={menuCategorySchema}
          defaultValues={{ name: "", sortOrder: categories.length }}
          toFormValues={(item) => ({ name: item.name, sortOrder: item.sortOrder })}
          summary={(item) => ({ title: item.name })}
          renderFields={(control) => <TextField control={control} name="name" label="Name" />}
          onCreate={createMenuCategory}
          onUpdate={updateMenuCategory}
          onDelete={deleteMenuCategory}
          onReorder={reorderMenuCategories}
          addLabel="Kategorie hinzufügen"
        />
      </AdminFormCard>

      <AdminFormCard title="Signature-Gerichte" description="Gerichte im Vorschau-Raster der Startseite, per Ziehpunkt sortierbar.">
        <ListManager<MenuItem, MenuItemInput>
          items={items}
          schema={menuItemSchema}
          defaultValues={{
            name: "",
            description: "",
            price: "",
            imagePath: null,
            sortOrder: items.length,
            categoryId: categories[0]?.id ?? "",
          }}
          toFormValues={(item) => ({
            name: item.name,
            description: item.description,
            price: item.price,
            imagePath: item.imagePath,
            sortOrder: item.sortOrder,
            categoryId: item.categoryId,
          })}
          summary={(item) => ({
            title: item.name,
            subtitle: `${categories.find((c) => c.id === item.categoryId)?.name ?? "Ohne Kategorie"} · ${item.price} €`,
          })}
          renderFields={(control) => (
            <>
              <FormField
                control={control}
                name="imagePath"
                render={({ field }) => (
                  <ImageUploadField label="Bild" value={field.value} onChange={field.onChange} pathPrefix="menu/" />
                )}
              />
              <div className="grid gap-3 sm:grid-cols-2">
                <TextField control={control} name="name" label="Name" />
                <TextField control={control} name="price" label="Preis (z. B. 18,90)" />
              </div>
              <TextField control={control} name="description" label="Beschreibung" textarea />
              <SelectField control={control} name="categoryId" label="Kategorie" options={categoryOptions} placeholder="Kategorie wählen" />
            </>
          )}
          onCreate={createMenuItem}
          onUpdate={updateMenuItem}
          onDelete={deleteMenuItem}
          onReorder={reorderMenuItems}
          addLabel="Gericht hinzufügen"
          emptyMessage={categories.length === 0 ? "Bitte zuerst eine Kategorie anlegen." : undefined}
        />
      </AdminFormCard>
    </div>
  )
}
