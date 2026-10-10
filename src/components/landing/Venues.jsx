import { useCallback, useState } from 'react'
import { Button, Card, Container, Heading, Modal, Section, SectionHead, Text } from '../ui'
import { occasions } from '../../data/landing'
import LeadForm from '../venue/LeadForm'

function OccasionCard({ occasion, onBook, hidden = false }) {
  return (
    <div className="w-[280px] shrink-0 pr-6" aria-hidden={hidden || undefined}>
      <Card surface="raised" className="h-full px-7 py-8">
        <span
          aria-hidden="true"
          className={`absolute right-0 top-0 h-30 w-30 translate-x-[30%] -translate-y-[30%] rounded-full opacity-50 blur-[30px] ${occasion.curtain}`}
        />
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-ink/35 text-[34px] shadow-[inset_0_0_0_1px_rgba(247,241,227,0.18)]">
          {occasion.image ? (
            <img src={occasion.image} alt="" aria-hidden="true" className="h-10 w-10 object-contain" />
          ) : (
            <span aria-hidden="true">{occasion.icon}</span>
          )}
        </div>
        <Heading level={3} size="md" className="mb-3 text-[26px]">
          {occasion.title}
        </Heading>
        <Text size="sm" className="mb-6 grow text-paper/70">
          {occasion.copy}
        </Text>
        <Button
          type="button"
          size="md"
          className="self-start"
          tabIndex={hidden ? -1 : undefined}
          onClick={() => onBook(occasion)}
        >
          Book Now
        </Button>
      </Card>
    </div>
  )
}

/** "Book the Arena" — an endlessly scrolling row of occasions; hover pauses it. */
export function Venues() {
  const [occasionToBook, setOccasionToBook] = useState(null)

  const closeModal = useCallback(() => setOccasionToBook(null), [])

  return (
    <Section id="venues" className="bg-plum">
      <Container>
        <SectionHead kicker="Spaces on the arena" title="Book the Arena">
          Weddings, birthdays, conferences, celebrations and gatherings — host it your way at Leela.
        </SectionHead>
      </Container>

      <div className="overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)]">
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]">
          {/* Four copies so the row always overflows wide screens; the animation moves
              it by half (two copies) for a seamless loop. Only the first copy is exposed
              to assistive tech. */}
          {[0, 1, 2, 3].map((copy) =>
            occasions.map((occasion) => (
              <OccasionCard
                key={`${occasion.title}-${copy}`}
                occasion={occasion}
                onBook={setOccasionToBook}
                hidden={copy > 0}
              />
            ))
          )}
        </div>
      </div>

      <Modal open={Boolean(occasionToBook)} onClose={closeModal} label="Book the Arena">
        <div className="mb-7 pr-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f2cc72]">Book the Arena</p>
          <h2 className="text-[26px] font-extrabold leading-[1.15]">{occasionToBook?.title}</h2>
          <p className="mt-2 text-[14px] text-[#c9b7d8]">Please provide your details below.</p>
        </div>
        <LeadForm onSuccess={closeModal} initialEvent={occasionToBook?.title ?? ''} />
      </Modal>
    </Section>
  )
}
