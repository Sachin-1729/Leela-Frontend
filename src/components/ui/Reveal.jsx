import { cn } from '../../lib/cn'
import { useReveal } from '../../hooks/useReveal'

/** Wraps children so they fade and rise the first time they scroll into view. */
export function Reveal({ as: Tag = 'div', delay = 0, className, children, ...props }) {
  const [ref, isVisible] = useReveal()

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
      className={cn(
        'transition-[opacity,transform] duration-700 ease-out',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0',
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
