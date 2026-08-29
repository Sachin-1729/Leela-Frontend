import { useEffect, useRef, useState } from 'react'

const supportsObserver = typeof IntersectionObserver !== 'undefined'

/**
 * Adds a one-shot "fade + rise into view" flag when the element scrolls in.
 * Returns [ref, isVisible] — attach the ref to the element you want to watch.
 * Without IntersectionObserver support the content simply starts visible.
 */
export function useReveal({ threshold = 0.15 } = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(!supportsObserver)

  useEffect(() => {
    const node = ref.current
    if (!node || !supportsObserver) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isVisible]
}
