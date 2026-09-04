import { forwardRef, useCallback, useMemo, useRef, useState } from "react"
import HTMLFlipBook from "react-pageflip"
import { FadeIn } from "../../components/FadeIn"

const TOTAL_PAGES = 88
const LOAD_WINDOW = 4 // how many pages ahead/behind the current one to actually fetch

function pageSrc(n) {
  return `/booklet/page-${String(n).padStart(2, "0")}.jpg`
}

// react-pageflip clones each page and attaches a ref to measure/position it,
// so this must forward its ref to the actual page DOM node.
const Page = forwardRef(({ number, shouldLoad }, ref) => (
  <div ref={ref} className="relative h-full w-full overflow-hidden bg-[#F3EAD3]">
    {shouldLoad ? (
      <img
        src={pageSrc(number)}
        alt={`Booklet page ${number}`}
        loading="lazy"
        className="h-full w-full object-contain"
        draggable={false}
      />
    ) : (
      <div className="flex h-full w-full items-center justify-center text-sm text-black/30">
        Page {number}
      </div>
    )}
  </div>
))

export default function Booklet() {
  const book = useRef(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [pageInput, setPageInput] = useState("1")
  const [zoom, setZoom] = useState(1)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const containerRef = useRef(null)

  const pages = useMemo(
    () => Array.from({ length: TOTAL_PAGES }, (_, i) => i + 1),
    [],
  )

  const goToPage = useCallback((oneIndexed) => {
    const clamped = Math.min(Math.max(1, oneIndexed), TOTAL_PAGES)
    book.current?.pageFlip()?.turnToPage(clamped - 1)
  }, [])

  // react-pageflip's animated flipNext()/flipPrev() have an upstream bug where
  // an internal exception is silently swallowed and the page turn misfires
  // (most often right after switching direction). turnToNextPage()/
  // turnToPrevPage() go through a different, non-animated code path in the
  // library that doesn't hit this bug, so use those instead for reliability.
  const flip = useCallback((direction) => {
    const pf = book.current?.pageFlip()
    if (!pf) return
    if (direction === "next") pf.turnToNextPage()
    else pf.turnToPrevPage()
  }, [])

  const handleFlip = useCallback((e) => {
    setCurrentPage(e.data)
    setPageInput(String(e.data + 1))
  }, [])

  const handlePageInputSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const n = parseInt(pageInput, 10)
      if (!Number.isNaN(n)) goToPage(n)
    },
    [pageInput, goToPage],
  )

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen?.()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen?.()
      setIsFullscreen(false)
    }
  }, [])

  return (
    <>
      {/* Slim editorial hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={pageSrc(1)}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Tournament Booklet
              </h1>
            </FadeIn>
            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                The full 81st NACIVT program: schedule, greetings, team
                rosters, and more. Flip through it below.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-16">
        <FadeIn>
          <div
            ref={containerRef}
            className={`mx-auto flex flex-col items-center ${
              isFullscreen ? "bg-[#1a1a1a] py-8" : ""
            }`}
          >
            <div
              className="w-full origin-top transition-transform duration-200"
              style={{ transform: `scale(${zoom})` }}
            >
              <HTMLFlipBook
                width={550}
                height={733}
                size="stretch"
                minWidth={280}
                maxWidth={900}
                minHeight={370}
                maxHeight={1200}
                showCover={true}
                autoSize={true}
                maxShadowOpacity={0.5}
                drawShadow={true}
                mobileScrollSupport={true}
                className="shadow-xl"
                ref={book}
                onFlip={handleFlip}
                onInit={(e) => {
                  setCurrentPage(e.data.page)
                  setPageInput(String(e.data.page + 1))
                }}
              >
                {pages.map((n) => (
                  <Page
                    key={n}
                    number={n}
                    shouldLoad={Math.abs(n - 1 - currentPage) <= LOAD_WINDOW}
                  />
                ))}
              </HTMLFlipBook>
            </div>

            {/* Toolbar */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 rounded-sm border border-black/10 bg-white px-4 py-3 shadow-sm">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                aria-label="Zoom out"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-black/10 text-black/70 hover:bg-black/5"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.6, z + 0.1))}
                aria-label="Zoom in"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-black/10 text-black/70 hover:bg-black/5"
              >
                +
              </button>

              <div className="mx-1 h-6 w-px bg-black/10" />

              <button
                type="button"
                onClick={() => flip("prev")}
                aria-label="Previous page"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-black/10 text-black/70 hover:bg-black/5"
              >
                ‹
              </button>

              <form onSubmit={handlePageInputSubmit} className="flex items-center gap-2 text-sm text-black/70">
                <input
                  type="text"
                  inputMode="numeric"
                  value={pageInput}
                  onChange={(e) => setPageInput(e.target.value)}
                  onBlur={handlePageInputSubmit}
                  className="w-12 border border-black/10 px-2 py-1.5 text-center text-sm"
                />
                <span>of {TOTAL_PAGES}</span>
              </form>

              <button
                type="button"
                onClick={() => flip("next")}
                aria-label="Next page"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-black/10 text-black/70 hover:bg-black/5"
              >
                ›
              </button>

              <div className="mx-1 h-6 w-px bg-black/10" />

              <button
                type="button"
                onClick={toggleFullscreen}
                aria-label="Toggle fullscreen"
                className="flex h-9 w-9 items-center justify-center rounded-sm border border-black/10 text-black/70 hover:bg-black/5"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5" />
                </svg>
              </button>

              <a
                href="/2026-nacivt-tournament-booklet.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="ml-1 text-sm font-medium text-[#275E6B] underline decoration-black/20 underline-offset-4 hover:decoration-[#275E6B]"
              >
                Download PDF ↗
              </a>
            </div>
          </div>
        </FadeIn>
      </main>
    </>
  )
}
