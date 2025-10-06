'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '../../lib/utils'

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
  const [labels, setLabels] = useState<Labels | null>(null)
  const [pageLabels, setPageLabels] = useState<OpenMiraiLabels | null>(null)

  useEffect(() => {
    fetch(getAssetPath('/assets/context/main_page.json'))
      .then(res => res.json())
      .then(data => setLabels(data))
      .catch(err => console.error('Error loading labels:', err))

    fetch(getAssetPath('/assets/context/openmirai.json'))
      .then(res => res.json())
      .then(data => setPageLabels(data))
      .catch(err => console.error('Error loading page labels:', err))
  }, [])

  if (!labels || !pageLabels) return <div>Loading...</div>

  return (
    <div className="page-content active">
      <div className="container">
        <Link href="/" className="back-button">{labels.navigation.backButton}</Link>
        <h1>{pageLabels.title}</h1>

        <div style={{ padding: '20px', textAlign: 'center' }}>
          <Image
            src={getAssetPath("/assets/images/OpenMirai_logo.png")}
            alt="OpenMirai"
            width={400}
            height={400}
            style={{ maxWidth: '400px', width: '100%', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', marginBottom: '30px' }}
          />

          <h2 style={{ color: '#333', marginBottom: '20px' }}>{pageLabels.title}</h2>
          <p style={{ lineHeight: 1.8, color: '#666', marginBottom: '30px' }}>
            {pageLabels.description}
          </p>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '30px' }}>
            <a
              href={pageLabels.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#667eea', color: 'white', padding: '15px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, transition: 'background 0.3s ease', fontSize: '16px' }}
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
              style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: '#1877f2', color: 'white', padding: '15px 30px', borderRadius: '10px', textDecoration: 'none', fontWeight: 600, transition: 'background 0.3s ease', fontSize: '16px' }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              {pageLabels.facebookButton}
            </a>
          </div>

          <div style={{ marginTop: '40px', padding: '20px', background: '#f5f5f5', borderRadius: '10px' }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>{pageLabels.infoHeading}</h3>
            <p style={{ color: '#666', lineHeight: 1.6 }}>
              {pageLabels.info}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
