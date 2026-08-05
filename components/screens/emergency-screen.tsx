'use client'

import { motion } from 'framer-motion'
import { Phone, Siren } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import { EMERGENCY_CONTACTS } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

export function EmergencyScreen({ lang, back }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="emergency" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {/* Full-width red emergency banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex items-center gap-4 rounded-3xl bg-destructive px-5 py-5 text-destructive-foreground shadow-lg"
        >
          <motion.span
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 1.2, repeat: Number.POSITIVE_INFINITY }}
            className="flex size-12 items-center justify-center rounded-2xl bg-white/20"
          >
            <Siren className="size-7" />
          </motion.span>
          <div>
            <p className="text-lg font-bold">{UI.contactVet[lang].replace('🚨 ', '')}</p>
            <p className="text-sm text-destructive-foreground/85 text-pretty">
              {UI.disclaimer[lang]}
            </p>
          </div>
        </motion.div>

        {/* Large call buttons */}
        <div className="mt-5 flex flex-col gap-3">
          {EMERGENCY_CONTACTS.map((c, i) => (
            <motion.a
              key={c.phone}
              href={`tel:${c.phone}`}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center gap-4 rounded-3xl px-5 py-5 shadow-md ${c.color}`}
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white/20 text-2xl">
                {c.emoji}
              </span>
              <div className="flex-1">
                <p className="text-base font-semibold">{c.label[lang]}</p>
                <p className="text-sm opacity-85">{c.phone}</p>
              </div>
              <Phone className="size-5" />
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
