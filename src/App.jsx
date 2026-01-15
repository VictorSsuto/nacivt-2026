import { useState, useEffect } from "react"
import { LINKS } from "./data/links"
import skyline from "./assets/montreal-skyline.jpg"
import { Link } from "react-router-dom"
import "./App.css"

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

      {/* Stats Section */}
      <StatsSection isLoaded={isLoaded} />

      {/* Content below hero */}
      <main className="mx-auto max-w-5xl px-6 py-20">
        <IntroBlock isLoaded={isLoaded} />
      </main>

      {/* Secondary content with more spacing */}
      <section className="border-t-2 border-black/10 bg-[#faf8f3] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <FeatureCards isLoaded={isLoaded} />
        </div>
      </section>

      <section className="border-t-2 border-black/10 py-20">
        <div className="mx-auto max-w-5xl px-6">
          <CountdownSection isLoaded={isLoaded} />
        </div>
      </section>

      <section className="border-b-2 border-black/10 bg-[#faf8f3] py-20">
        <div className="mx-auto max-w-5xl px-6">
          <CulturalSection isLoaded={isLoaded} />
        </div>
      </section>
    </>
  )
}




function Hero({ isLoaded }) {
  return (
    <section className="relative h-[60vh] min-h-[450px] w-full overflow-hidden">
      <img
        src={skyline}
        alt="Montreal skyline"
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
      />

      {/* Newspaper-style overlay */}
      <div className="absolute inset-0 bg-[#1e3a8a]/80" />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="max-w-3xl text-white">
            <div className={`text-xs font-medium uppercase tracking-[0.2em] text-white/80 mb-6 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Montreal • Labour Day Weekend • North American Chinese Invitational
            </div>

            <div className={`border-l-2 border-[#c8102e] pl-6 mb-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                <span className={`block text-white transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>Montreal</span>
                <span className={`block text-[#d4af37] mt-1 transition-all duration-700 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>NACIVT 2026</span>
              </h1>
            </div>

            <p className={`max-w-xl text-lg leading-relaxed text-white/95 mb-10 transition-all duration-700 delay-800 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              Welcome back to the heart of Montreal's Chinatown for a weekend of elite volleyball,
              community, and celebration.
            </p>

            <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Link
                to={LINKS.register}
                className="border border-[#c8102e] bg-[#c8102e] px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-[#8b0000] hover:border-[#8b0000]"
              >
                Register Now
              </Link>
              <Link
                to={LINKS.schedule}
                className="border border-white/50 bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-white/10"
              >
                Latest Updates
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection({ isLoaded }) {
  const stats = [
    { number: "50+", label: "Teams Competing" },
    { number: "3", label: "Days of Competition" },
    { number: "1000+", label: "Expected Attendees" },
    { number: "40+", label: "Years of Tradition" },
  ]

  return (
    <section className="relative -mt-12 z-20 mx-auto max-w-5xl px-6">
      <div className="grid grid-cols-2 gap-px md:grid-cols-4 bg-black/10">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className={`bg-white p-8 text-center transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${1200 + idx * 100}ms` }}
          >
            <div className="text-4xl font-bold text-[#c8102e] mb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              {stat.number}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-black/60">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function IntroBlock({ isLoaded }) {
  return (
    <section className="mt-12">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-12">
        {/* Left: Main article-style content */}
        <div className={`lg:col-span-8 transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-4">
            Tournament Preview
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-black mb-6" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Volleyball. <span className="text-[#c8102e]">Culture.</span>{" "}
            <span className="text-[#1e3a8a]">Tradition.</span>
          </h2>

          <div className="h-px w-16 bg-black/20 mb-8"></div>

          <p className="text-lg leading-relaxed text-black/80 mb-6">
            Montreal NACIVT returns to the heart of Chinatown for a weekend that blends
            elite 9-man volleyball with community, history, and celebration.
          </p>

          <p className="text-lg leading-relaxed text-black/80">
            For generations, NACIVT has brought together teams and families from across
            North America. In 2026, we continue that tradition with competition, culture,
            and connection.
          </p>
        </div>

        {/* Right: Key details sidebar */}
        <div className={`lg:col-span-4 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <div className="border-l-2 border-black/20 pl-6">
            <div className="text-xs font-medium uppercase tracking-widest text-black/60 mb-6">
              Event Details
            </div>
            <dl className="space-y-6">
              <Detail label="Dates" value="Labour Day Weekend, 2026" />
              <Detail label="Location" value="Montreal Chinatown" />
              <Detail label="Format" value="9-Man Volleyball + Festival" />
              <Detail label="Contact" value="contact@nacivt.com" />
            </dl>
          </div>
        </div>
      </div>
    </section>
  )
}

function FeatureCards({ isLoaded }) {
  const features = [
    {
      title: "Elite Competition",
      description: "Top-tier 9-man volleyball teams from across North America compete for glory.",
    },
    {
      title: "Cultural Festival",
      description: "Experience traditional Chinese culture, food, and community celebrations.",
    },
    {
      title: "Montreal Experience",
      description: "Explore the vibrant Chinatown and rich cultural heritage of Montreal.",
    },
    {
      title: "Community Connection",
      description: "Connect with generations of players, families, and volleyball enthusiasts.",
    },
  ]

  return (
    <section>
      <div className={`mb-12 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">
          Tournament Highlights
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          What to Expect
        </h2>
        <div className="h-px w-16 bg-black/20"></div>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className={`border-b border-black/10 pb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${400 + idx * 100}ms` }}
          >
            <h3 className="text-xl font-bold text-black mb-3" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              {feature.title}
            </h3>
            <p className="text-base leading-relaxed text-black/70">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function CountdownSection({ isLoaded }) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set target date to Labour Day Weekend 2026 (first Monday in September)
    const targetDate = new Date("2026-09-05T00:00:00")
    
    const updateCountdown = () => {
      const now = new Date()
      const difference = targetDate - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
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
      <div className={`text-center mb-12 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">
          Countdown
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-2" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          NACIVT 2026
        </h2>
        <div className="h-px w-16 bg-black/20 mx-auto my-4"></div>
        <p className="text-sm text-black/60 uppercase tracking-wider">
          Labour Day Weekend • September 5-7, 2026
        </p>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-4 max-w-3xl mx-auto">
        {timeUnits.map((unit, idx) => (
          <div
            key={idx}
            className={`text-center border-r border-black/10 last:border-r-0 pr-6 last:pr-0 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${400 + idx * 100}ms` }}
          >
            <div className="text-4xl font-bold text-[#c8102e] mb-2" style={{ fontFamily: "'Libre Baskerville', serif" }}>
              {unit.value}
            </div>
            <div className="text-xs font-medium uppercase tracking-wider text-black/60">
              {unit.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

function CulturalSection({ isLoaded }) {
  return (
    <section>
      <div className={`mb-12 transition-all duration-700 delay-200 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">
          Cultural Heritage
        </div>
        <h2 className="text-3xl font-bold tracking-tight text-black mb-4" style={{ fontFamily: "'Libre Baskerville', serif" }}>
          Tradition & Community
        </h2>
        <div className="h-px w-16 bg-black/20"></div>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div className={`transition-all duration-700 delay-400 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
          <h3 className="text-xl font-bold mb-4 text-black" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Montreal Chinatown
          </h3>
          <p className="text-base leading-relaxed text-black/80">
            Experience the vibrant heart of Montreal's Chinese community. From authentic cuisine
            to cultural landmarks, Chinatown offers a rich backdrop for this year's tournament.
          </p>
        </div>

        <div className={`transition-all duration-700 delay-600 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
          <h3 className="text-xl font-bold mb-4 text-black" style={{ fontFamily: "'Libre Baskerville', serif" }}>
            Chinese Tradition
          </h3>
          <p className="text-base leading-relaxed text-black/80">
            Celebrate generations of Chinese-Canadian heritage through volleyball, food, and
            community. NACIVT honors the traditions that have shaped our community for over 40 years.
          </p>
        </div>
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
      <dd className="text-base font-semibold text-black/90">
        {value}
      </dd>
    </div>
  )
}

