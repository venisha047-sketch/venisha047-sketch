import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PAPER = {
  title: 'Supply Chain Optimization Under Uncertainty',
  level: "Master's-level research",
  field: 'Data Science · Operations Research',
  question: 'How do stochastic demand patterns and supplier variability compound across multi-tier supply chains, and what optimization strategies reduce systemic risk without sacrificing throughput?',
  framing: 'Traditional supply chain models assume deterministic demand and reliable suppliers. This research challenges that assumption by modeling real-world variability — seasonal demand spikes, supplier lead-time distributions, and cascading disruption effects — as input parameters rather than edge cases.',
  methodology: 'Monte Carlo simulation across 10,000 demand scenarios. Mixed-integer programming for inventory optimization. Sensitivity analysis on supplier reliability thresholds. Validation against historical disruption data.',
  reasoning: 'The chain of reasoning runs: observe variability → quantify its compounding effects tier-by-tier → model the optimization problem → identify which variables move the needle most → translate findings into policy recommendations a logistics manager can actually use.',
  finding: 'Safety stock positioning at Tier-2 suppliers outperforms end-node buffering in 73% of simulated disruption scenarios. Demand signal sharing across tiers reduces total system variance by up to 41%.',
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }

export default function ResearchTower({ zone, onBack }) {
  const [expanded, setExpanded] = useState(false)

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
          className="zone-content research-shelf"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          <article className="research-paper">
            <header className="paper-header">
              <span className="paper-level">{PAPER.level}</span>
              <span className="paper-field">{PAPER.field}</span>
              <h3 className="paper-title">{PAPER.title}</h3>
            </header>

            <div className="paper-section">
              <span className="paper-label">The Question</span>
              <p className="paper-text">{PAPER.question}</p>
            </div>

            <div className="paper-section">
              <span className="paper-label">The Framing</span>
              <p className="paper-text">{PAPER.framing}</p>
            </div>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                  style={{ overflow: 'hidden' }}
                >
                  <div className="paper-section">
                    <span className="paper-label">Methodology</span>
                    <p className="paper-text">{PAPER.methodology}</p>
                  </div>
                  <div className="paper-section">
                    <span className="paper-label">Chain of Reasoning</span>
                    <p className="paper-text">{PAPER.reasoning}</p>
                  </div>
                  <div className="paper-section paper-finding">
                    <span className="paper-label">Key Finding</span>
                    <p className="paper-text">{PAPER.finding}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              className="paper-toggle"
              onClick={() => setExpanded((v) => !v)}
              aria-expanded={expanded}
            >
              {expanded ? 'Close' : 'Read the paper'}
              <span className="arrow" aria-hidden="true" style={{ transform: expanded ? 'rotate(90deg)' : undefined }} />
            </button>
          </article>
        </motion.div>
      </div>
    </motion.div>
  )
}
