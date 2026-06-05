import { useCallback, useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import TheDoor from './scenes/TheDoor.jsx'
import TheWorldOpens from './scenes/TheWorldOpens.jsx'
import WorldMapHub from './scenes/WorldMapHub.jsx'
import StarField from './components/StarField.jsx'
import ZonePanel from './components/ZonePanel.jsx'
import { zones } from './data/zones.js'

const SCENES = ['door', 'world', 'hub']

export default function App() {
  const [scene, setScene] = useState('door')
  const [direction, setDirection] = useState(1)
  const [activeZoneId, setActiveZoneId] = useState(null)

  const activeZone = useMemo(
    () => zones.find((z) => z.id === activeZoneId) || null,
    [activeZoneId],
  )

  const navigateTo = useCallback(
    (nextScene) => {
      const cur = SCENES.indexOf(scene)
      const next = SCENES.indexOf(nextScene)
      setDirection(next >= cur ? 1 : -1)
      setScene(nextScene)
    },
    [scene],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (activeZoneId) setActiveZoneId(null)
        else if (scene === 'hub') navigateTo('world')
        else if (scene === 'world') navigateTo('door')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scene, activeZoneId, navigateTo])

  const goNext = () => {
    const i = SCENES.indexOf(scene)
    if (i < SCENES.length - 1) navigateTo(SCENES[i + 1])
  }

  return (
    <div className="universe">
      <StarField />

      <AnimatePresence mode="wait" custom={direction}>
        {scene === 'door' && (
          <TheDoor key="door" direction={direction} onEnter={goNext} />
        )}
        {scene === 'world' && (
          <TheWorldOpens key="world" direction={direction} onContinue={goNext} />
        )}
        {scene === 'hub' && (
          <WorldMapHub
            key="hub"
            direction={direction}
            zones={zones}
            onZoneSelect={(id) => setActiveZoneId(id)}
          />
        )}
      </AnimatePresence>

      <SceneNav scene={scene} navigateTo={navigateTo} />

      <AnimatePresence>
        {activeZone && (
          <ZonePanel
            key={activeZone.id}
            zone={activeZone}
            onClose={() => setActiveZoneId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function SceneNav({ scene, navigateTo }) {
  return (
    <nav className="scene-nav" aria-label="Universe navigation">
      <button
        className={scene === 'door' ? 'is-active' : ''}
        onClick={() => navigateTo('door')}
        aria-label="Return to The Door"
      >
        <span className="dot" />
        <span className="label">The Door</span>
      </button>
      <button
        className={scene === 'world' ? 'is-active' : ''}
        onClick={() => navigateTo('world')}
        aria-label="Return to The World Opens"
      >
        <span className="dot" />
        <span className="label">The World Opens</span>
      </button>
      <button
        className={scene === 'hub' ? 'is-active' : ''}
        onClick={() => navigateTo('hub')}
        aria-label="Open the world map hub"
      >
        <span className="dot" />
        <span className="label">World Map</span>
      </button>
    </nav>
  )
}
