import shopHero from "../../assets/shop.jpg"

export default function Shop() {
  return (
    <>
      <section className="relative h-[40vh]  min-h-[320px] w-full overflow-hidden">
        <img
          src={shopHero}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover object-[50%_48%]"
        />

        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <h1
              className="text-5xl font-bold tracking-tight"
              style={{ fontFamily: "'Libre Baskerville', serif" }}
            >
              Shop
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-white/90">
              Merchandise and swag coming soon.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <section id="shop" className="mt-4">
          <h2 className="text-3xl font-bold">Shop</h2>
          <p className="mt-4 text-base text-black/70">Shop details coming soon.</p>
        </section>
      </main>
    </>
  )
}
