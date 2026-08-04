import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Experience } from "@/components/experience"
import { MenuPreview } from "@/components/menu-preview"
import { Gallery } from "@/components/gallery"
import { Events } from "@/components/events"
import { Reviews } from "@/components/reviews"
import { Contact } from "@/components/contact"
import { ReservationCTA } from "@/components/reservation-cta"
import { Footer } from "@/components/footer"
import { getHomepageContent } from "@/lib/content/get-homepage-content"

// Content is CMS-managed and can change at any time from the admin
// dashboard; on-demand revalidation (revalidatePath) refreshes it
// immediately on save, this is just a self-healing backstop.
export const revalidate = 60

export default async function HomePage() {
  const content = await getHomepageContent()

  return (
    <main className="min-h-screen">
      <Header settings={content.siteSettings} contact={content.contactInfo} />
      <Hero content={content.hero} contact={content.contactInfo} />
      <About content={content.about} />
      <Experience content={content.experience} />
      <MenuPreview content={content.menu} />
      <Gallery content={content.gallery} />
      <Events content={content.events} />
      <Reviews content={content.reviews} />
      <Contact content={content.contactSection} contact={content.contactInfo} />
      <ReservationCTA content={content.reservationCta} contact={content.contactInfo} />
      <Footer content={content.footer} contact={content.contactInfo} />
    </main>
  )
}
