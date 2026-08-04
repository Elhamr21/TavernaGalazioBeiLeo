import { cookiesClient } from "@/lib/amplify/server"
import { resolveImageUrl } from "@/lib/amplify/resolve-image"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { eventsSectionDefaults } from "@/lib/content/defaults"
import { EventsForm } from "./events-form"

export default async function EventsAdminPage() {
  const [{ data }, { data: eventTypes }] = await Promise.all([
    cookiesClient.models.EventsSectionContent.get({ id: SINGLETON_IDS.eventsSection }),
    cookiesClient.models.EventType.list(),
  ])
  const previewUrl = await resolveImageUrl(data?.imagePath, eventsSectionDefaults.imagePath)

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Events</h1>
      <EventsForm
        initialValues={data ?? eventsSectionDefaults}
        initialPreviewUrl={previewUrl}
        eventTypes={[...eventTypes].sort((a, b) => a.sortOrder - b.sortOrder)}
      />
    </div>
  )
}
