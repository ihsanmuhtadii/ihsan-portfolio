/**
 * components/terminal/OnboardingTerminal.tsx
 *
 * Handles the interactive onboarding flow shown on first visit.
 *
 * FLOW:
 * 1. connect    → SSH welcome sequence (auto-plays with typing animation)
 * 2. greet      → "What's your name?" — visitor types name
 * 3. disclaimer → Privacy notice — visitor presses Enter to continue
 * 4. role       → "How would you like to explore?" — visitor picks 1-4
 * 5. done       → terminal minimizes, universe loads with transition
 *
 * TYPING ANIMATION:
 * Each line is "typed" character by character using the typewriterLine()
 * helper. Speed is configurable per line — slower for important lines,
 * faster for secondary info.
 *
 * NOTES:
 * - Visitor name is saved to sessionStorage (see lib/context.tsx)
 * - Role selection triggers onComplete() which parent uses to
 *   animate the terminal away and mount the correct universe
 */

'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Universe, OnboardingStep } from '@/types'
import { useMode } from '@/lib/context'

/** Maps number key / role name input to Universe type */
const ROLE_MAP: Record<string, Universe> = {
  '1': 'frontend',
  '2': 'backend',
  '3': 'fullstack',
  '4': 'wordpress',
  'frontend':  'frontend',
  'backend':   'backend',
  'fullstack': 'fullstack',
  'wordpress': 'wordpress',
}

interface Line {
  text: string
  color: string
  /** Whether this line is still being typed */
  typing?: boolean
}

interface Props {
  onComplete: (universe: Universe, name: string) => void
  onSkipToNormal: () => void  // ← tambahkan ini
}


export default function OnboardingTerminal({ onComplete, onSkipToNormal }: Props) {
  const { setVisitorName, setUniverse } = useMode()

  const [step, setStep]       = useState<OnboardingStep>('connect')
  const [lines, setLines]     = useState<Line[]>([])
  const [input, setInput]     = useState('')
  const [error, setError]     = useState('')
  const [tempName, setTempName] = useState('')
  const [inputReady, setInputReady] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  /** Auto-scroll on new output */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  /** Focus input when ready */
  useEffect(() => {
    if (inputReady) inputRef.current?.focus()
  }, [inputReady])

  /** Simple delay helper */
  const delay = (ms: number) => new Promise(r => setTimeout(r, ms))

  /**
   * Appends a complete line instantly (no typing animation).
   * Used for lines that should appear immediately.
   */
  const printInstant = useCallback((text: string, color = '#e6edf3') => {
    setLines(prev => [...prev, { text, color, typing: false }])
  }, [])

  /**
   * Types a line character by character.
   * Creates a placeholder line, then updates it on each keystroke.
   *
   * @param text   - Full text to type out
   * @param color  - Text color
   * @param speed  - Ms per character (default 28ms ≈ fast typist)
   */
  const typewriterLine = useCallback(async (
    text: string,
    color = '#e6edf3',
    speed = 28
  ) => {
    /** Add an empty placeholder line marked as 'typing' */
    setLines(prev => [...prev, { text: '', color, typing: true }])

    for (let i = 1; i <= text.length; i++) {
      await delay(speed)
      setLines(prev => {
        const updated = [...prev]
        /** Always update the last line (the one currently being typed) */
        updated[updated.length - 1] = {
          text: text.slice(0, i),
          color,
          typing: i < text.length,
        }
        return updated
      })
    }
  }, [])

  /**
   * Step 1: connect
   * Auto-plays the SSH welcome sequence.
   * Mix of typewriter and instant lines for natural feel.
   */
  useEffect(() => {
    if (step !== 'connect') return

    const sequence = async () => {
      await delay(400)
      await typewriterLine('  Connecting to ihsanmuhtadi.com...', '#8b949e', 22)
      await delay(700)
      await typewriterLine('  Connection established.', '#3fb950', 30)
      await delay(300)

      /** Box draws instantly — typewriter on box chars looks odd */
      printInstant('')
      printInstant('  ┌─────────────────────────────────────────┐', '#8b949e')
      printInstant('  │                                         │', '#8b949e')
      await delay(100)
      printInstant('  │   Ihsan Muhtadi  ·  Fullstack Developer │', '#3fb950')
      printInstant('  │   Jakarta, Indonesia                    │', '#8b949e')
      printInstant('  │   PHP · Laravel · WordPress · React     │', '#79c0ff')
      printInstant('  │                                         │', '#8b949e')
      await delay(150)
      printInstant('  │   ● Open for freelance & collaboration  │', '#3fb950')
      printInstant('  │                                         │', '#8b949e')
      printInstant('  └─────────────────────────────────────────┘', '#8b949e')

      await delay(500)
      printInstant('')
      await typewriterLine('  Type /help anytime to see available commands.', '#8b949e', 18)
      await delay(300)
      printInstant('')
      await typewriterLine('  Before we start — what\'s your name?', '#e6edf3', 30)

      setStep('greet')
      setInputReady(true)
    }

    sequence()
  }, [])

  /** Handle Enter submission per step */
  const handleSubmit = async () => {
    const val = input.trim()
    setError('')

    if (step === 'greet') {
      if (!val) {
        setError('Please enter your name to continue.')
        return
      }

      setInputReady(false)
      printInstant(`  visitor@ihsan:~$ ${val}`, '#e6edf3')
      printInstant('')
      setTempName(val)
      setInput('')

      await delay(200)
      await typewriterLine(`  Nice to meet you, ${val}!`, '#3fb950', 30)
      await delay(300)
      await showDisclaimer(val)
    }

    if (step === 'disclaimer') {
      setInputReady(false)
      printInstant(`  visitor@ihsan:~$ `, '#e6edf3')
      setInput('')
      await delay(200)
      await showRoleSelection()
    }

    if (step === 'role') {
      const normalized = val.toLowerCase()
      const universe   = ROLE_MAP[normalized]

      if (!universe) {
        setError('Please type 1, 2, 3, or 4 to select a role.')
        return
      }

      setInputReady(false)
      printInstant(`  visitor@ihsan:~$ ${val}`, '#e6edf3')
      printInstant('')
      setInput('')

      await typewriterLine(`  Great choice! Loading ${universe} universe...`, '#3fb950', 28)
      await delay(200)
      await typewriterLine('  Preparing your experience...', '#8b949e', 22)
      await delay(300)

      /** Blinking dots while "loading" */
      for (const dots of ['.', '..', '...']) {
        setLines(prev => {
          const updated = [...prev]
          updated[updated.length - 1] = {
            text: `  Preparing your experience${dots}`,
            color: '#8b949e',
            typing: false,
          }
          return updated
        })
        await delay(250)
      }

      setVisitorName(tempName)
      setUniverse(universe)

      setTimeout(() => {
        onComplete(universe, tempName)
      }, 400)
    }
  }

  /** Shows the privacy disclaimer with typewriter */
  const showDisclaimer = async (name: string) => {
    printInstant('')
    await typewriterLine('  ⚠  Privacy notice', '#e3b341', 35)
    printInstant('  ─────────────────────────────────────────', '#484f58')
    await delay(100)
    await typewriterLine(`  Your name "${name}" is stored in sessionStorage only.`, '#e6edf3', 18)
    await delay(100)
    await typewriterLine('  ✓ Not sent to any server', '#3fb950', 25)
    await typewriterLine('  ✓ Cleared automatically when you close this tab', '#3fb950', 18)
    await typewriterLine('  ✓ Used only to personalize your experience here', '#3fb950', 18)
    printInstant('  ─────────────────────────────────────────', '#484f58')
    printInstant('')
    await typewriterLine('  Press Enter to continue...', '#8b949e', 28)

    setStep('disclaimer')
    setInputReady(true)
  }

  /** Shows the role selection prompt with typewriter */
  const showRoleSelection = async () => {
    printInstant('')
    await typewriterLine('  How would you like to explore my profile?', '#e6edf3', 25)
    printInstant('')
    await delay(100)
    await typewriterLine('  [1]  Frontend Developer   — UI/UX, visual, creative', '#79c0ff', 15)
    await typewriterLine('  [2]  Backend Developer    — APIs, databases, server-side', '#79c0ff', 15)
    await typewriterLine('  [3]  Fullstack Developer  — end-to-end, complete picture', '#79c0ff', 15)
    await typewriterLine('  [4]  WordPress Developer  — CMS, themes, plugins', '#79c0ff', 15)
    printInstant('')
    await typewriterLine('  Type a number (1-4) or the role name...', '#8b949e', 18)

    setStep('role')
    setInputReady(true)
  }

  const handleRoleClick = (num: string) => {
    setInput(num)
    setTimeout(() => inputRef.current?.focus(), 50)
  }

  return (
    <>
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
              {line.typing && (
                <span className="inline-block w-2 h-3.5 bg-current align-middle ml-0.5 animate-pulse" />
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Error */}
        {error && (
          <div className="px-4 py-1 bg-[#0d1117] font-mono text-xs text-[#f85149]">
            {error}
          </div>
        )}

        {/* Input */}
        {inputReady && (
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
                step === 'greet'      ? 'your name...' :
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

        {/* Role chips */}
        {inputReady && step === 'role' && (
          <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
            {[
              { num: '1', label: 'Frontend'  },
              { num: '2', label: 'Backend'   },
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

      {/* Skip to normal site button — OUTSIDE terminal box, INSIDE fragment */}
      <div className="flex justify-end mt-3">
        <button
          onClick={onSkipToNormal}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#0d1117] hover:bg-[#161b22] hover:border-[#58a6ff] transition-all font-mono text-xs text-[#484f58] hover:text-[#8b949e]"
        >
          <span>⊞</span>
          not familiar with terminal?
          <span className="text-[#79c0ff]">view normal site →</span>
        </button>
      </div>
    </>
  )
}