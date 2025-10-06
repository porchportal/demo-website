import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Medical Visualization Hub',
  description: 'Medical visualization tools and resources',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
