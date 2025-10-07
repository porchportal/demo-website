import './globals.css'
import type { Metadata } from 'next'
import { basePath } from '../lib/utils'

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
      <head>
        {/* Preload critical images */}
        <link rel="preload" as="image" href={`${basePath}/assets/images/OpenMirai_logo.png`} />
        <link rel="preload" as="image" href={`${basePath}/assets/images/LimAyutthaya_logo.jpg`} />
        <link rel="preload" as="image" href={`${basePath}/assets/image_medical/lvef_3d_.png`} />
      </head>
      <body>{children}</body>
    </html>
  )
}
