import { useState, useEffect } from "react"
import { LINKS } from "./data/links"
import skyline from "./assets/montreal-skyline.jpg"
import { Link, useNavigate, useLocation } from "react-router-dom"
import "./App.css"
import TournamentDetails from "./components/TournamentDetails"
import { FadeIn } from "./components/FadeIn"

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <>
      <Home isLoaded={isLoaded} />
    </>
  )
}

function Home({ isLoaded }) {
  return (
    <>
      {/* Full-width hero */}
      <Hero isLoaded={isLoaded} />

      {/* Stats Section (on scroll) */}
      <FadeIn variant="up" delay={0}>
        <StatsSection />
      </FadeIn>

      {/* Content below hero (on scroll) */}
      <main className="mx-auto max-w-5xl px-6 py-20">
        <FadeIn variant="up" delay={0}>
          <IntroBlock />
        </FadeIn>
      </main>

      <section className="border-t-2 border-black/10 bg-[#faf8f3] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn variant="up" delay={0}>
            <CountdownSection />
          </FadeIn>
        </div>
      </section>

      {/* Tournament details (temporary) */}
      <section className="border-t-2 border-black/10 bg-[#ffffff] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FadeIn variant="up" delay={0}>
            <TournamentDetails />
          </FadeIn>
        </div>
      </section>
    </>
  )
}

function Hero({ isLoaded }) {
  const navigate = useNavigate()
  const location = useLocation()
  return (
    <section className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
      <img
        src={skyline}
        alt="Montreal skyline"
        className={`absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_33%] transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Newspaper-style overlay */}
      <div className="absolute inset-0 bg-[#1e3a8a]/80" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="max-w-3xl text-white">
            <div
              className={`text-xs font-medium uppercase tracking-[0.2em] text-white/80 mb-6 transition-all duration-700 delay-300 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Montreal • Labour Day Weekend • North American Chinese Invitational
            </div>

            <div
              className={`border-l-2 border-[#c8102e] pl-6 mb-8 transition-all duration-700 delay-500 ${
                isLoaded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-4"
              }`}
            >
              <h1
                className="text-5xl font-bold leading-[1.1] tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                <span
                  className={`block text-white transition-all duration-700 delay-600 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  Montreal
                </span>
                <span
                  className={`block text-[#d4af37] mt-1 transition-all duration-700 delay-700 ${
                    isLoaded
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4"
                  }`}
                >
                  NACIVT 2026
                </span>
              </h1>
            </div>

            <p
              className={`max-w-xl text-lg leading-relaxed text-white/95 mb-10 transition-all duration-700 delay-800 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              Welcome back to the heart of Montreal's Chinatown for a weekend of
              elite volleyball, community, and celebration.
            </p>

            <div
              className={`flex flex-wrap gap-3 transition-all duration-700 delay-1000 ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4"
              }`}
            >
              <Link
                to={LINKS.register}
                className="border border-[#c8102e] bg-[#c8102e] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#8b0000] hover:border-[#8b0000]"
              >
                Register Now
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  if (location.pathname === "/") {
                    const el = document.getElementById("tournament-details")
                    if (el) {
                      el.scrollIntoView({ behavior: "smooth", block: "start" })
                    } else {
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  } else {
                    navigate("/#tournament-details")
                  }
                }}
                className="border border-white/50 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
              >
                Latest Updates
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  const stats = [
    { number: "200+", label: "Teams Competing" },
    { number: "3", label: "Days of Competition" },
    { number: "4000+", label: "Expected Attendees" },
    { number: "80+", label: "Years of Tradition" },
  ]

  return (
    <section className="relative -mt-12 z-20 mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-px md:grid-cols-4 bg-black/10">
        {stats.map((stat, idx) => (
          <FadeIn key={idx} variant="up" delay={200 + idx * 120}>
            <div className="bg-white p-8 text-center">
              <div
                className="text-4xl font-bold text-[#c8102e] mb-3"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                {stat.number}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-black/60">
                {stat.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}

function IntroBlock() {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left: Main article-style content */}
        <FadeIn className="lg:col-span-8" variant="up" delay={0}>
          <div>
            <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-4">
              Tournament Preview
            </div>
            <h2
              className="text-4xl font-bold tracking-tight text-black mb-6"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Volleyball. <span className="text-[#c8102e]">Culture.</span>{" "}
              <span className="text-[#1e3a8a]">Tradition.</span>
            </h2>

            <div className="h-px w-16 bg-black/20 mb-8"></div>

            <p className="text-lg leading-relaxed text-black/80 mb-6">
              Montreal NACIVT returns to the heart of Chinatown for a weekend that
              blends elite 9-man volleyball with community, history, and
              celebration.
            </p>

            <p className="text-lg leading-relaxed text-black/80">
              For generations, NACIVT has brought together teams and families
              from across North America. In 2026, we continue that tradition
              with competition, culture, and connection.
            </p>
          </div>
        </FadeIn>

        {/* Right: Key details sidebar */}
        <FadeIn className="lg:col-span-4" variant="up" delay={120}>
          <div className="border-l-2 border-black/20 pl-6">
            <div className="text-xs font-medium uppercase tracking-widest text-black/60 mb-6">
              Event Details
            </div>
            <dl className="space-y-6">
              <Detail label="Dates" value="Labour Day Weekend, 2026" />
              <Detail label="Location" value="Palais des Congrès" />
              <Detail label="Format" value="9-Man Volleyball + Night Market" />
              <Detail label="Contact" value="contact@nacivt.com" />
            </dl>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Tournament start: Aug 30, 2026 at 00:00 Eastern Time (EDT is -04:00 in late August)
    const targetDate = new Date("2026-08-30T00:00:00-04:00")

    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / (1000 * 60)) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    updateCountdown()
    const interval = setInterval(updateCountdown, 1000)
    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <section className="py-12">
      <FadeIn variant="up" delay={0}>
        <div className="text-center mb-12">
          <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">
            Countdown
          </div>
          <h2
            className="text-3xl font-bold tracking-tight text-black mb-2"
            style={{ fontFamily: "'Libre Baskerville', serif" }}
          >
            NACIVT 2026
          </h2>
          <div className="h-px w-16 bg-black/20 mx-auto my-4"></div>
          <p className="text-sm text-black/60 uppercase tracking-wider">
            Labour Day Weekend • Aug 30 – Sep 1, 2026
          </p>
        </div>
      </FadeIn>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-3xl mx-auto">
        {timeUnits.map((unit, idx) => (
          <FadeIn key={idx} variant="up" delay={150 + idx * 120}>
            <div className="text-center border-r border-black/10 last:border-r-0 pr-6 last:pr-0">
              <div
                className="text-4xl font-bold text-[#c8102e] mb-2"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                {unit.value}
              </div>
              <div className="text-xs font-medium uppercase tracking-wider text-black/60">
                {unit.label}
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  )
}


function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
        {label}
      </dt>
      <dd className="text-base font-semibold text-black/90">{value}</dd>
    </div>
  )
}
