'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { getAssetPath } from '../lib/utils'
import './HeartTransition.css'

export default function HeartTransition() {
  const [isAnimating, setIsAnimating] = useState(false)
  const [animationStage, setAnimationStage] = useState<'popup' | 'move' | null>(null)
  const [targetPosition, setTargetPosition] = useState<{ top: number; left: number; width: number; height: number } | null>(null)

  useEffect(() => {
    // Check if animation should start
    const shouldAnimate = sessionStorage.getItem('heartAnimation')

    if (shouldAnimate === 'start') {
      setIsAnimating(true)

      // Clear the flag
      sessionStorage.removeItem('heartAnimation')

      // Stage 1: Popup animation (scale up and show)
      setTimeout(() => {
        setAnimationStage('popup')
      }, 50)

      // Stage 2: Move to final position
      setTimeout(() => {
        // Calculate target position
        const targetElement = document.getElementById('heart-image-target')
        if (targetElement) {
          const rect = targetElement.getBoundingClientRect()
          setTargetPosition({
            top: rect.top + window.scrollY,
            left: rect.left + window.scrollX,
            width: rect.width,
            height: rect.height
          })
        }
        setAnimationStage('move')
      }, 600)

      // Stage 3: Hide the animated heart after it reaches the target
      setTimeout(() => {
        setIsAnimating(false)
      }, 2000)
    }
  }, [])

  if (!isAnimating) return null

  const style = animationStage === 'move' && targetPosition ? {
    top: `${targetPosition.top}px`,
    left: `${targetPosition.left}px`,
    width: `${targetPosition.width}px`,
    height: `${targetPosition.height}px`
  } : {}

  return (
    <div className={`heart-transition ${animationStage || ''}`} style={style}>
      <Image
        src={getAssetPath("/public/assets/image_medical/lvef_3d_.png")}
        alt="Heart Transition"
        width={300}
        height={300}
        priority
      />
    </div>
  )
}
