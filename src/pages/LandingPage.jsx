import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Perforation } from '../components/ui'
import { About, Communities, Finale, Hero, Stats, UpcomingEvents, Venues } from '../components/landing'

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
        <Perforation flip />
        <About />
        {/* <Stats />
        <Finale /> */}
      </main>
      <Footer />
    </>
  )
}
