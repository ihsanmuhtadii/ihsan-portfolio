/**
 * lib/context.tsx
 *
 * Global state management using React Context.
 * Stores mode, universe, visitor name, and onboarding status.
 * Accessible from any component via the useMode() hook.
 */

'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SiteMode, Universe } from '@/types'

interface ModeContextType {
  /** Current display mode: 'terminal' or 'ui' */
  mode: SiteMode

  /** Currently active universe (set after onboarding) */
  universe: Universe | null

  /** Visitor's name entered during onboarding */
  visitorName: string

  /** Whether onboarding has been completed */
  onboardingDone: boolean

  setMode: (mode: SiteMode) => void
  setUniverse: (universe: Universe) => void
  setVisitorName: (name: string) => void
  setOnboardingDone: (done: boolean) => void
  toggleMode: () => void
}

const ModeContext = createContext<ModeContextType | null>(null)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SiteMode>('terminal')
  const [universe, setUniverse] = useState<Universe | null>(null)
  const [onboardingDone, setOnboardingDone] = useState(false)

  /**
   * Initialize visitor name from sessionStorage if available.
   * sessionStorage persists only within the same browser tab.
   * It is automatically cleared when the tab is closed.
   */
  const [visitorName, setVisitorNameState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('visitor_name') ?? ''
    }
    return ''
  })

  /**
   * Saves visitor name to both React state and sessionStorage.
   * We use sessionStorage (not localStorage) so data is never
   * permanently stored — it clears when the tab closes.
   */
  const setVisitorName = (name: string) => {
    setVisitorNameState(name)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('visitor_name', name)
    }
  }

  const toggleMode = () => {
    setMode(prev => prev === 'terminal' ? 'ui' : 'terminal')
  }

  return (
    <ModeContext.Provider value={{
      mode,
      universe,
      visitorName,
      onboardingDone,
      setMode,
      setUniverse,
      setVisitorName,
      setOnboardingDone,
      toggleMode,
    }}>
      {children}
    </ModeContext.Provider>
  )
}

/**
 * useMode — custom hook to access global state.
 * Must be used inside a component wrapped by ModeProvider.
 */
export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}