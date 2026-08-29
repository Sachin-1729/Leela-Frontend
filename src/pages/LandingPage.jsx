import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Perforation } from '../components/ui'
import { Communities, Finale, Hero, Stats, UpcomingEvents, Venues } from '../components/landing'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Perforation />
        <Venues />
        <Perforation flip />
        <UpcomingEvents />
        <Perforation />
        <Communities />
        <Stats />
        <Finale />
      </main>
      <Footer />
    </>
  )
}
