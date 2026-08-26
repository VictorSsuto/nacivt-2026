import passesHero from "../../assets/orange-julep.jpg"
import { FadeIn } from "../../components/FadeIn"

const ZEFFY_URL =
  "https://www.zeffy.com/en-CA/ticketing/the-81st-nacivt-montreal--2026"

const PASSES = [
  {
    name: "Weekend Pass (3 Days)",
    price: 25,
    tagline: "Best value for the full tournament",
    description:
      "Entry to the Palais des Congrès for all three days of the NACIVT Montreal 2026. Includes 3 colour-coded bracelets, one per day, that must be worn at all times inside the venue.",
  },
  {
    name: "Single Day Pass",
    price: 10,
    tagline: "Drop in for one day of the action",
    description:
      "Entry to the Palais des Congrès for one day of your choice. Includes 1 colour-coded bracelet for that day, which must be worn at all times inside the venue.",
  },
]

function PassCard({ pass }) {
  return (
    <article className="overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md">
      <div className="border-t-4 border-[#275E6B] p-6">
        <div className="text-xs font-semibold uppercase tracking-widest text-[#E25E3E]">
          {pass.tagline}
        </div>

        <div className="mt-3 flex items-start justify-between gap-3">
          <h3 className="text-xl font-semibold tracking-tight text-black">
            {pass.name}
          </h3>
          <div className="shrink-0 text-xl font-bold text-[#275E6B]">
            ${pass.price} CAD
          </div>
        </div>

        <p className="mt-3 text-sm leading-relaxed text-black/60">
          {pass.description}
        </p>

        <a
          href={ZEFFY_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-block w-full rounded-sm bg-[#275E6B] px-6 py-3 text-center text-sm font-semibold text-white transition hover:opacity-90"
        >
          Get the {pass.name} →
        </a>
      </div>
    </article>
  )
}

export default function SpectatorPasses() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={passesHero}
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
                className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Spectator Passes
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Come watch the 81st NACIVT live at the Palais des congrès de
                Montréal, September 5–7, 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <section id="spectator-passes" className="mt-4">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="page-section-title text-black">
                Get your spectator pass
              </h2>
              <div className="h-px w-16 bg-black/20 my-6"></div>
              <p className="page-body-lead text-black/70">
                Passes are sold through our Zeffy store and grant entry to the
                tournament hall at the Palais des congrès de Montréal, 1001
                Pl. Jean-Paul-Riopelle.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2">
              {PASSES.map((pass) => (
                <PassCard key={pass.name} pass={pass} />
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={140}>
            <div className="mt-10 max-w-3xl rounded-sm border-l-4 border-[#E25E3E] bg-[#F6F0E4] p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-black">
                Good to know
              </h3>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-black/75">
                <li>
                  A bracelet must be worn at all times while inside the
                  tournament venue — one colour per day.
                </li>
                <li>
                  <strong>Free admission</strong> for seniors 65+ and children
                  under 10. No purchase required — bracelets are issued daily
                  at entry with government ID verification.
                </li>
                <li>
                  Live volleyball is in play throughout the venue. Stray balls
                  can enter spectator areas, so please stay alert while
                  courtside.
                </li>
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={180}>
            <div className="mt-16 flex flex-col items-center gap-3 text-center">
              <a
                href={ZEFFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-[#275E6B] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
              >
                Buy spectator passes on Zeffy →
              </a>
              <p className="text-sm text-black/50">
                Opens in a new tab · Weekend Pass $25 CAD · Single Day Pass
                $10 CAD
              </p>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  )
}
