import { cookiesClient } from "@/lib/amplify/server"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { reviewsSectionDefaults } from "@/lib/content/defaults"
import { ReviewsForm } from "./reviews-form"

export default async function ReviewsAdminPage() {
  const [{ data }, { data: reviews }] = await Promise.all([
    cookiesClient.models.ReviewsSectionContent.get({ id: SINGLETON_IDS.reviewsSection }),
    cookiesClient.models.Review.list(),
  ])

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Bewertungen</h1>
      <ReviewsForm initialValues={data ?? reviewsSectionDefaults} reviews={[...reviews].sort((a, b) => a.sortOrder - b.sortOrder)} />
    </div>
  )
}
