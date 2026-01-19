import scheduleImg from "../../assets/schedule.jpg"
import bracketImg from "../../assets/bracket.jpg"
import ruleImg from "../../assets/rule.jpg"
import tournamentHero from "../../assets/tournament-hero.jpg"
import { FadeIn } from "../../components/FadeIn"
import { useCallback } from "react"

export default function Tournament() {
  const handleCardClick = useCallback((e, id) => {
    e.preventDefault()
    const link = e.currentTarget

    // quick press animation
    link.classList.add("scale-95")
    setTimeout(() => link.classList.remove("scale-95"), 150)

    // compute target and header offset
    const target = document.getElementById(id)
    const header = document.querySelector("header.sticky")
    const headerHeight = header ? header.getBoundingClientRect().height : 0

    if (target) {
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8
      window.scrollTo({ top, behavior: "smooth" })
    } else {
      // fallback to hash navigation
      window.location.hash = id
    }
  }, [])

  return (
    <>
      {/* Slim editorial hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={tournamentHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_40%]"
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
                Tournament
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Schedule, brackets, and rules for NACIVT 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="text-xl leading-relaxed text-black/70">
              <h2>Welcome to the tournament hub!</h2>
            </p>
            <p className="mt-3 text-base text-black/60">
              Stay tuned for updates as we finalize the details.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <section className="mt-16 grid gap-8 md:grid-cols-3">
          {/* Schedule */}
          <FadeIn delay={0}>
            <div className="shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <a
                href="#schedule"
                onClick={(e) => handleCardClick(e, "schedule")}
                className="group relative block h-72 overflow-hidden rounded-sm transition-transform duration-150 active:scale-95"
              >
                <img
                  src={scheduleImg}
                  alt="Schedule"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 [transform:translateZ(0)]"
                />
                <div className="absolute inset-0 bg-[#1e3a8a]/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Tournament
                  </div>
                  <div className="mt-3 text-2xl font-bold">Schedule</div>
                  <div className="mt-2 text-sm text-white/70">
                    View game times and venues
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Bracket */}
          <FadeIn delay={120}>
            <div className="shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <a
                href="#bracket"
                onClick={(e) => handleCardClick(e, "bracket")}
                className="group relative block h-72 overflow-hidden rounded-sm transition-transform duration-150 active:scale-95"
              >
                <img
                  src={bracketImg}
                  alt="Bracket"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 [transform:translateZ(0)]"
                />
                <div className="absolute inset-0 bg-[#1e3a8a]/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Tournament
                  </div>
                  <div className="mt-3 text-2xl font-bold">Bracket</div>
                  <div className="mt-2 text-sm text-white/70">
                    Track tournament progression
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Rules */}
          <FadeIn delay={240}>
            <div className="shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <a
                href="#rules"
                onClick={(e) => handleCardClick(e, "rules")}
                className="group relative block h-72 overflow-hidden rounded-sm transition-transform duration-150 active:scale-95"
              >
                <img
                  src={ruleImg}
                  alt="Rules"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 [transform:translateZ(0)]"
                />
                <div className="absolute inset-0 bg-[#1e3a8a]/40 mix-blend-multiply" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Tournament
                  </div>
                  <div className="mt-3 text-2xl font-bold">Rules</div>
                  <div className="mt-2 text-sm text-white/70">
                    Official tournament guidelines
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>
        </section>

        {/* Sections */}
        <FadeIn>
          <section
            id="schedule"
            className="scroll-mt-28 mt-24 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">Schedule</h2>
            <p className="mt-4 text-base text-black/70">
              Schedule to be posted.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section
            id="bracket"
            className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">Bracket</h2>
            <p className="mt-4 text-base text-black/70">
              Bracket to be posted.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section
            id="rules"
            className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">Rules</h2>
            <p className="mt-4 text-base text-black/70">
              Rules to be posted.
            </p>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
