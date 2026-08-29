/** Join conditional class names — falsy values are dropped. */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
