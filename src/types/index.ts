export type CommandName =
  | 'help'
  | 'whoami'
  | 'skills'
  | 'portfolio'
  | 'experience'
  | 'contact'
  | 'blog'
  | 'certifications'
  | 'playground'
  | 'clear'

export type OutputLineType =
  | 'default'
  | 'success'
  | 'error'
  | 'muted'
  | 'cyan'
  | 'yellow'
  | 'purple'
  | 'orange'

export interface OutputLine {
  id: string
  type: OutputLineType
  text: string
  isCommand?: boolean
}

export type SiteMode = 'terminal' | 'ui'