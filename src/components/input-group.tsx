'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Upload, FileText, Loader2, X } from 'lucide-react'

interface InputGroupProps {
  inputText: string
  setInputText: (text: string) => void
  isGenerating: boolean
  isUploading: boolean
  onFileUpload: (file: File) => void
}

export function InputGroup({ inputText, setInputText, isGenerating, isUploading, onFileUpload }: InputGroupProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [fileError, setFileError] = useState('')

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
    setFileError('')

    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      const file = files[0]
      if (file.type === 'application/pdf') {
        onFileUpload(file)
      } else {
        setFileError('Please upload a PDF file')
      }
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError('')
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      if (file.type === 'application/pdf') {
        onFileUpload(file)
      } else {
        setFileError('Please upload a PDF file')
      }
    }
  }

  return (
    <div className="space-y-4">
      {/* PDF Upload Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${isDragging ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isUploading ? (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <Loader2 className="h-6 w-6 text-primary animate-spin" />
            </div>
            <p className="text-gray-700 font-medium">Parsing PDF...</p>
            <p className="text-sm text-muted-foreground">Please wait while we process your file</p>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                <Upload className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-gray-900">Upload PDF File</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                Drag and drop your PDF file here, or click to browse
              </p>
              <input
                type="file"
                accept=".pdf"
                className="hidden"
                id="pdf-upload"
                onChange={handleFileInputChange}
              />
              <button
                type="button"
                onClick={() => document.getElementById('pdf-upload')?.click()}
                className="px-6 py-2 bg-secondary hover:bg-secondary/80 rounded-lg transition-colors duration-200 text-sm font-medium"
              >
                Browse Files
              </button>
            </div>
            {fileError && (
              <div className="mt-4 p-3 bg-destructive/10 text-destructive rounded-lg flex items-center space-x-2">
                <X className="h-4 w-4" />
                <span>{fileError}</span>
              </div>
            )}
          </>
        )}
      </motion.div>

      {/* Text Input Area */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-2"
      >
        <div className="flex items-center space-x-2">
          <FileText className="h-5 w-5 text-primary" />
          <label htmlFor="input-text" className="text-lg font-medium text-gray-900">
            Enter Text or Paste Content
          </label>
        </div>
        <textarea
          id="input-text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Paste your study material here..."
          className="w-full p-4 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 min-h-[200px] resize-y"
          disabled={isGenerating || isUploading}
        />
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{inputText.length} characters</span>
          {inputText.length > 5000 && (
            <span className="text-destructive">Content is quite long</span>
          )}
        </div>
      </motion.div>
    </div>
  )
}
