'use client'

import { useState } from 'react'
import Link from 'next/link'
import './lvef.css'
import { getAssetPath } from '../../lib/utils'
import mainPageData from '../../public/assets/context/main_page.json'
import lvefData from '../../public/assets/context/lvef.json'

interface LVEFLabels {
  title: string
  subtitle: string
  description: string
  form: {
    heading: string
    edvLabel: string
    edvPlaceholder: string
    esvLabel: string
    esvPlaceholder: string
    calculateButton: string
  }
  ranges: {
    heading: string
    normal: string
    borderline: string
    reduced: string
  }
  images: {
    coReEcho: string
    gradCam: string
    tableExperimental: string
  }
  sections: {
    overview: {
      title: string
      content: string
    }
    visualization: {
      title: string
      description: string
    }
    results: {
      title: string
      description: string
    }
  }
}

export default function LVEFPage() {
  const mainLabels = mainPageData as { navigation: { backButton: string } }
  const lvefLabels = lvefData as LVEFLabels
  const [edv, setEdv] = useState('')
  const [esv, setEsv] = useState('')
  const [result, setResult] = useState<{ lvef: number; category: string; color: string } | null>(null)
  const [error, setError] = useState('')
  const [activeSection, setActiveSection] = useState('overview')

  const calculateLVEF = () => {
    setError('')
    setResult(null)

    const edvNum = parseFloat(edv)
    const esvNum = parseFloat(esv)

    if (isNaN(edvNum) || isNaN(esvNum) || edvNum <= 0 || esvNum < 0) {
      setError('Please enter valid values')
      return
    }

    if (esvNum >= edvNum) {
      setError('ESV must be less than EDV')
      return
    }

    const lvef = ((edvNum - esvNum) / edvNum) * 100
    const category = lvef >= 50 ? 'Normal' : lvef >= 40 ? 'Borderline' : 'Reduced'
    const color = category === 'Normal' ? '#22c55e' : category === 'Borderline' ? '#f59e0b' : '#ef4444'

    setResult({ lvef, category, color })
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <div className="paper-layout">
      <Link href="/" className="back-button-paper">{mainLabels.navigation.backButton}</Link>

      <div className="paper-container">
        {/* Sidebar */}
        <aside className="paper-sidebar">
          <h3>Table of Contents</h3>
          <nav>
            <a
              href="#overview"
              className={activeSection === 'overview' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }}
            >
              {lvefLabels.sections.overview.title}
            </a>
            <a
              href="#calculator"
              className={activeSection === 'calculator' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('calculator'); }}
            >
              Calculator
            </a>
            <a
              href="#ranges"
              className={activeSection === 'ranges' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('ranges'); }}
            >
              {lvefLabels.ranges.heading}
            </a>
            <a
              href="#visualization"
              className={activeSection === 'visualization' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('visualization'); }}
            >
              {lvefLabels.sections.visualization.title}
            </a>
            <a
              href="#results"
              className={activeSection === 'results' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('results'); }}
            >
              {lvefLabels.sections.results.title}
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="paper-content">
          <header className="paper-header">
            <h1>{lvefLabels.title}</h1>
            <p className="paper-subtitle">{lvefLabels.subtitle}</p>
          </header>

          <section id="overview" className="paper-section">
            <h2>{lvefLabels.sections.overview.title}</h2>
            <p>{lvefLabels.sections.overview.content}</p>
          </section>

          <section id="calculator" className="paper-section">
            <h2>{lvefLabels.form.heading}</h2>
            <div className="calculator-form">
              <div className="form-group">
                <label>{lvefLabels.form.edvLabel}</label>
                <input
                  type="number"
                  value={edv}
                  onChange={(e) => setEdv(e.target.value)}
                  placeholder={lvefLabels.form.edvPlaceholder}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label>{lvefLabels.form.esvLabel}</label>
                <input
                  type="number"
                  value={esv}
                  onChange={(e) => setEsv(e.target.value)}
                  placeholder={lvefLabels.form.esvPlaceholder}
                  className="form-input"
                />
              </div>
              <button onClick={calculateLVEF} className="calculate-btn">
                {lvefLabels.form.calculateButton}
              </button>

              {error && (
                <div className="error-message">{error}</div>
              )}

              {result && (
                <div className="result-box" style={{ borderLeftColor: result.color }}>
                  <div className="result-title">Result</div>
                  <div className="result-value" style={{ color: result.color }}>
                    LVEF: {result.lvef.toFixed(1)}%
                  </div>
                  <div className="result-category">{result.category}</div>
                </div>
              )}
            </div>
          </section>

          <section id="ranges" className="paper-section">
            <h2>{lvefLabels.ranges.heading}</h2>
            <div className="ranges-grid">
              <div className="range-card range-normal">
                <div className="range-label">Normal</div>
                <div className="range-value">50-70%</div>
              </div>
              <div className="range-card range-borderline">
                <div className="range-label">Borderline</div>
                <div className="range-value">40-49%</div>
              </div>
              <div className="range-card range-reduced">
                <div className="range-label">Reduced</div>
                <div className="range-value">&lt;40%</div>
              </div>
            </div>
          </section>

          <section id="visualization" className="paper-section">
            <h2>{lvefLabels.sections.visualization.title}</h2>
            <p>{lvefLabels.sections.visualization.description}</p>

            <div className="medical-image-container">
              <img
                src={getAssetPath(lvefLabels.images.coReEcho)}
                alt="CoReEcho Visualization"
                className="medical-image"
              />
              <p className="image-caption">Figure 1: CoReEcho - Echocardiographic Analysis</p>
            </div>

            <div className="medical-image-container">
              <img
                src={getAssetPath(lvefLabels.images.gradCam)}
                alt="Grad-CAM Visualization"
                className="medical-image"
              />
              <p className="image-caption">Figure 2: Gradient-weighted Class Activation Mapping (Grad-CAM)</p>
            </div>
          </section>

          <section id="results" className="paper-section">
            <h2>{lvefLabels.sections.results.title}</h2>
            <p>{lvefLabels.sections.results.description}</p>

            <div className="medical-image-container">
              <img
                src={getAssetPath(lvefLabels.images.tableExperimental)}
                alt="Experimental Results"
                className="medical-image"
              />
              <p className="image-caption">Table 1: Comparative Experimental Results</p>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
