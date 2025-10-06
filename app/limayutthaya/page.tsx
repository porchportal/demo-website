'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '../../lib/utils'
import mainPageData from '../../public/assets/context/main_page.json'
import limayutthayaData from '../../public/assets/context/limayutthaya.json'
import './limayutthaya.css'

interface LimAyutthayaLabels {
  title: string
  description: string
  facebookUrl: string
  facebookButton: string
  contactHeading: string
  contactInfo: string
}

interface Labels {
  navigation: { backButton: string }
}

export default function LimAyutthayaPage() {
  const labels = mainPageData as Labels
  const pageLabels = limayutthayaData as LimAyutthayaLabels

  return (
    <div className="page-content active">
      <div className="container">
        <Link href="/" className="back-button">{labels.navigation.backButton}</Link>
        <h1>{pageLabels.title}</h1>

        <div className="page-wrapper">
          <div className="logo-container">
            <Image
              src={getAssetPath("/assets/images/LimAyutthaya_logo.jpg")}
              alt="Lim Ayutthaya"
              width={400}
              height={400}
              className="logo-image"
            />
          </div>

          <p className="description">
            {pageLabels.description}
          </p>

          <a
            href={pageLabels.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-button"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {pageLabels.facebookButton}
          </a>

          <div className="contact-section">
            <h3 className="contact-heading">{pageLabels.contactHeading}</h3>
            <p className="contact-info">
              {pageLabels.contactInfo}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
