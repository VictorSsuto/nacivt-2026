import foodHero from "../../assets/festival.jpg"
import dobeAndyFlyer from "../../assets/dobe-andy-flyer.jpg"
import { FadeIn } from "../../components/FadeIn"

const partners = [
  {
    name: "Dobe & Andy 楓林",
    cuisine: "Hong Kong BBQ",
    established: "1982",
    perk: "10% off with your NACIVT wristband or badge",
    description:
      "A Montreal Chinatown institution since 1982. Hanging BBQ pork and duck, roast meat over rice, and noodle plates built for post-match appetites.",
    address: "1071 Rue Saint-Urbain R-12, Montréal, QC H2Z 1C2",
    phone: "(514) 861-9958",
    teamOrders: "William · +1 (438) 492-9911",
    instagram: "@dobeandandy",
    instagramUrl: "https://www.instagram.com/dobeandandy",
    maps: "https://maps.google.com/?q=1071+Rue+Saint-Urbain+Montreal",
    image: dobeAndyFlyer,
  },
]

function PartnerCard({ partner }) {
  return (
    <section className="overflow-hidden rounded-sm border border-black/10 shadow-sm">
      <div className="flex items-center justify-center bg-white p-4">
        <img
          src={partner.image}
          alt={`${partner.name} promotional flyer for NACIVT teams`}
          loading="lazy"
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="bg-white p-8 sm:p-10">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#E25E3E] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            Food Partner
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-black/50">
            {partner.cuisine} · Est. {partner.established}
          </span>
        </div>

        <h2
          className="text-2xl sm:text-3xl font-bold tracking-tight text-black"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          {partner.name}
        </h2>

        <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
          {partner.description}
        </p>

        <div className="mt-5 inline-block border border-[#E25E3E]/40 bg-[#E25E3E]/10 px-4 py-2 text-sm font-semibold text-[#C14524]">
          {partner.perk}
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
              Address
            </dt>
            <dd className="text-sm font-semibold text-black/90">
              {partner.address}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
              Phone
            </dt>
            <dd className="text-sm font-semibold text-black/90">
              {partner.phone}
            </dd>
          </div>
          <div>
            <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
              Team Orders
            </dt>
            <dd className="text-sm font-semibold text-black/90">
              {partner.teamOrders}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center gap-6">
          <a
            href={partner.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
          >
            Get directions
          </a>
          <a
            href={partner.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
          >
            {partner.instagram} on Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

export default function Food() {
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

        <div className="mt-16 space-y-16">
          {partners.map((partner) => (
            <FadeIn key={partner.name}>
              <PartnerCard partner={partner} />
            </FadeIn>
          ))}
        </div>
      </main>
    </>
  )
}
