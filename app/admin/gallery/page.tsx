import { cookiesClient } from "@/lib/amplify/server"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { gallerySectionDefaults } from "@/lib/content/defaults"
import { GalleryForm } from "./gallery-form"

export default async function GalleryAdminPage() {
  const [{ data }, { data: images }] = await Promise.all([
    cookiesClient.models.GallerySectionContent.get({ id: SINGLETON_IDS.gallerySection }),
    cookiesClient.models.GalleryImage.list(),
  ])

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Galerie</h1>
      <GalleryForm initialValues={data ?? gallerySectionDefaults} images={[...images].sort((a, b) => a.sortOrder - b.sortOrder)} />
    </div>
  )
}
