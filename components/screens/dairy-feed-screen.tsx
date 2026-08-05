'use client'

import { motion } from 'framer-motion'
import type { ScreenProps } from '@/components/app-shell'
import { DAIRY_CARDS } from '@/lib/data'
import { ScreenHeader } from '@/components/screen-header'

export function DairyFeedScreen({ lang, back }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="dairy" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        <div className="flex flex-col gap-3">
          {DAIRY_CARDS.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`flex gap-4 rounded-3xl p-5 shadow-sm ring-1 ring-border/60 ${card.color}`}
            >
              <span
                className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-white/70 text-3xl shadow-sm"
                aria-hidden
              >
                {card.emoji}
              </span>
              <div>
                <h3 className="text-base font-semibold text-foreground text-balance">
                  {card.title[lang]}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground/75 text-pretty">
                  {card.body[lang]}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
