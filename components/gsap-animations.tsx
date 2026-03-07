"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface GSAPAnimationProps {
  children: React.ReactNode
  animation?: "fadeInUp" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "slideInDown"
  delay?: number
  duration?: number
  className?: string
}

export function GSAPAnimation({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.8,
  className = "",
}: GSAPAnimationProps) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && elementRef.current) {
      import("gsap").then(({ gsap }) => {
        const element = elementRef.current

        switch (animation) {
          case "fadeInUp":
            gsap.fromTo(element, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration, delay, ease: "power3.out" })
            break
          case "fadeInLeft":
            gsap.fromTo(element, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration, delay, ease: "power3.out" })
            break
          case "fadeInRight":
            gsap.fromTo(element, { opacity: 0, x: 30 }, { opacity: 1, x: 0, duration, delay, ease: "power3.out" })
            break
          case "scaleIn":
            gsap.fromTo(
              element,
              { opacity: 0, scale: 0.8 },
              { opacity: 1, scale: 1, duration, delay, ease: "back.out(1.7)" },
            )
            break
          case "slideInDown":
            gsap.fromTo(element, { opacity: 0, y: -30 }, { opacity: 1, y: 0, duration, delay, ease: "power3.out" })
            break
        }
      })
    }
  }, [animation, delay, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

// Stagger animation for multiple elements
export function GSAPStagger({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && containerRef.current) {
      import("gsap").then(({ gsap }) => {
        const elements = containerRef.current?.children
        if (elements) {
          gsap.fromTo(
            elements,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power3.out" },
          )
        }
      })
    }
  }, [])

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}

// Hover animation component
export function GSAPHover({
  children,
  scale = 1.05,
  duration = 0.3,
  className = "",
}: {
  children: React.ReactNode
  scale?: number
  duration?: number
  className?: string
}) {
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== "undefined" && elementRef.current) {
      import("gsap").then(({ gsap }) => {
        const element = elementRef.current

        const handleMouseEnter = () => {
          gsap.to(element, { scale, duration, ease: "power2.out" })
        }

        const handleMouseLeave = () => {
          gsap.to(element, { scale: 1, duration, ease: "power2.out" })
        }

        element?.addEventListener("mouseenter", handleMouseEnter)
        element?.addEventListener("mouseleave", handleMouseLeave)

        return () => {
          element?.removeEventListener("mouseenter", handleMouseEnter)
          element?.removeEventListener("mouseleave", handleMouseLeave)
        }
      })
    }
  }, [scale, duration])

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  )
}

export function FadeIn({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <GSAPAnimation animation="fadeInUp" delay={delay} className={className}>
      {children}
    </GSAPAnimation>
  )
}

export function ScaleIn({
  children,
  className = "",
  delay = 0,
}: { children: React.ReactNode; className?: string; delay?: number }) {
  return (
    <GSAPAnimation animation="scaleIn" delay={delay} className={className}>
      {children}
    </GSAPAnimation>
  )
}

export function StaggerChildren({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <GSAPStagger className={className}>{children}</GSAPStagger>
}
