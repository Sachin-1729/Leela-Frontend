import { Container, Mono, Reveal, Section } from '../ui'
import { stats } from '../../data/landing'

export function Stats() {
  return (
    <Section>
      <Container className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
        {stats.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 80}>
            <div className="font-display text-[clamp(34px,5vw,52px)] font-extrabold text-marigold">{stat.value}</div>
            <Mono className="mt-2 block text-[12.5px] uppercase tracking-[0.1em] text-paper/60">{stat.label}</Mono>
          </Reveal>
        ))}
      </Container>
    </Section>
  )
}
