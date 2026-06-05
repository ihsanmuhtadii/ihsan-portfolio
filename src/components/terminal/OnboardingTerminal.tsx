/**
 * components/terminal/OnboardingTerminal.tsx
 *
 * Handles the interactive onboarding flow shown on first visit.
 *
 * FLOW:
 * 1. connect    → SSH welcome screen (auto-plays, 1.5s delay)
 * 2. greet      → "What's your name?" — visitor types name
 * 3. disclaimer → Privacy notice — visitor presses Enter to continue
 * 4. role       → "How would you like to explore?" — visitor picks 1-4
 * 5. done       → terminal minimizes, universe loads with transition
 *
 * NOTES:
 * - Visitor name is saved to sessionStorage (see lib/context.tsx)
 * - Role selection triggers onComplete() which parent uses to
 *   animate the terminal away and mount the correct universe
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { Universe, OnboardingStep } from '@/types'
import { useMode } from '@/lib/context'

/** Maps number key / role name input to Universe type */
const ROLE_MAP: Record<string, Universe> = {
  '1': 'frontend',
  '2': 'backend',
  '3': 'fullstack',
  '4': 'wordpress',
  'frontend': 'frontend',
  'backend': 'backend',
  'fullstack': 'fullstack',
  'wordpress': 'wordpress',
}

interface Props {
  /** Called when onboarding completes — triggers universe transition */
  onComplete: (universe: Universe, name: string) => void
}

export default function OnboardingTerminal({ onComplete }: Props) {
  const { setVisitorName, setUniverse } = useMode()

  /** Current step in the onboarding flow */
  const [step, setStep] = useState<OnboardingStep>('connect')

  /** Lines printed so far in the terminal output */
  const [lines, setLines] = useState<{ text: string; color: string }[]>([])

  /** Current input value */
  const [input, setInput] = useState('')

  /** Error message shown when invalid input is entered */
  const [error, setError] = useState('')

  /** Temporary name storage before saving to context */
  const [tempName, setTempName] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  /** Helper — append a line to terminal output */
  const print = (text: string, color = '#e6edf3') => {
    setLines(prev => [...prev, { text, color }])
  }

  /** Auto-scroll on new output */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  /** Focus input whenever step changes */
  useEffect(() => {
    inputRef.current?.focus()
  }, [step])

  /**
   * Step 1: connect
   * Auto-plays the SSH welcome sequence with timed delays.
   * After sequence completes, moves to 'greet' step.
   */
  useEffect(() => {
    if (step !== 'connect') return

    const sequence = async () => {
      await delay(300)
      print('  Connecting to ihsanmuhtadi.com...', '#8b949e')
      await delay(800)
      print('  Connection established.', '#3fb950')
      await delay(400)
      print('')
      print('  ┌─────────────────────────────────────────┐', '#8b949e')
      print('  │                                         │', '#8b949e')
      print('  │   Ihsan Muhtadi  ·  Fullstack Developer │', '#3fb950')
      print('  │   Jakarta, Indonesia                    │', '#8b949e')
      print('  │   PHP · Laravel · WordPress · React     │', '#79c0ff')
      print('  │                                         │', '#8b949e')
      print('  │   ● Open for freelance & collaboration  │', '#3fb950')
      print('  │                                         │', '#8b949e')
      print('  └─────────────────────────────────────────┘', '#8b949e')
      await delay(600)
      print('')
      print('  Type /help anytime to see available commands.', '#8b949e')
      await delay(500)
      print('')
      print('  Before we start — what\'s your name?', '#e6edf3')
      setStep('greet')
    }

    sequence()
  }, [])

  /** Handle Enter key submission for each step */
  const handleSubmit = () => {
    const val = input.trim()
    setError('')

    if (step === 'greet') {
      if (!val) {
        setError('Please enter your name to continue.')
        return
      }
      /** Echo the input as a command line */
      print(`  visitor@ihsan:~$ ${val}`, '#e6edf3')
      print('')
      print(`  Nice to meet you, ${val}!`, '#3fb950')
      setTempName(val)
      setInput('')

      setTimeout(() => {
        showDisclaimer(val)
      }, 400)
    }

    if (step === 'disclaimer') {
      /** Any input (or empty Enter) continues past disclaimer */
      print('  visitor@ihsan:~$ ', '#e6edf3')
      setInput('')
      setTimeout(() => showRoleSelection(), 300)
    }

    if (step === 'role') {
      const normalized = val.toLowerCase()
      const universe = ROLE_MAP[normalized]

      if (!universe) {
        setError('Please type 1, 2, 3, or 4 to select a role.')
        return
      }

      print(`  visitor@ihsan:~$ ${val}`, '#e6edf3')
      print('')
      print(`  Great choice! Loading ${universe} universe...`, '#3fb950')
      print('  Preparing your experience...', '#8b949e')
      setInput('')

      /** Save to global state + sessionStorage */
      setVisitorName(tempName)
      setUniverse(universe)

      /** Small delay before triggering transition */
      setTimeout(() => {
        onComplete(universe, tempName)
      }, 800)
    }
  }

  /** Shows the privacy disclaimer */
  const showDisclaimer = (name: string) => {
    print('')
    print('  ⚠  Privacy notice', '#e3b341')
    print('  ─────────────────────────────────────────', '#484f58')
    print(`  Your name "${name}" is stored in sessionStorage only.`, '#e6edf3')
    print('  ✓ Not sent to any server', '#3fb950')
    print('  ✓ Cleared automatically when you close this tab', '#3fb950')
    print('  ✓ Used only to personalize your experience here', '#3fb950')
    print('  ─────────────────────────────────────────', '#484f58')
    print('')
    print('  Press Enter to continue...', '#8b949e')
    setStep('disclaimer')
  }

  /** Shows the role selection prompt */
  const showRoleSelection = () => {
    print('')
    print('  How would you like to explore my profile?', '#e6edf3')
    print('')
    print('  [1]  Frontend Developer   — UI/UX, visual, creative', '#79c0ff')
    print('  [2]  Backend Developer    — APIs, databases, server-side', '#79c0ff')
    print('  [3]  Fullstack Developer  — end-to-end, complete picture', '#79c0ff')
    print('  [4]  WordPress Developer  — CMS, themes, plugins', '#79c0ff')
    print('')
    print('  Type a number (1-4) or the role name...', '#8b949e')
    setStep('role')
  }

  /** Handles clicking a role chip directly */
  const handleRoleClick = (num: string) => {
    setInput(num)
    setTimeout(() => {
      inputRef.current?.focus()
    }, 50)
  }

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-lg border border-[#30363d] overflow-hidden flex flex-col"
      style={{ minHeight: '520px' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-xs text-[#8b949e] tracking-wide">
          ihsanmuhtadi.com — terminal
        </span>
      </div>

      {/* Output area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 bg-[#0d1117] space-y-0.5"
        style={{ maxHeight: '420px' }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            className="font-mono text-sm leading-relaxed whitespace-pre-wrap"
            style={{ color: line.color }}
          >
            {line.text || '\u00A0'}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Error message */}
      {error && (
        <div className="px-4 py-1 bg-[#0d1117] font-mono text-xs text-[#f85149]">
          {error}
        </div>
      )}

      {/* Input row — hidden during 'connect' auto-play */}
      {step !== 'connect' && (
        <div
          className="flex items-center gap-2 px-4 py-3 border-t border-[#30363d] bg-[#0d1117] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <span className="text-[#3fb950] font-mono text-sm shrink-0 select-none">
            visitor@ihsan:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-transparent outline-none font-mono text-sm text-[#e6edf3] caret-[#3fb950] placeholder:text-[#484f58]"
            placeholder={
              step === 'greet' ? 'your name...' :
              step === 'disclaimer' ? 'press Enter to continue...' :
              'type 1, 2, 3, or 4...'
            }
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      )}

      {/* Role selection chips — only shown on 'role' step */}
      {step === 'role' && (
        <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
          {[
            { num: '1', label: 'Frontend' },
            { num: '2', label: 'Backend' },
            { num: '3', label: 'Fullstack' },
            { num: '4', label: 'WordPress' },
          ].map(role => (
            <button
              key={role.num}
              onClick={() => handleRoleClick(role.num)}
              className="px-3 py-1 rounded text-xs font-mono text-[#79c0ff] bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#58a6ff] transition-colors duration-150"
            >
              [{role.num}] {role.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

/** Simple promise-based delay helper for the auto-play sequence */
function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}