'use client'

import { ChevronLeft } from 'lucide-react'
import type { Lang, ScreenId } from '@/lib/data'
import { SCREEN_TITLES } from '@/lib/data'

export function ScreenHeader({
  screen,
  lang,
  onBack,
}: {
  screen: ScreenId
  lang: Lang
  onBack: () => void
}) {
  return (
    <header className="sticky top-0 z-20 flex items-center gap-3 bg-primary px-4 py-4 text-primary-foreground shadow-md">
      <button
        onClick={onBack}
        aria-label="Go back"
        className="flex size-10 items-center justify-center rounded-full bg-white/15 transition-colors hover:bg-white/25 active:scale-95"
      >
        <ChevronLeft className="size-6" />
      </button>
      <h1 className="text-lg font-semibold text-balance">{SCREEN_TITLES[screen][lang]}</h1>
    </header>
  )
}
