import { LINKS } from "../data/links"
import { Link } from "react-router-dom"

export default function Navbar({ isLoaded }) {
  return (
    <header
      className={`sticky top-0 z-50 border-b border-black/20 bg-white transition-opacity duration-700 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
        <div
          className={`flex items-center gap-3 transition-all duration-700 delay-100 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
          }`}
        >
          <div className="h-10 w-0.5 bg-[#c8102e]" />

          <Link
            to={LINKS.home}
            className="text-lg font-bold tracking-wide text-[#c8102e]"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            Montreal <span className="text-[#1e3a8a]">NACIVT</span> 2026
          </Link>
        </div>

        <nav
          className={`flex gap-8 text-xs font-medium uppercase tracking-widest text-black/70 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.home}>
            Home
          </Link>

          <Link
            className="hover:text-[#c8102e] transition-colors"
            to={LINKS.register}
          >
            Register
          </Link>

          {/* Tournament dropdown */}
          <div className="relative group">
            {/* Parent goes to hub page */}
            <Link
              to={LINKS.tournament}
              className="hover:text-[#c8102e] transition-colors"
            >
              Tournament
            </Link>

            {/* hover bridge wrapper */}
            <div className="absolute left-0 top-full pt-3 opacity-0 pointer-events-none transition-all duration-200 group-hover:opacity-100 group-hover:pointer-events-auto">
              <div className="w-44 border border-black/10 bg-white shadow-sm">
                {/* Hash links: use <a href> */}
                <a
                  href={LINKS.tournamentSchedule}
                  className="block px-4 py-2 hover:bg-black/5"
                >
                  Schedule
                </a>

                <a
                  href={LINKS.tournamentBracket}
                  className="block px-4 py-2 hover:bg-black/5"
                >
                  Bracket
                </a>

                <a
                  href={LINKS.tournamentRules}
                  className="block px-4 py-2 hover:bg-black/5"
                >
                  Rules
                </a>
              </div>
            </div>
          </div>

          <Link
            className="hover:text-[#c8102e] transition-colors"
            to={LINKS.festival}
          >
            Night Market
          </Link>

          {/* FAQ as its own top-level nav item (hash link) */}
          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.faq}>
  FAQ
</Link>

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.about}>
            About
          </Link>
        </nav>
      </div>
    </header>
  )
}
