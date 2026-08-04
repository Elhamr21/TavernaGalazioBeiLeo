import { cookiesClient } from "@/lib/amplify/server"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { contactSectionDefaults, reservationCtaDefaults } from "@/lib/content/defaults"
import { ContactSectionForm } from "./contact-section-form"
import { ReservationCtaForm } from "./reservation-cta-form"

export default async function ContactAdminPage() {
  const [{ data: contactSection }, { data: reservationCta }] = await Promise.all([
    cookiesClient.models.ContactSectionContent.get({ id: SINGLETON_IDS.contactSection }),
    cookiesClient.models.ReservationCtaContent.get({ id: SINGLETON_IDS.reservationCta }),
  ])

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-semibold">Kontakt</h1>
      <ContactSectionForm initialValues={contactSection ?? contactSectionDefaults} />
      <ReservationCtaForm initialValues={reservationCta ?? reservationCtaDefaults} />
    </div>
  )
}
