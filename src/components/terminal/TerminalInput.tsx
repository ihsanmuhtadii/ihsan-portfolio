/**
 * components/terminal/TerminalInput.tsx
 *
 * The interactive input row at the bottom of the terminal.
 * Handles keyboard events for command submission, Tab autocomplete,
 * and command history navigation (↑↓ arrow keys).
 *
 * This component is intentionally "dumb" — it doesn't know about
 * commands or history itself. All logic is handled by the parent
 * (TerminalWindow.tsx) via callback props. This makes it easy to test
 * and reuse independently.
 *
 * KEYBOARD SHORTCUTS:
 * Enter     → submit the current input as a command
 * Tab       → autocomplete to the nearest matching command
 * ArrowUp   → navigate to previous command in history
 * ArrowDown → navigate to next command in history
 */

'use client'

import { useRef, useEffect } from 'react'

interface Props {
  /** Current input value (controlled component) */
  value: string

  /** Called whenever the input changes */
  onChange: (val: string) => void

  /** Called when Enter is pressed — submit the command */
  onSubmit: (val: string) => void

  /** Called when Tab is pressed — returns the autocompleted string */
  onTabComplete: (val: string) => string

  /** Called when ArrowUp is pressed — returns the previous history item */
  onHistoryUp: () => string

  /** Called when ArrowDown is pressed — returns the next history item */
  onHistoryDown: () => string
}

export default function TerminalInput({
  value,
  onChange,
  onSubmit,
  onTabComplete,
  onHistoryUp,
  onHistoryDown,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Auto-focus the input when the component mounts.
   * This means visitors can start typing immediately
   * without clicking the input first.
   */
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(value)
    }

    if (e.key === 'Tab') {
      // Prevent Tab from moving focus to the next element
      e.preventDefault()
      onChange(onTabComplete(value))
    }

    if (e.key === 'ArrowUp') {
      // Prevent cursor from jumping to start of input
      e.preventDefault()
      onChange(onHistoryUp())
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onChange(onHistoryDown())
    }
  }

  return (
    /**
     * The entire row is clickable and refocuses the input.
     * This way if the visitor clicks anywhere in the input area,
     * they can start typing without hunting for the exact input element.
     */
    <div
      className="flex items-center gap-2 px-4 py-3 border-t border-[#30363d] bg-[#0d1117] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Prompt prefix — non-selectable */}
      <span className="text-[#3fb950] font-mono text-sm shrink-0 select-none">
        visitor@ihsan:~$
      </span>

      {/**
       * The actual text input.
       * - autoComplete/autoCorrect/autoCapitalize off → terminal-like behavior
       * - spellCheck off → prevents red underlines on command names
       * - caret-[#3fb950] → green blinking cursor matching the prompt color
       */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none font-mono text-sm text-[#e6edf3] caret-[#3fb950] placeholder:text-[#484f58]"
        placeholder="type a command..."
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </div>
  )
}