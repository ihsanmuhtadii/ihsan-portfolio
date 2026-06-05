/**
 * components/terminal/TerminalLine.tsx
 *
 * Renders a single line of terminal output.
 *
 * There are three rendering modes:
 * 1. Command line  → shows the prompt prefix + command text
 * 2. Empty line    → renders as vertical spacing (not a literal empty div)
 * 3. Output line   → colored text based on OutputLineType
 *
 * COLOR MAPPING:
 * Each OutputLineType maps to a specific Tailwind color class.
 * To change a color, update the colorMap object below.
 */

import { OutputLine } from '@/types'

/**
 * Maps each OutputLineType to its Tailwind text color class.
 * Uses hardcoded hex values for precise terminal colors
 * that match the GitHub dark theme palette.
 */
const colorMap: Record<OutputLine['type'], string> = {
  default:  'text-[#e6edf3]', // white — standard output
  success:  'text-[#3fb950]', // green — names, highlights, positive info
  error:    'text-[#f85149]', // red   — errors, not found messages
  muted:    'text-[#8b949e]', // gray  — secondary info, hints
  cyan:     'text-[#79c0ff]', // cyan  — links, emails, URLs
  yellow:   'text-[#e3b341]', // yellow — section headers
  purple:   'text-[#d2a8ff]', // purple — categories, role labels
  orange:   'text-[#ffa657]', // orange — warnings, coming soon
}

interface Props {
  line: OutputLine
}

export default function TerminalLine({ line }: Props) {
  /**
   * Command lines — typed by the visitor.
   * Rendered with the prompt prefix to simulate a real terminal.
   * The 'select-none' class prevents accidentally selecting the prompt
   * when the user tries to copy just the command text.
   */
  if (line.isCommand) {
    return (
      <div className="flex gap-2 font-mono text-sm leading-relaxed animate-fade-in">
        <span className="text-[#3fb950] select-none shrink-0">
          visitor@ihsan:~$
        </span>
        <span className="text-[#e6edf3]">{line.text}</span>
      </div>
    )
  }

  /**
   * Empty lines — used for spacing between sections.
   * Rendered as a fixed-height div instead of an empty <p>
   * to ensure consistent spacing regardless of font size.
   */
  if (line.text === '') {
    return <div className="h-3" />
  }

  /**
   * Regular output lines — colored based on type.
   * 'whitespace-pre-wrap' preserves intentional spacing
   * used in ASCII art, tables, and box-drawing characters.
   * 'animate-fade-in' gives a subtle entrance effect per line.
   */
  return (
    <div className={`font-mono text-sm leading-relaxed whitespace-pre-wrap animate-fade-in ${colorMap[line.type]}`}>
      {line.text}
    </div>
  )
}