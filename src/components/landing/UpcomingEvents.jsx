import { Button, Card, Container, Heading, Mono, Reveal, Section, SectionHead, Text } from '../ui'
import { upcomingEvents } from '../../data/landing'

/** Horizontally snapping rail of everything on sale — or a notice when nothing is. */
export function UpcomingEvents() {
  return (
    <Section id="events">
      <Container>
        <SectionHead kicker="Buy a pass" title="Upcoming on the arena">
          Curated events, activities and experiences at Leela — get your pass and come enjoy moments designed to be
          shared.
        </SectionHead>
      </Container>

      {upcomingEvents.length === 0 ? (
        <Container>
          <Reveal>
            <Card surface="raised" className="items-center px-6 py-14 text-center">
              <div className="mb-4 text-5xl" aria-hidden="true">
                🎟️
              </div>
              <Heading level={3} size="md" className="mb-3 text-[26px]">
                No upcoming public events
              </Heading>
              <Text className="mx-auto max-w-[460px] text-paper/70">
                There are no public events open for passes right now. Please check back soon for new events at Leela.
              </Text>
            </Card>
          </Reveal>
        </Container>
      ) : (
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
      )}
    </Section>
  )
}
