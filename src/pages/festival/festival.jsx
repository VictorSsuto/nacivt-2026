import festivalHero from "../../assets/bracket.jpg"
import { FadeIn } from "../../components/FadeIn"
import { useTranslation } from "react-i18next"

export default function Festival() {
	const { t } = useTranslation()
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
								{t('festival.pageTitle')}
							</h1>
						</FadeIn>

						<FadeIn variant="up" delay={120}>
							<p className="mt-4 max-w-2xl text-lg text-white/90">
								{t('festival.pageSubtitle')}
							</p>
						</FadeIn>
					</div>
				</div>
			</section>

			<main className="mx-auto max-w-6xl px-8 py-20">
				<FadeIn>
					<div className="max-w-3xl">
						<p className="text-xl leading-relaxed text-black/70">
							{t('festival.description')}
						</p>
					</div>
				</FadeIn>
			</main>
		</>
	)
}
