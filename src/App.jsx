import { LINKS } from "./data/links"
import skyline from "./assets/montreal-skyline.jpg"

export default function App() {
  return (
    <div className="min-h-screen bg-[#fbf7ef] text-[#1b1b1b]">
      <Header />

      {/* Full-width hero */}
      <Hero />

      {/* Content below hero */}
      <main className="mx-auto max-w-6xl px-8 py-12">
        <IntroBlock />
      </main>

      <Footer />
    </div>
  )
}

function Header() {
  return (
    <header className="border-b border-black/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">
        <div className="font-extrabold tracking-wide text-[#d42027]">
          Montreal NACVIT — 2026
        </div>

        <nav className="flex gap-6 text-sm font-semibold text-black/70">
          <a className="hover:text-black" href={LINKS.register}>
            Register
          </a>
          <a className="hover:text-black" href={LINKS.schedule}>
            Tournament
          </a>
          <a className="hover:text-black" href="#">
            Festival
          </a>
          <a className="hover:text-black" href="#">
            About
          </a>
          <a className="hover:text-black" href="#">
            Swag
          </a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[520px] w-full">
      <img
        src={skyline}
        alt="Montreal skyline"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/35 to-black/10" />

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-6xl px-8">
          <div className="max-w-3xl text-white">
            <div className="text-xs font-semibold tracking-wide text-white/85">
              Montreal • Labour Day Weekend • North American Chinese Invitational
            </div>

            <h1 className="mt-3 text-6xl font-black leading-[0.95] tracking-tight">
              Montreal NACVIT 2026
            </h1>

            <p className="mt-5 max-w-xl text-base leading-7 text-white/85">
              Welcome back to the heart of Montreal’s Chinatown for a weekend of elite volleyball,
              community, and celebration.
            </p>

            <div className="mt-8 flex gap-3">
              <a
                href={LINKS.register}
                className="rounded-md bg-[#d42027] px-6 py-3 text-sm font-bold text-white shadow-[0_14px_30px_rgba(212,32,39,0.25)] hover:opacity-95"
              >
                Register
              </a>
              <a
                href={LINKS.schedule}
                className="rounded-md border border-white/50 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15"
              >
                Latest Updates
              </a>
            </div>

            <div className="mt-6 text-xs text-white/70">
              Registration opens March 2026 • Venue details coming soon
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntroBlock() {
  return (
    <section className="mt-14 rounded-2xl px-10 py-12">
      <div className="grid grid-cols-12 gap-10">
        {/* Left: Intro */}
        <div className="col-span-7">
          <h2 className="text-3xl font-extrabold tracking-tight">
            Volleyball. Culture. Tradition.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-7 text-black/70">
            Montreal NACVIT returns to the heart of Chinatown for a weekend that blends
            elite 9-man volleyball with community, history, and celebration.
          </p>

          <p className="mt-4 max-w-xl text-base leading-7 text-black/70">
            For generations, NACVIT has brought together teams and families from across
            North America. In 2026, we continue that tradition with competition, culture,
            and connection.
          </p>
        </div>

        {/* Right: Key details */}
        <div className="col-span-5">
          <dl className="grid gap-5 text-sm">
            <Detail label="Dates" value="Labour Day Weekend, 2026" />
            <Detail label="Location" value="Montreal Chinatown" />
            <Detail label="Format" value="9-Man Volleyball + Festival" />
            <Detail label="Contact" value="contact@nacivt.com" />
          </dl>
        </div>
      </div>
    </section>
  )
}

function Detail({ label, value }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-black/40">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-black/80">
        {value}
      </dd>
    </div>
  )
}

function Footer() {
  return (
    <footer className="mt-14 border-t border-black/10 bg-white/50">
      <div className="mx-auto max-w-6xl px-8 py-8 text-sm text-black/60">
        © {new Date().getFullYear()} NACVIT Montreal
      </div>
    </footer>
  )
}
