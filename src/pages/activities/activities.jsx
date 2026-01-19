import activitiesHero from "../../assets/activities.jpg"
import { FadeIn } from "../../components/FadeIn"

export default function Activities() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={activitiesHero}
          alt="Activities"
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
        />

        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Montreal Activities & Tourism
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Explore things to do in Montreal while attending NACIVT 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <section id="activities">
            <h2 className="text-3xl font-bold">Activities</h2>
            <p className="mt-4 text-base text-black/70">
              This section lists general Montreal tourism activities not related
              to NACIVT — attractions, tours, dining, parks, and other local
              experiences visitors may enjoy while in the city.
            </p>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
