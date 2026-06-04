'use client'

import { useMode } from '@/lib/context'

export default function UIView() {
  const { toggleMode } = useMode()

  return (
    <div className="w-full max-w-3xl mx-auto animate-fade-in">

      {/* Header */}
      <div className="mb-12 border-b border-[#30363d] pb-8">
        <p className="font-mono text-sm text-[#3fb950] mb-2">
          ihsan@portfolio:~
        </p>
        <h1 className="text-3xl font-bold text-[#e6edf3] mb-1">
          Ihsan Muhtadi
        </h1>
        <p className="text-lg text-[#79c0ff] mb-3">
          Fullstack Developer
        </p>
        <p className="text-[#8b949e] text-sm mb-4">
          Jakarta, Indonesia · 5 years experience · Open for work
        </p>
        <div className="flex flex-wrap gap-2">
          {['PHP', 'Laravel', 'WordPress', 'React', 'Flutter', 'MySQL'].map(skill => (
            <span
              key={skill}
              className="px-2 py-0.5 rounded text-xs font-mono text-[#d2a8ff] bg-[#21262d] border border-[#30363d]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Quick info cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        {[
          { label: 'Experience', value: '5+ years', sub: 'Fullstack Dev' },
          { label: 'Location', value: 'Jakarta', sub: 'Indonesia' },
          { label: 'Status', value: 'Open', sub: 'Freelance & Full-time' },
        ].map(card => (
          <div
            key={card.label}
            className="p-4 rounded-lg border border-[#30363d] bg-[#161b22]"
          >
            <p className="text-xs font-mono text-[#8b949e] mb-1">{card.label}</p>
            <p className="text-lg font-semibold text-[#3fb950]">{card.value}</p>
            <p className="text-xs text-[#8b949e]">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
        {[
          { label: 'About', icon: '▸', cmd: 'whoami' },
          { label: 'Skills', icon: '▸', cmd: 'skills' },
          { label: 'Portfolio', icon: '▸', cmd: 'portfolio' },
          { label: 'Contact', icon: '▸', cmd: 'contact' },
        ].map(item => (
          <button
            key={item.cmd}
            className="p-3 rounded-lg border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#58a6ff] transition-all duration-150 text-left group"
          >
            <span className="text-[#3fb950] font-mono text-sm mr-2 group-hover:text-[#79c0ff] transition-colors">
              {item.icon}
            </span>
            <span className="text-[#e6edf3] font-mono text-sm">
              {item.label}
            </span>
          </button>
        ))}
      </div>

      {/* Back to terminal hint */}
      <div className="text-center">
        <button
          onClick={toggleMode}
          className="font-mono text-xs text-[#484f58] hover:text-[#8b949e] transition-colors"
        >
          ← back to terminal
        </button>
      </div>

    </div>
  )
}