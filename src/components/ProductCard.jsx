import React from "react"
import { useTranslation } from "react-i18next"

export default function ProductCard({ product, onAdd }) {
  const { t } = useTranslation()
  
  return (
    <div className="shadow-sm rounded-sm overflow-hidden bg-white">
      <div className="h-48 w-full bg-gray-100">
        <img
          src={product.image}
          alt={t(`products.${product.translationKey}.name`)}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold">{t(`products.${product.translationKey}.name`)}</h3>
        <p className="mt-2 text-sm text-gray-600">{t(`products.${product.translationKey}.description`)}</p>
        <div className="mt-4 flex items-center justify-between">
          <div className="text-lg font-bold">${product.price}</div>
          <button
            onClick={() => onAdd(product)}
            className="rounded bg-[#1e3a8a] text-white px-3 py-1 text-sm hover:opacity-90"
          >
            {t('shop.addToCart')}
          </button>
        </div>
      </div>
    </div>
  )
}
