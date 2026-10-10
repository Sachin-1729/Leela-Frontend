import { useCallback, useState } from 'react'
import { ArrowLink, Card, Container, Heading, Mono, Modal, Reveal, Section, SectionHead, Text } from '../ui'
import { venues } from '../../data/landing'
import LeadForm from '../venue/LeadForm'

/** Bookable spaces, each with its own coloured stage-light blur. */
export function Venues() {
  const [venueToBook, setVenueToBook] = useState(null)

  const closeModal = useCallback(() => setVenueToBook(null), [])

  return (
    <Section id="venues" className="bg-plum">
      <Container>
        <SectionHead kicker="Spaces on the arena" title="Venues ready to book.">
          From open-air amphitheatres to intimate black-box theatres — every listing shows live availability, capacity
          and pricing upfront.
        </SectionHead>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {venues.map((venue, i) => (
            <Reveal key={venue.title} delay={i * 90}>
              <Card surface="raised" hover="lift" className="h-full px-[30px] py-9">
                <span
                  aria-hidden="true"
                  className={`absolute right-0 top-0 h-30 w-30 translate-x-[30%] -translate-y-[30%] rounded-full opacity-50 blur-[30px] ${venue.curtain}`}
                />
                <Mono className="mb-4.5 block text-xs uppercase tracking-[0.12em] opacity-55">{venue.tag}</Mono>
                <Heading level={3} size="md" className="mb-3 text-[26px]">
                  {venue.title}
                </Heading>
                <Text className="mb-6 min-h-[66px] text-paper/70">{venue.copy}</Text>
                <ArrowLink
                  href="#venues"
                  className="mt-auto self-start"
                  onClick={(e) => {
                    e.preventDefault()
                    setVenueToBook(venue)
                  }}
                >
                  Book this venue
                </ArrowLink>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>

      <Modal open={Boolean(venueToBook)} onClose={closeModal} label="Book a venue">
        <div className="mb-7 pr-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">Book a Venue</p>
          <h2 className="text-[26px] font-extrabold leading-[1.15]">{venueToBook?.title}</h2>
          <p className="mt-2 text-[14px] text-[#c9b7d8]">Please provide your details below.</p>
        </div>
        <LeadForm onSuccess={closeModal} />
      </Modal>
    </Section>
  )
}
