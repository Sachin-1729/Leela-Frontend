import { cn } from '../../lib/cn'

const surfaces = {
  /** Faint frosted panel — used for list rows. */
  glass: 'bg-paper/[0.04] border border-line',
  /** Soft top-lit panel — used for the venue cards. */
  raised: 'border border-line bg-gradient-to-b from-paper/[0.05] to-paper/[0.02]',
  /** Solid plum panel — used for the event cards. */
  solid: 'border border-line bg-plum',
  /** Transparent shell for cards that paint their own glow. */
  bare: 'border-[1.5px] border-line',
}

const radii = {
  sm: 'rounded-2xl',
  md: 'rounded-[20px]',
  lg: 'rounded-[22px]',
}

/**
 * Base panel every card in the arena is built from.
 * `hover` picks how far it lifts; `glow` paints a coloured corner wash behind the content.
 */
export function Card({
  as: Tag = 'div',
  surface = 'glass',
  radius = 'md',
  hover = 'none',
  glow,
  className,
  children,
  ...props
}) {
  const hovers = {
    none: '',
    subtle: 'hover:-translate-y-[3px] hover:border-paper/35 hover:bg-paper/[0.07]',
    lift: 'hover:-translate-y-1.5 hover:border-paper/35',
    pop: 'hover:-translate-y-2 hover:scale-[1.015] hover:border-paper/50 hover:shadow-[0_20px_50px_rgba(0,0,0,0.35)]',
  }

  return (
    <Tag
      className={cn(
        // `block` matters: Card also renders as an <a>, and an inline anchor would drop
        // the padding, the clipped corners and the absolutely-positioned glow.
        'group relative block overflow-hidden transition-[transform,border-color,background-color,box-shadow] duration-300',
        surfaces[surface],
        radii[radius],
        hovers[hover],
        className,
      )}
      {...props}
    >
      {glow && (
        <span
          aria-hidden="true"
          className={cn('absolute inset-0 z-0 opacity-90 transition-opacity duration-300 group-hover:opacity-100', glow)}
        />
      )}
      <div className="relative z-[1] flex h-full flex-col">{children}</div>
    </Tag>
  )
}
