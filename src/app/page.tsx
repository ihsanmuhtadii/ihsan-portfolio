/**
 * app/page.tsx
 *
 * Main page — orchestrates the full visitor experience:
 *
 * 1. First visit → OnboardingTerminal (SSH flow + name + role)
 * 2. Onboarding complete → terminal minimizes with animation
 * 3. Universe loads with entrance animation based on role
 * 4. Floating button → reopens terminal overlay to switch universe
 */

'use client'

import { useState, useCallback } from 'react'
import { Universe } from '@/types'
import { useMode } from '@/lib/context'
import OnboardingTerminal from '@/components/terminal/OnboardingTerminal'
import UniversePlaceholder from '@/components/universe/UniversePlaceholder'
import SwitchUniverseTerminal from '@/components/terminal/SwitchUniverseTerminal'

type AnimState = 'idle' | 'minimize' | 'entering'

export default function Home() {
  const {
    universe,
    visitorName,
    onboardingDone,
    setOnboardingDone,
    setUniverse,
  } = useMode()

  const [animState, setAnimState]     = useState<AnimState>('idle')
  const [terminalOpen, setTerminalOpen] = useState(false)

  const handleOnboardingComplete = useCallback((_universe: Universe, _name: string) => {
    setAnimState('minimize')
    setTimeout(() => {
      setOnboardingDone(true)
      setTerminalOpen(false)
      setAnimState('entering')
    }, 600)
    setTimeout(() => {
      setAnimState('idle')
    }, 1400)
  }, [setOnboardingDone])

  /**
   * Skip onboarding entirely — go straight to normal universe.
   * No name, no role selection, no animation needed.
   */
  const handleSkipToNormal = useCallback(() => {
    setUniverse('normal')
    setOnboardingDone(true)
  }, [setUniverse, setOnboardingDone])

  const handleSwitchUniverse = useCallback((newUniverse: Universe) => {
    setAnimState('minimize')
    setTimeout(() => {
      setUniverse(newUniverse)
      setTerminalOpen(false)
      setAnimState('entering')
    }, 600)
    setTimeout(() => {
      setAnimState('idle')
    }, 1400)
  }, [setUniverse])

  const handleOpenTerminal  = useCallback(() => setTerminalOpen(true),  [])
  const handleCloseTerminal = useCallback(() => setTerminalOpen(false), [])

  const terminalStyle = animState === 'minimize' ? {
    transform: 'scale(0.05) translateY(100px)',
    opacity: 0,
    transition: 'transform 0.5s cubic-bezier(0.4, 0, 1, 1), opacity 0.4s ease-in',
    transformOrigin: 'bottom right',
  } : {
    transform: 'scale(1) translateY(0)',
    opacity: 1,
    transition: 'transform 0.3s ease, opacity 0.3s ease',
  }

  const getUniverseStyle = (u: Universe | null): React.CSSProperties => {
    if (animState !== 'entering' || !u) return {}
    switch (u) {
      case 'frontend':  return { animation: 'slideFromRight 0.6s ease-out forwards' }
      case 'backend':   return { animation: 'printFadeIn 0.7s ease-out forwards' }
      case 'fullstack': return { animation: 'scaleSpring 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards' }
      case 'wordpress': return { animation: 'dropFromTop 0.5s ease-out forwards' }
      case 'normal':    return { animation: 'printFadeIn 0.5s ease-out forwards' }
      default:          return {}
    }
  }

  return (
    <>
      <style>{`
        @keyframes slideFromRight {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
        @keyframes printFadeIn {
          from { transform: translateY(-16px); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        @keyframes scaleSpring {
          from { transform: scale(0.85); opacity: 0; }
          to   { transform: scale(1);    opacity: 1; }
        }
        @keyframes dropFromTop {
          from { transform: translateY(-40px); opacity: 0; }
          to   { transform: translateY(0);     opacity: 1; }
        }
        .terminal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.75);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          z-index: 50;
          animation: fadeIn 0.2s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>

      <main className="min-h-screen bg-[#0d1117]">

        {/* ── Onboarding ── */}
        {!onboardingDone && (
          <div
            className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8"
            style={terminalStyle}
          >
            <OnboardingTerminal
              onComplete={handleOnboardingComplete}
              onSkipToNormal={handleSkipToNormal}
            />
          </div>
        )}

        {/* ── Universe ── */}
        {onboardingDone && universe && (
          <div style={getUniverseStyle(universe)}>
            <UniversePlaceholder
              universe={universe}
              visitorName={visitorName}
              onOpenTerminal={handleOpenTerminal}
            />
          </div>
        )}

        {/* ── Terminal overlay ── */}
        {onboardingDone && terminalOpen && (
          <div className="terminal-overlay" onClick={handleCloseTerminal}>
            <div
              className="w-full max-w-3xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-end mb-2">
                <button
                  onClick={handleCloseTerminal}
                  className="font-mono text-xs text-[#8b949e] hover:text-[#e6edf3] transition-colors"
                >
                  [esc] close
                </button>
              </div>
              <SwitchUniverseTerminal
                onComplete={handleSwitchUniverse}
                onClose={handleCloseTerminal}
              />
            </div>
          </div>
        )}

      </main>
    </>
  )
}