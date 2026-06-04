'use client'

import { COMMAND_LIST } from '@/lib/commands'

interface Props {
  onSelect: (cmd: string) => void
}

export default function TerminalHints({ onSelect }: Props) {
  const hints = COMMAND_LIST.filter(cmd => cmd !== 'clear')

  return (
    <div className="flex flex-wrap gap-2 px-4 py-3 border-t border-[#30363d] bg-[#161b22]">
      {hints.map((cmd) => (
        <button
          key={cmd}
          onClick={() => onSelect(cmd)}
          className="px-2 py-1 rounded text-xs font-mono text-[#79c0ff] bg-[#21262d] border border-[#30363d] hover:bg-[#30363d] hover:border-[#58a6ff] transition-colors duration-150"
        >
          {cmd}
        </button>
      ))}
    </div>
  )
}