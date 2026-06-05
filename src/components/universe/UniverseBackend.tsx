/**
 * components/universe/UniverseBackend.tsx
 *
 * Universe for visitors viewing Ihsan as a Backend Developer.
 * Focus: APIs, databases, server-side logic, architecture.
 * Entrance animation: terminal print line by line.
 */

'use client'

import { useMode } from '@/lib/context'

interface Props {
  onOpenTerminal: () => void
}

export default function UniverseBackend({ onOpenTerminal }: Props) {
  const { visitorName } = useMode()

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3] font-mono">

      {/* Nav */}
      <nav className="border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
        <span className="text-sm text-[#3fb950]">ihsan.dev/backend</span>
        <div className="flex gap-6 text-xs text-[#8b949e]">
          <a href="#about"     className="hover:text-[#3fb950] transition-colors">~/about</a>
          <a href="#skills"    className="hover:text-[#3fb950] transition-colors">~/skills</a>
          <a href="#portfolio" className="hover:text-[#3fb950] transition-colors">~/projects</a>
          <a href="#contact"   className="hover:text-[#3fb950] transition-colors">~/contact</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero — terminal style */}
        <section id="about" className="mb-20">
          <div className="text-xs text-[#8b949e] mb-6">
            <span className="text-[#3fb950]">▸</span> cat about.txt
          </div>
          <div className="pl-4 border-l-2 border-[#30363d] space-y-2 mb-8">
            <p className="text-[#8b949e] text-xs">
              {visitorName ? `# Hello, ${visitorName}! — viewing as Backend Developer` : '# Backend Developer'}
            </p>
            <p className="text-2xl font-bold text-[#e6edf3]">Ihsan Muhtadi</p>
            <p className="text-[#3fb950]">Fullstack Developer → Backend Specialist</p>
            <p className="text-[#8b949e] text-sm leading-relaxed max-w-xl">
              5 years building robust server-side systems. REST APIs, database design,
              authentication, performance optimization, and clean architecture.
            </p>
          </div>

          {/* Quick stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'APIs built',     value: '20+' },
              { label: 'Years exp',      value: '5'   },
              { label: 'Uptime focus',   value: '99%' },
            ].map(stat => (
              <div key={stat.label} className="p-4 rounded border border-[#30363d] bg-[#161b22]">
                <p className="text-2xl font-bold text-[#3fb950]">{stat.value}</p>
                <p className="text-xs text-[#8b949e] mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-20">
          <p className="text-xs text-[#8b949e] mb-6">
            <span className="text-[#3fb950]">▸</span> cat stack.json
          </p>
          <div className="rounded-lg border border-[#30363d] bg-[#161b22] p-5 text-sm space-y-2">
            <p><span className="text-[#e3b341]">"language"</span><span className="text-[#8b949e]">: </span><span className="text-[#a5d6ff]">["PHP", "Java", "JavaScript"]</span><span className="text-[#8b949e]">,</span></p>
            <p><span className="text-[#e3b341]">"framework"</span><span className="text-[#8b949e]">: </span><span className="text-[#a5d6ff]">["Laravel", "CodeIgniter"]</span><span className="text-[#8b949e]">,</span></p>
            <p><span className="text-[#e3b341]">"database"</span><span className="text-[#8b949e]">: </span><span className="text-[#a5d6ff]">["MySQL", "PostgreSQL"]</span><span className="text-[#8b949e]">,</span></p>
            <p><span className="text-[#e3b341]">"auth"</span><span className="text-[#8b949e]">: </span><span className="text-[#a5d6ff]">["Laravel Sanctum", "JWT", "OAuth"]</span><span className="text-[#8b949e]">,</span></p>
            <p><span className="text-[#e3b341]">"devops"</span><span className="text-[#8b949e]">: </span><span className="text-[#a5d6ff]">["Git", "GitHub", "GitLab", "Cloudflare"]</span><span className="text-[#8b949e]">,</span></p>
            <p><span className="text-[#e3b341]">"api"</span><span className="text-[#8b949e]">: </span><span className="text-[#a5d6ff]">["REST", "OpenAPI", "Webhook"]</span></p>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="mb-20">
          <p className="text-xs text-[#8b949e] mb-6">
            <span className="text-[#3fb950]">▸</span> ls projects/
          </p>
          <div className="space-y-4">
            {[
              {
                title: 'REST API — E-commerce Platform',
                desc: 'Built with Laravel & Sanctum. Handles auth, product catalog, cart, orders, and payment gateway integration.',
                tags: ['Laravel', 'MySQL', 'REST API', 'Sanctum'],
              },
              {
                title: 'CRM Integration — ATT Group',
                desc: 'Backend service connecting WordPress with third-party CRM. Sync contacts, automate email triggers via webhook.',
                tags: ['PHP', 'WordPress', 'Webhook', 'CRM'],
              },
              {
                title: 'Mobile App Backend',
                desc: 'API server for Flutter app. JWT auth, file upload, push notifications, and PostgreSQL data layer.',
                tags: ['Laravel', 'PostgreSQL', 'JWT', 'Firebase'],
              },
            ].map(project => (
              <div
                key={project.title}
                className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#3fb950] transition-colors group"
              >
                <p className="text-xs text-[#3fb950] mb-1">~/projects/{project.title.toLowerCase().replace(/\s/g, '-').replace(/[^a-z-]/g, '')}</p>
                <h3 className="text-sm text-[#e6edf3] mb-2 group-hover:text-[#3fb950] transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs text-[#8b949e] mb-3 leading-relaxed">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-0.5 rounded text-xs bg-[#0d1a0d] border border-[#1a7f3733] text-[#3fb950]">
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
          <p className="text-xs text-[#8b949e] mb-6">
            <span className="text-[#3fb950]">▸</span> cat contact.txt
          </p>
          <div className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] space-y-2 text-sm">
            <p><span className="text-[#8b949e]">email     </span><span className="text-[#3fb950]">ihsanmuhtadi@gmail.com</span></p>
            <p><span className="text-[#8b949e]">phone     </span><span className="text-[#e6edf3]">+62 856 0604 4442</span></p>
            <p><span className="text-[#8b949e]">linkedin  </span><span className="text-[#3fb950]">linkedin.com/in/ihsanmuhtadi</span></p>
            <p className="pt-2 text-[#3fb950]">● Open for backend roles & freelance API projects</p>
          </div>
        </section>

      </div>

      {/* Floating terminal button */}
      <button
        onClick={onOpenTerminal}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#3fb950] transition-all duration-200 font-mono text-xs text-[#e6edf3]"
      >
        <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
        {visitorName ? `${visitorName}'s terminal` : '> terminal'}
        <span className="text-[#484f58]">·</span>
        <span className="text-[#3fb950]">backend</span>
      </button>
    </div>
  )
}