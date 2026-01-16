import { useEffect, useRef, useState } from "react"

export function useInView(
  options = { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
) {
  const ref = useRef(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prefersReduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches
    if (prefersReduced) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observer.disconnect()
      }
    }, options)

    observer.observe(el)
    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin])

  return [ref, isInView]
}

export function FadeIn({ children, className = "", variant = "up", delay = 0 }) {
  const [ref, isInView] = useInView()

  const base =
    variant === "down"
      ? "fade-in-down-on-load"
      : variant === "none"
      ? "fade-in-on-load"
      : "fade-in-up-on-load"

  const anim =
    !isInView
      ? ""
      : variant === "down"
      ? "animate-fade-in-down"
      : variant === "none"
      ? "animate-fade-in"
      : "animate-fade-in-up"

  return (
    <div
      ref={ref}
      className={`${base} ${anim} ${className}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}
