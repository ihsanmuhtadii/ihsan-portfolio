import { OutputLine } from '@/types'

const colorMap: Record<OutputLine['type'], string> = {
  default:  'text-[#e6edf3]',
  success:  'text-[#3fb950]',
  error:    'text-[#f85149]',
  muted:    'text-[#8b949e]',
  cyan:     'text-[#79c0ff]',
  yellow:   'text-[#e3b341]',
  purple:   'text-[#d2a8ff]',
  orange:   'text-[#ffa657]',
}

interface Props {
  line: OutputLine
}

export default function TerminalLine({ line }: Props) {
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

  if (line.text === '') {
    return <div className="h-3" />
  }

  return (
    <div className={`font-mono text-sm leading-relaxed whitespace-pre-wrap animate-fade-in ${colorMap[line.type]}`}>
      {line.text}
    </div>
  )
}