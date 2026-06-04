'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { SiteMode } from '@/types'

interface ModeContextType {
  mode: SiteMode
  setMode: (mode: SiteMode) => void
  toggleMode: () => void
}

const ModeContext = createContext<ModeContextType | null>(null)

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<SiteMode>('terminal')

  const toggleMode = () => {
    setMode(prev => prev === 'terminal' ? 'ui' : 'terminal')
  }

  return (
    <ModeContext.Provider value={{ mode, setMode, toggleMode }}>
      {children}
    </ModeContext.Provider>
  )
}

export function useMode() {
  const ctx = useContext(ModeContext)
  if (!ctx) throw new Error('useMode must be used within ModeProvider')
  return ctx
}