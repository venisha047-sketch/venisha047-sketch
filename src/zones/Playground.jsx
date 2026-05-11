import { useState } from 'react'
import { motion } from 'framer-motion'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
}
const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.2, 0.7, 0.2, 1] } },
}

function useTool(endpoint) {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const run = async () => {
    if (!input.trim()) return
    setLoading(true)
    setOutput('')
    setError('')
    try {
      const res = await fetch(endpoint.path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [endpoint.bodyKey]: input }),
      })
      const data = await res.json()
      if (!res.ok) {
        if (res.status === 503) {
          setError(data.hint || 'API key not configured. Add ANTHROPIC_API_KEY to .env and run: npm run server')
        } else {
          setError(data.error || 'Something went wrong.')
        }
      } else {
        setOutput(data.result)
      }
    } catch {
      setError('Could not reach the API server. Run: npm run dev:all')
    } finally {
      setLoading(false)
    }
  }

  return { input, setInput, output, loading, error, run }
}

function ToolPanel({ label, philosophy, placeholder, buttonText, endpoint, index }) {
  const { input, setInput, output, loading, error, run } = useTool(endpoint)

  const handleKey = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') run()
  }

  return (
    <motion.div
      className="tool-panel"
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.15 }}
    >
      <div className="tool-header">
        <span className="tool-philosophy">{philosophy}</span>
        <h3 className="tool-label">{label}</h3>
      </div>

      <div className="tool-body">
        <textarea
          className="tool-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          rows={4}
          aria-label={label}
        />
        <button
          className="tool-run"
          onClick={run}
          disabled={loading || !input.trim()}
          aria-label={`Run ${label}`}
        >
          {loading ? (
            <span className="tool-spinner" aria-label="Thinking…" />
          ) : (
            <>
              {buttonText}
              <span className="arrow" aria-hidden="true" />
            </>
          )}
        </button>

        {error && (
          <div className="tool-error" role="alert">
            <strong>Setup needed:</strong> {error}
          </div>
        )}

        {output && !error && (
          <div className="tool-output" aria-live="polite">
            <pre className="tool-result">{output}</pre>
          </div>
        )}
      </div>

      <p className="tool-hint">⌘↵ to run</p>
    </motion.div>
  )
}

const TOOLS = [
  {
    label: 'Prompt Optimizer',
    philosophy: 'Craft',
    placeholder: 'Paste any prompt here…',
    buttonText: 'Optimize it',
    endpoint: { path: '/api/optimize', bodyKey: 'prompt' },
  },
  {
    label: 'AI Use-Case Finder',
    philosophy: 'Strategy',
    placeholder: 'Describe your business…',
    buttonText: 'Find use cases',
    endpoint: { path: '/api/usecases', bodyKey: 'business' },
  },
  {
    label: 'AI Workflow Architect',
    philosophy: 'Systems',
    placeholder: 'Name a role or process…',
    buttonText: 'Build the workflow',
    endpoint: { path: '/api/workflow', bodyKey: 'process' },
  },
]

export default function Playground({ zone, onBack }) {
  return (
    <motion.div
      className="zone-interior zone-interior--playground"
      style={{ '--accent': zone.accent }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button className="zone-interior-back" onClick={onBack} aria-label="Return to map">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M10 3 L5 8 L10 13"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Map
      </button>

      <div className="zone-interior-scroll">
        <motion.div className="zone-header" variants={container} initial="hidden" animate="show">
          <motion.div className="eyebrow" variants={item}>
            Zone {zone.index} · {zone.title}
          </motion.div>
          <motion.div className="zone-tagline" variants={item}>
            {zone.tagline}
          </motion.div>
          <motion.h2 className="display zone-headline" variants={item}>
            {zone.headline}
          </motion.h2>
          <motion.p className="body zone-body" variants={item}>
            {zone.body}
          </motion.p>
          <motion.p className="zone-microcopy" variants={item}>
            {zone.microCopy}
          </motion.p>
        </motion.div>

        <div className="zone-content playground-grid">
          {TOOLS.map((tool, i) => (
            <ToolPanel key={tool.label} {...tool} index={i} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
