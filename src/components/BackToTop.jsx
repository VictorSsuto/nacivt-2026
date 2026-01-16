import { useEffect, useState } from "react"

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300)
    window.addEventListener("scroll", onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed z-50 bottom-6 right-6 md:bottom-8 md:right-8 w-12 h-12 rounded-full bg-[#1e3a8a] text-white flex items-center justify-center shadow-lg hover:bg-[#c8102e] transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 4l-8 8h6v8h4v-8h6z" />
      </svg>
    </button>
  )
}
