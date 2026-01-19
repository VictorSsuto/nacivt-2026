import { LINKS } from "../data/links"
import { Link } from "react-router-dom"
import { useState } from "react"

export default function Navbar({ isLoaded }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/20 bg-white transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:py-5">
        <div
          className={`flex items-center gap-3 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="h-10 w-0.5 bg-[#c8102e]" />

          <Link
            to={LINKS.home}
            className="text-lg md:text-xl font-semibold tracking-wide text-[#c8102e]"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Montreal <span className="text-[#1e3a8a]">NACIVT</span> 2026
          </Link>
        </div>
        {/* Desktop nav */}
        <nav
          className={`hidden md:flex items-center gap-6 text-sm md:text-sm font-medium normal-case tracking-normal text-black/70 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.home}>
            Home
          </Link>

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.register}>
            Register
          </Link>

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.tournament}>
            Tournament
          </Link>

          <Link
            className="hover:text-[#c8102e] transition-colors"
            to={LINKS.festival}
          >
            Night Market
          </Link>

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.shop}>
            Shop
          </Link>

          <div className="relative group">
            <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.about}>
              About
            </Link>

            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-40 rounded bg-white border border-black/10 shadow-lg py-2">
              <Link
                to={LINKS.about}
                className="block px-4 py-2 text-sm text-black/80 hover:bg-gray-50"
              >
                About
              </Link>
              <Link
                to={LINKS.activities}
                className="block px-4 py-2 text-sm text-black/80 hover:bg-gray-50"
              >
                Activities
              </Link>
              <Link
                to={LINKS.faq}
                className="block px-4 py-2 text-sm text-black/80 hover:bg-gray-50"
              >
                FAQ
              </Link>
            </div>
          </div>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="ml-4 flex h-10 w-10 items-center justify-center rounded-md border border-black/10 bg-white md:hidden"
        >
          <span className="sr-only">Menu</span>
          <svg className="h-5 w-5 text-black/70" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {open ? (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu panel */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}> 
        <div className="mx-auto max-w-5xl px-6 pb-4">
          <div className="mt-2 rounded-md border border-black/10 bg-white shadow-sm">
            <nav className="flex flex-col gap-1 p-3 text-sm text-black/80">
              <Link onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50" to={LINKS.home}>Home</Link>
              <Link onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50" to={LINKS.register}>Register</Link>
              <Link onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50" to={LINKS.tournament}>Tournament</Link>
              <Link onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50" to={LINKS.festival}>Night Market</Link>
              <Link onClick={() => setOpen(false)} className="block px-3 py-2 hover:bg-gray-50" to={LINKS.shop}>Shop</Link>
              <div className="border-t border-black/5 mt-1 pt-2">
                <div className="px-3 py-2 text-sm font-medium">About</div>
                <Link onClick={() => setOpen(false)} to={LINKS.about} className="block px-4 py-2 text-sm hover:bg-gray-50">About</Link>
                <Link onClick={() => setOpen(false)} to={LINKS.activities} className="block px-4 py-2 text-sm hover:bg-gray-50">Activities</Link>
                <Link onClick={() => setOpen(false)} to={LINKS.faq} className="block px-4 py-2 text-sm hover:bg-gray-50">FAQ</Link>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
