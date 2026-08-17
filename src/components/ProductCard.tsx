import React from 'react'
import { Link } from 'react-router-dom'
import { Product } from '../data/products'

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-md bg-white overflow-hidden shadow-sm">
      <img src={`https://picsum.photos/seed/${product.id}/400/280`} alt={product.name} className="w-full h-44 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <div className="mt-3 flex items-center justify-between">
          <div className="font-bold">${product.price.toFixed(2)}</div>
          <Link to={`/product/${product.id}`} className="text-sm text-blue-600">عرض</Link>
        </div>
      </div>
    </div>
  )
}
