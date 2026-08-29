import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/** Wordmark with the glowing marigold dot. */
export function Logo({ className, to = '/' }) {
  return (
    <Link
      to={to}
      className={cn('flex items-center gap-2 font-display text-[26px] font-extrabold tracking-[0.01em]', className)}
    >
      <span className="h-2 w-2 rounded-full bg-marigold shadow-[0_0_12px_var(--color-marigold)]" />
      LEELA
    </Link>
  )
}
