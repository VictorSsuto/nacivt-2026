import scheduleImg from "../../assets/schedule.jpg"
import bracketImg from "../../assets/bracket.jpg"
import ruleImg from "../../assets/rule.jpg"
import tournamentHero from "../../assets/tournament-hero.jpg"
import { FadeIn } from "../../components/FadeIn"
import { poolPlaySchedule, parseMatchCode } from "../../data/poolPlaySchedule"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"

const RULES_PDF = "/nacivt-rules-2023.pdf"

const scheduleDays = [
  {
    weekday: "Friday",
    date: "September 4th, 2026",
    venue: "Le Centre Sheraton Montréal Hotel",
    items: [
      { time: "2:00 pm – 5:00 pm", event: "NACIVT Montreal Pre 2000 OG Reunion" },
      { time: "3:00 pm – 9:00 pm", event: "Team Check In" },
      { time: "6:00 pm – 8:00 pm", event: "Captains' Meeting" },
    ],
  },
  {
    weekday: "Saturday",
    date: "September 5th, 2026",
    items: [
      { time: "7:00 am – 1:00 pm", event: "AM Wave Pool Play" },
      { time: "1:00 pm – 1:30 pm", event: "Opening Ceremony" },
      { time: "1:30 pm – 7:30 pm", event: "PM Wave Pool Play" },
      { time: "6:00 pm – 10:00 pm", event: "Night Market @ 1111 Boul. St. Laurent" },
      {
        time: "10:00 pm – 3:00 am",
        event: "Tournament Party @ Pangea, Old Montreal, 104 Rue St. Paul East",
      },
    ],
  },
  {
    weekday: "Sunday",
    date: "September 6th, 2026",
    items: [
      { time: "7:00 am – 1:00 pm", event: "AM Wave Pool Play" },
      { time: "1:00 pm – 7:00 pm", event: "PM Wave Pool Play" },
      { time: "TBD", event: "Potential Challenge & Double Elimination Matches" },
    ],
  },
  {
    weekday: "Monday",
    date: "September 7th, 2026",
    items: [
      { time: "7:00 am – 6:00 pm", event: "Playoffs" },
      { time: "TBD", event: "Awards Ceremony" },
    ],
  },
]

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="2">
      <rect x="3" y="4.5" width="18" height="16" rx="2" />
      <path strokeLinecap="round" d="M3 9.5h18M8 3v3M16 3v3" />
      <rect x="7" y="12.5" width="3" height="3" fill="currentColor" stroke="none" />
    </svg>
  )
}

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

const POOL_SCHEDULE_SHEET_URL =
  "https://docs.google.com/spreadsheets/d/1TLhL6qp7um5S-9S4DuVnlwmChBnENrPrMaGW0yWBmR4/edit?gid=1168560893#gid=1168560893"

export default function Tournament() {
  const [showPreview, setShowPreview] = useState(false)
  const [activeWave, setActiveWave] = useState("morning")
  const [teamSearch, setTeamSearch] = useState("")
  const wave = poolPlaySchedule[activeWave]
  const courtNumbers = useMemo(
    () => Object.keys(wave.courts).map(Number).sort((a, b) => a - b),
    [wave],
  )

  const matchedKeys = useMemo(() => {
    const term = teamSearch.trim().toLowerCase()
    const keys = new Set()
    if (!term) return keys
    for (const pool of wave.pools) {
      pool.teams.forEach((team, i) => {
        if (team.toLowerCase().includes(term)) {
          keys.add(`${pool.id}${i + 1}`)
        }
      })
    }
    return keys
  }, [wave, teamSearch])
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

  const location = useLocation()
  useEffect(() => {
    const id = location.hash?.slice(1)
    if (!id) return

    const scrollToTarget = () => {
      const target = document.getElementById(id)
      if (!target) return
      const header = document.querySelector("header.sticky")
      const headerHeight = header ? header.getBoundingClientRect().height : 0
      const top = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 8
      window.scrollTo({ top, behavior: "smooth" })
    }

    // Wait a frame for layout (tables, images, fonts) to settle before
    // measuring, then re-settle once web fonts finish swapping in.
    const raf = requestAnimationFrame(() => requestAnimationFrame(scrollToTarget))
    document.fonts?.ready?.then(scrollToTarget)
    return () => cancelAnimationFrame(raf)
  }, [location.hash])

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
            <p className="mt-4 max-w-3xl text-base text-black/70">
              Check-in, opening ceremony, pool play, playoffs, and everything
              in between over the NACIVT weekend.
            </p>

            <div className="mt-8 space-y-6">
              {scheduleDays.map((day) => (
                <div
                  key={day.weekday}
                  className="rounded-sm border border-black/10 bg-white p-6 shadow-sm sm:p-8"
                >
                  <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                    <div className="flex items-center gap-4 sm:w-52 sm:flex-shrink-0">
                      <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-[#275E6B] text-white">
                        <CalendarIcon />
                      </div>
                      <div>
                        <div
                          className="text-lg font-bold text-black"
                          style={{ fontFamily: "'Libre Baskerville', serif" }}
                        >
                          {day.weekday}
                        </div>
                        <div className="text-sm text-black/60">{day.date}</div>
                      </div>
                    </div>

                    <div className="flex-1 sm:border-l sm:border-black/10 sm:pl-8">
                      {day.venue && (
                        <div className="mb-4 text-sm font-semibold uppercase tracking-wide text-[#275E6B]">
                          {day.venue}
                        </div>
                      )}
                      <div className="space-y-3">
                        {day.items.map((item) => (
                          <div
                            key={item.time + item.event}
                            className="flex flex-col gap-1 sm:flex-row sm:gap-6"
                          >
                            <div className="text-sm font-medium text-black/60 sm:w-40 sm:flex-shrink-0">
                              {item.time}
                            </div>
                            <div className="text-sm text-black/90">{item.event}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section
            id="bracket"
            className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">Bracket</h2>
            <p className="mt-4 max-w-3xl text-base text-black/70">
              Pool assignments and court schedules for the morning and
              afternoon waves. Live bracket and results will appear here once
              pool play concludes.
            </p>

            {/* Controls: wave toggle, team search, source link */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-sm border border-black/10 bg-white p-1 shadow-sm">
                {Object.entries(poolPlaySchedule).map(([key, w]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveWave(key)}
                    className={`px-5 py-2 text-sm font-semibold uppercase tracking-wider transition-colors ${
                      activeWave === key
                        ? "bg-[#275E6B] text-white"
                        : "text-black/60 hover:text-black"
                    }`}
                  >
                    {w.label}
                  </button>
                ))}
              </div>

              <div className="relative flex-1 min-w-[220px] max-w-sm">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 fill-none stroke-black/40"
                  strokeWidth="2"
                >
                  <circle cx="11" cy="11" r="7" />
                  <path strokeLinecap="round" d="M21 21l-4.3-4.3" />
                </svg>
                <input
                  type="text"
                  value={teamSearch}
                  onChange={(e) => setTeamSearch(e.target.value)}
                  placeholder="Find your team…"
                  className="w-full border border-black/10 bg-white py-2 pl-9 pr-9 text-sm text-black placeholder:text-black/40 focus:border-[#275E6B] focus:outline-none"
                />
                {teamSearch && (
                  <button
                    type="button"
                    onClick={() => setTeamSearch("")}
                    aria-label="Clear search"
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-black/40 hover:text-black"
                  >
                    ✕
                  </button>
                )}
              </div>

              <a
                href={POOL_SCHEDULE_SHEET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-[#275E6B] underline decoration-black/20 underline-offset-4 hover:decoration-[#275E6B]"
              >
                View full spreadsheet ↗
              </a>
            </div>

            {teamSearch && (
              <p className="mt-3 text-sm text-black/50">
                {matchedKeys.size > 0
                  ? `Highlighting ${matchedKeys.size} match${matchedKeys.size === 1 ? "" : "es"} for "${teamSearch}" in the ${wave.label.toLowerCase()}.`
                  : `No teams in the ${wave.label.toLowerCase()} match "${teamSearch}".`}
              </p>
            )}

            {/* Pool assignments */}
            <div className="mt-10 flex items-baseline justify-between gap-4">
              <h3 className="text-xl font-bold">Pool Assignments</h3>
              <span className="text-sm text-black/50">{wave.timeRange}</span>
            </div>
            <div className="mt-6 overflow-x-auto rounded-sm border border-black/10 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#275E6B] text-white">
                    <th className="sticky left-0 z-10 whitespace-nowrap bg-[#275E6B] px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Team
                    </th>
                    {wave.pools.map((pool) => (
                      <th
                        key={pool.id}
                        className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      >
                        Pool {pool.id}
                        <div className="mt-0.5 text-[10px] font-normal normal-case tracking-normal text-white/70">
                          Court {pool.court}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[0, 1, 2, 3].map((i) => (
                    <tr
                      key={i}
                      className="border-t border-black/10 even:bg-black/[0.02]"
                    >
                      <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-4 py-3 text-sm font-medium text-black/70">
                        Team {i + 1}
                      </td>
                      {wave.pools.map((pool) => {
                        const isMatch = matchedKeys.has(`${pool.id}${i + 1}`)
                        return (
                          <td
                            key={pool.id}
                            className={`whitespace-nowrap border-l border-black/5 px-4 py-3 text-sm transition-colors ${
                              isMatch
                                ? "bg-[#F7D774]/60 font-semibold text-black"
                                : "text-black/80"
                            }`}
                          >
                            {pool.teams[i]}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Court schedule */}
            <div className="mt-12 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
              <h3 className="text-xl font-bold">Court Schedule</h3>
              {wave.ceremony && (
                <span className="text-sm font-semibold uppercase tracking-wide text-[#E25E3E]">
                  {wave.ceremony}
                </span>
              )}
            </div>
            <div className="mt-6 overflow-x-auto rounded-sm border border-black/10 bg-white shadow-sm">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="bg-[#275E6B] text-white">
                    <th className="sticky left-0 z-10 whitespace-nowrap bg-[#275E6B] px-4 py-3 text-xs font-semibold uppercase tracking-wider">
                      Time
                    </th>
                    {courtNumbers.map((court) => (
                      <th
                        key={court}
                        className="whitespace-nowrap px-4 py-3 text-xs font-semibold uppercase tracking-wider"
                      >
                        Court {court}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {wave.times.map((time, ti) => (
                    <tr
                      key={time}
                      className="border-t border-black/10 even:bg-black/[0.02]"
                    >
                      <td className="sticky left-0 z-10 whitespace-nowrap bg-white px-4 py-3 text-sm font-medium text-black/70">
                        {time}
                      </td>
                      {courtNumbers.map((court) => {
                        const code = wave.courts[court][ti]
                        const parsed = parseMatchCode(code)
                        const isMatch =
                          parsed &&
                          (matchedKeys.has(parsed.a) || matchedKeys.has(parsed.b))
                        return (
                          <td
                            key={court}
                            className={`whitespace-nowrap border-l border-black/5 px-4 py-3 text-sm transition-colors ${
                              isMatch ? "bg-[#F7D774]/60" : ""
                            }`}
                          >
                            {parsed ? (
                              <>
                                <div className="font-medium text-black">
                                  {parsed.a}
                                  <span className="text-black/30"> v </span>
                                  {parsed.b}
                                </div>
                                <div className="text-xs uppercase tracking-wide text-black/40">
                                  ref {parsed.ref}
                                </div>
                              </>
                            ) : (
                              code
                            )}
                          </td>
                        )
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-black/50">
              Match codes read as team v team, refereed by the noted team
              (e.g. A1 v A4, ref B4).
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
