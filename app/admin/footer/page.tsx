import { cookiesClient } from "@/lib/amplify/server"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { footerDefaults } from "@/lib/content/defaults"
import { FooterForm } from "./footer-form"

export default async function FooterAdminPage() {
  const { data } = await cookiesClient.models.FooterContent.get({ id: SINGLETON_IDS.footer })

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Footer</h1>
      <FooterForm initialValues={data ?? footerDefaults} />
    </div>
  )
}
