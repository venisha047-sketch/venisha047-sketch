import { motion } from 'framer-motion'

const TIMELINE = [
  {
    era: 'Now',
    role: 'AI Implementation Specialist',
    context: 'Independent · 2024–present',
    note: 'The room every prior role was secretly preparing for.',
  },
  {
    era: '2024–2026',
    role: 'MS Data Science',
    context: 'Monroe University · New York',
    note: 'A shared vocabulary for all of it.',
  },
  {
    era: 'Prior',
    role: 'Data Analyst',
    context: 'Industry role',
    note: 'Sitting in the middle, watching both.',
  },
  {
    era: 'Earlier',
    role: 'Financial Analyst',
    context: 'Industry role',
    note: 'What customers cost and return.',
  },
  {
    era: 'Foundation',
    role: "Bachelor's in Marketing",
    context: 'Undergraduate',
    note: 'How customers think.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }

export default function AgencyFloor({ zone, onBack }) {
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
          className="zone-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <ol className="timeline" aria-label="Career timeline">
            {TIMELINE.map((step, i) => (
              <motion.li
                key={step.role}
                className="timeline-step"
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.55, delay: 0.55 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <div className="timeline-marker">
                  <span className="timeline-dot" />
                  {i < TIMELINE.length - 1 && <span className="timeline-line" />}
                </div>
                <div className="timeline-content">
                  <span className="timeline-era">{step.era}</span>
                  <strong className="timeline-role">{step.role}</strong>
                  <span className="timeline-context">{step.context}</span>
                  <p className="timeline-note">{step.note}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </motion.div>
  )
}
