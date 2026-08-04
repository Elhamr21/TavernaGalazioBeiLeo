import { cookiesClient } from "@/lib/amplify/server"
import { resolveImageUrl } from "@/lib/amplify/resolve-image"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { heroDefaults } from "@/lib/content/defaults"
import { HeroForm } from "./hero-form"

export default async function HeroAdminPage() {
  const { data } = await cookiesClient.models.HeroContent.get({ id: SINGLETON_IDS.hero })
  const values = data ?? heroDefaults
  const previewUrl = await resolveImageUrl(data?.backgroundImagePath, heroDefaults.backgroundImagePath)

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Hero</h1>
      <HeroForm initialValues={values} initialPreviewUrl={previewUrl} />
    </div>
  )
}
