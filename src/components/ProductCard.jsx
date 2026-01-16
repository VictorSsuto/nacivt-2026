import React from "react"

export default function ProductCard({ product, onAdd }) {
  return (
    <div className="shadow-sm rounded-sm overflow-hidden bg-white">
      <div className="h-48 w-full bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">${product.price}</div>
          <button
            onClick={() => onAdd(product)}
            className="rounded bg-[#1e3a8a] text-white px-3 py-1 text-sm hover:opacity-90"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}
