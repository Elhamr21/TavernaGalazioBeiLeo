import { cookiesClient } from "@/lib/amplify/server"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { experienceDefaults } from "@/lib/content/defaults"
import { ExperienceForm } from "./experience-form"

export default async function ExperienceAdminPage() {
  const [{ data }, { data: features }] = await Promise.all([
    cookiesClient.models.ExperienceContent.get({ id: SINGLETON_IDS.experience }),
    cookiesClient.models.ExperienceFeature.list(),
  ])

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Erlebnis</h1>
      <ExperienceForm
        initialValues={data ?? experienceDefaults}
        features={[...features].sort((a, b) => a.sortOrder - b.sortOrder)}
      />
    </div>
  )
}
