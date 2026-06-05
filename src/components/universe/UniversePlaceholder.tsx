'use client'

import { Universe } from '@/types'
import UniverseFrontend  from './UniverseFrontend'
import UniverseBackend   from './UniverseBackend'
import UniverseFullstack from './UniverseFullstack'
import UniverseWordPress from './UniverseWordPress'
import UniverseNormal    from './UniverseNormal'

interface Props {
  universe: Universe
  visitorName: string
  onOpenTerminal: () => void
}

export default function UniversePlaceholder({ universe, onOpenTerminal }: Props) {
  switch (universe) {
    case 'frontend':
      return <UniverseFrontend  onOpenTerminal={onOpenTerminal} />
    case 'backend':
      return <UniverseBackend   onOpenTerminal={onOpenTerminal} />
    case 'fullstack':
      return <UniverseFullstack onOpenTerminal={onOpenTerminal} />
    case 'wordpress':
      return <UniverseWordPress onOpenTerminal={onOpenTerminal} />
    case 'normal':
      return <UniverseNormal    onOpenTerminal={onOpenTerminal} />
  }
}