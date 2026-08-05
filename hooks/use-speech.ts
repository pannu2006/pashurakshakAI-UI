'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import type { Lang } from '@/lib/data'
import { SPEECH_LOCALE } from '@/lib/assistant'

// Minimal typings for the Web Speech API (not in standard lib.dom types)
type SpeechRecognitionResultLike = {
  0: { transcript: string }
  isFinal: boolean
}
type SpeechRecognitionEventLike = {
  resultIndex: number
  results: { length: number; [i: number]: SpeechRecognitionResultLike }
}
type SpeechRecognitionLike = {
  lang: string
  continuous: boolean
  interimResults: boolean
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((e: SpeechRecognitionEventLike) => void) | null
  onend: (() => void) | null
  onerror: ((e: unknown) => void) | null
}

function getRecognitionCtor(): (new () => SpeechRecognitionLike) | null {
  if (typeof window === 'undefined') return null
  const w = window as unknown as {
    SpeechRecognition?: new () => SpeechRecognitionLike
    webkitSpeechRecognition?: new () => SpeechRecognitionLike
  }
  return w.SpeechRecognition ?? w.webkitSpeechRecognition ?? null
}

export function useSpeech(lang: Lang) {
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported, setSupported] = useState(true)

  const recognitionRef = useRef<SpeechRecognitionLike | null>(null)
  const finalRef = useRef('')
  const onFinalRef = useRef<((text: string) => void) | null>(null)

  useEffect(() => {
    const Ctor = getRecognitionCtor()
    const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined
    setSupported(Boolean(Ctor) || Boolean(synth))
    return () => {
      try {
        recognitionRef.current?.abort()
        synth?.cancel()
      } catch {
        /* noop */
      }
    }
  }, [])

  const stopListening = useCallback(() => {
    try {
      recognitionRef.current?.stop()
    } catch {
      /* noop */
    }
    setIsListening(false)
  }, [])

  const startListening = useCallback(
    (onFinal?: (text: string) => void) => {
      const Ctor = getRecognitionCtor()
      if (!Ctor) {
        setSupported(false)
        return
      }
      // Cancel any ongoing speech so the mic doesn't capture it
      try {
        window.speechSynthesis?.cancel()
      } catch {
        /* noop */
      }
      setIsSpeaking(false)

      const recognition = new Ctor()
      recognition.lang = SPEECH_LOCALE[lang]
      recognition.continuous = false
      recognition.interimResults = true
      finalRef.current = ''
      onFinalRef.current = onFinal ?? null
      setTranscript('')

      recognition.onresult = (e) => {
        let interim = ''
        let finalText = ''
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i]
          if (res.isFinal) finalText += res[0].transcript
          else interim += res[0].transcript
        }
        if (finalText) finalRef.current += finalText
        setTranscript((finalRef.current + interim).trim())
      }
      recognition.onerror = () => {
        setIsListening(false)
      }
      recognition.onend = () => {
        setIsListening(false)
        const result = finalRef.current.trim()
        if (result && onFinalRef.current) onFinalRef.current(result)
      }

      recognitionRef.current = recognition
      try {
        recognition.start()
        setIsListening(true)
      } catch {
        setIsListening(false)
      }
    },
    [lang],
  )

  const speak = useCallback(
    (text: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return
      const synth = window.speechSynthesis
      synth.cancel()
      const utter = new SpeechSynthesisUtterance(text)
      utter.lang = SPEECH_LOCALE[lang]
      utter.rate = 0.95
      utter.pitch = 1
      const voices = synth.getVoices()
      const match = voices.find((v) => v.lang === SPEECH_LOCALE[lang]) ??
        voices.find((v) => v.lang.startsWith(lang))
      if (match) utter.voice = match
      utter.onstart = () => setIsSpeaking(true)
      utter.onend = () => setIsSpeaking(false)
      utter.onerror = () => setIsSpeaking(false)
      synth.speak(utter)
    },
    [lang],
  )

  const stopSpeaking = useCallback(() => {
    try {
      window.speechSynthesis?.cancel()
    } catch {
      /* noop */
    }
    setIsSpeaking(false)
  }, [])

  return {
    isListening,
    isSpeaking,
    transcript,
    supported,
    startListening,
    stopListening,
    speak,
    stopSpeaking,
    setTranscript,
  }
}
