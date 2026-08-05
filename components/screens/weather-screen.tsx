'use client'

import { motion } from 'framer-motion'
import { Droplets, MapPin, Sun, TriangleAlert } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import { WEATHER } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

export function WeatherScreen({ lang, back }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="weather" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {/* Big weather card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-hidden rounded-3xl bg-gradient-to-br from-sky-400 to-cyan-500 p-6 text-white shadow-lg"
        >
          <div className="flex items-center gap-1.5 text-sm text-white/90">
            <MapPin className="size-4" />
            {WEATHER.place}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <p className="text-6xl font-bold leading-none">{WEATHER.temp}°</p>
              <p className="mt-2 text-base font-medium">{WEATHER.condition[lang]}</p>
            </div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 40, repeat: Number.POSITIVE_INFINITY, ease: 'linear' }}
            >
              <Sun className="size-20 text-yellow-200" />
            </motion.div>
          </div>
          <div className="mt-5 flex items-center gap-2 rounded-2xl bg-white/15 px-4 py-3">
            <Droplets className="size-5" />
            <span className="text-sm font-medium">
              {UI.humidity[lang]}: {WEATHER.humidity}%
            </span>
          </div>
        </motion.div>

        {/* Heat alert */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="mt-4 rounded-3xl bg-warning/25 p-5 shadow-sm ring-1 ring-warning/40"
        >
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-warning text-warning-foreground">
              <TriangleAlert className="size-5" />
            </span>
            <h3 className="text-base font-bold text-foreground">{WEATHER.alertTitle[lang]}</h3>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-foreground/80 text-pretty">
            {WEATHER.advice[lang]}
          </p>
        </motion.div>

        {/* Livestock advice */}
        <div className="mt-4 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
          <h3 className="text-sm font-semibold text-foreground">{UI.livestockAdvice[lang]}</h3>
          <ul className="mt-3 flex flex-col gap-2">
            {[
              { mr: 'सकाळी लवकर व संध्याकाळी चारा द्या.', hi: 'सुबह जल्दी व शाम को चारा दें।', en: 'Feed early morning and evening.' },
              { mr: 'गोठ्यात हवा खेळती ठेवा.', hi: 'गौशाला में हवादार रखें।', en: 'Keep the shed well ventilated.' },
              { mr: 'थंड व स्वच्छ पाणी सतत ठेवा.', hi: 'ठंडा व साफ पानी हमेशा रखें।', en: 'Keep cool clean water available.' },
            ].map((t, i) => (
              <li key={i} className="flex gap-2 text-sm leading-relaxed text-card-foreground">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {t[lang]}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
