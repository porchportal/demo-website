'use client'

import Link from 'next/link'
import Image from 'next/image'
import labelsData from '../public/assets/context/main_page.json'
import { getAssetPath } from '../lib/utils'

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
  const labels = labelsData as Labels

  const handleLVEFClick = (e: React.MouseEvent) => {
    sessionStorage.setItem('heartAnimation', 'start')
  }

  const handleCircularClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = e.currentTarget
    const rect = target.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    const radius = rect.width / 2
    const distance = Math.sqrt(x * x + y * y)

    if (distance > radius) {
      e.preventDefault()
    }
  }

  return (
    <div className="page-content active">
      <div className="container">
        <h1>{labels.mainMenu.title}</h1>
        <div className="button-grid">
          <Link href="/lvef" className="nav-button lvef-button" onClick={handleLVEFClick}>
            <span>{labels.mainMenu.buttons.lvef}</span>
          </Link>
          <Link href="/attention" className="nav-button attention-button">
            <span>{labels.mainMenu.buttons.attention}</span>
          </Link>
          <Link href="/openmirai" className="nav-button image-button" onClick={(e) => handleCircularClick(e, '/openmirai')}>
            <Image
              src={getAssetPath("/assets/images/OpenMirai_logo.png")}
              alt="OpenMirai"
              width={200}
              height={200}
            />
          </Link>
          <Link href="/limayutthaya" className="nav-button image-button" onClick={(e) => handleCircularClick(e, '/limayutthaya')}>
            <Image
              src={getAssetPath("/assets/images/LimAyutthaya_logo.jpg")}
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
