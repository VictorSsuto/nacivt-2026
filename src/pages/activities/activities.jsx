import activitiesHero from "../../assets/activities.jpg"
import { FadeIn } from "../../components/FadeIn"

const sections = [
  {
    title: "Popular Tourist Attractions",
    icon: "🏛️",
    blurb:
      "Classic Montreal stops for first-time visitors, families, and anyone looking to enjoy the city during NACIVT.",
    items: [
      {
        title: "Old Montreal",
        description:
          "Cobblestone streets, historic architecture, cafés, and a great place to wander before dinner or after matches.",
        maps: "https://maps.google.com/?q=Old+Montreal+Quebec",
      },
      {
        title: "Old Port of Montreal",
        description:
          "Waterfront promenades, seasonal events, and scenic views of the St. Lawrence River.",
        maps: "https://maps.google.com/?q=Old+Port+of+Montreal",
      },
      {
        title: "Mount Royal",
        description:
          "Montreal’s iconic lookout for skyline photos, relaxed walks, and a refreshing break from the city streets.",
        maps: "https://maps.google.com/?q=Mount+Royal+Montreal",
      },
      {
        title: "Jean Talon Market",
        description:
          "One of the best open-air markets in the city for fresh produce, snacks, flowers, and local flavors.",
        maps: "https://maps.google.com/?q=Jean+Talon+Market+Montreal",
      },
    ],
  },
  {
    title: "Nightlife & Entertainment",
    icon: "✨",
    blurb:
      "Great after-hours spots for teams, parents, and spectators looking for a lively Montreal evening.",
    items: [
      {
        title: "Casino de Montréal",
        description:
          "A high-energy entertainment destination with gaming, dining, and late-night atmosphere.",
        maps: "https://maps.google.com/?q=Casino+de+Montreal",
      },
      {
        title: "Crescent Street",
        description:
          "A lively downtown street filled with bars, restaurants, and nightlife options.",
        maps: "https://maps.google.com/?q=Crescent+Street+Montreal",
      },
      {
        title: "Saint-Laurent Boulevard",
        description:
          "A classic Montreal corridor for nightlife, late dinners, and weekend energy.",
        maps: "https://maps.google.com/?q=Saint+Laurent+Boulevard+Montreal",
      },
    ],
  },
  {
    title: "Food Recommendations",
    icon: "🍜",
    blurb:
      "Popular local favorites and iconic Montreal bites worth adding to your tournament weekend.",
    items: [
      {
        title: "La Banquise",
        description:
          "A Montreal classic for poutine with plenty of menu options and a reliable late-night stop.",
        maps: "https://maps.google.com/?q=La+Banquise+Montreal",
      },
      {
        title: "Schwartz’s Deli",
        description:
          "Famous Montreal smoked meat sandwiches and a must-try stop for visitors.",
        maps: "https://maps.google.com/?q=Schwartz+Deli+Montreal",
      },
      {
        title: "Sammi & Soupe Dumpling",
        description:
          "Comforting dumplings and soups that are perfect for a casual team meal or quick bite.",
        maps: "https://maps.google.com/?q=Sammi+Soup+Dumpling+Montreal",
      },
    ],
  },
  {
    title: "Rooftops & Summer Terraces",
    icon: "🌇",
    blurb:
      "Relaxed summer spots to catch the weather, enjoy drinks, and watch the city move around you.",
    items: [
      {
        title: "Terrasse Nelligan",
        description:
          "A stylish rooftop terrace in Old Montreal with a polished atmosphere and city views.",
        maps: "https://maps.google.com/?q=Terrasse+Nelligan+Montreal",
      },
      {
        title: "Perché",
        description:
          "An elevated downtown rooftop option for drinks, sunset views, and a modern summer vibe.",
        maps: "https://maps.google.com/?q=Perche+Montreal",
      },
      {
        title: "Terrasse Carla",
        description:
          "A warm-season terrace destination for a more laid-back and social evening out.",
        maps: "https://maps.google.com/?q=Terrasse+Carla+Montreal",
      },
    ],
  },
  {
    title: "Group Activities",
    icon: "🚲",
    blurb:
      "Fun options for teams, families, and groups looking for active or memorable outings in Montreal.",
    items: [
      {
        title: "BIXI bike rentals",
        description:
          "An easy way to explore Montreal’s neighborhoods and waterfront paths at your own pace.",
        maps: "https://maps.google.com/?q=BIXI+Montreal",
      },
      {
        title: "Escape rooms",
        description:
          "A great group challenge for teams wanting a fun indoor activity between matches.",
        maps: "https://maps.google.com/?q=Escape+Rooms+Montreal",
      },
      {
        title: "Go-karting",
        description:
          "A fast-paced group outing for players and friends looking for something competitive off the court.",
        maps: "https://maps.google.com/?q=Go-karting+Montreal",
      },
      {
        title: "Boat cruises",
        description:
          "See the city from the river with a scenic cruise that feels ideal for summer travel.",
        maps: "https://maps.google.com/?q=Boat+Cruises+Montreal",
      },
      {
        title: "Spa Scandinave",
        description:
          "A quiet reset for players and parents wanting relaxation and recovery during the weekend.",
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

function ExternalIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-4 w-4 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h6" />
    </svg>
  )
}

function ActivityCard({ item }) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="h-32 bg-[#1e3a8a] transition-colors duration-300 group-hover:bg-[#0f172a]">
        <div className="flex h-full items-end justify-between p-4 text-white/95">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-white/70">Montreal guide</div>
            <div className="mt-1 text-sm font-medium">{item.title}</div>
          </div>
          <div className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs">
            Preview
          </div>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-semibold tracking-tight text-black">{item.title}</h3>
        <p className="mt-3 text-sm leading-6 text-black/70">{item.description}</p>

        <a
          href={item.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#1e3a8a] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0f172a]"
        >
          <MapIcon />
          Open in Google Maps
          <ExternalIcon />
        </a>
      </div>
    </article>
  )
}

export default function Activities() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={activitiesHero}
          alt="Activities"
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_40%]"
        />

        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Montreal Activities & Tourism
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Explore things to do in Montreal while attending NACIVT 2026.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20 scroll-smooth">
        <FadeIn>
          <section id="activities" className="scroll-mt-28">
            <div className="max-w-3xl">
              <div className="text-xs font-medium uppercase tracking-[0.28em] text-[#c8102e]">
                Montreal Activities & Tourism
              </div>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-black md:text-4xl" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Explore Montreal during NACIVT 2026
              </h2>
              <p className="mt-5 text-lg leading-8 text-black/70">
                Discover iconic attractions, food favorites, rooftops, and group activities to help athletes, parents,
                tourists, and spectators make the most of their stay in Montreal.
              </p>
            </div>
          </section>
        </FadeIn>

        <div className="mt-16 space-y-16">
          {sections.map((section) => (
            <FadeIn key={section.title}>
              <section className="scroll-mt-28">
                <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1 text-sm text-black/70 shadow-sm">
                      <span>{section.icon}</span>
                      <span>{section.title}</span>
                    </div>
                    <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">{section.blurb}</p>
                  </div>
                </div>

                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {section.items.map((item) => (
                    <ActivityCard key={item.title} item={item} />
                  ))}
                </div>
              </section>
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <section className="mt-16 grid gap-6 rounded-3xl border border-black/10 bg-gradient-to-br from-[#f8fafc] to-white p-6 shadow-sm md:grid-cols-2 md:p-8">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#1e3a8a]/10 px-3 py-1 text-sm font-medium text-[#1e3a8a]">
                <span>🚇</span>
                <span>Transportation</span>
              </div>
              <h3 className="mt-4 text-2xl font-bold tracking-tight text-black" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Getting around Montreal
              </h3>
              <p className="mt-4 text-base leading-7 text-black/70">
                The STM metro and buses make it easy to travel between downtown, Old Montreal, Chinatown, and the tournament
                areas. BIXI bike rentals are also a popular summer option for quick neighborhood trips and scenic rides.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-6">
              <h4 className="text-lg font-semibold text-black">Helpful Visitor Resources</h4>
              <p className="mt-3 text-sm leading-6 text-black/70">
                Use Tourisme Montréal for official city recommendations, maps, and seasonal ideas.
              </p>

              <a
                href="https://www.mtl.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-sm font-medium text-[#1e3a8a] transition-colors hover:border-[#1e3a8a] hover:bg-[#1e3a8a] hover:text-white"
              >
                <ExternalIcon />
                Visit Tourisme Montréal
              </a>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section className="mt-16 overflow-hidden rounded-3xl bg-gradient-to-r from-[#071233] to-[#1e3a8a] p-8 text-white shadow-lg md:p-10">
            <div className="max-w-3xl">
              <div className="text-xs font-medium uppercase tracking-[0.28em] text-white/70">
                Explore more
              </div>
              <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl" style={{ fontFamily: "'Libre Baskerville', serif" }}>
                Make the most of your NACIVT weekend in Montreal.
              </h3>
              <p className="mt-4 text-base leading-7 text-white/85 md:text-lg">
                Whether you are here for volleyball, family time, or a city getaway, Montreal has great food, nightlife,
                landmarks, and summer experiences waiting for you.
              </p>

              <a
                href="https://www.mtl.org/en"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#1e3a8a] transition-transform hover:scale-[1.02]"
              >
                <ExternalIcon />
                Explore Montreal
              </a>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
