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
    <div className="perspective-1000 w-full max-w-2xl cursor-pointer" onClick={onFlip}>
      <motion.div
        className="relative h-96 w-full transition-transform duration-700"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-white shadow-2xl"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-gray-900">问题</h3>
            <p className="text-lg text-gray-700">{question}</p>
          </CardContent>
        </div>
        <div
          className="absolute inset-0 backface-hidden rounded-2xl bg-purple-600 shadow-2xl"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <CardContent className="flex h-full flex-col items-center justify-center p-8 text-center">
            <h3 className="mb-4 text-2xl font-bold text-white">答案</h3>
            <p className="text-lg text-white">{answer}</p>
          </CardContent>
        </div>
      </motion.div>
    </div>
  )
}
