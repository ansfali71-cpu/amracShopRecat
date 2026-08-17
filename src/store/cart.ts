import create from 'zustand'
import { Product } from '../data/products'

type CartItem = Product & { quantity: number }

type CartState = {
  items: CartItem[]
  add: (product: Product) => void
  remove: (id: string) => void
  clear: () => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCart = create<CartState>((set, get) => ({
  items: [],
  add: (product) =>
    set((state) => {
      const exists = state.items.find((i) => i.id === product.id)
      if (exists) {
        return { items: state.items.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i)) }
      }
      return { items: [...state.items, { ...product, quantity: 1 }] }
    }),
  remove: (id) => set((state) => ({ items: state.items.filter((i) => i.id !== id) })),
  clear: () => set({ items: [] }),
  totalItems: () => get().items.reduce((s, i) => s + i.quantity, 0),
  totalPrice: () => get().items.reduce((s, i) => s + i.price * i.quantity, 0)
}))
