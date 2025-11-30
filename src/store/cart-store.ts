import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  size?: string
  color?: string
}

export interface DiscountInfo {
  code: string
  type: 'PERCENTAGE' | 'FIXED_AMOUNT'
  value: number
  discountAmount: number
  description?: string
}

interface CartStore {
  items: CartItem[]
  discount: DiscountInfo | null
  addItem: (item: Omit<CartItem, 'quantity'>) => void
  removeItem: (id: string, size?: string, color?: string) => void
  updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  applyDiscount: (discount: DiscountInfo) => void
  removeDiscount: () => void
  getDiscountedTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      discount: null,

      addItem: (item) => {
        const items = get().items
        const existingItemIndex = items.findIndex(
          (i) => i.id === item.id && i.size === item.size && i.color === item.color
        )

        if (existingItemIndex > -1) {
          // Item exists, increment quantity
          const updatedItems = [...items]
          updatedItems[existingItemIndex].quantity += 1
          set({ items: updatedItems })
        } else {
          // New item
          set({ items: [...items, { ...item, quantity: 1 }] })
        }
      },

      removeItem: (id, size, color) => {
        set((state) => ({
          items: state.items.filter(
            (item) => !(item.id === id && item.size === size && item.color === color)
          ),
        }))
      },

      updateQuantity: (id, quantity, size, color) => {
        if (quantity <= 0) {
          get().removeItem(id, size, color)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === id && item.size === size && item.color === color
              ? { ...item, quantity }
              : item
          ),
        }))
      },

      clearCart: () => set({ items: [], discount: null }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      applyDiscount: (discount) => {
        set({ discount })
      },

      removeDiscount: () => {
        set({ discount: null })
      },

      getDiscountedTotal: () => {
        const subtotal = get().getTotalPrice()
        const discount = get().discount

        if (!discount) {
          return subtotal
        }

        return Math.max(0, subtotal - discount.discountAmount)
      },
    }),
    {
      name: 'village-cart',
    }
  )
)
