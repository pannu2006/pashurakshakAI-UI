'use client'

import { motion } from 'framer-motion'
import { BadgeCheck, Clock } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import { MILK_PRICES } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

export function PricesScreen({ lang, back }: ScreenProps) {
  const sorted = [...MILK_PRICES].sort((a, b) => b.price - a.price)

  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="prices" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        <div className="flex flex-col gap-3">
          {sorted.map((p, i) => (
            <motion.div
              key={p.dairy}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`rounded-3xl bg-card p-5 shadow-sm ring-1 ${
                p.best ? 'ring-2 ring-primary' : 'ring-border/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-base font-semibold text-foreground">{p.dairy}</h3>
                  <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="size-3.5" />
                    {UI.lastUpdated[lang]}: {p.updated}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">
                    ₹{p.price}
                    <span className="text-sm font-medium text-muted-foreground">/L</span>
                  </p>
                </div>
              </div>
              {p.best && (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                  <BadgeCheck className="size-4" />
                  {UI.bestPrice[lang]}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
