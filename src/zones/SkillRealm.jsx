import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BRANCHES = [
  {
    id: 'marketing',
    label: 'Marketing',
    color: '#7CC9FF',
    degree: "Bachelor's in Marketing",
    summary: 'How humans actually decide.',
    detail: 'The front line of human behavior. Audience psychology, brand positioning, campaign strategy, and the discipline of making something land with a specific person in a specific moment. This is where the thinking about people began.',
  },
  {
    id: 'finance',
    label: 'Finance',
    color: '#FFD78A',
    degree: 'Financial Analyst',
    summary: 'How a number becomes a reason.',
    detail: 'The back office of what decisions actually cost. Modeling, forecasting, variance analysis, and the discipline of turning data into a recommendation that a business will act on. This is where quantitative reasoning hardened.',
  },
  {
    id: 'data',
    label: 'Data',
    color: '#9DB6FF',
    degree: 'Data Analyst',
    summary: 'Signal inside noise everyone gives up on.',
    detail: 'Sitting between marketing and finance, translating both. SQL, dashboards, cohort analysis, and the discipline of finding the one number that actually explains what is happening. This is where the analytical layer connected.',
  },
  {
    id: 'ai',
    label: 'AI / ML',
    color: '#E29CFF',
    degree: 'MS Data Science · Monroe University',
    summary: 'The language underneath all of it.',
    detail: 'Multi-agent systems, RAG pipelines, LLM orchestration, and the discipline of building things that run autonomously. This is where everything the other disciplines taught became infrastructure. The degree is live. The systems are already shipping.',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }

export default function SkillRealm({ zone, onBack }) {
  const [active, setActive] = useState(null)

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
          className="zone-content skill-tree"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {BRANCHES.map((branch, i) => (
            <motion.div
              key={branch.id}
              className={`skill-branch ${active === branch.id ? 'is-active' : ''}`}
              style={{ '--branch-color': branch.color }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.1 }}
            >
              <button
                className="branch-trigger"
                onClick={() => setActive(active === branch.id ? null : branch.id)}
                aria-expanded={active === branch.id}
              >
                <span className="branch-dot" style={{ background: branch.color, boxShadow: `0 0 12px ${branch.color}` }} />
                <span className="branch-label">{branch.label}</span>
                <span className="branch-summary">{branch.summary}</span>
                <span className="branch-chevron" aria-hidden="true">›</span>
              </button>

              <AnimatePresence>
                {active === branch.id && (
                  <motion.div
                    className="branch-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div className="branch-detail-inner">
                      <span className="branch-degree">{branch.degree}</span>
                      <p>{branch.detail}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
