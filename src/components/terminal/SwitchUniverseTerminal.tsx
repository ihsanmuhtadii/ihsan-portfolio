/**
 * components/terminal/SwitchUniverseTerminal.tsx
 *
 * A lightweight terminal shown when visitor clicks the floating button.
 * Skips the full onboarding (no name prompt, no disclaimer).
 * Only shows the universe selection + available commands.
 *
 * Used after onboarding is complete to switch between universes.
 */

'use client'

import { useState, useEffect, useRef } from 'react'
import { Universe } from '@/types'
import { useMode } from '@/lib/context'

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
  onComplete: (universe: Universe, name: string) => void
  onClose: () => void
}

export default function SwitchUniverseTerminal({ onComplete, onClose }: Props) {
  const { visitorName, universe: currentUniverse } = useMode()
  const [lines, setLines] = useState<{ text: string; color: string }[]>([])
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  const print = (text: string, color = '#e6edf3') => {
    setLines(prev => [...prev, { text, color }])
  }

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [ready])

  /** Auto-play greeting on mount */
  useEffect(() => {
    const sequence = async () => {
      await delay(200)
      print(`  Welcome back, ${visitorName}!`, '#3fb950')
      print(`  Currently viewing: `, '#8b949e')
      print(`  universe:${currentUniverse}`, '#d2a8ff')
      await delay(300)
      print('')
      print('  Where would you like to go?', '#e6edf3')
      print('')
      print('  [1]  Frontend Developer   — UI/UX, visual, creative', '#79c0ff')
      print('  [2]  Backend Developer    — APIs, databases, server-side', '#79c0ff')
      print('  [3]  Fullstack Developer  — end-to-end, complete picture', '#79c0ff')
      print('  [4]  WordPress Developer  — CMS, themes, plugins', '#79c0ff')
      print('')
      print('  Type a number (1-4) or the role name...', '#8b949e')
      print('  Or type /help to see available commands.', '#8b949e')
      setReady(true)
    }
    sequence()
  }, [])

  const handleSubmit = () => {
    const val = input.trim()
    setError('')

    /** Handle /help command */
    if (val === '/help' || val === 'help') {
      print(`  ${visitorName}@ihsan:~$ ${val}`, '#e6edf3')
      print('')
      print('  Available commands:', '#e3b341')
      print('  /whoami          → about Ihsan', '#79c0ff')
      print('  /skills          → tech stack', '#79c0ff')
      print('  /portfolio       → selected projects', '#79c0ff')
      print('  /experience      → work history', '#79c0ff')
      print('  /contact         → get in touch', '#79c0ff')
      print('  /blog            → articles', '#79c0ff')
      print('  /certifications  → courses & certificates', '#79c0ff')
      print('')
      print('  Or pick a universe above (1-4) to switch.', '#8b949e')
      setInput('')
      return
    }

    /** Handle universe selection */
    const normalized = val.toLowerCase()
    const universe = ROLE_MAP[normalized]

    if (!universe) {
      setError('Please type 1, 2, 3, or 4 — or /help for commands.')
      return
    }

    if (universe === currentUniverse) {
  // boleh tetap atau hapus pengecekan ini
}

print(`  ${visitorName}@ihsan:~$ ${val}`, '#e6edf3')
print('')
print(`  Switching to ${universe} universe...`, '#3fb950')
setInput('')

setTimeout(() => {
  onComplete(universe, visitorName)  // ← pastikan universe (bukan normalized) yang dikirim
}, 600)

    print(`  ${visitorName}@ihsan:~$ ${val}`, '#e6edf3')
    print('')
    print(`  Switching to ${universe} universe...`, '#3fb950')
    setInput('')

    setTimeout(() => {
      onComplete(universe, visitorName)
    }, 600)
  }

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-lg border border-[#30363d] overflow-hidden flex flex-col"
      style={{ minHeight: '420px' }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-xs text-[#8b949e] tracking-wide">
          {visitorName}'s terminal
        </span>
        {/* Close button */}
        <button
          onClick={onClose}
          className="font-mono text-xs text-[#484f58] hover:text-[#f85149] transition-colors ml-2"
        >
          ✕
        </button>
      </div>

      {/* Output area */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 bg-[#0d1117] space-y-0.5"
        style={{ maxHeight: '320px' }}
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

      {/* Error */}
      {error && (
        <div className="px-4 py-1 bg-[#0d1117] font-mono text-xs text-[#f85149]">
          {error}
        </div>
      )}

      {/* Input */}
      {ready && (
        <div
          className="flex items-center gap-2 px-4 py-3 border-t border-[#30363d] bg-[#0d1117] cursor-text"
          onClick={() => inputRef.current?.focus()}
        >
          <span className="text-[#3fb950] font-mono text-sm shrink-0 select-none">
            {visitorName}@ihsan:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => { setInput(e.target.value); setError('') }}
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-transparent outline-none font-mono text-sm text-[#e6edf3] caret-[#3fb950] placeholder:text-[#484f58]"
            placeholder="type 1-4 or /help..."
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck={false}
          />
        </div>
      )}

      {/* Role chips */}
{ready && (
  <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
    {[
      { num: '1', label: 'Frontend' },
      { num: '2', label: 'Backend' },
      { num: '3', label: 'Fullstack' },
      { num: '4', label: 'WordPress' },
    ].map(role => (
      <button
        key={role.num}
        onClick={() => {
          setInput(role.num)
          setTimeout(() => inputRef.current?.focus(), 50)
        }}
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

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}