import React from 'react'
import { useCart } from '../store/cart'

export default function CartPage() {
  const items = useCart((s) => s.items)
  const remove = useCart((s) => s.remove)
  const clear = useCart((s) => s.clear)
  const total = useCart((s) => s.totalPrice())

  if (items.length === 0)
    return (
      <div className="text-center py-16">
        <h3 className="text-xl">السلة فارغة</h3>
      </div>
    )

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">سلة التسوق</h2>
      <ul className="space-y-4">
        {items.map((it) => (
          <li key={it.id} className="flex items-center justify-between bg-white p-4 rounded shadow-sm">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-gray-500">كمية: {it.quantity}</div>
            </div>
            <div className="text-right">
              <div className="font-bold">${(it.price * it.quantity).toFixed(2)}</div>
              <button onClick={() => remove(it.id)} className="text-sm text-red-600 mt-2">إزالة</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-6 flex items-center justify-between">
        <div className="text-lg font-semibold">المجموع: ${total.toFixed(2)}</div>
        <div className="space-x-2">
          <button onClick={() => clear()} className="px-4 py-2 border rounded">تفريغ السلة</button>
          <button className="px-4 py-2 bg-green-600 text-white rounded">الدفع</button>
        </div>
      </div>
    </div>
  )
}
