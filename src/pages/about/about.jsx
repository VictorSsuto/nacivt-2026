import aboutHero from "../../assets/montreal-skyline.jpg"
import { FadeIn } from "../../components/FadeIn"

export default function About() {
  return (
    <>
      {/* Slim editorial hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={aboutHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_40%]"
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
                About
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Learn about NACIVT 2026, our mission, and what to expect.
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
              <h2>Welcome to NACIVT 2026.</h2>
            </p>
            <p className="mt-3 text-base text-black/60">
              This page will be updated as we finalize details about the event,
              venues, and festival programming.
            </p>
          </div>
        </FadeIn>

        {/* Cards */}
        <section className="mt-16 grid gap-8 md:grid-cols-3">
          {/* About */}
          <FadeIn delay={0}>
            <div className="shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <a
                href="#about"
                className="group relative block h-72 overflow-hidden rounded-sm"
              >
                {/* simple branded background (no new asset needed) */}
                <div className="absolute inset-0 bg-[#1e3a8a]/80" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    NACIVT
                  </div>
                  <div className="mt-3 text-2xl font-bold">About the Event</div>
                  <div className="mt-2 text-sm text-white/70">
                    What NACIVT is and what to expect
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* FAQ */}
          <FadeIn delay={120}>
            <div className="shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <a
                href="#faq"
                className="group relative block h-72 overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-[#1e3a8a]/70" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Help
                  </div>
                  <div className="mt-3 text-2xl font-bold">FAQ</div>
                  <div className="mt-2 text-sm text-white/70">
                    Answers to common questions
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Contact */}
          <FadeIn delay={240}>
            <div className="shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              <a
                href="#contact"
                className="group relative block h-72 overflow-hidden rounded-sm"
              >
                <div className="absolute inset-0 bg-[#1e3a8a]/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="relative flex h-full flex-col justify-end p-7 text-white">
                  <div className="text-xs font-medium uppercase tracking-wider text-white/80">
                    Get in touch
                  </div>
                  <div className="mt-3 text-2xl font-bold">Contact</div>
                  <div className="mt-2 text-sm text-white/70">
                    How to reach the organizers
                  </div>
                </div>
              </a>
            </div>
          </FadeIn>
        </section>

        {/* Sections */}
        <FadeIn>
          <section
            id="about"
            className="scroll-mt-28 mt-24 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">About NACIVT 2026</h2>
            <p className="mt-4 text-base text-black/70">
              About content to be posted.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section
            id="faq"
            className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">FAQ</h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  When and where is NACIVT 2026?
                </h3>
                <p className="mt-2 text-black/70">
                  Details will be announced soon. Check back for confirmed dates
                  and venues.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  How do teams register?
                </h3>
                <p className="mt-2 text-black/70">
                  Registration info will be posted on the Register page once
                  ready.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  Is there a festival / night market?
                </h3>
                <p className="mt-2 text-black/70">
                  Yes — programming will be shared on the Night Market page.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section
            id="contact"
            className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
          >
            <h2 className="text-3xl font-bold">Contact</h2>
            <p className="mt-4 text-base text-black/70">
              Contact info to be posted.
            </p>
          </section>
        </FadeIn>
      </main>
    </>
  )
}