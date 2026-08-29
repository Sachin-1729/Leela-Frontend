/**
 * Decorative rangoli line-work floating behind the hero.
 *
 * The height is deliberately left to the 1200x700 viewBox aspect ratio — stretching the
 * svg to the full stage height would make preserveAspectRatio="slice" crop the artwork away.
 */
export function Rangoli() {
  return (
    <svg
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMin slice"
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 z-0 w-full opacity-35"
    >
      <g stroke="#F7F1E3" strokeWidth="1" fill="none">
        <circle cx="150" cy="80" r="70" />
        <circle cx="150" cy="80" r="46" />
        <path d="M150 10 L150 150 M80 80 L220 80 M100 30 L200 130 M200 30 L100 130" />
        <circle cx="1080" cy="140" r="90" />
        <circle cx="1080" cy="140" r="60" />
        <circle cx="1080" cy="140" r="30" />
        <circle cx="980" cy="520" r="55" />
        <path d="M925 520 L1035 520 M980 465 L980 575 M943 483 L1017 557 M1017 483 L943 557" />
        <circle cx="60" cy="560" r="65" />
        <circle cx="60" cy="560" r="40" />
      </g>
    </svg>
  )
}
