/**
 * components/terminal/TerminalWindow.tsx
 *
 * The main terminal component — orchestrates everything together.
 *
 * RESPONSIBILITIES:
 * - Manages terminal output history (array of OutputLine)
 * - Handles command execution and routing
 * - Manages command input history (↑↓ navigation)
 * - Auto-scrolls to the latest output
 * - Delegates rendering to TerminalLine, TerminalInput, TerminalHints
 *
 * STATE:
 * - output       → all lines currently visible in the terminal
 * - input        → current value of the input field
 * - history      → previously typed commands (for ↑↓ navigation)
 * - historyIndex → current position in history (-1 = at the bottom/new input)
 *
 * FLOW:
 * User types → presses Enter → runCommand() →
 * looks up COMMANDS[cmd] → appends result to output → clears input
 */

'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { OutputLine } from '@/types'
import { COMMANDS, COMMAND_LIST, WELCOME_MESSAGE } from '@/lib/commands'
import TerminalLine from './TerminalLine'
import TerminalInput from './TerminalInput'
import TerminalHints from './TerminalHints'

/** Generates a unique ID for each output line (used as React key) */
const id = () => Math.random().toString(36).slice(2)

export default function TerminalWindow() {
  /** All lines currently displayed in the terminal output area */
  const [output, setOutput] = useState<OutputLine[]>(WELCOME_MESSAGE)

  /** Current value of the text input */
  const [input, setInput] = useState('')

  /**
   * Command history — stores previously typed commands.
   * Most recent command is at index 0 (prepended, not appended).
   * Duplicates are removed so each command appears only once.
   */
  const [history, setHistory] = useState<string[]>([])

  /**
   * Current position in command history.
   * -1 = not navigating history (showing current input)
   * 0  = most recent command
   * n  = nth most recent command
   */
  const [historyIndex, setHistoryIndex] = useState(-1)

  /** Ref to an invisible div at the bottom of the output — used for auto-scroll */
  const bottomRef = useRef<HTMLDivElement>(null)

  /**
   * Auto-scroll to bottom whenever output changes.
   * This ensures new command output is always visible.
   */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  /**
   * Executes a command entered by the visitor.
   *
   * Steps:
   * 1. Trim and lowercase the input
   * 2. Add the typed command as a "command line" in output
   * 3. Look up the command in COMMANDS registry
   * 4. If found → append its output lines
   * 5. If not found → append an error line
   * 6. Update command history (deduplicated, most recent first)
   * 7. Reset input and history navigation
   */
  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    /** The echoed command line (shows what the visitor typed) */
    const cmdLine: OutputLine = {
      id: id(),
      text: cmd,
      type: 'default',
      isCommand: true,
    }

    /** /clear is handled specially — resets output entirely */
    if (cmd === 'clear' || cmd === '/clear') {
      setOutput([])
      setInput('')
      return
    }

    /**
     * Normalize command — strip leading slash if present.
     * This allows both "/help" and "help" to work.
     */
    const normalized = cmd.startsWith('/') ? cmd.slice(1) : cmd

    const handler = COMMANDS[normalized as keyof typeof COMMANDS]
    const result = handler
      ? handler()
      : [{
          id: id(),
          text: `command not found: ${cmd} — type "/help" for available commands.`,
          type: 'error' as const,
        }]

    setOutput(prev => [...prev, cmdLine, ...result])

    /** Add to history, removing duplicates, most recent first */
    setHistory(prev => [cmd, ...prev.filter(h => h !== cmd)])
    setHistoryIndex(-1)
    setInput('')
  }, [])

  /**
   * Tab autocomplete — finds the first command starting with the input.
   * Returns the completed command string, or the original if no match.
   *
   * Example: "ski" → "skills", "po" → "portfolio"
   */
  const handleTabComplete = useCallback((val: string): string => {
    if (!val.trim()) return val
    const normalized = val.startsWith('/') ? val.slice(1) : val
    const match = COMMAND_LIST.find(cmd => cmd.startsWith(normalized.toLowerCase()))
    return match ? `/${match}` : val
  }, [])

  /**
   * Navigate UP through command history (ArrowUp key).
   * Increments historyIndex to go further back in history.
   * Clamped at the oldest command (history.length - 1).
   */
  const handleHistoryUp = useCallback((): string => {
    const next = Math.min(historyIndex + 1, history.length - 1)
    setHistoryIndex(next)
    return history[next] ?? ''
  }, [history, historyIndex])

  /**
   * Navigate DOWN through command history (ArrowDown key).
   * Decrements historyIndex to come back to newer commands.
   * At -1, returns empty string (back to fresh input).
   */
  const handleHistoryDown = useCallback((): string => {
    const next = Math.max(historyIndex - 1, -1)
    setHistoryIndex(next)
    return next === -1 ? '' : history[next] ?? ''
  }, [history, historyIndex])

  return (
    <div
      className="w-full max-w-3xl mx-auto rounded-lg border border-[#30363d] overflow-hidden flex flex-col"
      style={{ minHeight: '520px' }}
    >
      {/* ── Title bar ── macOS-style dots + centered title */}
      <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-[#30363d]">
        <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
        <span className="w-3 h-3 rounded-full bg-[#28c840]" />
        <span className="mx-auto font-mono text-xs text-[#8b949e] tracking-wide">
          ihsanmuhtadi.com — terminal
        </span>
      </div>

      {/* ── Output area ── scrollable, shows all terminal lines */}
      <div
        className="flex-1 overflow-y-auto px-4 py-4 bg-[#0d1117] space-y-0.5"
        style={{ maxHeight: '420px' }}
      >
        {output.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}
        {/* Invisible anchor for auto-scroll */}
        <div ref={bottomRef} />
      </div>

      {/* ── Input row ── prompt + text input */}
      <TerminalInput
        value={input}
        onChange={setInput}
        onSubmit={runCommand}
        onTabComplete={handleTabComplete}
        onHistoryUp={handleHistoryUp}
        onHistoryDown={handleHistoryDown}
      />

      {/* ── Hint chips ── clickable command shortcuts */}
      <TerminalHints onSelect={runCommand} />
    </div>
  )
}