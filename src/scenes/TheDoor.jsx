import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

export default function TheDoor({ onEnter }) {
  const archRef = useRef(null)
  const glowRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        archRef.current,
        { scale: 0.92, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.6, ease: 'power3.out' },
      )
      gsap.fromTo(
        glowRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 2.2, ease: 'power2.out' },
      )
    })
    return () => ctx.revert()
  }, [])

  const handleEnter = () => {
    const tl = gsap.timeline({
      onComplete: onEnter,
    })
    tl.to(archRef.current, {
      scale: 1.18,
      duration: 0.9,
      ease: 'power2.in',
    })
    tl.to(
      glowRef.current,
      { opacity: 1.4, duration: 0.9, ease: 'power2.in' },
      0,
    )
    tl.to(
      '.door',
      { opacity: 0, duration: 0.5, ease: 'power1.inOut' },
      0.5,
    )
  }

  return (
    <motion.section
      className="scene door"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="copy"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, delay: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="eyebrow">The AI Universe · 01</div>
        <h1 className="display">Venisha Trivedi</h1>
        <div className="role">
          <span>AI Agents Builder</span>
          <span>MS &rsquo;26</span>
          <span>New York</span>
        </div>
        <blockquote>
          Every journey begins with a choice. Step through. Everything changes.
        </blockquote>
        <button className="cta" onClick={handleEnter} aria-label="Open the universe">
          Open the Universe
          <span className="arrow" aria-hidden="true" />
        </button>
        <div className="cta-hint">Press Enter or click to begin</div>
      </motion.div>

      <div className="portal" ref={archRef}>
        <div className="portal-glow" ref={glowRef} />
        <div className="arch">
          <div className="light-sweep" />
          <div className="runes" aria-hidden="true">
            <RuneSVG />
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function RuneSVG() {
  return (
    <svg viewBox="0 0 200 320" preserveAspectRatio="none">
      <g
        stroke="rgba(124, 218, 255, 0.55)"
        strokeWidth="0.8"
        fill="none"
      >
        <circle cx="100" cy="80" r="38" />
        <circle cx="100" cy="80" r="26" opacity="0.6" />
        <path d="M62 80 L138 80 M100 42 L100 118" />
        <path d="M74 54 L126 106 M126 54 L74 106" opacity="0.45" />
        <circle cx="100" cy="220" r="16" opacity="0.55" />
        <path d="M84 220 L116 220 M100 204 L100 236" opacity="0.55" />
      </g>
    </svg>
  )
}
