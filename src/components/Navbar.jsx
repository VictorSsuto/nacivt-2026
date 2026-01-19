import { LINKS } from "../data/links"
import { Link } from "react-router-dom"

export default function Navbar({ isLoaded }) {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/20 bg-white transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 md:py-5">
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

        <nav
          className={`flex items-center gap-6 text-sm md:text-sm font-medium normal-case tracking-normal text-black/70 transition-all duration-700 delay-200 ${
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
            <button className="hover:text-[#c8102e] transition-colors">About</button>

            <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-150 absolute right-0 mt-2 w-40 rounded bg-white border border-black/10 shadow-lg py-2">
              <Link
                to={LINKS.about}
                className="block px-4 py-2 text-sm text-black/80 hover:bg-gray-50"
              >
                About
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
      </div>
    </header>
  )
}
