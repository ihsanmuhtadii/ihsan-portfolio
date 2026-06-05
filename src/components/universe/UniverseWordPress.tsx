/**
 * components/universe/UniverseWordPress.tsx
 *
 * Universe for visitors viewing Ihsan as a WordPress Developer.
 * Focus: CMS, themes, plugins, performance, client sites.
 * Entrance animation: cascade drop from top.
 */

'use client'

import { useMode } from '@/lib/context'

interface Props {
  onOpenTerminal: () => void
}

export default function UniverseWordPress({ onOpenTerminal }: Props) {
  const { visitorName } = useMode()

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">

      {/* Nav */}
      <nav className="border-b border-[#30363d] px-6 py-4 flex items-center justify-between">
        <span className="font-mono text-sm text-[#e3b341]">ihsan.dev/wordpress</span>
        <div className="flex gap-6 font-mono text-xs text-[#8b949e]">
          <a href="#about"     className="hover:text-[#e3b341] transition-colors">about</a>
          <a href="#skills"    className="hover:text-[#e3b341] transition-colors">skills</a>
          <a href="#portfolio" className="hover:text-[#e3b341] transition-colors">portfolio</a>
          <a href="#contact"   className="hover:text-[#e3b341] transition-colors">contact</a>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">

        {/* Hero */}
        <section id="about" className="mb-20">
          {visitorName && (
            <p className="font-mono text-sm text-[#e3b341] mb-3">
              Hi {visitorName} — viewing as WordPress Developer
            </p>
          )}
          <h1 className="text-5xl font-bold mb-4 leading-tight">
            WordPress sites that<br />
            <span className="text-[#e3b341]">actually perform.</span>
          </h1>
          <p className="text-[#8b949e] text-lg max-w-xl leading-relaxed mb-8">
            Custom themes, plugin development, performance optimization,
            and CMS solutions that clients can manage themselves.
          </p>

          {/* Performance badges */}
          <div className="flex gap-3 flex-wrap mb-8">
            {[
              { label: 'PageSpeed', value: '95+' },
              { label: 'Core Web Vitals', value: 'Pass' },
              { label: 'Sites Built', value: '15+' },
            ].map(badge => (
              <div
                key={badge.label}
                className="px-4 py-2 rounded-lg border border-[#9e6a0333] bg-[#1a1000] font-mono text-sm"
              >
                <span className="text-[#8b949e]">{badge.label}: </span>
                <span className="text-[#e3b341]">{badge.value}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <a href="#portfolio" className="px-5 py-2.5 rounded-lg bg-[#9e6a03] text-white font-mono text-sm hover:bg-[#d4a017] transition-colors">
              view sites →
            </a>
            <a href="#contact" className="px-5 py-2.5 rounded-lg border border-[#30363d] text-[#e6edf3] font-mono text-sm hover:border-[#e3b341] hover:text-[#e3b341] transition-colors">
              hire me
            </a>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="mb-20">
          <h2 className="font-mono text-xs text-[#8b949e] uppercase tracking-widest mb-6">
            — wordpress stack
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { cat: 'Page Builders',   tools: 'Elementor · WP Bakery · Gutenberg' },
              { cat: 'Custom Dev',      tools: 'Custom Themes · Plugin Development · ACF' },
              { cat: 'Performance',     tools: 'WP Rocket · LiteSpeed Cache · Cloudflare' },
              { cat: 'E-commerce',      tools: 'WooCommerce · Payment Gateways' },
              { cat: 'SEO & Analytics', tools: 'Yoast SEO · Google Analytics · GTM' },
              { cat: 'Hosting',         tools: 'Niagahoster · GoDaddy · Cloudflare' },
            ].map(item => (
              <div
                key={item.cat}
                className="p-4 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#e3b341] transition-colors"
              >
                <p className="font-mono text-xs text-[#8b949e] mb-1">{item.cat}</p>
                <p className="font-mono text-sm text-[#e3b341]">{item.tools}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="mb-20">
          <h2 className="font-mono text-xs text-[#8b949e] uppercase tracking-widest mb-6">
            — client sites
          </h2>
          <div className="space-y-4">
            {[
              {
                title: 'Corporate Website — ATT Group',
                type: 'Custom Theme + Plugin',
                desc: 'Full custom WordPress theme built from scratch. ACF for flexible content, custom post types, and REST API integration.',
                score: '96',
              },
              {
                title: 'E-commerce Store',
                type: 'WooCommerce',
                desc: 'WooCommerce setup with custom product pages, checkout optimization, and payment gateway integration. Mobile-first.',
                score: '93',
              },
              {
                title: 'Landing Page Campaign',
                type: 'Elementor + Custom CSS',
                desc: 'High-converting landing page with Elementor. Custom animations, A/B test ready, and optimized for Core Web Vitals.',
                score: '98',
              },
            ].map(project => (
              <div
                key={project.title}
                className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#e3b341] transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-mono text-sm text-[#e6edf3]">{project.title}</h3>
                    <p className="font-mono text-xs text-[#e3b341] mt-0.5">{project.type}</p>
                  </div>
                  <div className="text-right font-mono">
                    <p className="text-xs text-[#8b949e]">PageSpeed</p>
                    <p className="text-lg font-bold text-[#e3b341]">{project.score}</p>
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
              Need a WordPress site that looks great and loads fast? Let's work together.
            </p>
            <div className="space-y-2 font-mono text-sm">
              <p><span className="text-[#8b949e]">email     </span><span className="text-[#e3b341]">ihsanmuhtadi@gmail.com</span></p>
              <p><span className="text-[#8b949e]">phone     </span><span className="text-[#e6edf3]">+62 856 0604 4442</span></p>
              <p><span className="text-[#8b949e]">linkedin  </span><span className="text-[#e3b341]">linkedin.com/in/ihsanmuhtadi</span></p>
              <p className="pt-2 text-[#e3b341]">● Open for WordPress projects & maintenance contracts</p>
            </div>
          </div>
        </section>

      </div>

      {/* Floating terminal button */}
      <button
        onClick={onOpenTerminal}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#e3b341] transition-all duration-200 font-mono text-xs text-[#e6edf3]"
      >
        <span className="w-2 h-2 rounded-full bg-[#e3b341] animate-pulse" />
        {visitorName ? `${visitorName}'s terminal` : '> terminal'}
        <span className="text-[#484f58]">·</span>
        <span className="text-[#e3b341]">wordpress</span>
      </button>
    </div>
  )
}