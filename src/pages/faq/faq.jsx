import faqHero from "../../assets/faq.jpg"
import { FadeIn } from "../../components/FadeIn"

export default function FAQ() {
  return (
    <>
      {/* Slim editorial hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={faqHero}
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
                FAQ
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Answers to common questions about NACIVT 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <section>
            <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>

            <div className="mt-8 space-y-6">
              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  When and where is NACIVT 2026?
                </h3>
                <p className="mt-2 text-black/70">
                  The tournament will be hosted in Montréal at the Palais des congrès.
                  Dates and detailed venue info will be announced soon.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  How do teams register?
                </h3>
                <p className="mt-2 text-black/70">
                  Registration details will be posted on the Register page as soon as
                  divisions and pricing are confirmed.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  What is the tournament layout and seating like?
                </h3>
                <p className="mt-2 text-black/70">
                  A full venue map will be shared before the event, including court layout,
                  warm-up zones, seating areas, and spectator flow throughout the venue.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  How will repooling and seeding work?
                </h3>
                <p className="mt-2 text-black/70">
                  Repooling and seeding details will be published prior to the tournament.
                  Pool results will determine placement into the next phase, and repooling
                  may be used to maintain competitive balance.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  Where can we find end-of-day scores and standings?
                </h3>
                <p className="mt-2 text-black/70">
                  End-of-day scores, pool standings, and bracket updates will be posted online.
                  The official results link will be shared before the tournament begins.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  Will first aid or physiotherapy be available on site?
                </h3>
                <p className="mt-2 text-black/70">
                  First aid services will be available on site throughout the tournament.
                  Physiotherapy support details will be announced closer to the event.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  When are the opening and closing ceremonies?
                </h3>
                <p className="mt-2 text-black/70">
                  Ceremony details will be announced once the full tournament schedule is finalized.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  Can we bring food or drinks?
                </h3>
                <p className="mt-2 text-black/70">
                  Food and drink policies will follow venue regulations. We’ll confirm what is
                  allowed (water bottles, snacks) before tournament week.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  What about language barriers?
                </h3>
                <p className="mt-2 text-black/70">
                  Montréal is French-first. Event information will be available in French, with
                  English support provided on site by staff and volunteers.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 p-6">
                <h3 className="text-lg font-semibold">
                  What currency are prices listed in?
                </h3>
                <p className="mt-2 text-black/70">
                  All prices are listed in Canadian dollars (CAD). For international teams,
                  your bank or card provider will handle currency conversion automatically.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
