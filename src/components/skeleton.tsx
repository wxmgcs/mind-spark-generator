'use client'

import { motion } from 'framer-motion'

export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0.6 }}
      animate={{ opacity: [0.6, 0.8, 0.6] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
      className={`bg-gray-200 rounded ${className}`}
    />
  )
}

export function FlashcardSkeleton() {
  return (
    <div className="w-full max-w-2xl h-96 rounded-2xl overflow-hidden bg-white shadow-2xl border border-border">
      <div className="h-full p-8 flex flex-col items-center justify-center">
        <Skeleton className="w-12 h-12 rounded-full mb-6" />
        <Skeleton className="w-40 h-8 mb-4" />
        <Skeleton className="w-full max-w-md h-6 mb-3" />
        <Skeleton className="w-full max-w-md h-6 mb-3" />
        <Skeleton className="w-3/4 max-w-md h-6" />
      </div>
    </div>
  )
}
