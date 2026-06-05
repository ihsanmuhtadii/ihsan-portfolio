/**
 * components/universe/UniverseFrontend.tsx
 *
 * Universe for visitors viewing Ihsan as a Frontend Developer.
 * Focus: UI/UX, visual work, CSS, JavaScript, React components.
 * Entrance animation: slide in from right.
 */

'use client'

import { useMode } from '@/lib/context'

interface Props {
  onOpenTerminal: () => void
}

export default function UniverseFrontend({ onOpenTerminal }: Props) {
  const { visitorName } = useMode()

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">

      {/* Nav */}
      <nav className="border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-sm text-[#79c0ff]">ihsan.dev/frontend</span>
        <div className="flex gap-6 font-mono text-xs text-[#8b949e]">
          <a href="#about"     className="hover:text-[#79c0ff] transition-colors">about</a>
          <a href="#skills"    className="hover:text-[#79c0ff] transition-colors">skills</a>
          <a href="#portfolio" className="hover:text-[#79c0ff] transition-colors">portfolio</a>
          <a href="#contact"   className="hover:text-[#79c0ff] transition-colors">contact</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <section id="about" className="mb-20">
          <p className="font-mono text-sm text-[#79c0ff] mb-3">
            {visitorName ? `Hello, ${visitorName}!` : 'Hello!'} — viewing as Frontend Developer
          </p>
          <h1 className="text-5xl font-bold text-[#e6edf3] mb-4 leading-tight">
            I build interfaces<br />
            <span className="text-[#79c0ff]">people love to use.</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-xl leading-relaxed mb-8">
            5 years crafting responsive, performant, and accessible web experiences.
            From pixel-perfect landing pages to complex React applications.
          </p>
          <div className="flex gap-3">
            <a
              href="#portfolio"
              className="px-5 py-2.5 rounded-lg bg-[#1f6feb] text-white font-mono text-sm hover:bg-[#388bfd] transition-colors">
            </a>
            <a>
              view work →
            </a>
            <a href="#contact"
              className="px-5 py-2.5 rounded-lg border border-[#30363d] text-[#e6edf3] font-mono text-sm hover:border-[#79c0ff] hover:text-[#79c0ff] transition-colors"></a>
            <a>
              hire me
            </a>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-20">
          <h2 className="font-mono text-xs text-[#8b949e] uppercase tracking-widest mb-6">
            — frontend stack
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: 'HTML5',       level: '★★★★★' },
              { name: 'CSS3',        level: '★★★★★' },
              { name: 'JavaScript',  level: '★★★★★' },
              { name: 'React',       level: '★★★★☆' },
              { name: 'Tailwind',    level: '★★★★★' },
              { name: 'Flutter',     level: '★★★★☆' },
              { name: 'Elementor',   level: '★★★★★' },
              { name: 'Figma',       level: '★★★☆☆' },
            ].map(skill => (
              <div
                key={skill.name}
                className="p-4 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#79c0ff] transition-colors"
              >
                <p className="font-mono text-sm text-[#e6edf3] mb-1">{skill.name}</p>
                <p className="text-xs text-[#79c0ff]">{skill.level}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="mb-20">
          <h2 className="font-mono text-xs text-[#8b949e] uppercase tracking-widest mb-6">
            — selected work
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Corporate Website — ATT Group',
                desc: 'Custom WordPress theme with Elementor. Fully responsive, optimized for Core Web Vitals.',
                tags: ['WordPress', 'Elementor', 'CSS', 'JavaScript'],
                color: '#79c0ff',
              },
              {
                title: 'E-commerce Platform',
                desc: 'WooCommerce storefront with custom product pages, cart animations, and mobile-first design.',
                tags: ['WooCommerce', 'CSS', 'JavaScript', 'ACF'],
                color: '#79c0ff',
              },
              {
                title: 'Flutter Mobile App',
                desc: 'Cross-platform mobile UI with custom widgets, smooth transitions, and dark mode support.',
                tags: ['Flutter', 'Dart', 'Material Design'],
                color: '#79c0ff',
              },
            ].map(project => (
              <div
                key={project.title}
                className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#79c0ff] transition-colors group"
              >
                <h3 className="font-mono text-sm text-[#e6edf3] mb-2 group-hover:text-[#79c0ff] transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-[#8b949e] mb-3 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs font-mono bg-[#0d1b2e] border border-[#1f6feb33] text-[#79c0ff]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
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
            <p className="text-[#8b949e] mb-4">
              Looking for a frontend developer? Let's build something great together.
            </p>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="text-[#8b949e]">email  </span><span className="text-[#79c0ff]">ihsanmuhtadi@gmail.com</span></p>
              <p><span className="text-[#8b949e]">phone  </span><span className="text-[#e6edf3]">+62 856 0604 4442</span></p>
              <p><span className="text-[#8b949e]">linkedin  </span><span className="text-[#79c0ff]">linkedin.com/in/ihsanmuhtadi</span></p>
            </div>
          </div>
        </section>

      </div>

      {/* Floating terminal button */}
      <button
        onClick={onOpenTerminal}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#79c0ff] transition-all duration-200 font-mono text-xs text-[#e6edf3]"
      >
        <span className="w-2 h-2 rounded-full bg-[#79c0ff] animate-pulse" />
        {visitorName ? `${visitorName}'s terminal` : '> terminal'}
        <span className="text-[#484f58]">·</span>
        <span className="text-[#79c0ff]">frontend</span>
      </button>
    </div>
  )
}