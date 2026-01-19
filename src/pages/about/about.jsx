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
                History, partners, participants, and how to support NACIVT 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-8 py-20">
        {/* Intro */}
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="text-xl leading-relaxed text-black/70">
              Welcome to NACIVT 2026.
            </h2>
            <p className="mt-3 text-base text-black/60">
              This page will be updated as we finalize details about the event,
              participating teams, and partners.
            </p>
          </div>
        </FadeIn>

        {/* YouTube video (centered) */}
        <FadeIn>
          <section className="mt-12">
            <div className="mx-auto max-w-4xl">
              <div className="relative w-full overflow-hidden rounded-sm border border-black/10 bg-black">
                {/* 16:9 responsive */}
                <div className="pt-[56.25%]" />
                <iframe
                  className="absolute inset-0 h-full w-full"
                  src="https://www.youtube.com/embed/PMHf2RlZh34"
                  title="NACIVT Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 text-sm text-black/50">
                Video highlight — more media will be added closer to the event.
              </p>
            </div>
          </section>
        </FadeIn>

        {/* Two-column layout: left nav + content */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[220px_1fr]">
          {/* Left sidebar nav */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <div
                className="text-4xl font-bold leading-none"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                About
              </div>

              <nav className="mt-8 space-y-6 text-sm">
                <a
                  href="#history"
                  className="block text-[#c8102e] hover:underline"
                >
                  History
                </a>
                <a
                  href="#partners"
                  className="block text-[#c8102e] hover:underline"
                >
                  Partners
                </a>
                <a
                  href="#hall-of-fame"
                  className="block text-[#c8102e] hover:underline"
                >
                  Hall of Fame
                </a>
                <a
                  href="#contact"
                  className="block text-[#c8102e] hover:underline"
                >
                  Contact Us
                </a>
              </nav>
            </div>
          </aside>

          {/* Right content */}
          <div>
            <FadeIn>
              <section
                id="history"
                className="scroll-mt-28 border-t border-black/10 pt-12"
              >
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  History
                </h2>
                <p className="mt-6 text-base text-black/70">
                  NACIVT has a long tradition in the 9-man volleyball community.
                  We’ll share a timeline of key years, host cities, and major
                  moments as we compile the official history.
                </p>
              </section>
            </FadeIn>

            <FadeIn>
              <section
                id="partners"
                className="scroll-mt-28 mt-16 border-t border-black/10 pt-12"
              >
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Partners
                </h2>
                <p className="mt-6 text-base text-black/70">
                  We’ll publish this year’s tournament partners and sponsors
                  here. Interested in partnering with NACIVT 2026? Contact us
                  below.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Title Partner</h3>
                    <p className="mt-2 text-black/70">To be announced.</p>
                  </div>
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Community Partners</h3>
                    <p className="mt-2 text-black/70">To be announced.</p>
                  </div>
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section
                id="hall-of-fame"
                className="scroll-mt-28 mt-16 border-t border-black/10 pt-12"
              >
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Hall of Fame
                </h2>
                <p className="mt-6 text-base text-black/70">
                  We’re building a Hall of Fame to honor past champions, standout
                  players, and memorable NACIVT moments.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-2">
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Past Champions</h3>
                    <p className="mt-2 text-black/70">To be announced.</p>
                  </div>
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Notable Players</h3>
                    <p className="mt-2 text-black/70">To be announced.</p>
                  </div>
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section
                id="support"
                className="scroll-mt-28 mt-16 border-t border-black/10 pt-12"
              >
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Support Us
                </h2>
                <p className="mt-6 text-base text-black/70">
                  Want to help make NACIVT 2026 amazing? We’ll post opportunities
                  to volunteer, sponsor, and support the event here.
                </p>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Volunteer</h3>
                    <p className="mt-2 text-black/70">
                      Roles and sign-up will be announced soon.
                    </p>
                  </div>
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Sponsorship</h3>
                    <p className="mt-2 text-black/70">
                      Sponsor deck and packages coming soon.
                    </p>
                  </div>
                  <div className="rounded-sm border border-black/10 p-6">
                    <h3 className="text-lg font-semibold">Donations</h3>
                    <p className="mt-2 text-black/70">
                      Donation options will be posted soon.
                    </p>
                  </div>
                </div>
              </section>
            </FadeIn>

            <FadeIn>
              <section
                id="contact"
                className="scroll-mt-28 mt-16 border-t border-black/10 pt-12"
              >
                <h2 className="text-4xl font-bold" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                  Contact Us
                </h2>
                <p className="mt-6 text-base text-black/70">
                  Contact details will be posted soon. For now, please check
                  back for updates.
                </p>

                <div className="mt-10 rounded-sm border border-black/10 p-6">
                  <h3 className="text-lg font-semibold">Email</h3>
                  <p className="mt-2 text-black/70">
                    Coming soon — we’ll publish an official contact email.
                  </p>
                </div>
              </section>
            </FadeIn>
          </div>
        </div>
      </main>
    </>
  )
}