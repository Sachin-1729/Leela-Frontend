import { Button, Heading, Reveal, Text } from '../ui'

/** Closing call to action. */
export function Finale() {
  return (
    <section id="about" className="py-24">
      <Reveal className="relative mx-4 overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,var(--color-rani),#7B2E63_60%,var(--color-plum))] px-6 py-14 text-center md:mx-8 md:px-12 md:py-[72px]">
        <Heading size="xl" className="mb-4.5">
          Your next event starts here.
        </Heading>
        <Text size="lg" tone="default" className="mx-auto mb-9 max-w-[520px] text-paper/85">
          List a venue, drop a pass, or start a circle — LEELA is built for however you show up.
        </Text>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button href="#acts">Get Started</Button>
          <Button href="#" variant="outline" className="border-paper/50">
            Talk to us
          </Button>
        </div>
      </Reveal>
    </section>
  )
}
