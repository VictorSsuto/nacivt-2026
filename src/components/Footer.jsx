import { useTranslation } from "react-i18next"

export default function Footer({ isLoaded, hasTopDivider = true }) {
  const { t } = useTranslation()
  const topBorderClass = hasTopDivider ? 'border-t border-black/10' : ''

  return (
    <footer
      className={`${topBorderClass} bg-gradient-to-r from-[#071233] to-[#1e3a8a] mt-0 text-white transition-all duration-500 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 py-12 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-white text-sm uppercase tracking-wider">
            {t('footer.followTitle')}
          </h2>

          <div className="h-px w-12 bg-[#d4af37]/30" />

          <a
            href="#"
            aria-label="Instagram (add link later)"
            className="inline-flex items-center justify-center w-12 h-12 rounded-md
                       text-white/80 hover:text-[#c8102e]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M7 2C4.243 2 2 4.243 2 7v10c0 2.757 2.243 5 5 5h10c2.757 0 5-2.243 5-5V7c0-2.757-2.243-5-5-5H7zm10 2c1.654 0 3 1.346 3 3v10c0 1.654-1.346 3-3 3H7c-1.654 0-3-1.346-3-3V7c0-1.654 1.346-3 3-3h10z" />
              <path d="M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2a2.5 2.5 0 110 5 2.5 2.5 0 010-5zM17.5 6.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="text-center text-xs text-white/70 pb-4">
        {t('footer.copyright', { year: new Date().getFullYear() })}
      </div>
    </footer>
  )
}
