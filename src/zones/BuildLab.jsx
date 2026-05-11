import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  {
    id: 'linkedin-agent',
    index: '01',
    name: 'LinkedIn Agent System',
    tagline: 'Orchestrated specialist agents for the full LinkedIn workflow.',
    stack: 'Python · LangChain · OpenAI · LinkedIn API',
    agents: ['Research Agent', 'Writing Agent', 'Scheduling Agent', 'Analytics Agent'],
    detail: 'A multi-agent system that handles the entire LinkedIn content and engagement workflow end-to-end. The Research Agent scans industry signals and identifies relevant topics. The Writing Agent drafts posts in a defined voice. The Scheduling Agent queues and publishes at optimal times. The Analytics Agent reports on what performed and why. Each agent has a single responsibility; the orchestrator manages handoffs. The result is a content operation that runs without a human in the loop.',
    status: 'Deployed',
  },
  {
    id: 'marketing-dept',
    index: '02',
    name: 'Marketing Department',
    tagline: 'A 26-agent team any founder can deploy today.',
    stack: 'Python · AutoGen · Claude API · Notion',
    agents: ['CHIEF Orchestrator', 'GUARD QA Gate', '+ 24 specialist agents across 8 tiers'],
    detail: 'A complete AI marketing department organized into eight functional tiers: strategy, research, content, SEO, social, email, analytics, and quality assurance. The CHIEF orchestrator at the top receives a campaign brief and decomposes it into tasks. Every output passes through the GUARD QA gate before it leaves the system. A founder can hand this team a product description and receive a full campaign — copy, strategy, channel plan, and performance metrics — without hiring a single marketer.',
    status: 'Deployable',
  },
  {
    id: 'paytrack',
    index: '03',
    name: 'PayTrack',
    tagline: 'The invoice tracker that knows when a client is overdue.',
    stack: 'React · Node.js · PostgreSQL · Resend',
    agents: null,
    detail: 'A purpose-built web application for freelancers and small businesses that does what spreadsheets cannot: it watches your receivables, flags overdue clients automatically, and sends follow-up nudges on a schedule you set. Built because the problem was real — every freelancer has chased a payment that a spreadsheet could not chase for them. Clean interface, fast setup, no accounting degree required. The tracker knows what is owed, by whom, and for how long.',
    status: 'Live',
  },
]

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } } }

export default function BuildLab({ zone, onBack }) {
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
          className="zone-content project-grid"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        >
          {PROJECTS.map((project, i) => (
            <motion.article
              key={project.id}
              className={`project-card ${active === project.id ? 'is-active' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.65 + i * 0.12 }}
            >
              <div className="project-card-header">
                <span className="project-index">{project.index}</span>
                <span className="project-status">{project.status}</span>
              </div>
              <h3 className="project-name">{project.name}</h3>
              <p className="project-tagline">{project.tagline}</p>

              {project.agents && (
                <ul className="project-agents" aria-label="Agents">
                  {project.agents.map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              )}

              <div className="project-stack">{project.stack}</div>

              <AnimatePresence>
                {active === project.id && (
                  <motion.p
                    className="project-detail"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.38, ease: [0.2, 0.7, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {project.detail}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                className="project-toggle"
                onClick={() => setActive(active === project.id ? null : project.id)}
                aria-expanded={active === project.id}
              >
                {active === project.id ? 'Close' : 'Read the case study'}
                <span className="arrow" aria-hidden="true" />
              </button>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
