'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import mainPageData from '../../public/assets/context/main_page.json'
import attentionData from '../../public/assets/context/attention.json'

interface AttentionLabels {
  subtitle: string
  description: string
  controls: {
    clearButton: string
    heatmapButton: string
    dotSizeLabel: string
  }
  statistics: {
    heading: string
    pointCount: string
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

interface GazePoint {
  x: number
  y: number
  timestamp: number
}

export default function AttentionPage() {
  const labels = mainPageData as Labels
  const attentionLabels = attentionData as AttentionLabels
  const [gazePoints, setGazePoints] = useState<GazePoint[]>([])
  const [dotSize, setDotSize] = useState(15)
  const [showHeatmap, setShowHeatmap] = useState(false)
  const [canvasRef, setCanvasRef] = useState<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (canvasRef) {
      drawCanvas()
    }
  }, [gazePoints, dotSize, showHeatmap, canvasRef])

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef) return
    const rect = canvasRef.getBoundingClientRect()
    const scaleX = canvasRef.width / rect.width
    const scaleY = canvasRef.height / rect.height
    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    setGazePoints([...gazePoints, { x, y, timestamp: Date.now() }])
  }

  const drawCanvas = () => {
    if (!canvasRef) return
    const ctx = canvasRef.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvasRef.width, canvasRef.height)

    if (showHeatmap) {
      gazePoints.forEach((point) => {
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, dotSize * 3)
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0.8)')
        gradient.addColorStop(0.5, 'rgba(255, 255, 0, 0.4)')
        gradient.addColorStop(1, 'rgba(255, 255, 0, 0)')
        ctx.fillStyle = gradient
        ctx.fillRect(point.x - dotSize * 3, point.y - dotSize * 3, dotSize * 6, dotSize * 6)
      })
    } else {
      gazePoints.forEach((point) => {
        const age = Date.now() - point.timestamp
        const opacity = Math.max(0.3, 1 - age / 10000)

        ctx.beginPath()
        ctx.arc(point.x, point.y, dotSize, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(244, 63, 94, ${opacity})`
        ctx.fill()
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.8})`
        ctx.lineWidth = 2
        ctx.stroke()
      })
    }
  }

  return (
    <div className="page-content active">
      <div className="container">
        <Link href="/" className="back-button">{labels.navigation.backButton}</Link>
        <h1>{labels.attentionPage.title}</h1>

        <div style={{ padding: '20px' }}>
          <h2>{attentionLabels.subtitle}</h2>
          <p style={{ margin: '20px 0', lineHeight: 1.6 }}>{attentionLabels.description}</p>

          <div style={{ background: '#f5f5f5', padding: '20px', borderRadius: '10px', margin: '20px 0' }}>
            <canvas
              ref={setCanvasRef}
              width="700"
              height="500"
              onClick={handleCanvasClick}
              style={{
                border: '2px solid #ccc',
                borderRadius: '10px',
                cursor: 'crosshair',
                display: 'block',
                maxWidth: '100%',
                background: 'white'
              }}
            />

            <div style={{ marginTop: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => setGazePoints([])}
                style={{
                  background: '#ef4444',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {attentionLabels.controls.clearButton}
              </button>
              <button
                onClick={() => setShowHeatmap(!showHeatmap)}
                style={{
                  background: '#8b5cf6',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
              >
                {attentionLabels.controls.heatmapButton}
              </button>
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {attentionLabels.controls.dotSizeLabel}
                <input
                  type="range"
                  min="5"
                  max="30"
                  value={dotSize}
                  onChange={(e) => setDotSize(parseInt(e.target.value))}
                  style={{ width: '150px' }}
                />
                <span>{dotSize}</span>
              </label>
            </div>

            <div style={{ marginTop: '20px' }}>
              <h3>{attentionLabels.statistics.heading}</h3>
              <p>{attentionLabels.statistics.pointCount} {gazePoints.length}</p>
            </div>
          </div>

          <div style={{ marginTop: '30px' }}>
            <h3>{attentionLabels.about.heading}</h3>
            <p style={{ lineHeight: 1.6 }}>{attentionLabels.about.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
