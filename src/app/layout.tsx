import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Flashcard Generator',
  description: 'AI-powered flashcard generator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
