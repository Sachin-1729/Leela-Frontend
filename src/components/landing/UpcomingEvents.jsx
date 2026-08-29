import { Button, Card, Container, Heading, Mono, Reveal, Section, SectionHead, Text } from '../ui'
import { upcomingEvents } from '../../data/landing'

/** Horizontally snapping rail of everything on sale. */
export function UpcomingEvents() {
  return (
    <Section id="events">
      <Container>
        <SectionHead kicker="Passes live now" title="Upcoming on the arena">
          A running lineup of what Kolkata&apos;s stages, studios and streets have coming up.
        </SectionHead>
      </Container>

      <Container className="px-0">
        <Reveal className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-8 pb-4 no-scrollbar">
          {upcomingEvents.map((event) => (
            <Card
              key={event.title}
              surface="solid"
              radius="sm"
              className="w-[300px] shrink-0 snap-start"
            >
              <div className="flex h-[150px] items-end p-4" style={{ background: event.art }}>
                <Mono className="rounded-lg bg-ink/55 px-2.5 py-1.5 text-xs tracking-[0.06em] backdrop-blur-[4px]">
                  {event.date}
                </Mono>
              </div>

              <div className="p-5">
                <Heading level={4} size="xs" className="mb-1.5 text-[19px]">
                  {event.title}
                </Heading>
                <Text size="xs" tone="dim" className="mb-4">
                  {event.meta}
                </Text>
                <div className="flex items-center justify-between">
                  <Mono className="text-[15px] text-marigold">{event.price}</Mono>
                  <Button href="#" variant="paper" size="sm">
                    {event.cta}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Reveal>
      </Container>
    </Section>
  )
}
