import { motion } from 'framer-motion'

export default function WorldMapHub({ zones, onZoneSelect }) {
  const routePath = buildRoutePath(zones)

  return (
    <motion.section
      className="scene hub"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="map"
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.6, ease: [0.2, 0.7, 0.2, 1] }}
      />

      <motion.div
        className="header"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.4 }}
      >
        <div className="eyebrow">World Map · 03</div>
        <h2 className="display">Choose your path through the universe.</h2>
        <p className="body">
          Six zones, one connected route. Hover any node to see its name, click
          to enter. Escape returns you to the world.
        </p>
      </motion.div>

      <svg className="hub-svg" preserveAspectRatio="none" viewBox="0 0 100 100">
        <motion.path
          d={routePath}
          className="route"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.4, delay: 0.7, ease: 'easeInOut' }}
        />
      </svg>

      {zones.map((zone, i) => (
        <motion.div
          key={zone.id}
          className={`hub-hotspot ${i === 0 ? 'is-large' : ''}`}
          style={{
            left: `${zone.coords.x}%`,
            top: `${zone.coords.y}%`,
          }}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            delay: 1.0 + i * 0.18,
            ease: [0.2, 0.7, 0.2, 1],
          }}
        >
          <button
            type="button"
            onClick={() => onZoneSelect(zone.id)}
            aria-label={`Open ${zone.title}`}
          >
            <span className="ring" />
            <span className="ring delayed" />
            <span
              className="core"
              style={{
                background: zone.accent,
                boxShadow: `0 0 18px ${zone.accent}`,
              }}
            />
            <span className="label">
              <span className="num">{zone.index}</span>
              <span className="name">{zone.title}</span>
            </span>
          </button>
        </motion.div>
      ))}

      <motion.div
        className="legend"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.6 }}
      >
        <span className="key">Map key</span>
        <i style={{ background: '#7CC9FF' }} />
        <span>Knowledge</span>
        <i style={{ background: '#9DB6FF' }} />
        <span>Creation</span>
        <i style={{ background: '#7CE0FF' }} />
        <span>Collaboration</span>
        <i style={{ background: '#E29CFF' }} />
        <span>Experimentation</span>
        <i style={{ background: '#FFD78A' }} />
        <span>Connection</span>
      </motion.div>

      <motion.div
        className="you-are-here"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 1.8 }}
      >
        <div className="eyebrow">You are here</div>
        <p>Every step shapes the world. Every connection amplifies the signal.</p>
      </motion.div>
    </motion.section>
  )
}

function buildRoutePath(zones) {
  if (!zones.length) return ''
  return zones
    .map((z, i) => {
      const cmd = i === 0 ? 'M' : 'L'
      return `${cmd}${z.coords.x},${z.coords.y}`
    })
    .join(' ')
}
