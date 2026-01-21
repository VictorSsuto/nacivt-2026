import { LINKS } from "../data/links"
import { Link } from "react-router-dom"
import { useTranslation } from "react-i18next"

export default function Navbar({ isLoaded }) {
  const { t, i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'fr' : 'en'
    i18n.changeLanguage(newLang)
  }

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
          className={`flex items-center gap-6 text-xs md:text-xs font-medium uppercase tracking-wide text-black/70 transition-all duration-700 delay-200 ${
            isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
          }`}
        >
        

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.register}>
            {t('nav.register')}
          </Link>

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.tournament}>
            {t('nav.tournament')}
          </Link>

          <Link
            className="hover:text-[#c8102e] transition-colors"
            to={LINKS.festival}
          >
            {t('nav.nightMarket')}
          </Link>
          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.shop}>
            {t('nav.shop')}
          </Link>

          {/* FAQ as its own top-level nav item (hash link) */}
          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.faq}>
            {t('nav.faq')}
          </Link>

          <Link className="hover:text-[#c8102e] transition-colors" to={LINKS.about}>
            {t('nav.about')}
          </Link>
          
          {/* Language switcher */}
          <button
            onClick={toggleLanguage}
            className="ml-2 px-3 py-1 text-xs font-bold uppercase border border-[#c8102e] text-[#c8102e] hover:bg-[#c8102e] hover:text-white transition-colors rounded"
            aria-label="Toggle language"
          >
            {i18n.language === 'en' ? 'FR' : 'EN'}
          </button>
        </nav>
      </div>
    </header>
  )
}
