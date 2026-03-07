"use client"

import { useEffect, useRef } from "react"

export function FairyLights() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === "undefined") return

    import("gsap").then(({ gsap }) => {
      const container = containerRef.current
      if (!container) return

      // Create fairy lights
      const lights: HTMLDivElement[] = []
      for (let i = 0; i < 20; i++) {
        const light = document.createElement("div")
        light.className = "fairy-light"
        light.style.cssText = `
          position: absolute;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, #00ffff 0%, #26a69a 50%, transparent 70%);
          border-radius: 50%;
          box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, 0 0 30px #00ffff;
          pointer-events: none;
        `
        container.appendChild(light)
        lights.push(light)
      }

      // Animate fairy lights
      lights.forEach((light, index) => {
        gsap.set(light, {
          x: Math.random() * window.innerWidth,
          y: Math.random() * window.innerHeight,
          scale: Math.random() * 0.5 + 0.5,
        })

        gsap.to(light, {
          x: `+=${Math.random() * 200 - 100}`,
          y: `+=${Math.random() * 200 - 100}`,
          duration: Math.random() * 10 + 5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.2,
        })

        gsap.to(light, {
          opacity: Math.random() * 0.5 + 0.3,
          duration: Math.random() * 2 + 1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })

        gsap.to(light, {
          scale: Math.random() * 0.8 + 0.4,
          duration: Math.random() * 3 + 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        })
      })

      return () => {
        lights.forEach((light) => light.remove())
      }
    })
  }, [])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10" />
}
