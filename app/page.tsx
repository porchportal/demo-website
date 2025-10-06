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
              src={getAssetPath("/assets/images/OpenMirai_logo.png")}
              alt="OpenMirai"
              width={200}
              height={200}
            />
          </Link>
          <Link href="/limayutthaya" className="nav-button image-button">
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
