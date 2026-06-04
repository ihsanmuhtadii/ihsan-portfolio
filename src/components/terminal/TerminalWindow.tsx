'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { OutputLine } from '@/types'
import { COMMANDS, COMMAND_LIST, WELCOME_MESSAGE } from '@/lib/commands'
import TerminalLine from './TerminalLine'
import TerminalInput from './TerminalInput'
import TerminalHints from './TerminalHints'

const id = () => Math.random().toString(36).slice(2)

export default function TerminalWindow() {
  const [output, setOutput] = useState<OutputLine[]>(WELCOME_MESSAGE)
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [output])

  const runCommand = useCallback((raw: string) => {
    const cmd = raw.trim().toLowerCase()
    if (!cmd) return

    const cmdLine: OutputLine = {
      id: id(),
      text: cmd,
      type: 'default',
      isCommand: true,
    }

    if (cmd === 'clear') {
      setOutput([])
      setInput('')
      return
    }

    const handler = COMMANDS[cmd as keyof typeof COMMANDS]
    const result = handler
      ? handler()
      : [{
          id: id(),
          text: `command not found: ${cmd} — type "help" for available commands.`,
          type: 'error' as const,
        }]

    setOutput(prev => [...prev, cmdLine, ...result])
    setHistory(prev => [cmd, ...prev.filter(h => h !== cmd)])
    setHistoryIndex(-1)
    setInput('')
  }, [])

  const handleTabComplete = useCallback((val: string): string => {
    if (!val.trim()) return val
    const match = COMMAND_LIST.find(cmd => cmd.startsWith(val.toLowerCase()))
    return match ?? val
  }, [])

  const handleHistoryUp = useCallback((): string => {
    const next = Math.min(historyIndex + 1, history.length - 1)
    setHistoryIndex(next)
    return history[next] ?? ''
  }, [history, historyIndex])

  const handleHistoryDown = useCallback((): string => {
    const next = Math.max(historyIndex - 1, -1)
    setHistoryIndex(next)
    return next === -1 ? '' : history[next] ?? ''
  }, [history, historyIndex])

  return (
    <div className="w-full max-w-3xl mx-auto rounded-lg border border-[#30363d] overflow-hidden flex flex-col" style={{ minHeight: '520px' }}>
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
      <div className="flex-1 overflow-y-auto px-4 py-4 bg-[#0d1117] space-y-0.5" style={{ maxHeight: '420px' }}>
        {output.map((line) => (
          <TerminalLine key={line.id} line={line} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <TerminalInput
        value={input}
        onChange={setInput}
        onSubmit={runCommand}
        onTabComplete={handleTabComplete}
        onHistoryUp={handleHistoryUp}
        onHistoryDown={handleHistoryDown}
      />

      {/* Hints */}
      <TerminalHints onSelect={runCommand} />
    </div>
  )
}