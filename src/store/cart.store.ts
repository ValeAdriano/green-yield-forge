import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'expiresAt'>) => void;
  removeItem: (batchId: string) => void;
  updateQuantity: (batchId: string, qtyTons: number) => void;
  clearCart: () => void;
  removeExpiredItems: () => void;
  getTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos
        const existingItem = get().items.find(i => i.batchId === item.batchId);

        if (existingItem) {
          set({
            items: get().items.map(i =>
              i.batchId === item.batchId
                ? { 
                    ...i, 
                    qtyTons: i.qtyTons + item.qtyTons,
                    subtotal: (i.qtyTons + item.qtyTons) * i.pricePerTon,
                    expiresAt 
                  }
                : i
            ),
          });
        } else {
          set({
            items: [...get().items, { ...item, expiresAt }],
          });
        }
      },

      removeItem: (batchId) => {
        set({
          items: get().items.filter(item => item.batchId !== batchId),
        });
      },

      updateQuantity: (batchId, qtyTons) => {
        set({
          items: get().items.map(item =>
            item.batchId === batchId
              ? { ...item, qtyTons, subtotal: qtyTons * item.pricePerTon }
              : item
          ),
        });
      },

      clearCart: () => {
        set({ items: [] });
      },

      removeExpiredItems: () => {
        const now = new Date();
        set({
          items: get().items.filter(item => new Date(item.expiresAt) > now),
        });
      },

      getTotal: () => {
        return get().items.reduce((sum, item) => sum + item.subtotal, 0);
      },
    }),
    {
      name: 'carbon-cart',
    }
  )
);

// Auto-remove expired items every 30 seconds
setInterval(() => {
  useCartStore.getState().removeExpiredItems();
}, 30000);
