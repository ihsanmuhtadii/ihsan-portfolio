'use client'

import { useRef, useEffect } from 'react'

interface Props {
  value: string
  onChange: (val: string) => void
  onSubmit: (val: string) => void
  onTabComplete: (val: string) => string
  onHistoryUp: () => string
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

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      onSubmit(value)
    }

    if (e.key === 'Tab') {
      e.preventDefault()
      const completed = onTabComplete(value)
      onChange(completed)
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault()
      onChange(onHistoryUp())
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      onChange(onHistoryDown())
    }
  }

  return (
    <div
      className="flex items-center gap-2 px-4 py-3 border-t border-[#30363d] bg-[#0d1117] cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      <span className="text-[#3fb950] font-mono text-sm shrink-0 select-none">
        visitor@ihsan:~$
      </span>
      <div className="relative flex-1 flex items-center">
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          className="w-full bg-transparent outline-none font-mono text-sm text-[#e6edf3] caret-[#3fb950] placeholder:text-[#484f58]"
          placeholder="type a command..."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
        />
      </div>
    </div>
  )
}