import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FavoritesState {
  favoriteProjects: string[];
  favoriteBatches: string[];
  toggleProject: (projectId: string) => void;
  toggleBatch: (batchId: string) => void;
  isProjectFavorite: (projectId: string) => boolean;
  isBatchFavorite: (batchId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favoriteProjects: [],
      favoriteBatches: [],

      toggleProject: (projectId) => {
        const favorites = get().favoriteProjects;
        if (favorites.includes(projectId)) {
          set({ favoriteProjects: favorites.filter(id => id !== projectId) });
        } else {
          set({ favoriteProjects: [...favorites, projectId] });
        }
      },

      toggleBatch: (batchId) => {
        const favorites = get().favoriteBatches;
        if (favorites.includes(batchId)) {
          set({ favoriteBatches: favorites.filter(id => id !== batchId) });
        } else {
          set({ favoriteBatches: [...favorites, batchId] });
        }
      },

      isProjectFavorite: (projectId) => {
        return get().favoriteProjects.includes(projectId);
      },

      isBatchFavorite: (batchId) => {
        return get().favoriteBatches.includes(batchId);
      },
    }),
    {
      name: 'carbon-favorites',
    }
  )
);
