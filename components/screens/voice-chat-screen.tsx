'use client'

import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, Mic, Square, Volume2 } from 'lucide-react'
import type { ScreenProps } from '@/components/app-shell'
import type { Lang } from '@/lib/data'
import { SCREEN_TITLES } from '@/lib/data'
import { generateReply, LANG_LABELS, QUICK_PROMPTS, UI } from '@/lib/assistant'
import { useSpeech } from '@/hooks/use-speech'

type Message = { id: number; role: 'user' | 'ai'; text: string }

export function VoiceChatScreen({ lang, setLang, back }: ScreenProps) {
  const [messages, setMessages] = useState<Message[]>([])
  const [thinking, setThinking] = useState(false)
  const idRef = useRef(1)
  const scrollRef = useRef<HTMLDivElement>(null)

  const {
    isListening,
    isSpeaking,
    transcript,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
  } = useSpeech(lang)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, thinking, transcript])

  const handleUserInput = (text: string) => {
    const clean = text.trim()
    if (!clean) return
    const userMsg: Message = { id: idRef.current++, role: 'user', text: clean }
    setMessages((m) => [...m, userMsg])
    setThinking(true)
    window.setTimeout(() => {
      const reply = generateReply(clean, lang)
      setThinking(false)
      setMessages((m) => [...m, { id: idRef.current++, role: 'ai', text: reply }])
      speak(reply)
    }, 900)
  }

  const handleMic = () => {
    if (isListening) {
      stopListening()
    } else {
      stopSpeaking()
      startListening(handleUserInput)
    }
  }

  return (
    <div className="flex flex-1 flex-col bg-secondary/30">
      {/* Header */}
      <header className="sticky top-0 z-20 bg-primary px-4 py-4 text-primary-foreground shadow-md">
        <div className="flex items-center gap-3">
          <button
            onClick={back}
            aria-label="Go back"
            className="flex size-10 items-center justify-center rounded-full bg-white/15 hover:bg-white/25 active:scale-95"
          >
            <ChevronLeft className="size-6" />
          </button>
          <h1 className="flex-1 text-lg font-semibold">{SCREEN_TITLES.voice[lang]}</h1>
        </div>
        <div className="mt-3 flex gap-2">
          {LANG_LABELS.map((l) => (
            <button
              key={l.id}
              onClick={() => setLang(l.id)}
              className={`rounded-full px-3.5 py-1 text-sm font-medium transition-all active:scale-95 ${
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

      {/* Chat area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-4 py-5">
        {messages.length === 0 && !isListening && (
          <EmptyState lang={lang} onPick={handleUserInput} />
        )}

        <div className="flex flex-col gap-3">
          {messages.map((m) => (
            <ChatBubble key={m.id} message={m} lang={lang} onSpeak={() => speak(m.text)} />
          ))}

          {/* Live transcript while listening */}
          {isListening && transcript && (
            <div className="flex justify-end">
              <div className="max-w-[80%] rounded-3xl rounded-br-md bg-primary/70 px-4 py-2.5 text-sm text-primary-foreground">
                {transcript}
              </div>
            </div>
          )}

          {thinking && (
            <div className="flex justify-start">
              <div className="flex items-center gap-1.5 rounded-3xl rounded-bl-md bg-card px-4 py-3 shadow-sm ring-1 ring-border/60">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="size-2 rounded-full bg-primary"
                    animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.9,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom control bar */}
      <div className="border-t border-border bg-card px-4 pb-6 pt-4">
        <div className="flex flex-col items-center">
          <AnimatePresence>
            {(isListening || isSpeaking) && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-3 text-sm font-medium text-primary"
              >
                {isListening ? UI.listening[lang] : UI.speaking[lang]}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="relative flex items-center justify-center">
            {isListening &&
              [0, 1].map((i) => (
                <motion.span
                  key={i}
                  className="absolute rounded-full bg-primary/30"
                  style={{ width: 72, height: 72 }}
                  animate={{ scale: [1, 2.1], opacity: [0.5, 0] }}
                  transition={{
                    duration: 1.6,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: i * 0.8,
                    ease: 'easeOut',
                  }}
                />
              ))}
            <motion.button
              onClick={handleMic}
              whileTap={{ scale: 0.92 }}
              className={`relative flex size-[72px] items-center justify-center rounded-full text-primary-foreground shadow-lg ${
                isListening ? 'bg-rose-600' : 'bg-primary'
              }`}
              aria-label={isListening ? UI.stop[lang] : UI.tapToSpeak[lang]}
            >
              {isListening ? <Square className="size-7 fill-current" /> : <Mic className="size-8" />}
            </motion.button>
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            {isListening ? UI.stop[lang] : UI.tapToSpeak[lang]}
          </p>
        </div>
      </div>
    </div>
  )
}

function ChatBubble({
  message,
  lang,
  onSpeak,
}: {
  message: Message
  lang: Lang
  onSpeak: () => void
}) {
  const isUser = message.role === 'user'
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div className={`flex max-w-[82%] flex-col gap-1 ${isUser ? 'items-end' : 'items-start'}`}>
        <span className="px-2 text-[11px] font-medium text-muted-foreground">
          {isUser ? `👨‍🌾 ${UI.you[lang]}` : `🤖 ${UI.assistant[lang]}`}
        </span>
        <div
          className={`rounded-3xl px-4 py-2.5 text-sm leading-relaxed shadow-sm ${
            isUser
              ? 'rounded-br-md bg-primary text-primary-foreground'
              : 'rounded-bl-md bg-card text-card-foreground ring-1 ring-border/60'
          }`}
        >
          {message.text}
        </div>
        {!isUser && (
          <button
            onClick={onSpeak}
            className="flex items-center gap-1 px-2 text-[11px] font-medium text-primary hover:underline"
          >
            <Volume2 className="size-3.5" />
            {UI.speaking[lang].replace('...', '')}
          </button>
        )}
      </div>
    </motion.div>
  )
}

function EmptyState({ lang, onPick }: { lang: Lang; onPick: (t: string) => void }) {
  return (
    <div className="flex flex-col items-center pt-8 text-center">
      <span className="text-5xl" aria-hidden>
        🤖
      </span>
      <p className="mt-3 max-w-[15rem] text-sm text-muted-foreground text-pretty">
        {UI.askAnything[lang]}
      </p>
      <p className="mt-6 mb-2 text-xs font-semibold text-foreground">{UI.quickHelp[lang]}</p>
      <div className="flex flex-wrap justify-center gap-2">
        {QUICK_PROMPTS[lang].map((q) => (
          <button
            key={q}
            onClick={() => onPick(q)}
            className="rounded-full bg-card px-3.5 py-1.5 text-xs font-medium text-foreground shadow-sm ring-1 ring-border/60 transition-colors hover:bg-secondary active:scale-95"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  )
}
