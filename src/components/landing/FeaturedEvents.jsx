import { Card, Heading, Mono, Reveal, Text } from '../ui'
import { featuredEvents } from '../../data/landing'

/** "Happening soon" strip — the three nearest dates, above the fold. */
export function FeaturedEvents() {
  return (
    <Reveal className="pt-2">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-4">
        <Heading level={3} size="sm" className="flex items-center gap-2.5 text-xl">
          <span className="h-2 w-2 rounded-full bg-marigold animate-pulse-ring" aria-hidden="true" />
          Happening soon
        </Heading>
        <a href="#events" className="text-sm font-semibold text-marigold hover:underline">
          See all upcoming events →
        </a>
      </div>

      <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
        {featuredEvents.map((event) => (
          <Card key={event.title} as="a" href="#events" radius="sm" hover="subtle" className="p-4">
            <div className="flex items-center gap-4">
              <Mono
                className={`flex h-[58px] w-[58px] shrink-0 flex-col items-center justify-center rounded-xl leading-[1.1] ${event.dateClass}`}
              >
                <span className="text-[19px] font-semibold">{event.day}</span>
                <span className="text-[10px] uppercase tracking-[0.06em] opacity-85">{event.month}</span>
              </Mono>

              <div>
                <Heading level={4} size="xs" className="mb-[3px] text-[15.5px]">
                  {event.title}
                </Heading>
                <Text size="xs" tone="dim" className="text-[12.5px]">
                  {event.meta}
                </Text>
                <Mono className="mt-1 inline-block text-[12.5px] text-marigold">{event.price}</Mono>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Reveal>
  )
}
