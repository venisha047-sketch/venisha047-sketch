import { motion } from 'framer-motion'

export default function ZonePanel({ zone, onClose }) {
  return (
    <motion.div
      className="zone-panel-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <motion.aside
        className="zone-panel"
        style={{ '--accent': zone.accent }}
        initial={{ x: 60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 60, opacity: 0 }}
        transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label={zone.title}
      >
        <button className="close" onClick={onClose} aria-label="Close panel">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M1 1 L13 13 M13 1 L1 13"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </svg>
        </button>

        <span className="index">{zone.index}</span>
        <h3>{zone.title}</h3>
        <span className="subtitle">{zone.subtitle}</span>
        <p>{zone.description}</p>

        <div className="action" aria-disabled="true">
          {zone.action}
          <span className="arrow" aria-hidden="true" />
        </div>
      </motion.aside>
    </motion.div>
  )
}
