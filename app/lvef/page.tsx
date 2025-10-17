'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import './lvef.css'
import { getAssetPath } from '../../lib/utils'
import mainPageData from '../../public/assets/context/main_page.json'
import lvefData from '../../public/assets/context/lvef.json'
import HeartTransition from '../../components/HeartTransition'

interface LVEFLabels {
  title: string
  titleMobile?: string
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
    description: string
    categories: Array<{
      label: string
      value: string
      description: string
      color: string
    }>
  }
  images: {
    heartModel: string
    coReEcho: string
    gradCam: string
    tableExperimental: string
    formula: string
    dataDemoImage: string
    dataDemo1Gif: string
    dataDemo2Gif: string
    importantFrame: string
    camAnalysisDemo: string
  }
  sections: {
    objective: {
      title: string
      content: string
    }
    dataset: {
      title: string
      intro: string
      figureDescription: string
      panels: string[]
      overlay: string
      waveform: string
      providesTitle: string
      provides: string[]
      conclusion: string
    }
    overview: {
      title: string
      subtitle: string
      stage1: {
        title: string
        points: string[]
      }
      stage2: {
        title: string
        points: string[]
      }
      benefit: string
    }
    gradcam: {
      title: string
      intro: string
      methodology: {
        title: string
        description: string
      }
      frameSelection: {
        title: string
        description: string
      }
      visualization: {
        title: string
        description: string
      }
      outcome: string
    }
    results: {
      title: string
      content: string
    }
    impact: {
      title: string
      points: string[]
    }
    references: {
      title: string
      mainMethods: {
        title: string
        items: Array<{
          name: string
          description: string
          paper?: string
          github?: string
        }>
      }
      additional: {
        title: string
        items: Array<{
          description: string
          link?: string
          source?: string
        }>
      }
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
  const [activeSection, setActiveSection] = useState('objective')
  const [showToc, setShowToc] = useState(false)

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

    let category = ''
    let color = ''

    if (lvef > 70) {
      category = 'Hyperdynamic'
      color = '#10b981'
    } else if (lvef >= 50) {
      category = 'Normal'
      color = '#22c55e'
    } else if (lvef >= 40) {
      category = 'Mild Dysfunction'
      color = '#f59e0b'
    } else if (lvef >= 30) {
      category = 'Moderate Dysfunction'
      color = '#f97316'
    } else {
      category = 'Severe Dysfunction'
      color = '#ef4444'
    }

    setResult({ lvef, category, color })
  }

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId)
    setShowToc(false) // Close TOC on mobile when clicking a link
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
      <HeartTransition />

      <Link href="/" className="back-button-paper">{mainLabels.navigation.backButton}</Link>

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
                <h1 className="title-desktop">{lvefLabels.title}</h1>
                <h1 className="title-mobile">{lvefLabels.titleMobile || lvefLabels.title}</h1>
                <p className="paper-subtitle">{lvefLabels.subtitle}</p>
              </div>
              <div className="header-image-container" id="heart-image-target">
                <Image
                  src={getAssetPath(lvefLabels.images.heartModel)}
                  alt="Heart Model"
                  className="header-heart-image"
                  width={400}
                  height={400}
                  priority
                  unoptimized
                />
              </div>
            </div>
          </header>

          <section id="objective" className="paper-section">
            <h2>{lvefLabels.sections.objective.title}</h2>
            <p>{lvefLabels.sections.objective.content}</p>
          </section>

          <section id="dataset" className="paper-section">
            <h2>{lvefLabels.sections.dataset.title}</h2>

            <div className="medical-image-container">
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
                <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
                  <Image
                    src={getAssetPath(lvefLabels.images.dataDemoImage)}
                    alt="Dataset Demo Image"
                    className="medical-image"
                    width={280}
                    height={280}
                    loading="lazy"
                    unoptimized
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="image-caption">Figure 3: Dataset Example - Echocardiographic Frame</p>
                </div>
                <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
                  <Image
                    src={getAssetPath(lvefLabels.images.dataDemo1Gif)}
                    alt="Dataset Demo Animation 1"
                    className="medical-image"
                    width={280}
                    height={280}
                    loading="lazy"
                    unoptimized
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="image-caption">Figure 4: Cardiac Cycle Animation - Example 1</p>
                </div>
                <div style={{ flex: '1 1 200px', maxWidth: '280px' }}>
                  <Image
                    src={getAssetPath(lvefLabels.images.dataDemo2Gif)}
                    alt="Dataset Demo Animation 2"
                    className="medical-image"
                    width={280}
                    height={280}
                    loading="lazy"
                    unoptimized
                    style={{ width: '100%', height: 'auto' }}
                  />
                  <p className="image-caption">Figure 5: Cardiac Cycle Animation - Example 2</p>
                </div>
              </div>
            </div>

            <p>{lvefLabels.sections.dataset.intro}</p>

            <div className="medical-image-container">
              <Image
                src={getAssetPath(lvefLabels.images.formula)}
                alt="LVEF Formula"
                className="medical-image"
                width={400}
                height={200}
                loading="lazy"
                unoptimized
                style={{ maxWidth: '400px', width: '100%', height: 'auto' }}
              />
            </div>

            <p>{lvefLabels.sections.dataset.figureDescription}</p>
            <ul>
              {lvefLabels.sections.dataset.panels.map((panel, index) => (
                <li key={index}>{panel}</li>
              ))}
            </ul>
            <p>{lvefLabels.sections.dataset.overlay}</p>

            <p>{lvefLabels.sections.dataset.waveform}</p>

            <p><strong>{lvefLabels.sections.dataset.providesTitle}</strong></p>
            <ul>
              {lvefLabels.sections.dataset.provides.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

            <p>{lvefLabels.sections.dataset.conclusion}</p>
          </section>

          <section id="ranges" className="paper-section">
            <h2>{lvefLabels.ranges.heading}</h2>
            <p className="ranges-description">{lvefLabels.ranges.description}</p>
            <div className="ranges-grid">
              {lvefLabels.ranges.categories.map((category, index) => (
                <div
                  key={index}
                  className="range-card"
                  style={{ borderColor: category.color }}
                >
                  <div className="range-label">{category.label}</div>
                  <div className="range-value" style={{ color: category.color }}>
                    {category.value}
                  </div>
                  <div className="range-description-text">{category.description}</div>
                </div>
              ))}
            </div>
          </section>

          <section id="overview" className="paper-section">
            <h2>{lvefLabels.sections.overview.title}</h2>
            <p className="section-subtitle">{lvefLabels.sections.overview.subtitle}</p>

            <div className="medical-image-container cropped-image-container">
              <Image
                src={getAssetPath(lvefLabels.images.coReEcho)}
                alt="CoReEcho Visualization"
                className="medical-image cropped-image"
                width={800}
                height={400}
                loading="lazy"
                unoptimized
              />
              <p className="image-caption">Figure 1: CoReEcho - Echocardiographic Analysis</p>
            </div>

            <div className="framework-stage">
              <h3>{lvefLabels.sections.overview.stage1.title}</h3>
              <ul>
                {lvefLabels.sections.overview.stage1.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <div className="framework-stage">
              <h3>{lvefLabels.sections.overview.stage2.title}</h3>
              <ul>
                {lvefLabels.sections.overview.stage2.points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>

            <p className="key-benefit"><strong>Key Benefit:</strong> {lvefLabels.sections.overview.benefit}</p>
          </section>

          <section id="cam-analysis" className="paper-section">
            <h2>{lvefLabels.sections.gradcam.title}</h2>
            <p>{lvefLabels.sections.gradcam.intro}</p>

            <div className="medical-image-container cropped-image-container">
              <Image
                src={getAssetPath(lvefLabels.images.gradCam)}
                alt="CAM Visualization"
                className="medical-image cropped-image"
                width={800}
                height={400}
                loading="lazy"
                unoptimized
              />
              <p className="image-caption">Figure 2: Class Activation Mapping (CAM) Visualization</p>
            </div>

            <h3>{lvefLabels.sections.gradcam.methodology.title}</h3>
            <p>{lvefLabels.sections.gradcam.methodology.description}</p>

            <h3>{lvefLabels.sections.gradcam.frameSelection.title}</h3>
            <p>{lvefLabels.sections.gradcam.frameSelection.description}</p>

            <div className="medical-image-container">
              <Image
                src={getAssetPath(lvefLabels.images.importantFrame)}
                alt="Important Frame Selection"
                className="medical-image"
                width={800}
                height={400}
                loading="lazy"
                unoptimized
                style={{ maxWidth: '800px', width: '100%', height: 'auto' }}
              />
              <p className="image-caption">Figure X: Important Frame Selection based on CAM Analysis</p>
            </div>

            <h3>{lvefLabels.sections.gradcam.visualization.title}</h3>
            <p>{lvefLabels.sections.gradcam.visualization.description}</p>

            <div className="medical-image-container">
              <Image
                src={getAssetPath(lvefLabels.images.camAnalysisDemo)}
                alt="CAM Analysis Animation"
                className="medical-image"
                width={500}
                height={300}
                loading="lazy"
                unoptimized
                style={{ maxWidth: '500px', width: '60%', height: 'auto' }}
              />
              <p className="image-caption">Video: Dynamic CAM Analysis throughout Cardiac Cycle</p>
            </div>

            <p className="outcome-highlight"><strong>🧠 Outcome:</strong> {lvefLabels.sections.gradcam.outcome}</p>
          </section>

          <section id="results" className="paper-section">
            <h2>{lvefLabels.sections.results.title}</h2>

            <div className="medical-image-container">
              <Image
                src={getAssetPath(lvefLabels.images.tableExperimental)}
                alt="Experimental Results"
                className="medical-image"
                width={800}
                height={500}
                loading="lazy"
                unoptimized
              />
              <p className="image-caption">Table 1: Comparative Experimental Results</p>
            </div>

            {lvefLabels.sections.results.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </section>

          <section id="impact" className="paper-section">
            <h2>{lvefLabels.sections.impact.title}</h2>
            <ul>
              {lvefLabels.sections.impact.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </section>

          <section id="references" className="paper-section">
            <h2>{lvefLabels.sections.references.title}</h2>

            <div className="references-subsection">
              <h3>{lvefLabels.sections.references.mainMethods.title}</h3>
              {lvefLabels.sections.references.mainMethods.items.map((item, index) => (
                <div key={index} className="reference-item">
                  <div className="reference-name">{item.name}</div>
                  <div className="reference-description">{item.description}</div>
                  <div className="reference-links">
                    {item.paper && (
                      <a href={item.paper} target="_blank" rel="noopener noreferrer" className="reference-link">
                        📄 Paper arXiv
                      </a>
                    )}
                    {item.github && (
                      <a href={item.github} target="_blank" rel="noopener noreferrer" className="reference-link">
                        💻 Github
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="references-subsection">
              <h3>{lvefLabels.sections.references.additional.title}</h3>
              {lvefLabels.sections.references.additional.items.map((item, index) => (
                <div key={index} className="reference-item">
                  <div className="reference-description">{item.description}</div>
                  {item.link && item.source && (
                    <div className="reference-links">
                      <a href={item.link} target="_blank" rel="noopener noreferrer" className="reference-link">
                        🔗 {item.source}
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* Sidebar */}
        <aside className={`paper-sidebar ${showToc ? 'show' : ''}`}>
          <h3>Table of Contents</h3>
          <nav>
            <a
              href="#objective"
              className={activeSection === 'objective' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('objective'); }}
            >
              {lvefLabels.sections.objective.title}
            </a>
            <a
              href="#dataset"
              className={activeSection === 'dataset' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('dataset'); }}
            >
              {lvefLabels.sections.dataset.title}
            </a>
            <a
              href="#ranges"
              className={activeSection === 'ranges' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('ranges'); }}
            >
              {lvefLabels.ranges.heading}
            </a>
            <a
              href="#overview"
              className={activeSection === 'overview' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('overview'); }}
            >
              {lvefLabels.sections.overview.title}
            </a>
            <a
              href="#cam-analysis"
              className={activeSection === 'cam-analysis' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('cam-analysis'); }}
            >
              {lvefLabels.sections.gradcam.title}
            </a>
            <a
              href="#results"
              className={activeSection === 'results' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('results'); }}
            >
              {lvefLabels.sections.results.title}
            </a>
            <a
              href="#impact"
              className={activeSection === 'impact' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('impact'); }}
            >
              {lvefLabels.sections.impact.title}
            </a>
            <a
              href="#references"
              className={activeSection === 'references' ? 'active' : ''}
              onClick={(e) => { e.preventDefault(); scrollToSection('references'); }}
            >
              {lvefLabels.sections.references.title}
            </a>
          </nav>
        </aside>
      </div>
    </div>
  )
}
