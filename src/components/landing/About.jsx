import { Container, Heading, Reveal, Section, Text } from '../ui'
import { aboutFeatures } from '../../data/landing'

// Building outline placement inside the 1000x760 diagram
const BUILDING = { x: 100, y: 260, width: 800, height: 241 }

/** Leader line: vertical out of (x1, y1), an S-curve across, vertical into (x2, y2). */
function leaderPath(x1, y1, x2, y2) {
  const a = y1 + (y2 - y1) * 0.25
  const c = y1 + (y2 - y1) * 0.75
  const b = (a + c) / 2
  return `M${x1} ${y1} V${a} C${x1} ${b}, ${x2} ${b}, ${x2} ${c} V${y2}`
}

/** About Leela — the building outline with its features called out around it. */
export function About() {
  return (
    <Section id="about">
      <Container>
        <Reveal className="mx-auto mb-14 max-w-[760px] text-center">
          <Text size="lg" className="mb-4 text-paper/80">
            Leela&apos;s SMART Tech enhances client experience and ensures perfection in micromanagement. Technically
            engineered for comfort and luxurious experience, Leela brings together immersive sound, architectural
            lighting and centralised air conditioning.
          </Text>
          <Text size="lg" className="mb-8 text-paper/80">
            Every detail is crafted to create the right ambience, ensuring comfort throughout your time with us.
          </Text>
          <Heading size="md" className="text-marigold">
            Because every memorable experience deserves the perfect setting.
          </Heading>
        </Reveal>

        {/* Desktop: labelled diagram */}
        <Reveal className="hidden md:block">
          <svg
            viewBox="0 0 1000 760"
            role="img"
            aria-label={`Leela features: ${aboutFeatures.map((f) => f.label).join(', ')}`}
            className="w-full"
          >
            <image href="/leela-building-outline.png" {...BUILDING} />

            {aboutFeatures.map((f) => {
              const isTop = f.ty > f.y
              const d = isTop ? leaderPath(f.lx, f.y + 12, f.tx, f.ty) : leaderPath(f.tx, f.ty, f.lx, f.y - 26)

              return (
                <g key={f.label}>
                  <path d={d} fill="none" stroke="#c9b48f" strokeOpacity="0.7" strokeWidth="3" strokeLinecap="round" />
                  <text x={f.x} y={f.y} fill="#f5b942" fontSize="22" fontWeight="700" className="font-display">
                    {f.label}
                  </text>
                </g>
              )
            })}
          </svg>
        </Reveal>

        {/* Mobile: outline with the features listed below */}
        <div className="md:hidden">
          <img src="/leela-building-outline.png" alt="The Leela building" className="mb-8 w-full" />
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {aboutFeatures.map((f) => (
              <li
                key={f.label}
                className="flex items-center gap-3 rounded-xl border border-line px-4 py-3 font-display font-bold text-marigold"
              >
                <span className="h-2 w-2 shrink-0 rounded-full bg-marigold" aria-hidden="true" />
                {f.label}
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  )
}
