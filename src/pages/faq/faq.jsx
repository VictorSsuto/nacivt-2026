import faqHero from "../../assets/montreal-skyline.jpg"
import { FadeIn } from "../../components/FadeIn"
import { useTranslation } from "react-i18next"

export default function FAQ() {
  const { t } = useTranslation()
  
  const faqs = [
    { q: t('faq.q1'), a: t('faq.a1') },
    { q: t('faq.q2'), a: t('faq.a2') },
    { q: t('faq.q3'), a: t('faq.a3') },
    { q: t('faq.q4'), a: t('faq.a4') },
    { q: t('faq.q5'), a: t('faq.a5') },
    { q: t('faq.q6'), a: t('faq.a6') },
    { q: t('faq.q7'), a: t('faq.a7') },
    { q: t('faq.q8'), a: t('faq.a8') },
    { q: t('faq.q9'), a: t('faq.a9') },
    { q: t('faq.q10'), a: t('faq.a10') },
  ]

  return (
    <>
      {/* Slim editorial hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={faqHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
        />

        {/* Brand overlays */}
        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                {t('faq.pageTitle')}
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                {t('faq.pageSubtitle')}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <section>
            <h2 className="text-3xl font-bold">{t('faq.title')}</h2>

            <div className="mt-8 space-y-6">
              {faqs.map((faq, index) => (
                <div key={index} className="rounded-sm border border-black/10 p-6">
                  <h3 className="text-lg font-semibold">{faq.q}</h3>
                  <p className="mt-2 text-black/70">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
