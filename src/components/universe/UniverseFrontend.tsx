'use client'

/**
 * components/universe/UniverseFrontend.tsx
 * Universe: Frontend Developer — Magazine / Bold Agency style
 *
 * Animations:
 * - Interactive particle background (canvas, follows mouse)
 * - Cinematic staggered hero entrance
 * - Floating skill bubbles with depth layers
 * - Smooth scroll reveal with stagger per section
 * - Skill bars with counting number animation
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { useMode } from '@/lib/context'

interface Props {
  onOpenTerminal: () => void
}

const PROJECTS = [
  {
    title: 'ATT Group — Corporate Website',
    type:  'WordPress · Custom Theme',
    desc:  'Pixel-perfect corporate site with custom Elementor layouts, ACF fields, and REST API integrations.',
    tags:  ['WordPress', 'Elementor', 'CSS', 'JS'],
    score: '96',
    num:   '01',
  },
  {
    title: 'E-Commerce Platform',
    type:  'WooCommerce · Custom UI',
    desc:  'Full storefront redesign with custom product cards, animated cart, and mobile-first checkout flow.',
    tags:  ['WooCommerce', 'CSS', 'JavaScript', 'ACF'],
    score: '93',
    num:   '02',
  },
  {
    title: 'Flutter Mobile App',
    type:  'Flutter · Dart',
    desc:  'Cross-platform mobile UI with custom widgets, smooth page transitions, and dark mode support.',
    tags:  ['Flutter', 'Dart', 'Material Design'],
    score: null,
    num:   '03',
  },
  {
    title: 'Landing Page Campaign',
    type:  'WordPress · Elementor',
    desc:  'High-converting campaign page with CSS animations, sticky nav, and Core Web Vitals optimization.',
    tags:  ['WordPress', 'CSS', 'Elementor', 'JS'],
    score: '98',
    num:   '04',
  },
]

const SKILLS = [
  { name: 'HTML5',      level: 100, category: 'Markup'    },
  { name: 'CSS3',       level: 98,  category: 'Styling'   },
  { name: 'JavaScript', level: 90,  category: 'Language'  },
  { name: 'React',      level: 85,  category: 'Framework' },
  { name: 'Tailwind',   level: 95,  category: 'Styling'   },
  { name: 'Flutter',    level: 80,  category: 'Mobile'    },
  { name: 'Elementor',  level: 98,  category: 'CMS'       },
  { name: 'WordPress',  level: 95,  category: 'CMS'       },
]

const BUBBLES = [
  { name: 'HTML5',      x: '5%',  y: '10%', speed: 3.5, amp: 14, delay: 0,   size: 'text-sm',   depth: 1.0 },
  { name: 'CSS3',       x: '62%', y: '5%',  speed: 4.2, amp: 18, delay: 0.8, size: 'text-sm',   depth: 0.7 },
  { name: 'JavaScript', x: '32%', y: '22%', speed: 5.0, amp: 12, delay: 0.3, size: 'text-base', depth: 1.2 },
  { name: 'React',      x: '2%',  y: '50%', speed: 4.5, amp: 16, delay: 1.1, size: 'text-base', depth: 0.9 },
  { name: 'Flutter',    x: '68%', y: '42%', speed: 3.8, amp: 20, delay: 0.5, size: 'text-sm',   depth: 1.1 },
  { name: 'Tailwind',   x: '28%', y: '68%', speed: 4.2, amp: 10, delay: 0.7, size: 'text-xs',   depth: 0.8 },
  { name: 'WordPress',  x: '5%',  y: '78%', speed: 3.6, amp: 15, delay: 1.3, size: 'text-xs',   depth: 0.6 },
  { name: 'Elementor',  x: '62%', y: '78%', speed: 4.8, amp: 13, delay: 0.2, size: 'text-xs',   depth: 1.0 },
  { name: 'PHP',        x: '48%', y: '55%', speed: 3.9, amp: 17, delay: 0.9, size: 'text-xs',   depth: 0.7 },
]

/** Intersection observer hook — fires once when element enters viewport */
function useInView(ref: React.RefObject<HTMLElement | null>, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    if (!ref.current) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

/** Animated counter hook — counts from 0 to target when triggered */
function useCounter(target: number, active: boolean, duration = 1200) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    let start: number | null = null
    const step = (ts: number) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])
  return count
}

/** Interactive particle canvas background */
function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -1000, y: -1000 })
  const particles = useRef<{ x: number; y: number; vx: number; vy: number; size: number; alpha: number }[]>([])
  const animRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Init particles
    const count = 80
    particles.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.current.forEach(p => {
        // Mouse repulsion
        const dx = p.x - mouse.current.x
        const dy = p.y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 120) {
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.6
          p.vy += (dy / dist) * force * 0.6
        }

        // Dampen velocity
        p.vx *= 0.98
        p.vy *= 0.98

        p.x += p.vx
        p.y += p.vy

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        // Draw particle
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(121,192,255,${p.alpha})`
        ctx.fill()
      })

      // Draw connections between nearby particles
      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const a = particles.current[i]
          const b = particles.current[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.strokeStyle = `rgba(121,192,255,${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }
    draw()

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('mouseleave', () => { mouse.current = { x: -1000, y: -1000 } })

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.6 }}
    />
  )
}

/** Single animated skill bar with counter */
function SkillBar({ skill, index, active }: { skill: typeof SKILLS[0]; index: number; active: boolean }) {
  const count = useCounter(skill.level, active, 1000 + index * 100)
  const [barActive, setBarActive] = useState(false)

  useEffect(() => {
    if (active) {
      const t = setTimeout(() => setBarActive(true), index * 80)
      return () => clearTimeout(t)
    }
  }, [active, index])

  return (
    <div
      className="group p-4 rounded-xl border border-[#79c0ff11] bg-[#050d1a] hover:border-[#79c0ff44] transition-all duration-500 cursor-default"
      style={{
        opacity: active ? 1 : 0,
        transform: active ? 'translateX(0)' : 'translateX(-20px)',
        transition: `opacity 0.6s ease ${index * 0.08}s, transform 0.6s ease ${index * 0.08}s, border-color 0.3s`,
      }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <span className="font-mono text-[10px] text-[#484f58] uppercase tracking-wider">{skill.category}</span>
          <span className="font-bold text-sm text-[#e6edf3] group-hover:text-[#79c0ff] transition-colors duration-300">
            {skill.name}
          </span>
        </div>
        <span className="font-mono text-base font-black text-[#79c0ff] tabular-nums w-12 text-right">
          {count}%
        </span>
      </div>

      {/* Track */}
      <div className="h-1.5 bg-[#0d1b2e] rounded-full overflow-hidden">
        <div
          className={barActive ? 'skill-bar-active' : 'skill-bar-inactive'}
          style={{
            height: '100%',
            borderRadius: '9999px',
            width: barActive ? skill.level + '%' : '0%',
            background: 'linear-gradient(90deg, #1f6feb, #79c0ff)',
            transition: `width 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${index * 0.08}s`,
          }}
        />
      </div>
    </div>
  )
}

export default function UniverseFrontend({ onOpenTerminal }: Props) {
  const { visitorName } = useMode()
  const [bubbleOffsets, setBubbleOffsets] = useState<number[]>(BUBBLES.map(() => 0))
  const animFrameRef = useRef<number>(0)
  const startTimeRef = useRef<number>(Date.now())

  const workRef    = useRef<HTMLElement>(null)
  const skillsRef  = useRef<HTMLElement>(null)
  const aboutRef   = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  const workIn    = useInView(workRef)
  const skillsIn  = useInView(skillsRef)
  const aboutIn   = useInView(aboutRef)
  const contactIn = useInView(contactRef)

  /** Animate bubbles with sine wave — each has unique speed + amplitude */
  const animateBubbles = useCallback(() => {
    const elapsed = (Date.now() - startTimeRef.current) / 1000
    setBubbleOffsets(BUBBLES.map((b) =>
      Math.sin(elapsed * (1 / b.speed) * Math.PI * 2 + b.delay) * b.amp
    ))
    animFrameRef.current = requestAnimationFrame(animateBubbles)
  }, [])

  useEffect(() => {
    animFrameRef.current = requestAnimationFrame(animateBubbles)
    return () => cancelAnimationFrame(animFrameRef.current)
  }, [animateBubbles])

  return (
    <div className="min-h-screen bg-[#050d1a] text-[#e6edf3] overflow-x-hidden">
      <style>{`
        @keyframes marquee { from{transform:translateX(0)} to{transform:translateX(-50%)} }
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(200%)} }
        @keyframes heroFadeUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
        @keyframes heroFadeLeft { from{opacity:0;transform:translateX(-30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 0 0 0 rgba(121,192,255,0)} 50%{box-shadow:0 0 20px 4px rgba(121,192,255,0.15)} }

        .hero-badge  { animation: heroFadeLeft 0.6s ease-out 0.2s both; }
        .hero-line-1 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.3s both; }
        .hero-line-2 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
        .hero-line-3 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
        .hero-line-4 { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.75s both; }
        .hero-sub    { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.95s both; }
        .hero-cta    { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.1s both; }
        .hero-scroll { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 1.3s both; }
        .bubble-wrap { animation: heroFadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.6s both; }

        .nav-link { position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:1px; background:#79c0ff; transition:width 0.35s cubic-bezier(0.16,1,0.3,1); }
        .nav-link:hover::after { width:100%; }

        .project-card { transition: transform 0.4s cubic-bezier(0.16,1,0.3,1), border-color 0.3s, box-shadow 0.4s; }
        .project-card:hover { transform: translateY(-8px); box-shadow: 0 20px 60px rgba(121,192,255,0.08); }

        .scroll-line { animation: scrollLine 1.8s ease-in-out infinite; }
        @keyframes scrollLine { 0%{transform:translateY(-100%);opacity:0} 50%{opacity:1} 100%{transform:translateY(100%);opacity:0} }
      `}</style>

      {/* Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: 'rgba(5,13,26,0.9)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgba(121,192,255,0.08)' }}
      >
        <span className="font-black text-lg text-[#e6edf3] tracking-tight">
          ihsan<span className="text-[#79c0ff]">.</span>dev
        </span>
        <div className="hidden md:flex items-center gap-8 text-sm text-[#8b949e]">
          {['work', 'skills', 'about', 'contact'].map(item => (
            <a key={item} href={'#fe-' + item} className="nav-link hover:text-[#79c0ff] transition-colors capitalize">
              {item}
            </a>
          ))}
        </div>
        <a
          href="#fe-contact"
          className="px-5 py-2 rounded-full border border-[#79c0ff33] text-[#79c0ff] text-sm font-mono hover:bg-[#79c0ff11] hover:border-[#79c0ff66] transition-all duration-300"
          style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}
        >
          hire me
        </a>
      </nav>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center px-8 md:px-16 pt-20 overflow-hidden">
        {/* Interactive particle background */}
        <ParticleCanvas />

        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage: 'linear-gradient(#79c0ff 1px, transparent 1px), linear-gradient(90deg, #79c0ff 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />

        <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            {visitorName && (
              <div className="hero-badge inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#79c0ff22] bg-[#79c0ff08] mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#79c0ff] animate-pulse" />
                <span className="font-mono text-xs text-[#79c0ff] uppercase tracking-widest">
                  Hello, {visitorName}
                </span>
              </div>
            )}
            <h1 className="font-black leading-[0.88] tracking-tight mb-6" style={{ fontSize: 'clamp(52px, 7vw, 96px)' }}>
              <span className="hero-line-1 block text-[#e6edf3]">I craft</span>
              <span className="hero-line-2 block text-[#79c0ff]">interfaces</span>
              <span className="hero-line-3 block text-[#e6edf3]">people</span>
              <span
                className="hero-line-4 block"
                style={{ WebkitTextStroke: '2px #79c0ff', color: 'transparent' }}
              >
                love.
              </span>
            </h1>
            <p className="hero-sub text-[#8b949e] text-base md:text-lg leading-relaxed mb-10 max-w-md">
              Frontend developer · 5 years · Jakarta.<br />
              Turning designs into fast, accessible experiences.
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <a
                href="#fe-work"
                className="px-8 py-3.5 bg-[#79c0ff] text-[#050d1a] font-black rounded-full hover:bg-[#a5d6ff] transition-all duration-300 hover:scale-105 text-sm tracking-wide"
              >
                View Work
              </a>
              <a
                href="#fe-contact"
                className="px-8 py-3.5 border-2 border-[#79c0ff33] text-[#79c0ff] font-black rounded-full hover:border-[#79c0ff88] hover:bg-[#79c0ff08] transition-all duration-300 text-sm tracking-wide"
              >
                Let's Talk
              </a>
            </div>
          </div>

          {/* Floating bubbles */}
          <div className="bubble-wrap relative h-80 md:h-[420px] hidden md:block">
            {BUBBLES.map((b, i) => (
              <div
                key={b.name}
                className="absolute select-none cursor-default"
                style={{
                  left: b.x,
                  top: b.y,
                  transform: `translateY(${bubbleOffsets[i]}px) scale(${b.depth})`,
                  transition: 'transform 0.1s linear',
                  zIndex: Math.round(b.depth * 10),
                }}
              >
                <span
                  className={`inline-block px-4 py-2 rounded-full font-mono font-bold border bg-[#0d1b2e] text-[#79c0ff] ${b.size} hover:scale-115 transition-transform duration-200`}
                  style={{
                    borderColor: `rgba(121,192,255,${0.2 + b.depth * 0.15})`,
                    opacity: 0.6 + b.depth * 0.3,
                    boxShadow: `0 0 ${b.depth * 12}px rgba(121,192,255,${b.depth * 0.08})`,
                  }}
                >
                  {b.name}
                </span>
              </div>
            ))}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <p className="font-mono text-[10px] text-[#484f58] uppercase tracking-[0.3em]">my stack</p>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <span className="font-mono text-[9px] text-[#484f58] uppercase tracking-[0.4em]">scroll</span>
          <div className="w-px h-12 overflow-hidden relative bg-[#30363d] rounded-full">
            <div className="scroll-line absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-[#79c0ff] to-transparent rounded-full" />
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="py-3 overflow-hidden bg-[#0a1628] border-y border-[#79c0ff0a]">
        <div style={{ animation: 'marquee 30s linear infinite', display: 'flex', width: 'max-content' }}>
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 pr-8">
              {['HTML5', 'CSS3', 'JavaScript', 'React', 'Flutter', 'Tailwind', 'WordPress', 'Elementor', 'PHP', 'Laravel', 'Dart', 'Figma'].map(s => (
                <span key={s} className="font-mono text-[11px] text-[#79c0ff15] whitespace-nowrap uppercase tracking-[0.2em]">
                  {s} <span className="text-[#79c0ff08]">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Work */}
      <section id="fe-work" ref={workRef} className="px-8 md:px-16 py-28">
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              opacity: workIn ? 1 : 0,
              transform: workIn ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <p className="font-mono text-xs text-[#484f58] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-[#79c0ff44]" /> Selected Work
            </p>
            <h2 className="font-black text-[#e6edf3] mb-20 leading-none" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Projects that<br />
              <span className="text-[#79c0ff]">speak for themselves.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROJECTS.map((project, i) => (
              <div
                key={project.title}
                className="project-card group rounded-2xl overflow-hidden border border-[#79c0ff0a] bg-[#0a1628]"
                style={{
                  opacity: workIn ? 1 : 0,
                  transform: workIn ? 'translateY(0)' : 'translateY(60px)',
                  transition: `opacity 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s, transform 0.8s cubic-bezier(0.16,1,0.3,1) ${0.15 + i * 0.12}s`,
                }}
              >
                <div className="h-40 relative overflow-hidden bg-[#060f1e] flex items-center justify-center">
                  <span
                    className="font-black select-none"
                    style={{ fontSize: '90px', lineHeight: 1, color: 'rgba(121,192,255,0.04)' }}
                  >
                    {project.num}
                  </span>
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: 'radial-gradient(circle at 50% 50%, rgba(121,192,255,0.05) 0%, transparent 70%)' }}
                  />
                  {project.score && (
                    <div className="absolute top-4 right-4 bg-[#050d1a] border border-[#79c0ff22] rounded-xl px-3 py-2 text-center">
                      <p className="text-[10px] font-mono text-[#8b949e]">PageSpeed</p>
                      <p className="text-xl font-black text-[#79c0ff]">{project.score}</p>
                    </div>
                  )}
                  <span className="absolute bottom-3 left-4 font-mono text-[10px] text-[#484f58] bg-[#050d1a] px-2 py-0.5 rounded-full border border-[#30363d]">
                    {project.type}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-[#e6edf3] mb-2 group-hover:text-[#79c0ff] transition-colors duration-400">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#8b949e] leading-relaxed mb-4">{project.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-[#050d1a] border border-[#79c0ff15] text-[#79c0ff88]">
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

      {/* Skills */}
      <section id="fe-skills" ref={skillsRef} className="px-8 md:px-16 py-28 bg-[#030a14]">
        <div className="max-w-6xl mx-auto">
          <div
            style={{
              opacity: skillsIn ? 1 : 0,
              transform: skillsIn ? 'translateY(0)' : 'translateY(40px)',
              transition: 'opacity 0.9s cubic-bezier(0.16,1,0.3,1), transform 0.9s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <p className="font-mono text-xs text-[#484f58] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
              <span className="w-8 h-px bg-[#79c0ff44]" /> Expertise
            </p>
            <h2 className="font-black text-[#e6edf3] mb-16 leading-none" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
              Tools I use<br />
              <span className="text-[#79c0ff]">every single day.</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {SKILLS.map((skill, i) => (
              <SkillBar key={skill.name} skill={skill} index={i} active={skillsIn} />
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="fe-about" ref={aboutRef} className="px-8 md:px-16 py-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div
              style={{
                opacity: aboutIn ? 1 : 0,
                transform: aboutIn ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
              }}
            >
              <p className="font-mono text-xs text-[#484f58] uppercase tracking-[0.3em] mb-3 flex items-center gap-3">
                <span className="w-8 h-px bg-[#79c0ff44]" /> About
              </p>
              <h2 className="font-black text-[#e6edf3] mb-6 leading-none" style={{ fontSize: 'clamp(32px, 5vw, 60px)' }}>
                The person<br />
                <span className="text-[#79c0ff]">behind the code.</span>
              </h2>
              <p className="text-[#8b949e] leading-relaxed mb-4 text-sm">
                I am Ihsan Muhtadi, a frontend developer based in Jakarta, Indonesia
                with 5 years of experience building web and mobile experiences.
              </p>
              <p className="text-[#8b949e] leading-relaxed mb-10 text-sm">
                I obsess over the details — pixel-perfect layouts, smooth animations,
                accessible components, and blazing-fast load times.
              </p>
              <div className="grid grid-cols-3 gap-3 mb-10">
                {[
                  { label: 'Years',    value: '5+'  },
                  { label: 'Projects', value: '20+' },
                  { label: 'Score',    value: '95+' },
                ].map((stat, i) => (
                  <div
                    key={stat.label}
                    className="text-center p-4 rounded-xl border border-[#79c0ff0a] bg-[#0a1628]"
                    style={{
                      opacity: aboutIn ? 1 : 0,
                      transform: aboutIn ? 'translateY(0)' : 'translateY(20px)',
                      transition: `opacity 0.6s ease ${0.3 + i * 0.1}s, transform 0.6s ease ${0.3 + i * 0.1}s`,
                    }}
                  >
                    <p className="font-black text-2xl text-[#79c0ff]">{stat.value}</p>
                    <p className="text-[10px] text-[#484f58] font-mono uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { co: 'ATT Group',               role: 'Fullstack Developer', period: '2020 – Present', current: true  },
                  { co: 'PT. Batuah Infotama',     role: 'Executive Marketing', period: '2019',           current: false },
                  { co: 'PT. Carrefour Indonesia', role: 'Operations',          period: '2014',           current: false },
                ].map((job, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 p-3.5 rounded-xl border border-[#79c0ff0a] bg-[#0a1628] hover:border-[#79c0ff22] transition-all duration-300"
                    style={{
                      opacity: aboutIn ? 1 : 0,
                      transform: aboutIn ? 'translateX(0)' : 'translateX(-20px)',
                      transition: `opacity 0.6s ease ${0.4 + i * 0.1}s, transform 0.6s ease ${0.4 + i * 0.1}s, border-color 0.3s`,
                    }}
                  >
                    <div className={'w-2 h-2 rounded-full flex-shrink-0 ' + (job.current ? 'bg-[#79c0ff] animate-pulse' : 'bg-[#30363d]')} />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-xs text-[#e6edf3] truncate">{job.co}</p>
                      <p className="text-[11px] text-[#8b949e] truncate">{job.role}</p>
                    </div>
                    <span className="font-mono text-[10px] text-[#79c0ff55] flex-shrink-0">{job.period}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo */}
            <div
              style={{
                opacity: aboutIn ? 1 : 0,
                transform: aboutIn ? 'translateY(0) scale(1)' : 'translateY(60px) scale(0.95)',
                transition: 'opacity 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s, transform 1.2s cubic-bezier(0.16,1,0.3,1) 0.2s',
              }}
            >
              <div className="relative">
                <div className="aspect-[3/4] rounded-2xl border border-[#79c0ff22] bg-[#0a1628] overflow-hidden relative flex items-center justify-center">
                  <img src="/ihsan.png" alt="Ihsan Muhtadi" className="w-full h-full object-contain object-bottom" />
                  <div className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#79c0ff33]" />
                  <div className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#79c0ff33]" />
                  <div className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#79c0ff33]" />
                  <div className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#79c0ff33]" />
                </div>
                <div className="absolute -bottom-5 -right-5 bg-[#050d1a] border border-[#79c0ff22] rounded-2xl px-5 py-3 text-center">
                  <p className="font-black text-2xl text-[#79c0ff]">5+</p>
                  <p className="font-mono text-[10px] text-[#484f58] uppercase tracking-wider">years</p>
                </div>
                <div className="absolute -top-5 -left-5 bg-[#050d1a] border border-[#3fb95033] rounded-2xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#3fb950] animate-pulse" />
                    <span className="font-mono text-xs text-[#3fb950]">Open for work</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="fe-contact" ref={contactRef} className="px-8 md:px-16 py-28 bg-[#030a14]">
        <div
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: contactIn ? 1 : 0,
            transform: contactIn ? 'translateY(0)' : 'translateY(50px)',
            transition: 'opacity 1s cubic-bezier(0.16,1,0.3,1), transform 1s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <p className="font-mono text-xs text-[#484f58] uppercase tracking-[0.3em] mb-6 flex items-center justify-center gap-3">
            <span className="w-8 h-px bg-[#79c0ff44]" /> Contact <span className="w-8 h-px bg-[#79c0ff44]" />
          </p>
          <h2 className="font-black text-[#e6edf3] mb-5 leading-none" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
            Got a project?<br />
            <span className="text-[#79c0ff]">Let's build it.</span>
          </h2>
          <p className="text-[#8b949e] mb-12 max-w-sm mx-auto text-sm leading-relaxed">
            Open for freelance, full-time, and collaborations.
            Based in Jakarta — available worldwide.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <a
              href="mailto:ihsanmuhtadi@gmail.com"
              className="px-8 py-4 bg-[#79c0ff] text-[#050d1a] font-black rounded-full hover:bg-[#a5d6ff] transition-all duration-300 hover:scale-105 text-sm tracking-wide"
            >
              ihsanmuhtadi@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/ihsanmuhtadi"
              className="px-8 py-4 border-2 border-[#79c0ff33] text-[#79c0ff] font-black rounded-full hover:border-[#79c0ff77] hover:bg-[#79c0ff08] transition-all duration-300 text-sm tracking-wide"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex justify-center gap-6 text-xs font-mono text-[#484f58]">
            <span>+62 856 0604 4442</span>
            <span>·</span>
            <span>Jakarta, Indonesia</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-8 py-6 border-t border-[#79c0ff08] flex items-center justify-between bg-[#050d1a]">
        <p className="font-mono text-xs text-[#30363d]">2026 Ihsan Muhtadi</p>
        <button
          onClick={onOpenTerminal}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#30363d] bg-[#0a1628] hover:border-[#79c0ff33] transition-all duration-300 font-mono text-xs text-[#484f58] hover:text-[#79c0ff]"
        >
          <span className="w-2 h-2 rounded-full bg-[#79c0ff] animate-pulse" />
          {visitorName ? visitorName + "'s terminal" : '> terminal'}
          <span className="text-[#30363d] mx-1">·</span>
          <span>frontend</span>
        </button>
      </footer>
    </div>
  )
}
