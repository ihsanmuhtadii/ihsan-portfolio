'use client'

/**
 * components/universe/UniverseNormal.tsx
 *
 * The "normal" universe — a clean, standard portfolio website.
 * Accessibility fallback for visitors not familiar with terminals.
 */

import { useState } from 'react'
import { useMode } from '@/lib/context'

interface Props {
  onOpenTerminal: () => void
}

export default function UniverseNormal({ onOpenTerminal }: Props) {
  const { visitorName } = useMode()
  const [activeNav, setActiveNav] = useState('about')

  const navItems = ['about', 'skills', 'experience', 'portfolio', 'contact']

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#e6edf3]">

      {/* Navbar */}
      <nav className="sticky top-0 z-40 border-b border-[#30363d] bg-[#0d1117]/90 backdrop-blur-sm px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <span className="font-semibold text-[#e6edf3]">Ihsan Muhtadi</span>
            <span className="text-[#8b949e] text-sm ml-2">Fullstack Developer</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => {
              const isActive = activeNav === item
              return (
                <a
                  key={item}
                  href={'#' + item}
                  onClick={() => setActiveNav(item)}
                  className={
                    'text-sm capitalize transition-colors ' +
                    (isActive ? 'text-[#e6edf3]' : 'text-[#8b949e] hover:text-[#e6edf3]')
                  }
                >
                  {item}
                </a>
              )
            })}
          </div>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-6">

        {/* Hero */}
        <section id="about" className="py-24 border-b border-[#30363d]">
          {visitorName && (
            <p className="text-sm text-[#8b949e] mb-4">
              Hi {visitorName}! Welcome to my portfolio.
            </p>
          )}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <h1 className="text-6xl font-bold text-[#e6edf3] mb-3 leading-none">
                Ihsan<br />Muhtadi
              </h1>
              <p className="text-xl text-[#8b949e] mb-6">
                Fullstack Developer · Jakarta, Indonesia
              </p>
              <div className="flex flex-wrap gap-2 mb-8">
                {['PHP', 'Laravel', 'WordPress', 'React', 'Flutter', 'MySQL'].map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full text-xs bg-[#21262d] border border-[#30363d] text-[#8b949e]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <a
                  href="#portfolio"
                  className="px-6 py-3 rounded-lg bg-[#238636] text-white text-sm font-medium hover:bg-[#2ea043] transition-colors"
                >
                  View Portfolio
                </a>
                <a
                  href="#contact"
                  className="px-6 py-3 rounded-lg border border-[#30363d] text-[#e6edf3] text-sm font-medium hover:border-[#8b949e] transition-colors"
                >
                  Contact Me
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-3 gap-4 md:min-w-72">
              {[
                { label: 'Years Experience', value: '5+',   color: '#3fb950' },
                { label: 'Projects Built',   value: '20+',  color: '#79c0ff' },
                { label: 'Availability',     value: 'Open', color: '#3fb950' },
              ].map(stat => (
                <div
                  key={stat.label}
                  className="p-4 rounded-lg bg-[#161b22] border border-[#30363d] text-center"
                >
                  <p className="text-2xl font-bold mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </p>
                  <p className="text-xs text-[#8b949e] leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* About text */}
          <div className="mt-12 max-w-2xl">
            <p className="text-[#8b949e] leading-relaxed mb-4">
              Hi! I am Ihsan Muhtadi, a web developer with 5 years of experience
              specializing in PHP, WordPress, Laravel, CSS, and JavaScript. I am
              passionate about turning ideas into clean, responsive, and user-friendly
              websites that not only look great but also perform well.
            </p>
            <p className="text-[#8b949e] leading-relaxed">
              I am well-versed in both front-end and back-end development, and I love
              working on projects that solve real problems. Whether it is building a
              custom WordPress theme, optimizing site performance, or creating something
              from scratch with Laravel, I always aim for clean code and effective design.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section id="skills" className="py-20 border-b border-[#30363d]">
          <h2 className="text-2xl font-bold text-[#e6edf3] mb-2">Skills & Tech Stack</h2>
          <p className="text-[#8b949e] mb-10">Technologies I work with every day.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                category: 'Frontend',
                color: '#79c0ff',
                bg: '#0d1b2e',
                border: '#1f6feb33',
                skills: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Tailwind CSS', 'Flutter'],
              },
              {
                category: 'Backend',
                color: '#3fb950',
                bg: '#0d1a0d',
                border: '#1a7f3733',
                skills: ['PHP', 'Laravel', 'CodeIgniter', 'REST API', 'Java'],
              },
              {
                category: 'CMS & Tools',
                color: '#e3b341',
                bg: '#1a1000',
                border: '#9e6a0333',
                skills: ['WordPress', 'Elementor', 'WP Bakery', 'Gutenberg', 'ACF'],
              },
              {
                category: 'Database & DevOps',
                color: '#d2a8ff',
                bg: '#170d2a',
                border: '#8957e533',
                skills: ['MySQL', 'PostgreSQL', 'Git', 'GitHub', 'Cloudflare', 'Vercel'],
              },
            ].map(group => (
              <div
                key={group.category}
                className="p-5 rounded-lg border"
                style={{ background: group.bg, borderColor: group.border }}
              >
                <h3 className="font-semibold text-sm mb-4" style={{ color: group.color }}>
                  {group.category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.skills.map(skill => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full text-xs border"
                      style={{ background: group.bg, borderColor: group.border, color: group.color }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience */}
        <section id="experience" className="py-20 border-b border-[#30363d]">
          <h2 className="text-2xl font-bold text-[#e6edf3] mb-2">Experience</h2>
          <p className="text-[#8b949e] mb-10">My professional journey so far.</p>

          <div className="relative">
            <div className="absolute left-3 top-0 bottom-0 w-px bg-[#30363d]" />
            <div className="space-y-10">
              {[
                {
                  company: 'ATT Group',
                  role:    'Fullstack Developer',
                  period:  'Feb 2020 – Present',
                  current: true,
                  desc:    'Design and implement user interfaces using HTML, CSS, JavaScript, PHP and React. Build and maintain WordPress sites, develop custom plugins and themes, integrate third-party APIs, and optimize website performance.',
                  tags:    ['PHP', 'Laravel', 'WordPress', 'React', 'MySQL'],
                },
                {
                  company: 'PT. Batuah Infotama Sakti',
                  role:    'Executive Marketing',
                  period:  'Mar 2019 – Sep 2019',
                  current: false,
                  desc:    'Offered products to prospective buyers, provided consultation on library tools, and made special price offer proposals while regularly visiting clients.',
                  tags:    ['Sales', 'Client Relations', 'Consulting'],
                },
                {
                  company: 'PT. Carrefour Indonesia',
                  role:    'Operations',
                  period:  'Jan 2014 – Jul 2014',
                  current: false,
                  desc:    'Managed price changes, ensured items matched price tags, and handled discount-to-normal price transitions.',
                  tags:    ['Operations', 'Retail'],
                },
              ].map((job, i) => (
                <div key={i} className="relative pl-10">
                  <div
                    className={
                      'absolute left-0 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center ' +
                      (job.current ? 'bg-[#238636] border-[#2ea043]' : 'bg-[#161b22] border-[#30363d]')
                    }
                  >
                    {job.current && (
                      <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
                    )}
                  </div>
                  <div className="p-5 rounded-lg border border-[#30363d] bg-[#161b22]">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h3 className="font-semibold text-[#e6edf3]">{job.company}</h3>
                        <p className="text-sm text-[#8b949e]">{job.role}</p>
                      </div>
                      <span
                        className={
                          'text-xs px-2 py-1 rounded font-mono ' +
                          (job.current
                            ? 'bg-[#0d1a0d] text-[#3fb950] border border-[#1a7f3733]'
                            : 'bg-[#161b22] text-[#8b949e] border border-[#30363d]')
                        }
                      >
                        {job.period}
                      </span>
                    </div>
                    <p className="text-sm text-[#8b949e] leading-relaxed mb-3">{job.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {job.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded text-xs bg-[#21262d] border border-[#30363d] text-[#8b949e] font-mono"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio */}
        <section id="portfolio" className="py-20 border-b border-[#30363d]">
          <h2 className="text-2xl font-bold text-[#e6edf3] mb-2">Portfolio</h2>
          <p className="text-[#8b949e] mb-10">Selected projects I have worked on.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                title: 'Corporate Website — ATT Group',
                type:  'WordPress · Fullstack',
                desc:  'Custom WordPress theme built from scratch with Elementor, ACF, and REST API integrations. Optimized for Core Web Vitals.',
                tags:  ['WordPress', 'PHP', 'Elementor', 'REST API'],
                score: '96',
              },
              {
                title: 'E-commerce Platform',
                type:  'WooCommerce · Laravel',
                desc:  'Full e-commerce solution with WooCommerce storefront, Laravel API backend, and multiple payment gateway integrations.',
                tags:  ['WooCommerce', 'Laravel', 'MySQL', 'PHP'],
                score: '93',
              },
              {
                title: 'Mobile App',
                type:  'Flutter · Laravel',
                desc:  'Cross-platform mobile app built with Flutter and Dart, powered by a Laravel REST API backend with JWT authentication.',
                tags:  ['Flutter', 'Dart', 'Laravel', 'Firebase'],
                score: null,
              },
              {
                title: 'Landing Page Campaign',
                type:  'WordPress · Elementor',
                desc:  'High-converting landing page with custom animations, A/B test-ready sections, and Core Web Vitals optimization.',
                tags:  ['WordPress', 'Elementor', 'CSS', 'JS'],
                score: '98',
              },
            ].map(project => (
              <div
                key={project.title}
                className="p-5 rounded-lg border border-[#30363d] bg-[#161b22] hover:border-[#8b949e] transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-[#e6edf3] mb-0.5 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#8b949e]">{project.type}</p>
                  </div>
                  {project.score && (
                    <div className="text-right">
                      <p className="text-xs text-[#8b949e]">PageSpeed</p>
                      <p className="text-lg font-bold text-[#3fb950]">{project.score}</p>
                    </div>
                  )}
                </div>
                <p className="text-sm text-[#8b949e] leading-relaxed mb-4">{project.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded text-xs bg-[#21262d] border border-[#30363d] text-[#8b949e] font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="py-20 border-b border-[#30363d]">
          <h2 className="text-2xl font-bold text-[#e6edf3] mb-2">Certifications</h2>
          <p className="text-[#8b949e] mb-10">Courses and training I have completed.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                platform: 'Udemy',
                color:    '#a435f0',
                courses:  ['PHP: Pemula sampai Mahir', 'Laravel: Pemula sampai Mahir', 'MySQL: Pemula sampai Mahir', 'Git: Pemula sampai Mahir', 'Dart: Pemula sampai Mahir', 'Belajar Open API'],
              },
              {
                platform: 'BuildWithAngga',
                color:    '#3fb950',
                courses:  ['Flutter Design 2021', 'Flutter Mobile', 'Fullstack Flutter Developer', 'Fullstack Android Developer'],
              },
              {
                platform: 'Dicoding',
                color:    '#79c0ff',
                courses:  ['Memulai Pemrograman dengan Dart', 'Belajar Prinsip SOLID', 'Membuat Aplikasi dengan Flutter'],
              },
            ].map(cert => (
              <div
                key={cert.platform}
                className="p-5 rounded-lg border border-[#30363d] bg-[#161b22]"
              >
                <h3 className="font-semibold mb-4" style={{ color: cert.color }}>
                  {cert.platform}
                </h3>
                <ul className="space-y-2">
                  {cert.courses.map(course => (
                    <li key={course} className="text-sm text-[#8b949e] flex items-start gap-2">
                      <span className="text-[#30363d] mt-0.5">▸</span>
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="py-20">
          <h2 className="text-2xl font-bold text-[#e6edf3] mb-2">Get In Touch</h2>
          <p className="text-[#8b949e] mb-10">
            Open for freelance projects, full-time roles, and collaborations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-lg border border-[#30363d] bg-[#161b22]">
              <h3 className="font-semibold text-[#e6edf3] mb-4">Contact Info</h3>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Email',    value: 'ihsanmuhtadi@gmail.com',      color: '#79c0ff' },
                  { label: 'Phone',    value: '+62 856 0604 4442',            color: '#e6edf3' },
                  { label: 'LinkedIn', value: 'linkedin.com/in/ihsanmuhtadi', color: '#79c0ff' },
                  { label: 'Location', value: 'Jakarta, Indonesia',           color: '#e6edf3' },
                ].map(item => (
                  <div key={item.label} className="flex gap-4">
                    <span className="text-[#8b949e] w-16 shrink-0">{item.label}</span>
                    <span style={{ color: item.color }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-lg border border-[#238636] bg-[#0d1a0d]">
              <h3 className="font-semibold text-[#3fb950] mb-2">
                Currently Available
              </h3>
              <p className="text-sm text-[#8b949e] leading-relaxed mb-4">
                Open for freelance projects, full-time positions, and interesting
                collaborations. Feel free to reach out!
              </p>
              <div className="space-y-2 text-sm">
                {[
                  'Web development (WordPress, Laravel, React)',
                  'Mobile app development (Flutter)',
                  'Performance optimization',
                  'API development & integration',
                ].map(item => (
                  <p key={item} className="flex items-center gap-2 text-[#8b949e]">
                    <span className="text-[#3fb950]">✓</span> {item}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-[#30363d] px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-[#8b949e]">
            2026 Ihsan Muhtadi · Built with Next.js & Tailwind
          </p>
          <button
            onClick={onOpenTerminal}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#161b22] hover:bg-[#21262d] hover:border-[#58a6ff] transition-all font-mono text-xs text-[#8b949e] hover:text-[#e6edf3]"
          >
            <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
            try terminal experience
          </button>
        </div>
      </footer>

    </div>
  )
}