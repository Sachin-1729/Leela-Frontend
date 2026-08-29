import { Button, Card, Container, Heading, Mono, Reveal, Section, SectionHead } from '../ui'
import { communities } from '../../data/landing'

/** Circles people keep showing up to after the encore. */
export function Communities() {
  return (
    <Section id="communities" className="bg-plum">
      <Container>
        <SectionHead kicker="Find your circle" title="Communities that keep meeting after the encore.">
          Every circle on LEELA is run by the people already doing the work — you&apos;re joining a practice, not a
          mailing list.
        </SectionHead>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {communities.map((community, i) => (
            <Reveal key={community.name} delay={i * 90}>
              <Card
                surface="bare"
                hover="lift"
                glow={community.glow}
                className="h-full min-h-[280px] px-7 py-[34px]"
              >
                <div className="mb-auto text-[34px]" aria-hidden="true">
                  {community.icon}
                </div>
                <Heading level={3} size="md" className="mb-1.5 mt-4 text-2xl">
                  {community.name}
                </Heading>
                <Mono className="mb-4.5 text-[12.5px] text-paper/65">{community.members}</Mono>
                <Button href="#" variant="soft" size="md" className="self-start">
                  Join the circle
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  )
}
