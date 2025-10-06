'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Labels {
  siteName: string
  mainMenu: {
    title: string
    buttons: {
      lvef: string
      attention: string
    }
  }
}

export default function Home() {
  const [labels, setLabels] = useState<Labels | null>(null)

  useEffect(() => {
    fetch('/assets/context/main_page.json')
      .then(res => res.json())
      .then(data => setLabels(data))
      .catch(err => console.error('Error loading labels:', err))
  }, [])

  if (!labels) return <div>Loading...</div>

  return (
    <div className="page-content active">
      <div className="container">
        <h1>{labels.mainMenu.title}</h1>
        <div className="button-grid">
          <Link href="/lvef" className="nav-button lvef-button">
            {labels.mainMenu.buttons.lvef}
          </Link>
          <Link href="/attention" className="nav-button attention-button">
            {labels.mainMenu.buttons.attention}
          </Link>
          <Link href="/openmirai" className="nav-button image-button">
            <Image
              src="/assets/images/OpenMirai_logo.png"
              alt="OpenMirai"
              width={200}
              height={200}
            />
          </Link>
          <Link href="/limayutthaya" className="nav-button image-button">
            <Image
              src="/assets/images/LimAyutthaya_logo.jpg"
              alt="Lim Ayutthaya"
              width={200}
              height={200}
            />
          </Link>
        </div>
      </div>
    </div>
  )
}
