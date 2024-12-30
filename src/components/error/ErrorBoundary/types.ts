// Types
import { ReactNode } from "react"

export interface ErrorBoundaryProps {
  href: string
  children: ReactNode
  errorMessage?: string
}