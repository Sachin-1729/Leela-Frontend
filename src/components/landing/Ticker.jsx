import { Mono } from '../ui'
import { tickerItems } from '../../data/landing'

/** Endless marquee of what is booking and what is on sale. */
export function Ticker({ items = tickerItems }) {
  const line = [...items, ...items]

  return (
    <div className="overflow-hidden whitespace-nowrap border-y border-line bg-black/10 py-4">
      <div className="inline-block pl-[100%] animate-ticker">
        {line.map((item, i) => (
          <Mono key={`${item.text}-${i}`} className="mr-12 text-[13px] text-paper/70">
            {item.label} — <b className="font-medium text-marigold">{item.text}</b>
          </Mono>
        ))}
      </div>
    </div>
  )
}
