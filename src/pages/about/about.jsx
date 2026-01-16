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
								Learn about NACIVT 2026 and what to expect.
							</p>
						</FadeIn>
					</div>
				</div>
			</section>

			{/* Main content */}
			<main className="mx-auto max-w-6xl px-8 py-20">
				<FadeIn>
					<div className="max-w-3xl">
						<h2 className="text-xl leading-relaxed text-black/70">
							Welcome to NACIVT 2026.
						</h2>
						<p className="mt-3 text-base text-black/60">
							This page will be updated as we finalize details about the event,
							divisions, and schedule.
						</p>
					</div>
				</FadeIn>

				{/* About section */}
				<FadeIn>
					<section
						id="about"
						className="scroll-mt-28 mt-24 border-t border-black/10 pt-16"
					>
						<h2 className="text-3xl font-bold">About NACIVT 2026</h2>
						<p className="mt-4 text-base text-black/70">
							NACIVT is a 9-man volleyball tournament hosted in Montréal. More
							information on divisions, schedule structure, and venue logistics
							will be posted as we finalize details.
						</p>

						<div className="mt-8 grid gap-6 md:grid-cols-2">
							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">Venue</h3>
								<p className="mt-2 text-black/70">
									Matches will take place at the Palais des congrès de Montréal.
									Entrance details, court map, and on-site flow will be shared
									closer to the event.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">Language</h3>
								<p className="mt-2 text-black/70">
									Montréal is French-first. Event information will be available
									in French, with English support available on site.
								</p>
							</div>
						</div>
					</section>
				</FadeIn>

				{/* FAQ */}
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
									Where do players check in?
								</h3>
								<p className="mt-2 text-black/70">
									Player check-in will be available on site at a designated welcome desk.
									Teams should arrive early and be ready before their first scheduled match.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									Is parking available?
								</h3>
								<p className="mt-2 text-black/70">
									Parking options (paid lots, nearby garages, and recommended drop-off
									areas) will be shared closer to the event. We strongly recommend using
									public transit when possible.
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
									End-of-day scores, pool standings, and bracket updates will be posted
									online. The official results link will be shared before the tournament
									begins.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									Will first aid or physiotherapy be available on site?
								</h3>
								<p className="mt-2 text-black/70">
									First aid services will be available on site throughout the tournament.
									Information regarding on-site physiotherapy support will be announced
									closer to the event.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									When are the opening and closing ceremonies?
								</h3>
								<p className="mt-2 text-black/70">
									Opening and closing ceremony details, including timing and format, will
									be announced once the full tournament schedule is finalized.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									Can we bring outdoor food or drinks?
								</h3>
								<p className="mt-2 text-black/70">
									Food and drink policies will follow venue regulations. We’ll confirm what
									is allowed (water bottles, snacks, etc.) and what is not allowed before
									tournament week.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									How do I get Night Market tickets?
								</h3>
								<p className="mt-2 text-black/70">
									Night Market ticket details will be posted on the Night Market page. If
									tickets are required, pricing and purchase information will be shared in
									advance.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									Do you offer guest passes?
								</h3>
								<p className="mt-2 text-black/70">
									Guest pass information (if applicable) will be announced closer to the
									event. We’ll clarify what guest passes include and how to obtain them.
								</p>
							</div>

							<div className="rounded-sm border border-black/10 p-6">
								<h3 className="text-lg font-semibold">
									What about language barriers?
								</h3>
								<p className="mt-2 text-black/70">
									Montréal is a French-first city. Event information will be available in
									French, with English support provided on site by staff and volunteers.
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

				{/* Contact */}
				<FadeIn>
					<section
						id="contact"
						className="scroll-mt-28 mt-20 border-t border-black/10 pt-16"
					>
						<h2 className="text-3xl font-bold">Contact</h2>
						<p className="mt-4 text-base text-black/70">
							Contact information will be posted soon. Please check back for
							updates.
						</p>
					</section>
				</FadeIn>
			</main>
		</>
	)
}
