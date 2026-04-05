import { useState, useCallback } from 'react'
import { IntroScene } from './intro/IntroScene'
import { Dashboard } from './dashboard/Dashboard'
import { CaesarView } from './features/caesar/CaesarView'
import { AtlasView } from './features/atlas/AtlasView'
import { LabView } from './features/lab/LabView'
import { NoiseOverlay } from './components/NoiseOverlay'

export type AppState = 'intro' | 'dashboard' | 'caesar' | 'atlas' | 'lab'

export function App() {
  const [state, setState] = useState<AppState>('intro')

  const handleEnter = useCallback(() => setState('dashboard'), [])
  const handleSelect = useCallback((feature: 'caesar' | 'atlas' | 'lab') => setState(feature), [])
  const handleBack = useCallback(() => setState('dashboard'), [])

  return (
    <>
      <NoiseOverlay />
      {state === 'intro' && <IntroScene onEnter={handleEnter} />}
      {state === 'dashboard' && <Dashboard onSelect={handleSelect} />}
      {state === 'caesar' && <CaesarView onBack={handleBack} />}
      {state === 'atlas' && <AtlasView onBack={handleBack} />}
      {state === 'lab' && <LabView onBack={handleBack} />}
    </>
  )
}
