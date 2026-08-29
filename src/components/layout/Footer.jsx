import { Container, Mono, Text } from '../ui'
import { Logo } from './Logo'
import { footerColumns } from '../../data/landing'

export function Footer() {
  return (
    <footer className="mt-10 border-t border-line py-16 pb-10">
      <Container>
        <div className="mb-12 grid grid-cols-2 gap-8 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="col-span-2 md:col-span-1">
            <Logo className="mb-3.5" />
            <Text size="sm" tone="dim" className="max-w-[260px]">
              The smart event &amp; cultural arena — book venues, buy passes, and join the communities behind
              Kolkata&apos;s stages.
            </Text>
          </div>

          {footerColumns.map((col) => (
            <div key={col.title}>
              <Mono as="h5" className="mb-4 text-xs uppercase tracking-[0.1em] text-paper/50">
                {col.title}
              </Mono>
              <ul className="list-none">
                {col.links.map((link) => (
                  <li key={link.label} className="mb-2.5 text-[14.5px] text-paper/75">
                    <a href={link.href} className="transition-colors hover:text-marigold">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-paper/50">
          <span>© {new Date().getFullYear()} LEELA Cultural Arena. All rights reserved.</span>
          <span>Kolkata, India</span>
        </div>
      </Container>
    </footer>
  )
}
