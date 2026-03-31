'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'

interface FlashcardProps {
  question: string
  answer: string
  isFlipped: boolean
  onFlip: () => void
}

export function Flashcard({ question, answer, isFlipped, onFlip }: FlashcardProps) {
  return (
    <div className="perspective-1000 w-full max-w-2xl cursor-pointer card-hover" onClick={onFlip}>
      <motion.div
        className="relative h-96 w-full transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-white shadow-2xl border border-border"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-primary/10 text-primary">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-gray-900">Question</h3>
            <p className="text-lg text-gray-700 max-w-md">{question}</p>
          </CardContent>
        </div>
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-primary shadow-2xl border border-primary/20"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 mb-6 rounded-full bg-white/20 text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="mb-4 text-2xl font-bold text-white">Answer</h3>
            <p className="text-lg text-white max-w-md">{answer}</p>
          </CardContent>
        </div>
      </motion.div>
    </div>
  )
}
