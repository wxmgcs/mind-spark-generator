'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Flashcard } from '@/components/flashcard'
import { Button } from '@/components/ui/button'
import { InputGroup } from '@/components/input-group'
import { FlashcardSkeleton } from '@/components/skeleton'
import { Loader2, ArrowLeft, ArrowRight, RotateCcw, Brain, FileText, Zap } from 'lucide-react'

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

  const handleFileUpload = (file: File) => {
    // Here you would typically process the PDF file
    // For now, we'll just show a placeholder message
    alert('PDF upload functionality would be implemented here')
  }

  const handleGenerate = async () => {
    if (!inputText.trim()) {
      alert('Please enter text')
      return
    }

    setIsGenerating(true)

    try {
      // Mock data - no API call
      const mockCards = [
        {"q": "事件驱动架构包含哪四个部分？", "a": "事件队列、分发器、事件通道、事件处理器"},
        {"q": "事件队列在事件驱动架构中的作用是什么？", "a": "接收事件的入口"},
        {"q": "分发器在事件驱动架构中的功能是什么？", "a": "将不同的事件分发到不同的业务逻辑单元"},
        {"q": "事件通道在事件驱动架构中是什么？", "a": "分发器与处理器之间的联系渠道"},
        {"q": "事件处理器在事件驱动架构中的作用是什么？", "a": "实现业务逻辑，处理完成后发出事件触发下一步操作"},
        {"q": "微服务架构的三种实现模式是什么？", "a": "RESTful API模式、RESTful应用模式、集中消息模式"},
        {"q": "RESTful API模式的特点是什么？", "a": "服务通过API提供，云服务属于这一类"},
        {"q": "RESTful应用模式的特点是什么？", "a": "通过传统网络协议或应用协议提供，背后通常是多功能应用程序，常见于企业内部"},
        {"q": "集中消息模式的特点是什么？", "a": "采用消息代理实现消息队列、负载均衡、统一日志和异常处理"},
        {"q": "集中消息模式的缺点是什么？", "a": "会出现单点失败，消息代理可能要做成集群"}
      ]
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      console.log("cards:", mockCards)
      setFlashcards(mockCards)
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
      <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
        <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
          <div className="container mx-auto px-4 py-4">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-3"
            >
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold text-gray-900 text-shadow">AI Flashcard Generator</h1>
            </motion.div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center space-y-8 max-w-4xl mx-auto"
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Your Flashcards</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Click on cards to flip them, and use the navigation buttons to browse through all flashcards.
              </p>
            </div>
            
            <Flashcard
              question={flashcards[currentCardIndex].q}
              answer={flashcards[currentCardIndex].a}
              isFlipped={isFlipped}
              onFlip={() => setIsFlipped(!isFlipped)}
            />
            
            <div className="flex items-center space-x-4 w-full max-w-md justify-center">
              <Button
                onClick={handlePrevious}
                disabled={currentCardIndex === 0}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex-1 text-center">
                <span className="text-lg font-medium text-gray-700">
                  Card {currentCardIndex + 1} / {flashcards.length}
                </span>
                <div className="mt-2 h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${((currentCardIndex + 1) / flashcards.length) * 100}%` }}
                  />
                </div>
              </div>
              <Button
                onClick={handleNext}
                disabled={currentCardIndex === flashcards.length - 1}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full"
              >
                <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Button 
                onClick={handleReset} 
                variant="outline"
                className="group"
              >
                <RotateCcw className="mr-2 h-5 w-5 group-hover:rotate-180 transition-transform duration-300" />
                Create New Flashcards
              </Button>
            </motion.div>
          </motion.div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50">
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-3"
          >
            <Brain className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold text-gray-900 text-shadow">AI Flashcard Generator</h1>
          </motion.div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-8"
        >
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-primary/10 text-primary"
            >
              <FileText className="w-8 h-8" />
            </motion.div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transform Your Text into Flashcards</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Paste your study material below or upload a PDF file, then let AI generate flashcards to help you learn more effectively.
            </p>
          </div>
          
          <InputGroup
            inputText={inputText}
            setInputText={setInputText}
            isGenerating={isGenerating}
            onFileUpload={handleFileUpload}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || !inputText.trim()}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-6 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg focus:ring-2 focus:ring-primary focus:ring-offset-2 group"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Generating Flashcards...
                </>
              ) : (
                <>
                  <Zap className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                  Generate Flashcards
                </>
              )}
            </Button>
          </motion.div>
          
          {/* Status Display Area */}
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-4"
            >
              <h3 className="text-lg font-medium text-gray-700">Generating Flashcards...</h3>
              <FlashcardSkeleton />
              <div className="flex justify-center space-x-4">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" />
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </motion.div>
          )}
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-8 p-6 bg-secondary rounded-xl border border-border"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">How It Works</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start space-x-2">
                <div className="mt-1 min-w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">1</div>
                <span>Paste your study material or upload a PDF file</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1 min-w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">2</div>
                <span>Click "Generate Flashcards" to process your content</span>
              </li>
              <li className="flex items-start space-x-2">
                <div className="mt-1 min-w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">3</div>
                <span>Review and study with your AI-generated flashcards</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
