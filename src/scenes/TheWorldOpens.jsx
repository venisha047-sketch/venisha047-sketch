import { motion } from 'framer-motion'

const ZONE_LABELS = [
  'Skill Realm',
  'Build Lab',
  'Research Tower',
  'Agency Floor',
  'Playground',
  'Signal',
]

export default function TheWorldOpens({ onContinue }) {
  return (
    <motion.section
      className="scene world"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="horizon"
        initial={{ scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.2, ease: [0.2, 0.7, 0.2, 1] }}
      />

      <motion.div
        className="island a"
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 0.55 }}
        transition={{ duration: 1.6, delay: 0.4, ease: 'easeOut' }}
      />
      <motion.div
        className="island b"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 0.45 }}
        transition={{ duration: 1.6, delay: 0.6, ease: 'easeOut' }}
      />
      <motion.div
        className="island c"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 0.4 }}
        transition={{ duration: 1.6, delay: 0.8, ease: 'easeOut' }}
      />

      <motion.div
        className="six-zones"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
      >
        {ZONE_LABELS.map((z) => (
          <span key={z}>{z}</span>
        ))}
      </motion.div>

      <motion.div
        className="copy"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1, ease: [0.2, 0.7, 0.2, 1] }}
      >
        <div className="eyebrow">The World Opens · 02</div>
        <h2 className="display">A living world of ideas, intelligence, and impact.</h2>
        <p className="body">
          Six zones lie ahead. Each holds part of the story — knowledge, shipped
          work, research, operations, experimentation, and a way to reach back.
          Move through at your own pace.
        </p>
        <button className="continue" onClick={onContinue} aria-label="Continue to world map">
          Reveal the map
          <span className="arrow" aria-hidden="true" />
        </button>
      </motion.div>
    </motion.section>
  )
}
