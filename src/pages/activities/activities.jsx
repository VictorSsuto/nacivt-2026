import activitiesHero from "../../assets/activities.jpg"
import jiaFeature from "../../assets/jia-flyer.png"
import { FadeIn } from "../../components/FadeIn"
import { Link } from "react-router-dom"
import { LINKS } from "../../data/links"

const sections = [
  {
    title: "The Classics",
    kicker: "See the city",
    blurb:
      "First time in Montreal? Start with the stops every visitor should hit between matches.",
    items: [
      {
        title: "Old Montreal",
        description:
          "Cobblestone streets, historic architecture, and cafés. A great place to wander before dinner or after matches.",
        maps: "https://maps.google.com/?q=Old+Montreal+Quebec",
      },
      {
        title: "Old Port of Montreal",
        description:
          "Waterfront promenades, seasonal events, and views of the St. Lawrence River.",
        maps: "https://maps.google.com/?q=Old+Port+of+Montreal",
      },
      {
        title: "Mount Royal",
        description:
          "The city's iconic lookout for skyline photos and a breather away from the tournament floor.",
        maps: "https://maps.google.com/?q=Mount+Royal+Montreal",
      },
      {
        title: "Jean-Talon Market",
        description:
          "One of North America's largest open-air markets, with fresh produce, snacks, flowers, and local flavors.",
        maps: "https://maps.google.com/?q=Jean+Talon+Market+Montreal",
      },
    ],
  },
  {
    title: "After the Whistle",
    kicker: "Nightlife",
    blurb:
      "Where teams, parents, and spectators end up once the courts go quiet.",
    items: [
      {
        title: "Casino de Montréal",
        description:
          "High-energy gaming, dining, and late-night atmosphere on Île Notre-Dame.",
        maps: "https://maps.google.com/?q=Casino+de+Montreal",
      },
      {
        title: "Crescent Street",
        description:
          "A lively downtown strip packed with bars, restaurants, and terraces.",
        maps: "https://maps.google.com/?q=Crescent+Street+Montreal",
      },
      {
        title: "Saint-Laurent Boulevard",
        description:
          "Known locally as The Main, Montreal's classic corridor for late dinners and weekend energy.",
        maps: "https://maps.google.com/?q=Saint+Laurent+Boulevard+Montreal",
      },
    ],
  },
  {
    title: "Eat Like a Local",
    kicker: "Food",
    blurb:
      "Iconic Montreal bites worth planning your tournament weekend around.",
    items: [
      {
        title: "La Banquise",
        description:
          "The city's most famous poutine, with dozens of variations, open late for post-game refuels.",
        maps: "https://maps.google.com/?q=La+Banquise+Montreal",
      },
      {
        title: "Schwartz's Deli",
        description:
          "Smoked meat sandwiches since 1928. The line moves fast and it's worth it.",
        maps: "https://maps.google.com/?q=Schwartz+Deli+Montreal",
      },
      {
        title: "Sammi & Soupe Dumpling",
        description:
          "Comforting soup dumplings steps from Chinatown, perfect for a casual team meal.",
        maps: "https://maps.google.com/?q=Sammi+Soup+Dumpling+Montreal",
      },
    ],
  },
  {
    title: "Golden Hour",
    kicker: "Rooftops & terraces",
    blurb:
      "September in Montreal is terrace season, so catch the last of the summer weather.",
    items: [
      {
        title: "Terrasse Nelligan",
        description:
          "A stylish rooftop in Old Montreal with a polished atmosphere and city views.",
        maps: "https://maps.google.com/?q=Terrasse+Nelligan+Montreal",
      },
      {
        title: "Perché",
        description:
          "An elevated downtown rooftop for drinks and sunset views.",
        maps: "https://maps.google.com/?q=Perche+Montreal",
      },
      {
        title: "Terrasse Carla",
        description:
          "A laid-back terrace for a slower, more social evening out.",
        maps: "https://maps.google.com/?q=Terrasse+Carla+Montreal",
      },
    ],
  },
  {
    title: "Bring the Whole Team",
    kicker: "Group activities",
    blurb:
      "Off-court outings that work for a full roster, families, and everyone in between.",
    items: [
      {
        title: "BIXI bike rentals",
        description:
          "Montreal's bike-share system, an easy way to explore neighborhoods and waterfront paths at your own pace.",
        maps: "https://maps.google.com/?q=BIXI+Montreal",
      },
      {
        title: "Escape rooms",
        description:
          "A team-building challenge for squads wanting some friendly competition indoors.",
        maps: "https://maps.google.com/?q=Escape+Rooms+Montreal",
      },
      {
        title: "Go-karting",
        description:
          "Fast-paced and competitive, for players who can't turn it off between matches.",
        maps: "https://maps.google.com/?q=Go-karting+Montreal",
      },
      {
        title: "Boat cruises",
        description:
          "See the skyline from the St. Lawrence on a scenic river cruise.",
        maps: "https://maps.google.com/?q=Boat+Cruises+Montreal",
      },
      {
        title: "Spa Scandinave",
        description:
          "Recovery day: thermal baths and massages for sore shoulders and tired legs.",
        maps: "https://maps.google.com/?q=Spa+Scandinave+Montreal",
      },
    ],
  },
]

function MapIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 fill-current">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5Z" />
    </svg>
  )
}

function ActivityCard({ item }) {
  return (
    <article className="group flex flex-col justify-between rounded-sm border border-black/10 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div>
        <h3 className="text-lg font-semibold tracking-tight text-black">
          {item.title}
        </h3>
        <p className="mt-3 text-sm leading-6 text-black/70">{item.description}</p>
      </div>

      <a
        href={item.maps}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
      >
        <MapIcon />
        Open in Google Maps
      </a>
    </article>
  )
}

export default function Activities() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={activitiesHero}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_40%]"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Beyond the Court
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Where to eat, wander, and celebrate between matches. A local's
                guide to Montreal for tournament weekend.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="page-section-title text-black">
              You came for volleyball. Stay for the city.
            </h2>
            <div className="h-px w-16 bg-black/20 my-6"></div>
            <p className="text-lg leading-8 text-black/70">
              The Palais des congrès sits at the edge of Chinatown, minutes
              from Old Montreal and downtown, which means some of the best of
              the city is walking distance from the courts. Here's where we'd
              send our own visiting family.
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <section className="mt-16 overflow-hidden rounded-sm border border-black/10 shadow-sm">
            <div className="grid lg:grid-cols-5">
              <div className="flex items-center justify-center bg-white p-4 lg:col-span-2">
                <img
                  src={jiaFeature}
                  alt={
                    'JIA Foundation flyer: Invitation to Athletes attending the 81st NACIVT, a mini-tour of Montreal\'s Chinatown and the "Wing Noodles: The Heart of Chinatown" exhibit'
                  }
                  loading="lazy"
                  className="h-auto w-full max-w-xs object-contain"
                />
              </div>

              <div className="bg-white p-8 sm:p-10 lg:col-span-3">
                <div className="flex flex-wrap items-center gap-3 mb-4">
                  <span className="bg-[#E25E3E] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
                    Featured
                  </span>
                  <span className="text-xs font-medium uppercase tracking-widest text-black/50">
                    Hosted by the JIA Foundation
                  </span>
                </div>

                <h2
                  className="text-2xl sm:text-3xl font-bold tracking-tight text-black"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  Chinatown Mini-Tour &amp; the "Wing Noodles" Exhibit
                </h2>

                <p className="mt-4 text-base leading-7 text-black/70">
                  Athletes, families, and friends are invited to a mini-tour
                  of Montreal's Chinatown and the exhibit{" "}
                  <em>"Wing Noodles: The Heart of Chinatown."</em> More than a
                  food factory, the exhibit tells the story of Wing Noodles as
                  a community hub, a place where newcomers and refugees found
                  support, families and employees felt at home, and a deep
                  sense of social responsibility helped build and sustain
                  Chinatown for over a decade.
                </p>

                <dl className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                      Date
                    </dt>
                    <dd className="text-sm font-semibold text-black/90">
                      Friday, September 4, 2026
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                      Tour Times
                    </dt>
                    <dd className="text-sm font-semibold text-black/90">
                      10am · 12pm · 2pm · 4pm
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                      Location
                    </dt>
                    <dd className="text-sm font-semibold text-black/90">
                      Maison patrimoniale Yep-Riopel
                      <br />
                      116 rue de la Gauchetière
                    </dd>
                  </div>
                </dl>

                <p className="mt-4 text-sm text-black/60">
                  Beside the Palais des congrès, site of the 81st NACIVT. The
                  exhibit remains open all weekend, while the Chinatown tour
                  takes place only on Friday, September 4.
                </p>

                <a
                  href="https://maps.google.com/?q=116+rue+de+la+Gauchetiere+O+Montreal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
                >
                  <MapIcon />
                  Get directions
                </a>
              </div>
            </div>
          </section>
        </FadeIn>

        <div className="mt-20 space-y-20">
          {sections.map((section) => (
            <FadeIn key={section.title}>
              <section className="border-t border-black/10 pt-12">
                <div className="text-xs font-medium uppercase tracking-widest text-[#E25E3E] mb-3">
                  {section.kicker}
                </div>
                <h2
                  className="text-3xl font-bold tracking-tight text-black"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  {section.title}
                </h2>
                <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
                  {section.blurb}
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((item) => (
                    <ActivityCard key={item.title} item={item} />
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <section className="mt-20 border-t border-black/10 pt-12">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <div className="text-xs font-medium uppercase tracking-widest text-[#E25E3E] mb-3">
                  Getting around
                </div>
                <h2
                  className="text-3xl font-bold tracking-tight text-black"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  No car? No problem.
                </h2>
                <p className="mt-4 text-base leading-7 text-black/70">
                  The Palais des congrès sits directly above Place-d'Armes
                  metro station. The STM metro and buses connect downtown, Old
                  Montreal, and Chinatown in minutes, and BIXI bikes cover the
                  rest.
                </p>
                <Link
                  to={LINKS.location}
                  className="mt-4 inline-block text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
                >
                  See our full Getting Here &amp; Around guide →
                </Link>
              </div>

              <div className="rounded-sm border border-black/10 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-black">
                  More to explore
                </h3>
                <p className="mt-3 text-sm leading-6 text-black/70">
                  Tourisme Montréal has official city recommendations, maps,
                  and seasonal ideas for the rest of your stay.
                </p>

                <a
                  href="https://www.mtl.org/en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-block border border-[#275E6B] px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-[#275E6B] transition-colors hover:bg-[#275E6B] hover:text-white"
                >
                  Visit Tourisme Montréal
                </a>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
