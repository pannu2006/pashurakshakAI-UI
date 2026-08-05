'use client'

import { motion } from 'framer-motion'
import { CalendarClock, Check, Syringe } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import { VACCINES } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

export function VaccinationScreen({ lang, back }: ScreenProps) {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="vaccination" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        <div className="relative pl-6">
          {/* Timeline line */}
          <div className="absolute bottom-2 left-[10px] top-2 w-0.5 bg-border" />

          <div className="flex flex-col gap-4">
            {VACCINES.map((v, i) => {
              const done = v.status === 'done'
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className="relative"
                >
                  {/* Node */}
                  <span
                    className={`absolute -left-6 top-4 flex size-5 items-center justify-center rounded-full ring-4 ring-background ${
                      done ? 'bg-emerald-500' : 'bg-amber-500'
                    }`}
                  >
                    {done && <Check className="size-3 text-white" />}
                  </span>

                  <div
                    className={`rounded-3xl p-4 shadow-sm ring-1 ${
                      done
                        ? 'bg-emerald-50 ring-emerald-200'
                        : 'bg-amber-50 ring-amber-200'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-foreground">{v.animal}</h3>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${
                          done
                            ? 'bg-emerald-500 text-white'
                            : 'bg-amber-500 text-white'
                        }`}
                      >
                        {done ? UI.completed[lang] : UI.upcoming[lang]}
                      </span>
                    </div>
                    <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-foreground/80">
                      <Syringe className="size-4" />
                      {v.vaccine}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <CalendarClock className="size-3.5" />
                      {UI.dueDate[lang]}: {v.date}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
