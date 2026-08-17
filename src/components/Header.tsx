import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../store/cart'

export default function Header() {
  const total = useCart((s) => s.totalItems())
  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-xl font-bold">AmracShop</Link>
        <nav className="space-x-4">
          <Link to="/cart" className="inline-flex items-center gap-2">
            سلة ({total})
          </Link>
        </nav>
      </div>
    </header>
  )
}
