import { ArrowIcon, Card, Heading, Mono, Reveal, Text } from '../ui'
import { portals } from '../../data/landing'
import { useNavigate } from "react-router-dom";

/** The three ways into the arena — book, buy, join. */
export function PortalCards({ id }) {
    const navigate = useNavigate();
  return (
    <div id={id} className="mb-14 grid grid-cols-1 gap-5 md:grid-cols-3">
      {portals.map((portal, i) => (
        <Reveal key={portal.num} delay={i * 90}>
          <Card
            as="a"
            href={portal.cta == 'Explore venues' ? null: portal.href}
            surface="bare"
            radius="lg"
            hover="pop"
            glow={portal.glow}
            className="h-full min-h-[200px] cursor-pointer px-6 pb-6 pt-[30px]"
          >
            <Mono className="absolute right-6 top-5 text-xs text-paper/45">{portal.num}</Mono>

            <div className="mb-5 flex h-13 w-13 items-center justify-center rounded-[14px] bg-ink/35 text-2xl shadow-[inset_0_0_0_1px_rgba(247,241,227,0.18)]">
              <span aria-hidden="true">{portal.icon}</span>
            </div>

            <Heading level={3} size="sm" className="mb-2 text-[23px]">
              {portal.title}
            </Heading>
            <Text size="sm" className="mb-5 grow">
              {portal.copy}
            </Text>

            <span onClick={()=>{
                   navigate("/venue");
            }} className="inline-flex items-center gap-2 self-start rounded-full bg-paper px-4.5 py-2.5 font-display text-[14.5px] font-bold text-ink transition-[gap] duration-200 group-hover:gap-3">
              {portal.cta}
              <ArrowIcon className="h-[15px] w-[15px]" />
            </span>
          </Card>
        </Reveal>
      ))}
    </div>
  )
}
