'use client'

import { useMode } from '@/lib/context'

export default function ModeToggle() {
  const { mode, toggleMode } = useMode()

  return (
    <div className="flex items-center gap-2">
      <span className="font-mono text-xs text-[#8b949e]">
        {mode === 'terminal' ? 'switch to UI' : 'switch to Terminal'}
      </span>
      <button
        onClick={toggleMode}
        className="relative flex items-center gap-2 px-3 py-1.5 rounded border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#58a6ff] transition-all duration-200 group"
      >
        {mode === 'terminal' ? (
          <>
            <span className="text-[#8b949e] text-xs font-mono group-hover:text-[#79c0ff] transition-colors">
              [terminal]
            </span>
            <span className="text-[#484f58] text-xs font-mono">
              [ui]
            </span>
          </>
        ) : (
          <>
            <span className="text-[#484f58] text-xs font-mono">
              [terminal]
            </span>
            <span className="text-[#8b949e] text-xs font-mono group-hover:text-[#79c0ff] transition-colors">
              [ui]
            </span>
          </>
        )}
      </button>
    </div>
  )
}