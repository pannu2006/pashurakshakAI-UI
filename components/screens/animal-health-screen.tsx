'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Leaf, ListChecks, Phone, Stethoscope } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import type { EmergencyLevel, HealthResult, Lang } from '@/lib/data'
import { analyzeSymptoms, ANIMAL_TYPES, COMMON_SYMPTOMS } from '@/lib/data'
import { UI } from '@/lib/assistant'
import { ScreenHeader } from '@/components/screen-header'

const LEVEL_STYLES: Record<EmergencyLevel, { bar: string; label: Record<Lang, string> }> = {
  low: {
    bar: 'bg-emerald-500',
    label: { mr: 'कमी', hi: 'कम', en: 'Low' },
  },
  medium: {
    bar: 'bg-amber-500',
    label: { mr: 'मध्यम', hi: 'मध्यम', en: 'Medium' },
  },
  high: {
    bar: 'bg-rose-600',
    label: { mr: 'गंभीर', hi: 'गंभीर', en: 'High' },
  },
}

export function AnimalHealthScreen({ lang, back }: ScreenProps) {
  const [animal, setAnimal] = useState(ANIMAL_TYPES[0])
  const [symptoms, setSymptoms] = useState('')
  const [result, setResult] = useState<HealthResult | null>(null)

  const toggleSymptom = (s: string) => {
    setSymptoms((prev) => {
      const parts = prev.split(',').map((p) => p.trim()).filter(Boolean)
      if (parts.includes(s)) return parts.filter((p) => p !== s).join(', ')
      return [...parts, s].join(', ')
    })
  }

  const selected = symptoms.split(',').map((p) => p.trim())

  return (
    <div className="flex flex-1 flex-col bg-background">
      <ScreenHeader screen="health" lang={lang} onBack={back} />

      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {/* Input card */}
        <div className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
          <label className="text-sm font-semibold text-foreground">{UI.animalType[lang]}</label>
          <div className="mt-2 flex flex-wrap gap-2">
            {ANIMAL_TYPES.map((a) => (
              <button
                key={a}
                onClick={() => setAnimal(a)}
                className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all active:scale-95 ${
                  animal === a
                    ? 'bg-primary text-primary-foreground shadow'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          <label className="mt-5 block text-sm font-semibold text-foreground">
            {UI.symptoms[lang]}
          </label>
          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            rows={2}
            placeholder="e.g. fever, not eating, mouth blisters"
            className="mt-2 w-full resize-none rounded-2xl border border-input bg-background px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {COMMON_SYMPTOMS.map((s) => (
              <button
                key={s}
                onClick={() => toggleSymptom(s)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-all active:scale-95 ${
                  selected.includes(s)
                    ? 'bg-primary/15 text-primary ring-1 ring-primary/30'
                    : 'bg-secondary text-secondary-foreground'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            onClick={() => setResult(analyzeSymptoms(animal, symptoms))}
            disabled={!symptoms.trim()}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-md transition-all active:scale-[0.98] disabled:opacity-50"
          >
            <Stethoscope className="size-5" />
            {UI.checkHealth[lang]}
          </button>
        </div>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex flex-col gap-3"
          >
            {result.level === 'high' && (
              <div className="flex items-center gap-3 rounded-3xl bg-destructive px-5 py-4 text-destructive-foreground shadow-md">
                <AlertTriangle className="size-6 shrink-0" />
                <span className="text-sm font-semibold text-balance">{UI.contactVet[lang]}</span>
              </div>
            )}

            <ResultCard
              icon={<ListChecks className="size-5" />}
              title={UI.possibleCauses[lang]}
              items={result.causes}
              tint="bg-indigo-50 text-indigo-700"
            />
            <ResultCard
              icon={<AlertTriangle className="size-5" />}
              title={UI.precautions[lang]}
              items={result.precautions}
              tint="bg-amber-50 text-amber-700"
            />
            <ResultCard
              icon={<Leaf className="size-5" />}
              title={UI.recommendedFeed[lang]}
              items={result.feed}
              tint="bg-emerald-50 text-emerald-700"
            />

            {/* Emergency level meter */}
            <div className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-foreground">
                  {UI.emergencyLevel[lang]}
                </span>
                <span className="text-sm font-bold text-foreground">
                  {LEVEL_STYLES[result.level].label[lang]}
                </span>
              </div>
              <div className="mt-3 flex gap-1.5">
                {(['low', 'medium', 'high'] as EmergencyLevel[]).map((lvl, i) => {
                  const active =
                    (result.level === 'low' && i === 0) ||
                    (result.level === 'medium' && i <= 1) ||
                    result.level === 'high'
                  return (
                    <div
                      key={lvl}
                      className={`h-2.5 flex-1 rounded-full ${
                        active ? LEVEL_STYLES[result.level].bar : 'bg-secondary'
                      }`}
                    />
                  )
                })}
              </div>
            </div>

            {result.level !== 'low' && (
              <a
                href="tel:18002330418"
                className="flex items-center justify-center gap-2 rounded-2xl bg-primary py-3.5 text-base font-semibold text-primary-foreground shadow-md active:scale-[0.98]"
              >
                <Phone className="size-5" />
                {UI.contactVet[lang].replace('🚨 ', '')}
              </a>
            )}
          </motion.div>
        )}

        {/* Disclaimer */}
        <p className="mt-5 rounded-2xl bg-secondary/60 px-4 py-3 text-center text-xs leading-relaxed text-muted-foreground text-pretty">
          {UI.disclaimer[lang]}
        </p>
      </div>
    </div>
  )
}

function ResultCard({
  icon,
  title,
  items,
  tint,
}: {
  icon: React.ReactNode
  title: string
  items: string[]
  tint: string
}) {
  return (
    <div className="rounded-3xl bg-card p-5 shadow-sm ring-1 ring-border/60">
      <div className="flex items-center gap-2">
        <span className={`flex size-9 items-center justify-center rounded-xl ${tint}`}>{icon}</span>
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      </div>
      <ul className="mt-3 flex flex-col gap-2">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-sm leading-relaxed text-card-foreground">
            <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
            {it}
          </li>
        ))}
      </ul>
    </div>
  )
}
