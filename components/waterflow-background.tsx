"use client"

import { useEffect, useRef } from "react"

export function WaterflowBackground() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement("div")
      particle.className = "waterflow-particle"
      particle.style.top = `${Math.random() * 100}%`
      particle.style.animationDelay = `${Math.random() * 2}s`
      particle.style.animationDuration = `${6 + Math.random() * 4}s`

      container.appendChild(particle)

      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 10000)
    }

    const interval = setInterval(createParticle, 800)

    // Create initial particles
    for (let i = 0; i < 5; i++) {
      setTimeout(createParticle, i * 200)
    }

    return () => {
      clearInterval(interval)
    }
  }, [])

  return <div ref={containerRef} className="waterflow-bg" />
}
