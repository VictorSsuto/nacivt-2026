import React from "react"

export default function CartDrawer({ open, cart, onClose, onRemove, onChangeQty }) {
  if (!open) return null

  const items = Object.values(cart)
  const total = items.reduce((s, it) => s + it.product.price * it.qty, 0)

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
              <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded" />
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

          <div className="mt-4">
            <button className="w-full rounded bg-[#c8102e] text-white py-2">Checkout (mock)</button>
          </div>
        </div>
      </div>
    </div>
  )
}
