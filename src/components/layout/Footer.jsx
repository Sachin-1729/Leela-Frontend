import { Container, Mono, Text } from '../ui'
import { Logo } from './Logo'
import { footerColumns } from '../../data/landing'

/** Small brand / contact glyphs for the "Get in touch" column. */
const contactIcons = {
  whatsapp: (
    <path
      fill="currentColor"
      stroke="none"
      d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.9-4.45 9.9-9.91A9.85 9.85 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23a8.2 8.2 0 0 1 8.23 8.24c0 4.54-3.7 8.23-8.23 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.22-.16-.47-.29Z"
    />
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  email: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
}

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
                    <a
                      href={link.href}
                      className="inline-flex items-center gap-2.5 transition-colors hover:text-marigold"
                      {...(link.href.startsWith('http') && { target: '_blank', rel: 'noopener noreferrer' })}
                    >
                      {link.icon && (
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="h-[18px] w-[18px] shrink-0"
                        >
                          {contactIcons[link.icon]}
                        </svg>
                      )}
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 text-[13px] text-paper/50">
          <span>© {new Date().getFullYear()} LEELA Smart Event Arena. All rights reserved.</span>
          <span>Ranchi, India</span>
        </div>
      </Container>
    </footer>
  )
}
