import foodHero from "../../assets/festival.jpg"
import dobeAndyFlyer from "../../assets/dobe-andy-flyer.jpg"
import teashopLogo from "../../assets/teashop-logo.png"
import { FadeIn } from "../../components/FadeIn"
import { useEffect, useState } from "react"

const partners = [
  {
    name: "Dobe & Andy 楓林",
    cuisine: "Hong Kong BBQ",
    established: "1982",
    perk: "10% off with your NACIVT wristband or badge",
    description:
      "A Montreal Chinatown institution since 1982. Hanging BBQ pork and duck, roast meat over rice, and noodle plates built for post-match appetites.",
    details: [
      { label: "Address", value: "1071 Rue Saint-Urbain R-12\nMontréal, QC H2Z 1C2" },
      { label: "Phone", value: "(514) 861-9958" },
      { label: "Team Orders", value: "William · +1 (438) 492-9911" },
    ],
    instagram: "@dobeandandy",
    instagramUrl: "https://www.instagram.com/dobeandandy",
    maps: "https://maps.google.com/?q=1071+Rue+Saint-Urbain+Montreal",
    image: dobeAndyFlyer,
    imageAlt: "Dobe & Andy promotional flyer for NACIVT teams",
  },
  {
    name: "#Teashop",
    cuisine: "Bubble Tea",
    perk: "20% off with code NACIVT20",
    description:
      "Cool down between games with bubble tea in the heart of Chinatown. #Teashop welcomes NACIVT players and participants for tournament weekend.",
    details: [
      { label: "Location", value: "Montreal Chinatown" },
      { label: "Valid", value: "September 5–7, 2026" },
      { label: "Promo Code", value: "NACIVT20" },
    ],
    notice: "Mention the code when ordering in store.",
    maps: "https://maps.google.com/?q=Teashop+Montreal+Chinatown",
    image: teashopLogo,
    imageAlt: "#Teashop logo",
  },
]

function PartnerCard({ partner, onImageClick }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-black/10 bg-white shadow-sm">
      <button
        type="button"
        onClick={() => onImageClick(partner)}
        aria-label={`Zoom in on ${partner.imageAlt}`}
        className="group flex cursor-zoom-in items-center justify-center overflow-hidden bg-white p-4"
      >
        <img
          src={partner.image}
          alt={partner.imageAlt}
          loading="lazy"
          className="h-auto w-full max-h-40 object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </button>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <span className="bg-[#E25E3E] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            Food Partner
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-black/50">
            {partner.cuisine}
            {partner.established ? ` · Est. ${partner.established}` : ""}
          </span>
        </div>

        <h2
          className="text-xl font-bold tracking-tight text-black"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          {partner.name}
        </h2>

        <p className="mt-3 text-sm leading-6 text-black/70">
          {partner.description}
        </p>

        <div className="mt-4 inline-block self-start border border-[#E25E3E]/40 bg-[#E25E3E]/10 px-3 py-1.5 text-sm font-semibold text-[#C14524]">
          {partner.perk}
        </div>

        <dl className="mt-5 grid grid-cols-1 gap-3">
          {partner.details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                {detail.label}
              </dt>
              <dd className="text-sm font-semibold text-black/90 whitespace-pre-line">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>

        {partner.notice && (
          <p className="mt-4 text-sm leading-6 text-black/70">
            {partner.notice}
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <a
            href={partner.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
          >
            Get directions
          </a>
          {partner.instagramUrl && (
            <a
              href={partner.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
            >
              {partner.instagram} on Instagram
            </a>
          )}
        </div>
      </div>
    </article>
  )
}

function Lightbox({ image, alt, onClose }) {
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 p-6 animate-fade-in"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor">
          <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <img
        src={image}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] cursor-default object-contain shadow-2xl"
      />
    </div>
  )
}

export default function Food() {
  const [lightboxPartner, setLightboxPartner] = useState(null)

  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={foodHero}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%]"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Food Collaborations
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Chinatown restaurants offering NACIVT teams a deal for
                tournament weekend.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="page-section-title text-black">
              Eat well between matches.
            </h2>
            <div className="h-px w-16 bg-black/20 my-6"></div>
            <p className="text-lg leading-8 text-black/70">
              We've teamed up with local Chinatown spots so visiting teams,
              families, and friends get a warm welcome and a good deal.
              Mention NACIVT or show your wristband to redeem.
            </p>
          </div>
        </FadeIn>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {partners.map((partner) => (
            <FadeIn key={partner.name}>
              <PartnerCard partner={partner} onImageClick={setLightboxPartner} />
            </FadeIn>
          ))}
        </div>
      </main>

      {lightboxPartner && (
        <Lightbox
          image={lightboxPartner.image}
          alt={lightboxPartner.imageAlt}
          onClose={() => setLightboxPartner(null)}
        />
      )}
    </>
  )
}
