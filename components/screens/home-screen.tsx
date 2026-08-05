'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Mic, Wifi, WifiOff } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import { FEATURES } from '@/lib/data'
import { LANG_LABELS, UI } from '@/lib/assistant'

export function HomeScreen({ lang, setLang, go, online }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      {/* Header */}
      <header className="rounded-b-3xl bg-primary px-5 pb-6 pt-6 text-primary-foreground shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl" aria-hidden>
              🐄
            </span>
            <span className="text-xl font-bold tracking-tight">PashuRakshak AI</span>
          </div>
          <span
            className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${
              online ? 'bg-white/20' : 'bg-black/20'
            }`}
          >
            {online ? <Wifi className="size-3.5" /> : <WifiOff className="size-3.5" />}
            {online ? UI.online[lang] : UI.offline[lang]}
          </span>
        </div>

        <div className="mt-5">
          <p className="text-lg font-semibold text-balance">{UI.greetingLine1[lang]}</p>
          <p className="mt-1 text-sm text-primary-foreground/85 text-pretty">
            {UI.greetingLine2[lang]}
          </p>
        </div>

        {/* Language selector */}
        <div className="mt-4 flex gap-2">
          {LANG_LABELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                lang === l.id
                  ? 'bg-white text-primary shadow'
                  : 'bg-white/15 text-primary-foreground hover:bg-white/25'
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto no-scrollbar px-5 pb-8">
        {/* Hero */}
        <div className="relative mt-5 overflow-hidden rounded-3xl shadow-md">
          <Image
            src="/healthy-cows-hero.png"
            alt="Healthy cows and buffalo grazing on a green farm"
            width={640}
            height={360}
            priority
            className="h-44 w-full object-cover"
          />
        </div>

        {/* Mic button */}
        <div className="mt-6 flex flex-col items-center">
          <motion.button
            onClick={() => go('voice')}
            whileTap={{ scale: 0.94 }}
            className="relative flex size-28 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl"
            aria-label={UI.tapToSpeak[lang]}
          >
            <motion.span
              className="absolute inset-0 rounded-full bg-primary/40"
              animate={{ scale: [1, 1.35, 1], opacity: [0.6, 0, 0.6] }}
              transition={{ duration: 2.2, repeat: Number.POSITIVE_INFINITY, ease: 'easeOut' }}
            />
            <Mic className="size-11" />
          </motion.button>
          <p className="mt-3 text-base font-semibold text-foreground">{UI.tapToSpeak[lang]}</p>
          <p className="text-xs text-muted-foreground">{UI.askAnything[lang]}</p>
        </div>

        {/* Feature grid */}
        <div className="mt-7 grid grid-cols-3 gap-3">
          {FEATURES.map((f, i) => (
            <motion.button
              key={`${f.id}-${i}`}
              onClick={() => go(f.id)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i, duration: 0.3 }}
              whileTap={{ scale: 0.95 }}
              className="flex flex-col items-center gap-2 rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border/60 transition-shadow hover:shadow-md"
            >
              <span
                className={`flex size-12 items-center justify-center rounded-2xl text-2xl ${f.color}`}
                aria-hidden
              >
                {f.emoji}
              </span>
              <span className="text-center text-xs font-medium leading-tight text-card-foreground text-balance">
                {f.labels[lang]}
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}
