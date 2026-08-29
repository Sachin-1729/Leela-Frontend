import { useState } from 'react'
import { Button, Container } from '../ui'
import { Logo } from './Logo'
import { navLinks } from '../../data/landing'

/** Sticky top bar — inline links on desktop, a disclosure panel on mobile. */
export function Navbar({ links = navLinks, cta = { label: 'Get Started', href: '#acts' } }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-dusk/85 backdrop-blur-[10px]">
      <Container>
        <nav className="flex h-[76px] items-center justify-between">
          <Logo />

          <div className="hidden items-center gap-9 md:flex">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[15px] font-medium text-paper/85 transition-colors duration-200 hover:text-marigold"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            {/* Wrapped rather than given `hidden` directly: Button sets its own
                display, and a bare `hidden` would lose to it. */}
            <span className="hidden sm:block">
              <Button href={cta.href} size="md">
                {cta.label}
              </Button>
            </span>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line md:hidden"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
                {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
              </svg>
            </button>
          </div>
        </nav>
      </Container>

      {open && (
        <div className="border-t border-line md:hidden">
          <Container className="flex flex-col py-4">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-[15px] font-medium text-paper/85 hover:text-marigold"
              >
                {link.label}
              </a>
            ))}
            <Button href={cta.href} size="md" className="mt-3 sm:hidden" onClick={() => setOpen(false)}>
              {cta.label}
            </Button>
          </Container>
        </div>
      )}
    </header>
  )
}
