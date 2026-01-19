import React, { useState } from "react"

export default function CartDrawer({ open, cart, onClose, onRemove, onChangeQty }) {
  if (!open) return null

  const items = Object.values(cart)
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [orderId, setOrderId] = useState(null)
  const [message, setMessage] = useState(null)
  // Checkout is not live yet — set to `true` to enable
  const CHECKOUT_LIVE = false

  function buildOrderText(id) {
    const lines = []
    lines.push(`Order ID: ${id}`)
    lines.push(`Name: ${name}`)
    lines.push(`Email: ${email}`)
    lines.push("\nItems:")
    items.forEach(({ product, qty }) => {
      lines.push(`- ${product.name} x ${qty} — $${product.price * qty}`)
    })
    lines.push(`\nTotal: $${total.toFixed(2)}`)
    lines.push("\nPay in person and show this Order ID at pickup.")
    return lines.join("\n")
  }

  async function handleCheckout() {
    if (items.length === 0) return setMessage("Cart is empty")
    if (!name || !email) return setMessage("Please enter name and email")
    setLoading(true)
    setMessage(null)

    try {
      const resp = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, items, total }),
      })

      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}))
        throw new Error(err.error || "Server failed to send email")
      }

      const data = await resp.json()
      setOrderId(data.orderId)
      setMessage("Confirmation email sent. Show this Order ID at pickup.")
    } catch (err) {
      setMessage("Failed to send confirmation: " + err.message)
    } finally {
      setLoading(false)
    }
  }

  function mailtoMerchantLink(id) {
    const subject = encodeURIComponent(`New order ${id} from ${name}`)
    const body = encodeURIComponent(buildOrderText(id))
    return `mailto:${MERCHANT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <div className="fixed inset-0 z-50 flex">
      <div className="flex-1" onClick={onClose} />
      <div className="w-96 max-w-full bg-white shadow-xl p-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold">Cart</h3>
          <button onClick={onClose} className="text-gray-500">Close</button>
        </div>

        <div className="mt-4 space-y-3">
          {items.length === 0 && <div className="text-sm text-gray-600">Cart is empty</div>}
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex items-center gap-3">
              <img src={product.image} alt={product.name} loading="lazy" decoding="async" width="48" height="48" className="h-12 w-12 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{product.name}</div>
                <div className="text-sm text-gray-600">${product.price} × {qty}</div>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="1"
                  value={qty}
                  onChange={(e) => onChangeQty(product.id, Math.max(1, Number(e.target.value)))}
                  className="w-16 rounded border px-2 py-1 text-sm"
                />
                <button onClick={() => onRemove(product.id)} className="text-red-500 text-sm">Remove</button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t pt-4">
          <div className="flex items-center justify-between font-semibold">
            <div>Total</div>
            <div>${total.toFixed(2)}</div>
          </div>

          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-sm font-medium">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="mt-1 w-full rounded border px-2 py-1" />
            </div>

            <div>
              <label className="block text-sm font-medium">Email</label>
              <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className="mt-1 w-full rounded border px-2 py-1" />
            </div>

            <div>
              <button
                onClick={handleCheckout}
                disabled={!CHECKOUT_LIVE || loading}
                aria-disabled={!CHECKOUT_LIVE || loading}
                title={!CHECKOUT_LIVE ? "Checkout not live yet" : undefined}
                className={
                  `w-full rounded py-2 ${(!CHECKOUT_LIVE || loading) ? 'bg-gray-300 text-gray-600 cursor-not-allowed' : 'bg-[#c8102e] text-white'}`
                }
              >
                {loading ? "Processing…" : (!CHECKOUT_LIVE ? "Checkout — Not live" : "Checkout — send confirmation")}
              </button>
            </div>

            {message && <div className="text-sm text-gray-700">{message}</div>}

            {orderId && (
              <div className="mt-2 p-2 rounded border bg-gray-50">
                <div className="font-medium">Order ID: {orderId}</div>
                <div className="mt-2 text-sm text-gray-700">A confirmation has been sent to the email you provided. Show this Order ID at pickup.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
