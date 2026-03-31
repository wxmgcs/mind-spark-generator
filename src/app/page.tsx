'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flashcard } from '@/components/flashcard'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react'

interface FlashcardData {
  q: string
  a: string
}

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [flashcards, setFlashcards] = useState<FlashcardData[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [showFlashcards, setShowFlashcards] = useState(false)

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert('Please enter text')
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Generation failed')
      }

      const cards = data.flashcards || []
      setFlashcards(cards)
      setShowFlashcards(true)
      setCurrentCardIndex(0)
      setIsFlipped(false)
    } catch (error) {
      console.error('Error:', error)
      alert('Generation failed: ' + (error instanceof Error ? error.message : 'Unknown error'))
    } finally {
      setIsGenerating(false)
    }
  }

  const handleReset = () => {
    setInputText('')
    setFlashcards([])
    setShowFlashcards(false)
    setIsFlipped(false)
  }

  const handlePrevious = () => {
    if (currentCardIndex > 0) {
      setIsFlipped(false)
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev - 1)
      }, 300)
    }
  }

  const handleNext = () => {
    if (currentCardIndex < flashcards.length - 1) {
      setIsFlipped(false)
      setTimeout(() => {
        setCurrentCardIndex((prev) => prev + 1)
      }, 300)
    }
  }

  if (showFlashcards && flashcards.length > 0) {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-center text-gray-900">AI Flashcard Generator</h1>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-8"
          >
            <Flashcard
              question={flashcards[currentCardIndex].q}
              answer={flashcards[currentCardIndex].a}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
            />
            <div className="flex items-center space-x-4">
              <Button
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
                variant="outline"
                size="icon"
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium text-gray-700">
                {currentCardIndex + 1} / {flashcards.length}
              </span>
              <Button
                onClick={handleNext}
                disabled={currentCardIndex === flashcards.length - 1}
                variant="outline"
                size="icon"
              >
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <Button onClick={handleReset} variant="outline">
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-center text-gray-900">AI Flashcard Generator</h1>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <div className="space-y-4">
            <label className="block text-lg font-medium text-gray-700">Input Text</label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste or enter your text content here..."
              className="min-h-[300px] resize-y text-lg p-4 border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !inputText.trim()}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white text-lg py-6 rounded-lg font-semibold"
          >
            {isGenerating ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Generating...
              </>
            ) : (
              'Generate Flashcards'
            )}
          </Button>
        </motion.div>
      </main>
    </div>
  )
}
