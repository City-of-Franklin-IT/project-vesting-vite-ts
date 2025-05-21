export const scrollToTop = (topRef: React.RefObject<HTMLDivElement>): void => { // Scroll to top
  topRef.current?.scrollIntoView({ behavior: 'smooth' })
}