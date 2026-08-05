'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Lang, ScreenId } from '@/lib/data'
import { HomeScreen } from '@/components/screens/home-screen'
import { VoiceChatScreen } from '@/components/screens/voice-chat-screen'
import { AnimalHealthScreen } from '@/components/screens/animal-health-screen'
import { DairyFeedScreen } from '@/components/screens/dairy-feed-screen'
import { WeatherScreen } from '@/components/screens/weather-screen'
import { PricesScreen } from '@/components/screens/prices-screen'
import { SchemesScreen } from '@/components/screens/schemes-screen'
import { VaccinationScreen } from '@/components/screens/vaccination-screen'
import { EmergencyScreen } from '@/components/screens/emergency-screen'
import { OfflineScreen } from '@/components/screens/offline-screen'

export function AppShell() {
  const [screen, setScreen] = useState<ScreenId>('home')
  const [lang, setLang] = useState<Lang>('mr')
  const [online, setOnline] = useState(true)

  useEffect(() => {
    const update = () => setOnline(navigator.onLine)
    update()
    window.addEventListener('online', update)
    window.addEventListener('offline', update)
    return () => {
      window.removeEventListener('online', update)
      window.removeEventListener('offline', update)
    }
  }, [])

  const go = (s: ScreenId) => setScreen(s)
  const back = () => setScreen('home')

  const shared = { lang, setLang, go, back, online }

  return (
    <div className="flex min-h-dvh w-full justify-center bg-secondary/40">
      <div className="relative flex min-h-dvh w-full max-w-md flex-col overflow-hidden bg-background shadow-xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: screen === 'home' ? -24 : 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: screen === 'home' ? 24 : -24 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex flex-1 flex-col"
          >
            {screen === 'home' && <HomeScreen {...shared} />}
            {screen === 'voice' && <VoiceChatScreen {...shared} />}
            {screen === 'health' && <AnimalHealthScreen {...shared} />}
            {screen === 'dairy' && <DairyFeedScreen {...shared} />}
            {screen === 'weather' && <WeatherScreen {...shared} />}
            {screen === 'prices' && <PricesScreen {...shared} />}
            {screen === 'schemes' && <SchemesScreen {...shared} />}
            {screen === 'vaccination' && <VaccinationScreen {...shared} />}
            {screen === 'emergency' && <EmergencyScreen {...shared} />}
            {screen === 'offline' && <OfflineScreen {...shared} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export type ScreenProps = {
  lang: Lang
  setLang: (l: Lang) => void
  go: (s: ScreenId) => void
  back: () => void
  online: boolean
}
