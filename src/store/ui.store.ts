import { create } from 'zustand';

interface UIState {
  compareDrawerOpen: boolean;
  compareBatches: string[];
  setCompareDrawerOpen: (open: boolean) => void;
  addToCompare: (batchId: string) => void;
  removeFromCompare: (batchId: string) => void;
  clearCompare: () => void;
}

export const useUIStore = create<UIState>((set, get) => ({
  compareDrawerOpen: false,
  compareBatches: [],

  setCompareDrawerOpen: (open) => set({ compareDrawerOpen: open }),

  addToCompare: (batchId) => {
    const batches = get().compareBatches;
    if (batches.length < 4 && !batches.includes(batchId)) {
      set({ compareBatches: [...batches, batchId] });
    }
  },

  removeFromCompare: (batchId) => {
    set({ compareBatches: get().compareBatches.filter(id => id !== batchId) });
  },

  clearCompare: () => set({ compareBatches: [] }),
}));
