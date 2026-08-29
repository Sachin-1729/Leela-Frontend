import { cn } from '../../lib/cn'

const variants = {
  primary: 'bg-marigold text-ink shadow-[0_8px_24px_rgba(245,166,35,0.28)] hover:shadow-[0_10px_30px_rgba(245,166,35,0.42)]',
  rani: 'bg-rani text-paper shadow-[0_8px_24px_rgba(224,53,123,0.28)]',
  outline: 'border-[1.5px] border-line bg-transparent text-paper hover:border-paper',
  paper: 'bg-paper text-ink',
  soft: 'border border-paper/30 bg-paper/12 text-paper hover:bg-paper hover:text-ink',
}

const sizes = {
  sm: 'px-4 py-2 text-[13px]',
  md: 'px-5 py-2.5 text-[14px]',
  lg: 'px-6 py-3 text-[15px]',
}

/**
 * Pill button. Renders an <a> when `href` is passed, otherwise a <button>.
 * Pass `as` to force a different element (e.g. react-router's Link).
 */
export function Button({
  as,
  href,
  variant = 'primary',
  size = 'lg',
  className,
  children,
  ...props
}) {
  const Tag = as || (href ? 'a' : 'button')
  return (
    <Tag
      href={href}
      className={cn(
        'inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-display font-bold',
        'transition-[transform,box-shadow,background-color,border-color,color] duration-200 hover:-translate-y-0.5',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/** Right-pointing chevron used inside buttons and inline links. */
export function ArrowIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
      className={cn('h-4 w-4', className)}
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  )
}

/** Text link with an arrow that slides on hover of the parent `group`. */
export function ArrowLink({ href = '#', className, children, ...props }) {
  return (
    <a
      href={href}
      className={cn('inline-flex items-center gap-2 text-[14.5px] font-semibold', className)}
      {...props}
    >
      {children}
      <ArrowIcon className="transition-transform duration-200 group-hover:translate-x-1" />
    </a>
  )
}
