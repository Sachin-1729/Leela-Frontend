import { cn } from '../../lib/cn'
import { Heading, Kicker, Text } from './Typography'
import { Reveal } from './Reveal'

/** Centred page gutter — every band of the page lines up on this. */
export function Container({ className, children, ...props }) {
  return (
    <div className={cn('mx-auto w-full max-w-arena px-8', className)} {...props}>
      {children}
    </div>
  )
}

/** Full-width page band with the standard vertical rhythm. */
export function Section({ className, children, ...props }) {
  return (
    <section className={cn('relative py-24', className)} {...props}>
      {children}
    </section>
  )
}

/** Kicker + heading + supporting line that opens most sections. */
export function SectionHead({ kicker, title, children, className }) {
  return (
    <Reveal className={cn('mb-14 max-w-[640px]', className)}>
      {kicker && <Kicker>{kicker}</Kicker>}
      <Heading size="lg" className="mb-4">
        {title}
      </Heading>
      {children && <Text size="lg">{children}</Text>}
    </Reveal>
  )
}

/** Torn ticket-stub edge between two bands. `flip` matches the darker side. */
export function Perforation({ flip = false }) {
  return <div aria-hidden="true" className={cn('perf', flip && 'perf-flip')} />
}
