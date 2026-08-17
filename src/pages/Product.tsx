import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../store/cart'

export default function ProductPage() {
  const { id } = useParams()
  const product = products.find((p) => p.id === id)
  const add = useCart((s) => s.add)

  if (!product) return <div>المنتج غير موجود</div>

  return (
    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <img src={`https://picsum.photos/seed/${product.id}/800/600`} alt={product.name} className="w-full rounded" />
      <div>
        <h1 className="text-2xl font-bold">{product.name}</h1>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <div className="mt-6 text-xl font-semibold">${product.price.toFixed(2)}</div>
        <div className="mt-6 space-x-2">
          <button onClick={() => add(product)} className="px-4 py-2 bg-blue-600 text-white rounded">أضف إلى السلة</button>
          <Link to="/cart" className="px-4 py-2 border rounded">عرض السلة</Link>
        </div>
      </div>
    </div>
  )
}
