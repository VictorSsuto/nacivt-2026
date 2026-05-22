import { FadeIn } from "../../components/FadeIn";
import registerImg from "../../assets/register.jpg";

export default function Register() {
  return (
    <>
      {/* Hero */}
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={registerImg}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_15%]"
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
                Registration
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">Information coming up...</p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Main content (minimal) */}
      <main className="mx-auto max-w-6xl px-8 py-20">
        <FadeIn>
          <div className="max-w-3xl">
            <p className="page-body-lead text-black/70">
              Information on the official registration is shortly coming up stay tuned to our <a href="https://www.instagram.com/montrealnacivt/" target="_blank" rel="noopener noreferrer" className="text-[#c8102e] underline underline-offset-2 hover:text-[#8b0000]">instagram</a> for updates!
            </p>
          </div>
        </FadeIn>
      </main>
    </>
  );
}
