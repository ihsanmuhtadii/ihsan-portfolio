/**
 * components/universe/UniverseFullstack.tsx
 *
 * Universe for visitors viewing Ihsan as a Fullstack Developer.
 * Focus: end-to-end projects, both FE + BE skills, system architecture.
 * Entrance animation: scale up from center with spring.
 */

'use client'

import { useMode } from '@/lib/context'

interface Props {
  onOpenTerminal: () => void
}

export default function UniverseFullstack({ onOpenTerminal }: Props) {
  const { visitorName } = useMode()

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">

      {/* Nav */}
      <nav className="border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-sm text-[#d2a8ff]">ihsan.dev/fullstack</span>
        <div className="flex gap-6 font-mono text-xs text-[#8b949e]">
          <a href="#about"     className="hover:text-[#d2a8ff] transition-colors">about</a>
          <a href="#skills"    className="hover:text-[#d2a8ff] transition-colors">skills</a>
          <a href="#portfolio" className="hover:text-[#d2a8ff] transition-colors">portfolio</a>
          <a href="#contact"   className="hover:text-[#d2a8ff] transition-colors">contact</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <section id="about" className="mb-20">
          {visitorName && (
            <p className="font-mono text-sm text-[#d2a8ff] mb-3">
              Hey {visitorName} — viewing as Fullstack Developer
            </p>
          )}
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            Frontend. Backend.<br />
            <span className="text-[#d2a8ff]">End-to-end.</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-xl leading-relaxed mb-8">
            I own the full stack — from designing the UI to architecting the API,
            setting up the database, and deploying to production.
          </p>

          {/* Full stack diagram */}
          <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-5 font-mono text-sm mb-8">
            <p className="text-xs text-[#8b949e] mb-3">// full stack at a glance</p>
            <div className="space-y-2">
              {[
                { layer: 'Frontend',  tech: 'React · HTML · CSS · Flutter',         color: '#79c0ff' },
                { layer: 'Backend',   tech: 'PHP · Laravel · CodeIgniter · Node',    color: '#3fb950' },
                { layer: 'Database',  tech: 'MySQL · PostgreSQL',                    color: '#e3b341' },
                { layer: 'CMS',       tech: 'WordPress · Elementor · ACF',           color: '#d2a8ff' },
                { layer: 'DevOps',    tech: 'Git · GitHub · Cloudflare · Vercel',    color: '#ffa657' },
              ].map(row => (
                <div key={row.layer} className="flex items-center gap-3">
                  <span className="text-xs text-[#8b949e] w-20 shrink-0">{row.layer}</span>
                  <span className="text-[#30363d]">→</span>
                  <span style={{ color: row.color }}>{row.tech}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a href="#portfolio" className="px-5 py-2.5 rounded-lg bg-[#8957e5] text-white font-mono text-sm hover:bg-[#a371f7] transition-colors">
              view projects →
            </a>
            <a href="#contact" className="px-5 py-2.5 rounded-lg border border-[#30363d] text-[#e6edf3] font-mono text-sm hover:border-[#d2a8ff] hover:text-[#d2a8ff] transition-colors">
              hire me
            </a>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="mb-20">
          <h2 className="font-mono text-xs text-[#8b949e] uppercase tracking-widest mb-6">
            — end-to-end projects
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Corporate Website — ATT Group',
                fe: 'WordPress · Elementor · Custom CSS',
                be: 'PHP · Custom Plugins · REST API',
                db: 'MySQL',
                desc: 'Full ownership from design to deployment. Custom theme, plugin development, API integrations, and performance optimization.',
              },
              {
                title: 'E-commerce Platform',
                fe: 'WooCommerce · JavaScript · CSS',
                be: 'PHP · Laravel · Payment Gateway',
                db: 'MySQL · Redis',
                desc: 'Built the storefront, checkout flow, order management system, and integrated multiple payment providers.',
              },
              {
                title: 'Mobile App — Full System',
                fe: 'Flutter · Dart',
                be: 'Laravel · REST API · Firebase',
                db: 'PostgreSQL',
                desc: 'Designed and built both the Flutter mobile app and the Laravel API backend from scratch.',
              },
            ].map(project => (
              <div
                key={project.title}
                className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#d2a8ff] transition-colors"
              >
                <h3 className="font-mono text-sm text-[#e6edf3] mb-4">{project.title}</h3>
                <div className="grid grid-cols-3 gap-3 mb-3 text-xs font-mono">
                  <div>
                    <p className="text-[#8b949e] mb-1">Frontend</p>
                    <p className="text-[#79c0ff]">{project.fe}</p>
                  </div>
                  <div>
                    <p className="text-[#8b949e] mb-1">Backend</p>
                    <p className="text-[#3fb950]">{project.be}</p>
                  </div>
                  <div>
                    <p className="text-[#8b949e] mb-1">Database</p>
                    <p className="text-[#e3b341]">{project.db}</p>
                  </div>
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact">
          <h2 className="font-mono text-xs text-[#8b949e] uppercase tracking-widest mb-6">
            — get in touch
          </h2>
          <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]">
            <p className="text-[#8b949e] mb-4 text-sm">
              Need someone who can handle the full stack? Let's talk.
            </p>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="text-[#8b949e]">email     </span><span className="text-[#d2a8ff]">ihsanmuhtadi@gmail.com</span></p>
              <p><span className="text-[#8b949e]">phone     </span><span className="text-[#e6edf3]">+62 856 0604 4442</span></p>
              <p><span className="text-[#8b949e]">linkedin  </span><span className="text-[#d2a8ff]">linkedin.com/in/ihsanmuhtadi</span></p>
              <p className="pt-2 text-[#d2a8ff]">● Open for fullstack roles & end-to-end projects</p>
            </div>
          </div>
        </section>

      </div>

      {/* Floating terminal button */}
      <button
        onClick={onOpenTerminal}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#d2a8ff] transition-all duration-200 font-mono text-xs text-[#e6edf3]"
      >
        <span className="w-2 h-2 rounded-full bg-[#d2a8ff] animate-pulse" />
        {visitorName ? `${visitorName}'s terminal` : '> terminal'}
        <span className="text-[#484f58]">·</span>
        <span className="text-[#d2a8ff]">fullstack</span>
      </button>
    </div>
  )
}