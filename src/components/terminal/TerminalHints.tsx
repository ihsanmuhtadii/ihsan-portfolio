/**
 * components/terminal/TerminalHints.tsx
 *
 * Renders clickable command shortcut chips below the terminal input.
 * Clicking a chip is equivalent to typing that command and pressing Enter.
 *
 * WHY THIS EXISTS:
 * Not all visitors are comfortable typing in a terminal.
 * These chips make the terminal accessible to everyone,
 * while still letting "power users" type commands manually.
 *
 * NOTE: 'clear' is intentionally excluded from hints
 * since it's a destructive action (clears all output).
 * Visitors can still type /clear manually if they want.
 */

'use client'

import { COMMAND_LIST } from '@/lib/commands'

interface Props {
  /** Called when a hint chip is clicked — same as typing + Enter */
  onSelect: (cmd: string) => void
}

export default function TerminalHints({ onSelect }: Props) {
  /**
   * Filter out 'clear' to avoid accidental clearing.
   * All other commands are shown as clickable chips.
   */
  const hints = COMMAND_LIST.filter(cmd => cmd !== 'clear')

  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
      {hints.map((cmd) => (
        <button
          key={cmd}
          onClick={() => onSelect(cmd)}
          className="px-2 py-1 rounded text-xs font-mono text-[#79c0ff] bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#58a6ff] transition-colors duration-150"
        >
          /{cmd}
        </button>
      ))}
    </div>
  )
}