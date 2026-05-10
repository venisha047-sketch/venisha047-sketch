import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import TheDoor from './scenes/TheDoor.jsx'
import TheWorldOpens from './scenes/TheWorldOpens.jsx'
import WorldMapHub from './scenes/WorldMapHub.jsx'
import StarField from './components/StarField.jsx'
import SkillRealm from './zones/SkillRealm.jsx'
import BuildLab from './zones/BuildLab.jsx'
import ResearchTower from './zones/ResearchTower.jsx'
import AgencyFloor from './zones/AgencyFloor.jsx'
import Playground from './zones/Playground.jsx'
import Signal from './zones/Signal.jsx'
import { zones } from './data/zones.js'

const ZONE_COMPONENTS = {
  'skill-realm': SkillRealm,
  'build-lab': BuildLab,
  'research-tower': ResearchTower,
  'agency-floor': AgencyFloor,
  'playground': Playground,
  'signal': Signal,
}

export default function App() {
  const [scene, setScene] = useState('door')
  const [activeZoneId, setActiveZoneId] = useState(null)

  const activeZone = useMemo(
    () => zones.find((z) => z.id === activeZoneId) || null,
    [activeZoneId],
  )

  const goToZone = (id) => {
    setActiveZoneId(id)
    setScene('zone')
  }

  const leaveZone = () => {
    setScene('hub')
    setActiveZoneId(null)
  }

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (scene === 'zone') leaveZone()
        else if (scene === 'hub') setScene('world')
        else if (scene === 'world') setScene('door')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [scene])

  const goNext = () => {
    if (scene === 'door') setScene('world')
    else if (scene === 'world') setScene('hub')
  }

  const ZoneComponent = activeZoneId ? ZONE_COMPONENTS[activeZoneId] : null

  return (
    <div className="universe">
      <StarField />

      <AnimatePresence mode="wait">
        {scene === 'door' && <TheDoor key="door" onEnter={goNext} />}
        {scene === 'world' && <TheWorldOpens key="world" onContinue={goNext} />}
        {scene === 'hub' && (
          <WorldMapHub
            key="hub"
            zones={zones}
            onZoneEnter={goToZone}
          />
        )}
      </AnimatePresence>

      {scene !== 'zone' && <SceneNav scene={scene} setScene={setScene} />}

      <AnimatePresence mode="wait">
        {scene === 'zone' && ZoneComponent && activeZone && (
          <ZoneComponent
            key={activeZoneId}
            zone={activeZone}
            onBack={leaveZone}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

function SceneNav({ scene, setScene }) {
  return (
    <nav className="scene-nav" aria-label="Universe navigation">
      <button
        className={scene === 'door' ? 'is-active' : ''}
        onClick={() => setScene('door')}
        aria-label="Return to Threshold"
      >
        <span className="dot" />
        <span className="label">Threshold</span>
      </button>
      <button
        className={scene === 'world' ? 'is-active' : ''}
        onClick={() => setScene('world')}
        aria-label="Return to The World"
      >
        <span className="dot" />
        <span className="label">World</span>
      </button>
      <button
        className={scene === 'hub' ? 'is-active' : ''}
        onClick={() => setScene('hub')}
        aria-label="Open the world map"
      >
        <span className="dot" />
        <span className="label">Map</span>
      </button>
    </nav>
  )
}
