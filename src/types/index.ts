/**
 * types/index.ts
 *
 * Central type definitions for the entire application.
 * Import from here whenever you need shared types across components.
 */

/**
 * All valid command names accepted by the terminal.
 * Adding a new command? Add it here first, then add the handler in lib/commands.ts
 */
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

/**
 * Visual style variants for each line of terminal output.
 * Maps to color classes in TerminalLine.tsx:
 * - default  → white  (normal output)
 * - success  → green  (positive info, names, highlights)
 * - error    → red    (command not found, errors)
 * - muted    → gray   (secondary info, timestamps)
 * - cyan     → cyan   (links, emails, URLs)
 * - yellow   → yellow (section headers, labels)
 * - purple   → purple (categories, role labels)
 * - orange   → orange (warnings, coming soon)
 */
export type OutputLineType =
  | 'default'
  | 'success'
  | 'error'
  | 'muted'
  | 'cyan'
  | 'yellow'
  | 'purple'
  | 'orange'

/**
 * A single line of output rendered in the terminal.
 *
 * @property id        - Unique ID used as React key (auto-generated)
 * @property type      - Visual color variant (see OutputLineType)
 * @property text      - The actual text content to display
 * @property isCommand - If true, renders with the prompt prefix "visitor@ihsan:~$"
 */
export interface OutputLine {
  id: string
  type: OutputLineType
  text: string
  isCommand?: boolean
}

/**
 * The two main display modes of the website.
 * - terminal → full terminal interface (default on first visit)
 * - ui       → normal website view with cards and sections
 */
export type SiteMode = 'terminal' | 'ui'

/**
 * The four "universes" — each role shows a different
 * version of the portfolio tailored to that audience.
 *
 * - frontend  → UI/UX focus, visual, creative
 * - backend   → APIs, databases, server-side logic
 * - fullstack → complete picture, end-to-end projects
 * - wordpress → CMS, themes, plugins, client sites
 */
export type Universe = 'frontend' | 'backend' | 'fullstack' | 'wordpress' | 'normal'

/**
 * Onboarding flow steps — the terminal walks the visitor
 * through these steps before revealing the main portfolio.
 *
 * - connect   → SSH-style welcome screen
 * - greet     → ask visitor's name
 * - disclaimer→ privacy notice about sessionStorage
 * - role      → ask which universe to enter
 * - ready     → onboarding complete, terminal ready
 */
export type OnboardingStep =
  | 'connect'
  | 'greet'
  | 'disclaimer'
  | 'role'
  | 'ready'