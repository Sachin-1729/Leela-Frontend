import { cn } from '../../lib/cn'

const headingSizes = {
  hero: 'text-[clamp(52px,9vw,118px)] font-extrabold leading-[0.92] tracking-[-0.01em]',
  xl: 'text-[clamp(34px,5vw,58px)] font-bold leading-[1.05]',
  lg: 'text-[clamp(32px,4.5vw,48px)] font-bold leading-[1.05]',
  md: 'text-2xl font-bold leading-tight',
  sm: 'text-xl font-bold leading-tight',
  xs: 'text-base font-bold leading-tight',
}

/** Display heading — always Baloo 2. `level` picks the tag, `size` picks the scale. */
export function Heading({ level = 2, size = 'md', className, children, ...props }) {
  const Tag = `h${level}`
  return (
    <Tag className={cn('font-display', headingSizes[size], className)} {...props}>
      {children}
    </Tag>
  )
}

const textSizes = {
  lede: 'text-[clamp(17px,2vw,21px)] leading-[1.55]',
  lg: 'text-[17px] leading-[1.6]',
  md: 'text-[15px] leading-[1.6]',
  sm: 'text-[14.5px] leading-[1.55]',
  xs: 'text-[13px] leading-[1.5]',
}

/** Body copy. `tone` controls the paper opacity. */
export function Text({ size = 'md', tone = 'muted', className, as: Tag = 'p', children, ...props }) {
  const tones = {
    default: 'text-paper',
    muted: 'text-paper/75',
    dim: 'text-paper/60',
  }
  return (
    <Tag className={cn(textSizes[size], tones[tone], className)} {...props}>
      {children}
    </Tag>
  )
}

/** Monospace micro-copy — dates, counts, prices, labels. */
export function Mono({ className, as: Tag = 'span', children, ...props }) {
  return (
    <Tag className={cn('font-mono tracking-[0.04em]', className)} {...props}>
      {children}
    </Tag>
  )
}

/** Small uppercase label above a section heading. */
export function Kicker({ className, children, ...props }) {
  return (
    <Mono
      className={cn('mb-3.5 block text-[12.5px] uppercase tracking-[0.14em] text-rani', className)}
      {...props}
    >
      {children}
    </Mono>
  )
}

/** Pill-shaped label used at the top of the hero. */
export function Eyebrow({ className, children, ...props }) {
  return (
    <Mono
      className={cn(
        'inline-flex items-center gap-2.5 rounded-full border border-marigold/40 px-3.5 py-[7px]',
        'text-[12.5px] uppercase tracking-[0.14em] text-marigold',
        className,
      )}
      {...props}
    >
      {children}
    </Mono>
  )
}
