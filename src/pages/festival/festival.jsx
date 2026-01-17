import festivalHero from "../../assets/bracket.jpg"
import { FadeIn } from "../../components/FadeIn"

export default function Festival() {
	return (
		<>
			{/* Slim editorial hero */}
			<section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
				<img
					src={festivalHero}
					alt="Festival"
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
								className="text-4xl md:text-5xl font-bold tracking-tight"
								style={{ fontFamily: "'Libre Baskerville', serif" }}
							>
								Festival
							</h1>
						</FadeIn>

						<FadeIn variant="up" delay={120}>
							<p className="mt-4 max-w-2xl text-lg text-white/90">
								Night Market, community events, food, and entertainment.
							</p>
						</FadeIn>
					</div>
				</div>
			</section>

			<main className="mx-auto max-w-6xl px-8 py-20">
				<FadeIn>
					<div className="max-w-3xl">
						<p className="text-xl leading-relaxed text-black/70">
							Festival information is coming soon. Check back for vendors,
							schedules, and programming details.
						</p>
					</div>
				</FadeIn>
			</main>
		</>
	)
}
