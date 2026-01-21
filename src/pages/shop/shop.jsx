import shopHero from "../../assets/shop.jpg"
import { useEffect, useState } from "react"
import { PRODUCTS } from "../../data/products"
import ProductCard from "../../components/ProductCard"
import { FadeIn } from "../../components/FadeIn"
import CartDrawer from "../../components/CartDrawer"
import { useTranslation } from "react-i18next"

export default function Shop() {
  const { t } = useTranslation()
  const [cart, setCart] = useState(() => {
    try {
      const raw = localStorage.getItem("shop_cart")
      return raw ? JSON.parse(raw) : {}
    } catch (e) {
      return {}
    }
  })
  const [openCart, setOpenCart] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem("shop_cart", JSON.stringify(cart))
    } catch (e) {}
  }, [cart])

  function addToCart(product) {
    setCart((c) => {
      const next = { ...c }
      if (!next[product.id]) next[product.id] = { product, qty: 0 }
      next[product.id].qty += 1
      return next
    })
    setOpenCart(true)
  }

  function removeFromCart(id) {
    setCart((c) => {
      const next = { ...c }
      delete next[id]
      return next
    })
  }

  function changeQty(id, qty) {
    setCart((c) => {
      const next = { ...c }
      if (next[id]) next[id].qty = qty
      return next
    })
  }

  const itemCount = Object.values(cart).reduce((s, it) => s + it.qty, 0)

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
              <FadeIn variant="down">
                <h1
                  className="text-5xl font-bold tracking-tight"
                  style={{ fontFamily: "'Libre Baskerville', serif" }}
                >
                  {t('shop.pageTitle')}
                </h1>
              </FadeIn>

              <FadeIn variant="up" delay={120}>
                <p className="mt-4 max-w-2xl text-lg text-white/90">
                  {t('shop.pageSubtitle')}
                </p>
              </FadeIn>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-8 py-20">
        <section id="shop" className="mt-4">
          <FadeIn>
            <h2 className="text-3xl font-bold">{t('shop.sectionTitle')}</h2>
            <p className="mt-4 text-base text-black/70">{t('shop.sectionDescription')}</p>
          </FadeIn>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <FadeIn key={p.id} delay={i * 80}>
                <ProductCard product={p} onAdd={addToCart} />
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      {/* Floating cart button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setOpenCart(true)}
          className="flex items-center gap-3 rounded-full bg-[#1e3a8a] px-4 py-2 text-white shadow-lg"
        >
          {t('shop.cart')}
          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#c8102e] text-sm font-bold">{itemCount}</span>
        </button>
      </div>

      <CartDrawer
        open={openCart}
        cart={cart}
        onClose={() => setOpenCart(false)}
        onRemove={removeFromCart}
        onChangeQty={changeQty}
      />
    </>
  )
}
