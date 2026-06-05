/**
 * lib/commands.ts
 *
 * Defines all terminal commands and their output.
 *
 * HOW IT WORKS:
 * Each command is a function that returns an array of OutputLine objects.
 * The terminal renders these lines one by one in TerminalWindow.tsx.
 *
 * HOW TO ADD A NEW COMMAND:
 * 1. Add the command name to CommandName in types/index.ts
 * 2. Add a new entry in the COMMANDS object below
 * 3. The command will automatically appear in TerminalHints.tsx
 *
 * HELPER FUNCTIONS:
 * - id()   → generates a unique ID for each line (used as React key)
 * - line() → shorthand to create an OutputLine object
 */

import { OutputLine, CommandName } from '@/types'

/** Generates a random unique ID for React list keys */
const id = () => Math.random().toString(36).slice(2)

/**
 * Creates a single terminal output line.
 * @param text - The text content to display
 * @param type - Color variant (default: 'default' = white)
 */
const line = (text: string, type: OutputLine['type'] = 'default'): OutputLine => ({
  id: id(),
  text,
  type,
})

/**
 * COMMANDS registry.
 * Each key is a valid command name, each value is a function
 * that returns the array of lines to display as output.
 */
export const COMMANDS: Record<CommandName, () => OutputLine[]> = {
  /**
   * /help — lists all available commands
   * Always keep this updated when adding new commands.
   */
  help: () => [
    line('Available commands:', 'yellow'),
    line(''),
    line('  /whoami          → about me', 'cyan'),
    line('  /skills          → tech stack & expertise', 'cyan'),
    line('  /experience      → work history', 'cyan'),
    line('  /portfolio       → selected projects', 'cyan'),
    line('  /blog            → articles & thoughts', 'cyan'),
    line('  /certifications  → courses & certificates', 'cyan'),
    line('  /contact         → get in touch / hire me', 'cyan'),
    line('  /playground      → interactive demos', 'cyan'),
    line('  /clear           → clear terminal', 'cyan'),
    line(''),
    line('Tip: press Tab to autocomplete, ↑↓ to navigate history.', 'muted'),
  ],

  /** /whoami — personal introduction and contact info */
  whoami: () => [
    line('Ihsan Muhtadi', 'success'),
    line('Fullstack Developer — 5 years experience', 'muted'),
    line(''),
    line('I build clean, responsive, and performant web experiences.', 'default'),
    line('Specializing in PHP, Laravel, WordPress, React & Flutter.', 'default'),
    line(''),
    line('Location    Jakarta, Indonesia', 'purple'),
    line('Email       ihsanmuhtadi@gmail.com', 'cyan'),
    line('LinkedIn    linkedin.com/in/ihsanmuhtadi', 'cyan'),
    line('Portfolio   ihsanmuhtadi.com/portfolio', 'cyan'),
  ],

  /** /skills — full tech stack organized by category */
  skills: () => [
    line('Tech stack:', 'yellow'),
    line(''),
    line('Frontend    HTML · CSS · JavaScript · React · Flutter', 'purple'),
    line('Backend     PHP · Laravel · CodeIgniter · Java', 'purple'),
    line('CMS         WordPress · Elementor · WP Bakery · Gutenberg', 'purple'),
    line('Database    MySQL · PostgreSQL', 'purple'),
    line('DevOps      Git · GitHub · GitLab · Cloudflare', 'purple'),
    line('Mobile      Flutter · Dart · Android', 'purple'),
    line('Perf        WP Rocket · LiteSpeed · Core Web Vitals', 'purple'),
    line(''),
    line('Soft skills: Project Management · Problem Solving · Communication', 'muted'),
  ],

  /** /experience — work history in reverse chronological order */
  experience: () => [
    line('Work history:', 'yellow'),
    line(''),
    line('ATT Group', 'success'),
    line('  Fullstack Developer  ·  Feb 2020 – Present', 'purple'),
    line('  UI dev, WordPress, Laravel, API integrations,', 'muted'),
    line('  performance optimization, code review, agile.', 'muted'),
    line(''),
    line('PT. Batuah Infotama Sakti', 'success'),
    line('  Executive Marketing  ·  Mar 2019 – Sep 2019', 'purple'),
    line('  Product consulting, client visits, proposals.', 'muted'),
    line(''),
    line('PT. Carrefour Indonesia', 'success'),
    line('  Operations  ·  Jan 2014 – Jul 2014', 'purple'),
    line('  Price management, stock operations.', 'muted'),
  ],

  /** /portfolio — selected projects with tech stack */
  portfolio: () => [
    line('Selected projects:', 'yellow'),
    line(''),
    line('[1] Corporate website — ATT Group', 'success'),
    line('    Laravel · WordPress · Custom theme · REST API', 'muted'),
    line(''),
    line('[2] E-commerce platform', 'success'),
    line('    WooCommerce · Payment gateway · ACF · Elementor', 'muted'),
    line(''),
    line('[3] Mobile app', 'success'),
    line('    Flutter · Dart · REST API · Firebase', 'muted'),
    line(''),
    line('→ ihsanmuhtadi.com/portfolio  (see all projects)', 'cyan'),
  ],

  /** /blog — latest articles and writing */
  blog: () => [
    line('Latest articles:', 'yellow'),
    line(''),
    line('[1] Optimizing WordPress Core Web Vitals in 2024', 'success'),
    line('    Performance · WP Rocket · LiteSpeed · Cloudflare', 'muted'),
    line(''),
    line('[2] Building REST APIs with Laravel & Sanctum', 'success'),
    line('    PHP · Laravel · Auth · API design', 'muted'),
    line(''),
    line('[3] Flutter vs React Native: my honest take', 'success'),
    line('    Mobile dev · Dart · Cross-platform', 'muted'),
    line(''),
    line('→ ihsanmuhtadi.com/blog', 'cyan'),
  ],

  /** /certifications — all completed courses and training */
  certifications: () => [
    line('Certifications & training:', 'yellow'),
    line(''),
    line('Udemy', 'purple'),
    line('  PHP · Dart · MySQL · Laravel · Git · Open API', 'muted'),
    line(''),
    line('BuildWithAngga', 'purple'),
    line('  Flutter Design · Flutter Mobile', 'muted'),
    line('  Fullstack Flutter · Fullstack Android', 'muted'),
    line(''),
    line('Dicoding', 'purple'),
    line('  Dart Programming · SOLID Principles · Flutter', 'muted'),
    line(''),
    line('Education', 'purple'),
    line('  Bachelor of Informatics — Univ. Indraprasta PGRI', 'muted'),
    line('  GPA 3.00/4.00', 'muted'),
  ],

  /** /contact — contact info and availability */
  contact: () => [
    line('Get in touch:', 'yellow'),
    line(''),
    line('Email     ihsanmuhtadi@gmail.com', 'cyan'),
    line('Phone     +62 856 0604 4442', 'default'),
    line('LinkedIn  linkedin.com/in/ihsanmuhtadi', 'cyan'),
    line('Website   ihsanmuhtadi.com', 'cyan'),
    line(''),
    line('Open for: freelance · full-time · collaboration', 'success'),
  ],

  /** /playground — interactive demos (coming soon) */
  playground: () => [
    line('Playground — coming soon:', 'yellow'),
    line(''),
    line('[demo-1] PHP snippet runner', 'success'),
    line('  Type PHP code, see output in real time.', 'muted'),
    line(''),
    line('[demo-2] Laravel route visualizer', 'success'),
    line('  Paste routes/web.php, visualize the tree.', 'muted'),
    line(''),
    line('[demo-3] CSS animation playground', 'success'),
    line('  Tweak keyframes, preview instantly.', 'muted'),
    line(''),
    line('Stay tuned!', 'orange'),
  ],

  /**
   * /clear — clears the terminal output
   * Returns empty array; TerminalWindow.tsx handles
   * the actual clearing when it sees this command name.
   */
  clear: () => [],
}

/**
 * Array of all valid command names.
 * Used by TerminalHints.tsx to render shortcut chips,
 * and by TerminalInput.tsx for Tab autocomplete.
 */
export const COMMAND_LIST = Object.keys(COMMANDS) as CommandName[]

/**
 * The initial output shown when the terminal first loads.
 * Uses SSH-style connection sequence for a memorable first impression.
 *
 * TIP: Keep this concise — visitors see this before interacting.
 * The onboarding flow (name + role selection) follows after this.
 */
export const WELCOME_MESSAGE: OutputLine[] = [
  line(''),
  line('  Connecting to ihsanmuhtadi.com...', 'muted'),
  line('  Connection established.', 'success'),
  line(''),
  line('  ┌─────────────────────────────────────────┐', 'muted'),
  line('  │                                         │', 'muted'),
  line('  │   Ihsan Muhtadi  ·  Fullstack Developer │', 'success'),
  line('  │   Jakarta, Indonesia                    │', 'muted'),
  line('  │   PHP · Laravel · WordPress · React     │', 'cyan'),
  line('  │                                         │', 'muted'),
  line('  │   ● Open for freelance & collaboration  │', 'success'),
  line('  │                                         │', 'muted'),
  line('  └─────────────────────────────────────────┘', 'muted'),
  line(''),
  line('  Type "/help" to see all available commands.', 'default'),
  line('  Tab to autocomplete  ·  ↑↓ for history', 'muted'),
  line(''),
]


// export const WELCOME_MESSAGE: OutputLine[] = [
//   line(''),
//   line(' ██╗██╗     ██╗███████╗  █████╗   ███╗        ██╗', 'success'),
//   line(' ██║██║     ██║██╔════╝██╔══██╗████╗     ██║', 'success'),
//   line(' ██║███████║███████╗███████║██╔██╗  ██║', 'success'),
//   line(' ██║██╔══██║╚════██║██╔══██║██║  ╚████║', 'success'),
//   line(' ██║██║     ██║███████║██║      ██║██║    ╚███║', 'success'),
//   line(' ╚═╝╚═╝     ╚═╝╚══════╝╚═╝      ╚═╝╚═╝         ╚═╝', 'success'),
//   line(''),
//   line('  Fullstack Developer · Jakarta, Indonesia', 'muted'),
//   line('  PHP · Laravel · WordPress · React · Flutter', 'cyan'),
//   line(''),
//   line('  ─────────────────────────────────────────', 'muted'),
//   line('  Type help to see all commands.', 'default'),
//   line('  Tab to autocomplete  ·  ↑↓ for history', 'muted'),
//   line('  ─────────────────────────────────────────', 'muted'),
//   line(''),
// ]