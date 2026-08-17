import React from 'react'
import { products } from '../data/products'
import ProductList from '../components/ProductList'

export default function Home() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">المنتجات</h2>
      <ProductList products={products} />
    </div>
  )
}
