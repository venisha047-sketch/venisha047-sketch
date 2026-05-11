import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }

export default function Signal({ zone, onBack }) {
  return (
    <motion.div
      className="zone-interior"
      style={{ '--accent': zone.accent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="zone-interior-back" onClick={onBack} aria-label="Return to map">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M10 3 L5 8 L10 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        Map
      </button>

      <div className="zone-interior-scroll">
        <motion.div className="zone-header" variants={container} initial="hidden" animate="show">
          <motion.div className="eyebrow" variants={item}>Zone {zone.index} · {zone.title}</motion.div>
          <motion.div className="zone-tagline" variants={item}>{zone.tagline}</motion.div>
          <motion.h2 className="display zone-headline" variants={item}>{zone.headline}</motion.h2>
          <motion.p className="body zone-body" variants={item}>{zone.body}</motion.p>
          <motion.p className="zone-microcopy" variants={item}>{zone.microCopy}</motion.p>
        </motion.div>

        <motion.div
          className="zone-content signal-body"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <div className="beacon-pulse" aria-hidden="true" />

          <div className="beacon-links">
            <a
              href="mailto:venisha047@gmail.com"
              className="beacon-link primary"
              aria-label="Email Venisha"
            >
              <span className="beacon-link-icon">✉</span>
              <span className="beacon-link-label">venisha047@gmail.com</span>
            </a>
            <a
              href="https://linkedin.com/in/venisha047"
              target="_blank"
              rel="noopener noreferrer"
              className="beacon-link"
              aria-label="LinkedIn profile"
            >
              <span className="beacon-link-icon">in</span>
              <span className="beacon-link-label">LinkedIn</span>
            </a>
            <a
              href="https://github.com/venisha047"
              target="_blank"
              rel="noopener noreferrer"
              className="beacon-link"
              aria-label="GitHub profile"
            >
              <span className="beacon-link-icon">⌥</span>
              <span className="beacon-link-label">GitHub</span>
            </a>
          </div>

          <a href="mailto:venisha047@gmail.com" className="cta signal-cta">
            Send a Signal
            <span className="arrow" aria-hidden="true" />
          </a>
          <p className="cta-hint">Let&rsquo;s Build Together</p>
        </motion.div>
      </div>
    </motion.div>
  )
}
