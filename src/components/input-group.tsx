'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Textarea } from '@/components/ui/textarea'
import { FileText, Upload, AlertCircle } from 'lucide-react'

interface InputGroupProps {
  inputText: string
  setInputText: (text: string) => void
  isGenerating: boolean
  onFileUpload: (file: File) => void
}

export function InputGroup({ inputText, setInputText, isGenerating, onFileUpload }: InputGroupProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      if (file.type === 'application/pdf') {
        setError('')
        onFileUpload(file)
      } else {
        setError('Please upload only PDF files')
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        setError('')
        onFileUpload(file)
      } else {
        setError('Please upload only PDF files')
      }
    }
  }

  const handleClickUpload = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-6">
      {/* PDF Upload Area */}
      <div
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClickUpload}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".pdf"
          onChange={handleFileInputChange}
          className="hidden"
        />
        <motion.div
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          className="flex flex-col items-center space-y-4 cursor-pointer"
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${isDragging ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
            <Upload className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">Upload PDF File</h3>
            <p className="text-muted-foreground text-sm">Drag and drop PDF files here, or click to browse</p>
          </div>
          {error && (
            <div className="mt-2 flex items-center text-sm text-destructive">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </div>
          )}
        </motion.div>
      </div>

      {/* Text Input Area */}
      <div className="space-y-4">
        <label className="block text-lg font-medium text-gray-700">Input Text</label>
        <Textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste or enter your text content here...\n\nExample:\nEvent-driven architecture consists of four parts: event queue, dispatcher, event channels, and event handlers. The event queue serves as the entry point for receiving events..."
          className="min-h-[250px] resize-y text-lg p-6 border border-border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 shadow-sm"
          disabled={isGenerating}
        />
      </div>
    </div>
  )
}
