'use client'

import { motion } from 'framer-motion'
import { ArrowRight, FileText, Gift, UserCheck } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import { SCHEMES } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

export function SchemesScreen({ lang, back }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="schemes" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        <div className="flex flex-col gap-4">
          {SCHEMES.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="overflow-hidden rounded-3xl bg-card shadow-sm ring-1 ring-border/60"
            >
              <div className="bg-primary/10 px-5 py-4">
                <h3 className="text-base font-bold text-foreground text-balance">{s.name[lang]}</h3>
              </div>
              <div className="flex flex-col gap-4 px-5 py-4">
                <Row
                  icon={<Gift className="size-4" />}
                  label={UI.benefits[lang]}
                  value={s.benefit[lang]}
                  tint="bg-emerald-50 text-emerald-700"
                />
                <Row
                  icon={<UserCheck className="size-4" />}
                  label={UI.eligibility[lang]}
                  value={s.eligibility[lang]}
                  tint="bg-sky-50 text-sky-700"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
                      <FileText className="size-4" />
                    </span>
                    <span className="text-sm font-semibold text-foreground">
                      {UI.documents[lang]}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {s.documents.map((d) => (
                      <span
                        key={d}
                        className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                      >
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-md active:scale-[0.98]">
                  {UI.apply[lang]}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Row({
  icon,
  label,
  value,
  tint,
}: {
  icon: React.ReactNode
  label: string
  value: string
  tint: string
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className={`flex size-8 items-center justify-center rounded-lg ${tint}`}>{icon}</span>
        <span className="text-sm font-semibold text-foreground">{label}</span>
      </div>
      <p className="mt-1.5 pl-10 text-sm leading-relaxed text-card-foreground/80 text-pretty">
        {value}
      </p>
    </div>
  )
}
