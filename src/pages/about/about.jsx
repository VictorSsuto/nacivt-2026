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
