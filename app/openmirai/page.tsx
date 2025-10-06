'use client'

import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '../../lib/utils'
import mainPageData from '../../public/assets/context/main_page.json'
import openmiraiData from '../../public/assets/context/openmirai.json'
import './openmirai.css'

interface OpenMiraiLabels {
  title: string
  description: string
  websiteUrl: string
  facebookUrl: string
  websiteButton: string
  facebookButton: string
  infoHeading: string
  info: string
}

interface Labels {
  navigation: { backButton: string }
}

export default function OpenMiraiPage() {
  const labels = mainPageData as Labels
  const pageLabels = openmiraiData as OpenMiraiLabels

  return (
    <div className="page-content active">
      <div className="container">
        <Link href="/" className="back-button">{labels.navigation.backButton}</Link>
        <h1>{pageLabels.title}</h1>

        <div className="page-wrapper">
          <div className="logo-container">
            <Image
              src={getAssetPath("/public/assets/images/OpenMirai_logo.png")}
              alt="OpenMirai"
              width={400}
              height={400}
              className="logo-image"
            />
          </div>

          <h2 className="page-title">{pageLabels.title}</h2>
          <p className="description">
            {pageLabels.description}
          </p>

          <div className="button-container">
            <a
              href={pageLabels.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button website-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              {pageLabels.websiteButton}
            </a>

            <a
              href={pageLabels.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="social-button facebook-button"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {pageLabels.facebookButton}
            </a>
          </div>

          <div className="info-section">
            <h3 className="info-heading">{pageLabels.infoHeading}</h3>
            <p className="info-text">
              {pageLabels.info}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
