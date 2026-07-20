import heroImg from "../../assets/Montrealview.webp"
import { FadeIn } from "../../components/FadeIn"

const airportOptions = [
  {
    name: "Air Canada City Shuttle",
    price: "$9 one way",
    tagline: "Fastest door-to-door",
    points: [
      "Runs directly between YUL and the Palais des congrès, our tournament venue.",
      "Pick-up at the airport is curbside at the Departures level, Door 7.",
      "Departures every 15 minutes at peak, then every 30 minutes until 10:00 p.m.",
      "Uses HOV lanes and a private airport entrance, saving up to 25 minutes at rush hour.",
      "For Air Canada customers only. Kids under 15 ride free with an adult.",
    ],
    linkLabel: "Book at montreal.landline.com",
    link: "https://montreal.landline.com",
  },
  {
    name: "STM 747 Bus",
    price: "$11.25",
    tagline: "Best value, runs day and night",
    points: [
      "Public express bus between YUL and downtown, departing every 10 to 20 minutes from Door 28.",
      "Your fare doubles as a 24-hour pass for the entire métro, bus, train and REM network in Zone A.",
      "To reach the Palais: ride to Lionel-Groulx station, take the orange line toward Montmorency, and get off at Place-d'Armes. The station connects directly to the Palais.",
      "Buy your fare at the vending machines or STM counter in international arrivals (Door 28), or on the Chrono app.",
    ],
    linkLabel: "Route details on stm.info",
    link: "https://www.stm.info/en/info/networks/bus-network-and-schedules-enlightened/747-yul-montreal-trudeau-airport-downtown",
  },
  {
    name: "Taxi or Rideshare",
    price: "$49.45 flat rate",
    tagline: "Simplest with lots of luggage",
    points: [
      "Taxis to downtown charge a fixed fare: $49.45 between 5:00 a.m. and 11:00 p.m., and $56.70 overnight.",
      "Find the taxi stand at the arrivals level, Door 23, where a dispatcher will assist you.",
      "Cash and cards accepted. The ride to the Palais takes roughly 20 to 30 minutes depending on traffic.",
      "Uber and other rideshare apps also serve the airport from designated pick-up zones.",
    ],
    linkLabel: "Taxi info at admtl.com",
    link: "https://www.admtl.com/en-CA/parking-and-transport/transport-services/taxis-limousines",
  },
]

export default function Location() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={heroImg}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%]"
        />

        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Getting Here &amp; Around
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                From wheels down at YUL to first serve at the Palais des
                congrès, here is every way to make the trip.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="page-section-title text-black">The venue</h2>
            <div className="h-px w-16 bg-black/20 my-6"></div>
            <p className="text-lg leading-8 text-black/70">
              NACIVT 2026 takes place at the Palais des congrès de Montréal,
              1001 Pl. Jean-Paul-Riopelle, at the edge of Chinatown. The
              building sits directly above Place-d'Armes métro station on the
              orange line, so once you are downtown, you can get to the courts
              without stepping outside.
            </p>
            <a
              href="https://www.google.com/maps?q=Palais+des+congres+de+Montreal"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block border border-[#1e3a8a] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#1e3a8a] transition-colors hover:bg-[#1e3a8a] hover:text-white"
            >
              Open in Google Maps
            </a>
          </div>
        </FadeIn>

        <FadeIn>
          <section className="mt-20 border-t border-black/10 pt-12">
            <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">
              From the airport
            </div>
            <h2
              className="text-3xl font-bold tracking-tight text-black"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              YUL to the Palais des congrès
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
              Three solid options, whether you are optimizing for speed,
              budget, or a full roster's worth of luggage.
            </p>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {airportOptions.map((option) => (
                <article
                  key={option.name}
                  className="flex flex-col justify-between rounded-sm border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  <div>
                    <div className="text-xs font-medium uppercase tracking-wider text-black/50">
                      {option.tagline}
                    </div>
                    <h3 className="mt-2 text-xl font-semibold tracking-tight text-black">
                      {option.name}
                    </h3>
                    <div className="mt-1 text-lg font-bold text-[#1e3a8a]">
                      {option.price}
                    </div>

                    <ul className="mt-4 space-y-3 text-sm leading-6 text-black/70">
                      {option.points.map((point) => (
                        <li key={point} className="flex gap-2">
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c8102e]" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={option.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block text-sm font-medium text-[#1e3a8a] transition-colors hover:text-[#c8102e]"
                  >
                    {option.linkLabel} →
                  </a>
                </article>
              ))}
            </div>

            <p className="mt-8 max-w-3xl text-sm leading-6 text-black/50">
              Note: the REM light rail's airport station is not yet open, so
              the options above are the ways in for 2026. Fares and schedules
              are current as of July 2026. Please confirm with each provider
              before you travel.
            </p>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-20 border-t border-black/10 pt-12">
            <div className="text-xs font-medium uppercase tracking-widest text-[#c8102e] mb-3">
              During the weekend
            </div>
            <h2
              className="text-3xl font-bold tracking-tight text-black"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Getting around the city
            </h2>

            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-sm border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-black">Métro</h3>
                <p className="mt-3 text-sm leading-6 text-black/70">
                  Fast, frequent, and the easiest way to move between
                  downtown, Old Montreal, and Chinatown. Place-d'Armes station
                  connects directly to the Palais. If you arrived on the 747,
                  your 24-hour pass already covers it.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-black">BIXI</h3>
                <p className="mt-3 text-sm leading-6 text-black/70">
                  Montreal's bike-share system, with stations all around the
                  Palais and Old Montreal. Great for short hops and September
                  rides along the waterfront.
                </p>
              </div>

              <div className="rounded-sm border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-black">On foot</h3>
                <p className="mt-3 text-sm leading-6 text-black/70">
                  Chinatown is steps from the venue, Old Montreal is a
                  10-minute walk, and most downtown hotels are within 20
                  minutes. Between matches, walking is often the fastest
                  option.
                </p>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
