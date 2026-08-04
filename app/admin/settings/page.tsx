import { cookiesClient } from "@/lib/amplify/server"
import { resolveImageUrl } from "@/lib/amplify/resolve-image"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { contactInfoDefaults, siteSettingsDefaults, siteSettingsLogoFallback } from "@/lib/content/defaults"
import { SiteSettingsForm } from "./site-settings-form"
import { ContactInfoForm } from "./contact-info-form"

export default async function SettingsAdminPage() {
  const [{ data: siteSettings }, { data: contactInfo }] = await Promise.all([
    cookiesClient.models.SiteSettings.get({ id: SINGLETON_IDS.siteSettings }),
    cookiesClient.models.ContactInfo.get({ id: SINGLETON_IDS.contactInfo }),
  ])
  const logoPreviewUrl = await resolveImageUrl(siteSettings?.logoPath, siteSettingsLogoFallback)

  return (
    <div className="space-y-6">
      <h1 className="font-serif text-2xl font-semibold">Einstellungen</h1>
      <SiteSettingsForm initialValues={siteSettings ?? siteSettingsDefaults} initialLogoPreviewUrl={logoPreviewUrl} />
      <ContactInfoForm initialValues={contactInfo ?? contactInfoDefaults} />
    </div>
  )
}
