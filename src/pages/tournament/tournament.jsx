import scheduleImg from "../../assets/schedule.jpg"
import bracketImg from "../../assets/bracket.jpg"
import ruleImg from "../../assets/rule.jpg"
import tournamentHero from "../../assets/tournament-hero.jpg"
import { FadeIn } from "../../components/FadeIn"
import { useCallback, useState } from "react"

const RULES_PDF = "/nacivt-rules-2023.pdf"

const keyRules = [
  {
    ref: "M2.1",
    title: "Player eligibility",
    text: "Players must be of Asian descent, in whole or in part, with origins in one of the approved countries (China, Hong Kong, Taiwan, Vietnam, Philippines, Japan, Korea, and more). Bring documentation supporting your eligibility, as the burden of proof is on the player.",
  },
  {
    ref: "M2.2",
    title: "The content rule",
    text: "At all times, 6 of the 9 players on court must be of Chinese descent: five 100% Chinese and the sixth at least 50%. The remaining three players must be of Asian descent. In effect since the 78th NACIVT (2023).",
  },
  {
    ref: "M4.1 / M4.3",
    title: "Court and net",
    text: "The 9-man court is bigger than standard: 66 by 33 feet, with the net at 7 ft 8½ in. No structures within 5 feet of the lines.",
  },
  {
    ref: "M5.1 / M5.2",
    title: "Rosters",
    text: "Up to 18 players per team: 9 regulars and 9 substitutes. Only players submitted before the tournament starts may play, and servers need clear, legible numbers.",
  },
  {
    ref: "M6.3",
    title: "Serving",
    text: "You have 7 seconds after the referee's whistle to start your serve, with at least part of one foot on the ground at contact. A foot fault costs your team the serve and a point.",
  },
  {
    ref: "M2.1B",
    title: "Eligibility checks",
    text: "A captain or coach may contest an opposing player's eligibility before or during any match. Players who cannot prove eligibility are barred until they can.",
  },
]

export default function Tournament() {
  const [showPreview, setShowPreview] = useState(false)
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
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_40%]"
        />

        {/* Brand overlays */}
        <div className="absolute inset-0 bg-black/45" />

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
            <h2 className="text-xl leading-relaxed text-black/70">
              Everything you need for game day.
            </h2>
            <p className="mt-3 text-base text-black/60">
              Game times, bracket progression, and the official 9-man rulebook
              will all live here. Check back as we finalize the details.
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
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 [transform:translateZ(0)]"
                />
                <div className="absolute inset-0 bg-black/50" />
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
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 [transform:translateZ(0)]"
                />
                <div className="absolute inset-0 bg-black/50" />
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
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 will-change-transform group-hover:scale-110 [transform:translateZ(0)]"
                />
                <div className="absolute inset-0 bg-black/50" />
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
              Game times and court assignments for all three days will be
              posted here closer to the tournament.
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
              Live bracket and results will appear here once pool play begins.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section
            id="rules"
            className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">Rules</h2>
            <p className="mt-4 max-w-3xl text-base text-black/70">
              The official NACIVT rulebook for the men's and women's
              divisions, as approved by the NACVA (August 2023). The
              highlights below are the rules every player should know before
              stepping on the court. When in doubt, the full rulebook governs.
            </p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {keyRules.map((rule) => (
                <div
                  key={rule.ref}
                  className="rounded-sm border border-black/10 bg-white p-6 shadow-sm"
                >
                  <div className="text-xs font-medium uppercase tracking-wider text-[#E25E3E]">
                    Rule {rule.ref}
                  </div>
                  <h3 className="mt-2 text-lg font-semibold text-black">
                    {rule.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-black/70">
                    {rule.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setShowPreview((v) => !v)}
                className="border border-[#275E6B] bg-[#275E6B] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:opacity-90"
              >
                {showPreview ? "Hide preview" : "Preview the full rulebook"}
              </button>
              <a
                href={RULES_PDF}
                target="_blank"
                rel="noopener noreferrer"
                className="border border-[#275E6B] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#275E6B] transition-colors hover:bg-[#275E6B] hover:text-white"
              >
                Open PDF in new tab
              </a>
            </div>

            {showPreview && (
              <div className="mt-6 overflow-hidden rounded-sm border border-black/10 shadow-sm">
                <iframe
                  src={RULES_PDF}
                  title="Official NACIVT rulebook (PDF preview)"
                  className="h-[75vh] w-full"
                />
              </div>
            )}

            <p className="mt-6 text-sm text-black/50">
              Women's division rules (W1.0 to W10.0) follow the same structure
              and are included in the same document. Last officially board
              approved August 30, 2023.
            </p>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
