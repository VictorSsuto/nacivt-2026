import { useState } from "react"
import shopHero from "../../assets/shop.jpg"
import { FadeIn } from "../../components/FadeIn"

import mahjongWhite from "../../assets/shop/mahjong-white.webp"
import mahjongStoneBlue from "../../assets/shop/mahjong-stone-blue.webp"
import chinatownMetroBlue from "../../assets/shop/chinatown-metro-blue.webp"
import chinatownCardinalRed from "../../assets/shop/chinatown-cardinal-red.webp"
import chinatownLsGreen from "../../assets/shop/chinatown-ls-green.webp"
import bienvenueNavy from "../../assets/shop/bienvenue-navy.webp"
import bienvenueBlack from "../../assets/shop/bienvenue-black.webp"
import bienvenueLsNavy from "../../assets/shop/bienvenue-ls-navy.webp"

const ZEFFY_URL =
  "https://www.zeffy.com/en-CA/ticketing/the-81st-nacivt-montreal--2026"

const PRODUCTS = [
  {
    name: "MAHJONG 麻将",
    price: 35,
    garment: "Gildan Ultra Cotton T-shirt · 100% cotton",
    description:
      "Inspired from the iconic game, two tiles represent 20-26, painted as volleyballs instead of dots.",
    images: [
      { src: mahjongWhite, label: "White", swatch: "#f5f5f0" },
      { src: mahjongStoneBlue, label: "Stone Blue", swatch: "#7d97ad" },
    ],
  },
  {
    name: "CHINATOWN 唐人街",
    price: 35,
    garment: "Gildan Ultra Cotton T-shirt · 100% cotton",
    description:
      "Inspired from iconic Chinese landmarks in Montreal — the Chinese Garden at the Botanical Garden, the Lions at the Chinatown Main Gate, and more.",
    images: [
      { src: chinatownMetroBlue, label: "Metro Blue", swatch: "#2456a4" },
      { src: chinatownCardinalRed, label: "Cardinal Red", swatch: "#8a1e2d" },
    ],
  },
  {
    name: "CHINATOWN LONG-SLEEVE 唐人街",
    price: 45,
    garment: "Gildan Ultra Cotton Long Sleeve · 100% cotton",
    description:
      "The Chinatown design on a cozy long-sleeve — featuring the Chinese Garden, the Lions at the Chinatown Main Gate, and more.",
    images: [
      { src: chinatownLsGreen, label: "Forest Green", swatch: "#28402b" },
    ],
  },
  {
    name: "BIENVENUE 欢迎",
    price: 35,
    garment: "Gildan Softstyle T-shirt · 100% ring-spun cotton",
    description:
      "'Welcome to Montreal' — featuring the city's iconic landmarks: the Olympic Stadium, Chinatown, the Notre-Dame Basilica and the Five Roses.",
    images: [
      { src: bienvenueNavy, label: "Navy", swatch: "#1f2a44" },
      { src: bienvenueBlack, label: "Black", swatch: "#1a1a1a" },
    ],
  },
  {
    name: "BIENVENUE LONG-SLEEVE 欢迎",
    price: 45,
    garment: "Gildan Softstyle Long Sleeve · 100% ring-spun cotton",
    description:
      "The Bienvenue design on a long-sleeve — Olympic Stadium, Chinatown, the Notre-Dame Basilica and the Five Roses.",
    images: [{ src: bienvenueLsNavy, label: "Navy", swatch: "#1f2a44" }],
  },
]

function ProductCard({ product }) {
  const [active, setActive] = useState(0)
  const image = product.images[active]

  return (
    <a
      href={ZEFFY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group block overflow-hidden rounded-sm bg-white shadow-sm ring-1 ring-black/5 transition hover:shadow-md"
    >
      <div className="aspect-[4/3] w-full overflow-hidden bg-[#f4f2ee]">
        <img
          src={image.src}
          alt={`${product.name} — ${image.label}`}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-contain transition duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold tracking-tight text-black">
            {product.name}
          </h3>
          <div className="shrink-0 text-base font-bold text-[#1e3a8a]">
            ${product.price}
          </div>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-black/60">
          {product.description}
        </p>

        <p className="mt-2 text-xs text-black/45">{product.garment}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.images.map((img, i) => (
              <button
                key={img.label}
                type="button"
                title={img.label}
                aria-label={`Show ${img.label}`}
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  setActive(i)
                }}
                className={`h-5 w-5 rounded-full border transition ${
                  i === active
                    ? "border-[#1e3a8a] ring-2 ring-[#1e3a8a]/30"
                    : "border-black/20"
                }`}
                style={{ backgroundColor: img.swatch }}
              />
            ))}
            <span className="ml-1 text-xs text-black/50">{image.label}</span>
          </div>

          <span className="text-sm font-medium text-[#1e3a8a] group-hover:underline">
            Buy on Zeffy →
          </span>
        </div>
      </div>
    </a>
  )
}

export default function Shop() {
  return (
    <>
      <section className="relative h-[40vh] min-h-[320px] w-full overflow-hidden">
        <img
          src={shopHero}
          alt=""
          aria-hidden="true"
          loading="eager"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover object-[50%_50%] sm:object-[50%_48%]"
        />

        <div className="absolute inset-0 bg-[#1e3a8a]/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/40" />

        <div className="relative z-10 flex h-full items-center">
          <div className="mx-auto w-full max-w-6xl px-8 text-white">
            <FadeIn variant="down">
              <h1
                className="text-4xl md:text-5xl font-bold tracking-tight text-white"
                style={{ fontFamily: "'Libre Baskerville', serif" }}
              >
                Shop
              </h1>
            </FadeIn>

            <FadeIn variant="up" delay={120}>
              <p className="mt-4 max-w-2xl text-lg text-white/90">
                Official 81st NACIVT merch — every purchase supports the
                tournament.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <section id="shop" className="mt-4">
          <FadeIn>
            <div className="max-w-3xl">
              <h2 className="page-section-title text-black">
                Official merchandise
              </h2>
              <div className="h-px w-16 bg-black/20 my-6"></div>
              <p className="page-body-lead text-black/70">
                All orders are handled through our Zeffy store — 100% of
                proceeds go to the tournament. Pick-up at 1001 Pl.
                Jean-Paul-Riopelle, Montréal.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {PRODUCTS.map((product) => (
                <ProductCard key={product.name} product={product} />
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="mt-16 flex flex-col items-center gap-3 text-center">
              <a
                href={ZEFFY_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-sm bg-[#1e3a8a] px-8 py-4 text-lg font-semibold text-white transition hover:opacity-90"
              >
                Shop the full collection on Zeffy →
              </a>
              <p className="text-sm text-black/50">
                Opens in a new tab · Sizes XS–XL · $35 tees · $45 long-sleeves
              </p>
            </div>
          </FadeIn>
        </section>
      </main>
    </>
  )
}
