'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAssetPath } from '../../lib/utils'
import mainPageData from '../../public/assets/context/main_page.json'
import attentionData from '../../public/assets/context/attention.json'
import './attention.css'

interface AttentionLabels {
  title: string
  subtitle: string
  description: string
  introduction: {
    heading: string
  }
  github: {
    buttonText: string
    url: string
    credit: string
  }
  tableOfContents: {
    heading: string
    introduction: string
    executiveSummary: string
    researchObjective: string
    methods: string
    results: string
    projectStatus: string
    about: string
  }
  images: {
    enhanceScale: string
    eyeTrackingPreview: string
    webAdminConfig: string
    webInterface: string
    dataTableMAPE: string
    dataTableRSquare: string
  }
  executiveSummary: {
    heading: string
    content: string
  }
  researchObjective: {
    heading: string
    coreGoal: string
    primaryImpact: string
  }
  methods: {
    heading: string
    note: string
    steps: Array<{
      title: string
      description: string
      substeps?: Array<{
        title: string
        description: string
      }>
    }>
  }
  results: {
    heading: string
    experiment: string
    conclusion: string
  }
  projectStatus: {
    heading: string
    currentStatus: string
    websiteRole: string
    nextSteps: string
  }
  about: {
    heading: string
    description: string
  }
}

interface Labels {
  navigation: { backButton: string }
  attentionPage: { title: string }
}

export default function AttentionPage() {
  const labels = mainPageData as Labels
  const attentionLabels = attentionData as AttentionLabels
  const [activeSection, setActiveSection] = useState('introduction')
  const [showToc, setShowToc] = useState(false)

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setShowToc(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const toggleToc = () => {
    setShowToc(!showToc)
  }

  return (
    <div className="paper-layout">
      <Link href="/" className="back-button-paper">{labels.navigation.backButton}</Link>

      {/* Mobile TOC Toggle Button */}
      <button className="toc-toggle" onClick={toggleToc} aria-label="Toggle Table of Contents">
        {showToc ? '✕' : '☰'}
      </button>

      {/* Overlay for mobile */}
      <div className={`toc-overlay ${showToc ? 'show' : ''}`} onClick={() => setShowToc(false)}></div>

      <div className="paper-container">
        {/* Main Content */}
        <main className="paper-content">
          <header className="paper-header">
            <div className="header-content">
              <div className="header-text">
                <h1 style={{ whiteSpace: 'pre-line' }}>{attentionLabels.title}</h1>
                <p className="paper-subtitle">{attentionLabels.subtitle}</p>
              </div>
            </div>
          </header>

          <section id="introduction" className="paper-section">
            <h2>{attentionLabels.introduction.heading}</h2>
            <p>{attentionLabels.description}</p>
            <div className="image-container">
              <Image
                src={getAssetPath(attentionLabels.images.eyeTrackingPreview)}
                alt="Eye Tracking Preview"
                width={800}
                height={600}
                className="section-image"
                priority
                unoptimized
              />
            </div>
          </section>

          <section id="executive-summary" className="paper-section">
            <h2>{attentionLabels.executiveSummary.heading}</h2>
            <p>{attentionLabels.executiveSummary.content}</p>
          </section>

          <section id="research-objective" className="paper-section">
            <h2>{attentionLabels.researchObjective.heading}</h2>
            <ul>
              <li><strong>Core Goal:</strong> {attentionLabels.researchObjective.coreGoal}</li>
              <li><strong>Primary Impact:</strong> {attentionLabels.researchObjective.primaryImpact}</li>
            </ul>
          </section>

          <section id="methods" className="paper-section">
            <h2>{attentionLabels.methods.heading}</h2>
            <p className="section-note">{attentionLabels.methods.note}</p>

            <div className="image-container">
              <Image
                src={getAssetPath(attentionLabels.images.enhanceScale)}
                alt="AI Enhancement Scale Process"
                width={800}
                height={200}
                className="section-image cropped-web-image enhance-scale-image"
                loading="lazy"
                unoptimized
              />
            </div>

            <ul>
              {attentionLabels.methods.steps.map((step, index) => (
                <li key={index}>
                  <strong>{step.title}:</strong> {step.description}
                  {step.substeps && (
                    <ul>
                      {step.substeps.map((substep, subIndex) => (
                        <li key={subIndex}>
                          <strong>{substep.title}:</strong> {substep.description}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            <div className="image-container">
              <Image
                src={getAssetPath(attentionLabels.images.webInterface)}
                alt="Web Interface"
                width={800}
                height={200}
                className="section-image cropped-web-image"
                loading="lazy"
                unoptimized
              />
            </div>

            <div className="image-container">
              <Image
                src={getAssetPath(attentionLabels.images.webAdminConfig)}
                alt="Web Admin Configuration"
                width={800}
                height={200}
                className="section-image cropped-web-image"
                loading="lazy"
                unoptimized
              />
            </div>

            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <a
                href={attentionLabels.github.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  background: '#667eea',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '5px',
                  fontWeight: '500',
                  fontSize: '14px',
                  transition: 'background 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#5568d3'}
                onMouseOut={(e) => e.currentTarget.style.background = '#667eea'}
              >
                {attentionLabels.github.buttonText}
              </a>
              <p style={{
                marginTop: '15px',
                fontSize: '14px',
                color: '#666',
                fontStyle: 'italic'
              }}>
                {attentionLabels.github.credit}
              </p>
            </div>
          </section>

          <section id="results" className="paper-section">
            <h2>{attentionLabels.results.heading}</h2>
            <p>{attentionLabels.results.experiment}</p>

            <div className="tables-container">
              <div className="image-container">
                <Image
                  src={getAssetPath(attentionLabels.images.dataTableMAPE)}
                  alt="MAPE Data Table"
                  width={600}
                  height={400}
                  className="section-image data-table-image"
                  loading="lazy"
                  unoptimized
                />
              </div>

              <div className="image-container">
                <Image
                  src={getAssetPath(attentionLabels.images.dataTableRSquare)}
                  alt="R-Square Data Table"
                  width={600}
                  height={400}
                  className="section-image data-table-image"
                  loading="lazy"
                  unoptimized
                />
              </div>
            </div>

            <p><strong>Conclusion:</strong> {attentionLabels.results.conclusion}</p>
          </section>

          <section id="project-status" className="paper-section">
            <h2>{attentionLabels.projectStatus.heading}</h2>
            <ul>
              <li><strong>Current Status:</strong> {attentionLabels.projectStatus.currentStatus}</li>
              <li><strong>Website's Role (Experimental):</strong> {attentionLabels.projectStatus.websiteRole}</li>
              <li><strong>Next Steps:</strong> {attentionLabels.projectStatus.nextSteps}</li>
            </ul>
          </section>

          <section id="about" className="paper-section">
            <div className="about-section">
              <h3>{attentionLabels.about.heading}</h3>
              <p>{attentionLabels.about.description}</p>
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className={`paper-sidebar ${showToc ? 'show' : ''}`}>
          <h3>{attentionLabels.tableOfContents.heading}</h3>
          <nav>
            <a
              href="#introduction"
              className={activeSection === 'introduction' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('introduction'); }}
            >
              {attentionLabels.tableOfContents.introduction}
            </a>
            <a
              href="#executive-summary"
              className={activeSection === 'executive-summary' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('executive-summary'); }}
            >
              {attentionLabels.tableOfContents.executiveSummary}
            </a>
            <a
              href="#research-objective"
              className={activeSection === 'research-objective' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('research-objective'); }}
            >
              {attentionLabels.tableOfContents.researchObjective}
            </a>
            <a
              href="#methods"
              className={activeSection === 'methods' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('methods'); }}
            >
              {attentionLabels.tableOfContents.methods}
            </a>
            <a
              href="#results"
              className={activeSection === 'results' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('results'); }}
            >
              {attentionLabels.tableOfContents.results}
            </a>
            <a
              href="#project-status"
              className={activeSection === 'project-status' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('project-status'); }}
            >
              {attentionLabels.tableOfContents.projectStatus}
            </a>
            <a
              href="#about"
              className={activeSection === 'about' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}
            >
              {attentionLabels.tableOfContents.about}
            </a>
          </nav>
        </aside>
      </div>
    </div>
  )
}
