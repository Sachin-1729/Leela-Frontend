import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'

/** Leela mark followed by the wordmark. */
export function Logo({ className, to = '/' }) {
  return (
    <Link
      to={to}
      className={cn('flex items-center gap-2.5 font-display text-[26px] font-extrabold tracking-[0.01em]', className)}
    >
      <img src="/leela-logo-mark.png" alt="" aria-hidden="true" className="h-10 w-auto" />
      LEELA
    </Link>
  )
}
