import { cookiesClient } from "@/lib/amplify/server"
import { SINGLETON_IDS } from "@/lib/content/singleton-ids"
import { menuSectionDefaults } from "@/lib/content/defaults"
import { MenuForm } from "./menu-form"

export default async function MenuAdminPage() {
  const [{ data }, { data: categories }, { data: items }] = await Promise.all([
    cookiesClient.models.MenuSectionContent.get({ id: SINGLETON_IDS.menuSection }),
    cookiesClient.models.MenuCategory.list(),
    cookiesClient.models.MenuItem.list(),
  ])

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold mb-6">Speisekarte</h1>
      <MenuForm
        initialValues={data ?? menuSectionDefaults}
        categories={[...categories].sort((a, b) => a.sortOrder - b.sortOrder)}
        items={[...items].sort((a, b) => a.sortOrder - b.sortOrder)}
      />
    </div>
  )
}
