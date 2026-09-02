export const scrollToTop = (topRef: React.RefObject<HTMLDivElement | null>): void => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}