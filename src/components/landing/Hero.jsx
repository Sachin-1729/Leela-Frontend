import { useCallback, useRef } from 'react'
import { Button, Container, Eyebrow, Heading, Text } from '../ui'
import { Rangoli } from './Rangoli'
import { PortalCards } from './PortalCards'
import { FeaturedEvents } from './FeaturedEvents'
import { Ticker } from './Ticker'

/** The stage: headline, the three portals, what's on soon, and the ticker. */
export function Hero() {
  const stageRef = useRef(null)

  // Spotlight follows the cursor across the stage.
  const handleMouseMove = useCallback((e) => {
    const stage = stageRef.current
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    stage.style.setProperty('--mx', `${e.clientX - rect.left}px`)
    stage.style.setProperty('--my', `${e.clientY - rect.top}px`)
  }, [])

  return (
    <section ref={stageRef} onMouseMove={handleMouseMove} className="relative overflow-hidden bg-stage pt-28 pb-24">
      <Rangoli />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-[1] bg-spotlight" />

      <Container className="relative z-[2]">
        <Eyebrow className="mb-6">Kolkata&nbsp;·&nbsp;Smart Event &amp; Cultural Arena</Eyebrow>

        <Heading level={1} size="hero" className="max-w-[900px]">
          The city&apos;s
          <br />
          stage is <span className="text-marigold">open.</span>
        </Heading>

        <Text size="lede" className="mt-6 mb-10 max-w-[560px] text-paper/80">
          Book the venue. Grab the pass. Find your circle. LEELA is where Kolkata&apos;s events, artists and audiences
          actually meet — one arena, three ways in.
        </Text>

        <div className="mb-16 flex flex-wrap gap-3.5">
          <Button href="#events">Browse passes</Button>
          <Button href="#venues" variant="outline">
            List your venue
          </Button>
        </div>

        <PortalCards id="acts" />
        <FeaturedEvents />
      </Container>

      <div className="relative z-[2] mt-14">
        <Ticker />
      </div>
    </section>
  )
}
