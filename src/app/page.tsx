'use client'

import { useMode } from '@/lib/context'
import TerminalWindow from '@/components/terminal/TerminalWindow'
import UIView from '@/components/ui/UIView'
import ModeToggle from '@/components/ui/ModeToggle'

export default function Home() {
  const { mode } = useMode()

  return (
    <main className="min-h-screen bg-[#0d1117] flex flex-col items-center justify-center p-4 md:p-8">

      {/* Mode toggle — pojok kanan atas */}
      <div className="w-full max-w-3xl flex justify-end mb-4">
        <ModeToggle />
      </div>

      {/* Konten utama */}
      {mode === 'terminal' ? <TerminalWindow /> : <UIView />}

    </main>
  )
}