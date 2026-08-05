'use client'

import { motion } from 'framer-motion'
import { CloudOff, Download, Wifi, WifiOff } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import type { Lang } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

const OFFLINE_TOPICS: { emoji: string; label: Record<Lang, string> }[] = [
  { emoji: '🐄', label: { mr: 'सामान्य आजार व उपाय', hi: 'सामान्य रोग व उपाय', en: 'Common illnesses & care' } },
  { emoji: '🌾', label: { mr: 'चारा व पोषण', hi: 'चारा व पोषण', en: 'Feed & nutrition' } },
  { emoji: '🥛', label: { mr: 'दूध वाढवण्याचे उपाय', hi: 'दूध बढ़ाने के उपाय', en: 'Milk boosting tips' } },
  { emoji: '🔔', label: { mr: 'लसीकरण वेळापत्रक', hi: 'टीकाकरण समय-सारणी', en: 'Vaccination schedule' } },
  { emoji: '📞', label: { mr: 'आपत्कालीन संपर्क', hi: 'आपातकालीन संपर्क', en: 'Emergency contacts' } },
]

export function OfflineScreen({ lang, back, online }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="offline" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {/* Persistent status banner */}
        <div
          className={`flex items-center gap-3 rounded-3xl px-5 py-4 shadow-sm ring-1 ${
            online
              ? 'bg-primary/10 ring-primary/30'
              : 'bg-amber-50 ring-amber-200'
          }`}
        >
          <span
            className={`flex size-11 items-center justify-center rounded-2xl ${
              online ? 'bg-primary text-primary-foreground' : 'bg-amber-500 text-white'
            }`}
          >
            {online ? <Wifi className="size-6" /> : <WifiOff className="size-6" />}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <motion.span
                className={`size-2.5 rounded-full ${online ? 'bg-primary' : 'bg-amber-500'}`}
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY }}
              />
              <p className="text-base font-bold text-foreground">
                {online ? UI.online[lang] : UI.offline[lang]}
              </p>
            </div>
            <p className="mt-0.5 text-sm text-foreground/70 text-pretty">{UI.offlineNote[lang]}</p>
          </div>
        </div>

        {/* Offline-available topics */}
        <div className="mt-5 rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
          <div className="flex items-center gap-2">
            <CloudOff className="size-5 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              {lang === 'mr'
                ? 'ऑफलाइन उपलब्ध माहिती'
                : lang === 'hi'
                  ? 'ऑफलाइन उपलब्ध जानकारी'
                  : 'Available offline'}
            </h3>
          </div>
          <div className="mt-3 flex flex-col gap-2">
            {OFFLINE_TOPICS.map((t) => (
              <div
                key={t.emoji}
                className="flex items-center gap-3 rounded-2xl bg-secondary/50 px-4 py-3"
              >
                <span className="text-xl" aria-hidden>
                  {t.emoji}
                </span>
                <span className="text-sm font-medium text-foreground">{t.label[lang]}</span>
                <Download className="ml-auto size-4 text-primary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
