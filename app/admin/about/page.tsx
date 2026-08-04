import { cookiesClient } from "@/lib/amplify/server"
import { resolveImageUrl } from "@/lib/amplify/resolve-image"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { aboutDefaults } from "@/lib/content/defaults"
import { AboutForm } from "./about-form"

export default async function AboutAdminPage() {
  const { data } = await cookiesClient.models.AboutContent.get({ id: SINGLETON_IDS.about })
  const values = data ?? aboutDefaults
  const previewUrl = await resolveImageUrl(data?.imagePath, aboutDefaults.imagePath)

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Über uns</h1>
      <AboutForm initialValues={values} initialPreviewUrl={previewUrl} />
    </div>
  )
}
