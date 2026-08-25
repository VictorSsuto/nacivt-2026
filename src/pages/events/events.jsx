import eventsHero from "../../assets/palais-des-congres.jpg"
import jiaFeature from "../../assets/jia-flyer.png"
import afterpartyFlyer from "../../assets/nacivt-afterparty-flyer.jpg"
import nightMarketFlyer from "../../assets/night-market-flyer.jpg"
import { FadeIn } from "../../components/FadeIn"
import { Link } from "react-router-dom"
import { LINKS } from "../../data/links"

const weekendEvents = [
  {
    badge: "Player Party",
    host: "Hosted by Pangea Restaurant & Bar",
    title: "Official NACIVT Afterparty",
    image: afterpartyFlyer,
    imageAlt:
      "Official NACIVT Afterparty flyer for Pangea Restaurant & Bar, Saturday September 5th, VIP line tickets",
    description:
      "Dress to impress and celebrate the weekend at Pangea Supperclub. A VIP line is reserved for NACIVT players.",
    details: [
      { label: "Date", value: "Saturday, September 5, 2026" },
      { label: "Time", value: "10 PM – 3 AM" },
      { label: "Location", value: "Pangea Supperclub\n104 Rue Saint-Paul Est" },
    ],
    notice:
      "VIP Line Tickets — order through the link by September 1 for $20 CDN / $15 USD (plus taxes & fees) and get Priority VIP Entrance, skip the line, and get in faster. After September 1: $25 CDN / $20 USD (plus taxes & fees), as written in the link.",
    bullets: [
      "Mention \"volleyball\" or \"NACIVT\" at the door for the VIP line.",
      "18+ event.",
    ],
    cta: {
      label: "Get VIP tickets",
      href: "https://www.tixr.com/groups/pangea/events/nacivt-montreal-2026-203654",
    },
  },
  {
    badge: "Night Market",
    host: "Presented by Asie en Fête",
    title: "NACIVT Night Market",
    image: nightMarketFlyer,
    imageAlt:
      "Marché de Nuit Asiatique flyer for the NACIVT Night Market in Montreal's Chinatown, Saturday September 5",
    description:
      "Marché de Nuit Asiatique sets up in the heart of Chinatown for the weekend, street-food stalls and all.",
    details: [
      { label: "Date", value: "Saturday, September 5, 2026" },
      { label: "Time", value: "6 PM – 10 PM" },
      { label: "Location", value: "1111 Boul. Saint-Laurent\nMontreal Chinatown" },
    ],
    notice: "See your team captain for a meal voucher.",
    cta: {
      label: "Get directions",
      href: "https://maps.google.com/?q=1111+Boul+Saint-Laurent+Montreal",
    },
  },
]

function WeekendEventCard({ event }) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-sm border border-black/10 bg-white shadow-sm">
      <div className="flex items-center justify-center bg-white p-4">
        <img
          src={event.image}
          alt={event.imageAlt}
          loading="lazy"
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-8">
        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="bg-[#E25E3E] px-3 py-1 text-xs font-semibold uppercase tracking-widest text-white">
            {event.badge}
          </span>
          <span className="text-xs font-medium uppercase tracking-widest text-black/50">
            {event.host}
          </span>
        </div>

        <h3
          className="text-xl sm:text-2xl font-bold tracking-tight text-black"
          style={{ fontFamily: "'Libre Baskerville', serif" }}
        >
          {event.title}
        </h3>

        <p className="mt-3 text-sm leading-6 text-black/70">
          {event.description}
        </p>

        <dl className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {event.details.map((detail) => (
            <div key={detail.label}>
              <dt className="text-xs font-medium uppercase tracking-wider text-black/60 mb-1">
                {detail.label}
              </dt>
              <dd className="text-sm font-semibold text-black/90 whitespace-pre-line">
                {detail.value}
              </dd>
            </div>
          ))}
        </dl>

        {event.notice && (
          <p className="mt-5 text-sm leading-6 text-black/70">
            {event.notice}
          </p>
        )}

        {event.bullets && (
          <ul className="mt-3 space-y-1 text-sm leading-6 text-black/70 list-disc pl-5">
            {event.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        )}

        <a
          href={event.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
        >
          {event.cta.label}
        </a>
      </div>
    </article>
  )
}

export default function Events() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={eventsHero}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_35%]"
        />

        <div className="absolute inset-0 bg-black/45" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                NACIVT Events
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Official tournament weekend events, run by NACIVT and our
                partners.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <h2 className="page-section-title text-black">
              Off the court, still part of the tournament.
            </h2>
            <div className="h-px w-16 bg-black/20 my-6"></div>
            <p className="text-lg leading-8 text-black/70">
              Looking for general things to do in Montreal instead? Check out
              our{" "}
              <Link
                to={LINKS.activities}
                className="font-medium text-[#275E6B] transition-colors hover:text-[#E25E3E]"
              >
                Activities guide
              </Link>
              .
            </p>
          </div>
        </FadeIn>

        <FadeIn>
          <section className="mt-16">
            <div className="text-xs font-medium uppercase tracking-widest text-[#E25E3E] mb-3">
              Saturday, September 5
            </div>
            <h2
              className="text-3xl font-bold tracking-tight text-black"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              NACIVT Weekend Events
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-7 text-black/70">
              Two more stops for tournament weekend, run by our partners.
            </p>

            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              {weekendEvents.map((event) => (
                <WeekendEventCard key={event.title} event={event} />
              ))}
            </div>
          </section>
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
                  Get directions
                </a>
              </div>
            </div>
          </section>
        </FadeIn>
      </main>
    </>
  )
}
