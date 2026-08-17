export type Product = {
  id: string
  name: string
  price: number
  description?: string
}

export const products: Product[] = [
  { id: '1', name: 'منتج 1', price: 29.99, description: 'وصف بسيط للمنتج 1' },
  { id: '2', name: 'منتج 2', price: 49.5, description: 'وصف للمنتج 2' },
  { id: '3', name: 'منتج 3', price: 15.0, description: 'وصف للمنتج 3' }
]
