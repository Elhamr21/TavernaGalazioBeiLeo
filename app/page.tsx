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

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Experience />
      <MenuPreview />
      <Gallery />
      <Events />
      <Reviews />
      <Contact />
      <ReservationCTA />
      <Footer />
    </main>
  )
}
