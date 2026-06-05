/**
 * lib/context.tsx
 *
 * Global state management using React Context.
 *
 * WHY CONTEXT?
 * Multiple components (page.tsx, ModeToggle, TerminalWindow, UIView)
 * all need to know the current mode and universe. Instead of passing
 * props through every component (prop drilling), we use Context so
 * any component can access this state directly.
 *
 * HOW TO USE:
 * 1. Wrap your app with <ModeProvider> (already done in layout.tsx)
 * 2. In any component, call: const { mode, universe, visitorName } = useMode()
 *
 * EXAMPLE:
 * import { useMode } from '@/lib/context'
 * const { universe, visitorName } = useMode()
 * // universe → 'fullstack'
 * // visitorName → 'Alex'
 */

'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SiteMode, Universe } from '@/types'

/** Shape of the context value — everything stored globally */
interface ModeContextType {
  /** Current display mode: 'terminal' or 'ui' */
  mode: SiteMode

  /** Currently active universe (set after onboarding) */
  universe: Universe | null

  /** Visitor's name entered during onboarding */
  visitorName: string

  /** Whether onboarding has been completed */
  onboardingDone: boolean

  /** Switch to a specific mode */
  setMode: (mode: SiteMode) => void

  /** Switch to a specific universe */
  setUniverse: (universe: Universe) => void

  /** Save visitor name (also persists to sessionStorage) */
  setVisitorName: (name: string) => void

  /** Mark onboarding as complete */
  setOnboardingDone: (done: boolean) => void

  /** Toggle between terminal and ui mode */
  toggleMode: () => void
}

/** Create the context with null as default (enforces usage inside Provider) */
const ModeContext = createContext<ModeContextType | null>(null)

/**
 * ModeProvider — wraps the entire app to provide global state.
 * Place this in layout.tsx so all pages have access.
 *
 * sessionStorage is used to persist visitor name across page refreshes
 * within the same tab. It is automatically cleared when the tab closes.
 */
export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SiteMode>('terminal')
  const [universe, setUniverse] = useState<Universe | null>(null)
  const [onboardingDone, setOnboardingDone] = useState(false)

  /**
   * Initialize visitor name from sessionStorage if it exists.
   * This way if the user refreshes, they don't have to re-enter their name.
   */
  const [visitorName, setVisitorNameState] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('visitor_name') ?? ''
    }
    return ''
  })

  /**
   * Save visitor name to both React state and sessionStorage.
   * sessionStorage persists only for the current browser tab session.
   */
  const setVisitorName = (name: string) => {
    setVisitorNameState(name)
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('visitor_name', name)
    }
  }

  /** Toggle between terminal and ui mode */
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
 * useMode — custom hook to access global mode state.
 *
 * USAGE:
 * const { mode, universe, visitorName, toggleMode } = useMode()
 *
 * Throws an error if used outside of ModeProvider,
 * which helps catch missing provider setup early.
 */
export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}