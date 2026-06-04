import { create } from 'zustand';
import { storage } from '../utils/storage';
import { Provider, MediaItem } from '../types';

interface StoreState {
  providers: Provider[];
  watchlist: MediaItem[];
  allMedia: MediaItem[];
  
  // Provider actions
  setProviders: (providers: Provider[]) => void;
  addProvider: (provider: Provider) => void;
  removeProvider: (providerId: string) => void;
  updateProvider: (providerId: string, updates: Partial<Provider>) => void;
  toggleProvider: (providerId: string) => void;

  // Media actions
  setAllMedia: (media: MediaItem[]) => void;
  addMedia: (media: MediaItem) => void;
  removeMedia: (mediaId: string) => void;

  // Watchlist actions
  addToWatchlist: (item: MediaItem) => void;
  removeFromWatchlist: (id: string) => void;
  isInWatchlist: (id: string) => boolean;
  getContinueWatching: () => MediaItem[];

  // Persistence
  loadFromStorage: () => Promise<void>;
  saveToStorage: () => Promise<void>;
}

export const useStore = create<StoreState>((set, get) => ({
  providers: [],
  watchlist: [],
  allMedia: [],

  // Provider actions
  setProviders: (providers) => {
    set({ providers });
    get().saveToStorage();
  },

  addProvider: (provider) =>
    set((state) => ({
      providers: [...state.providers, provider],
    })),

  removeProvider: (providerId) =>
    set((state) => ({
      providers: state.providers.filter((p) => p.id !== providerId),
    })),

  updateProvider: (providerId, updates) =>
    set((state) => ({
      providers: state.providers.map((p) =>
        p.id === providerId ? { ...p, ...updates } : p
      ),
    })),

  toggleProvider: (providerId) => {
    const state = get();
    const provider = state.providers.find((p) => p.id === providerId);
    if (provider) {
      state.updateProvider(providerId, { enabled: !provider.enabled });
    }
  },

  // Media actions
  setAllMedia: (media) => set({ allMedia: media }),

  addMedia: (media) =>
    set((state) => {
      const exists = state.allMedia.find((m) => m.id === media.id);
      return {
        allMedia: exists ? state.allMedia : [...state.allMedia, media],
      };
    }),

  removeMedia: (mediaId) =>
    set((state) => ({
      allMedia: state.allMedia.filter((m) => m.id !== mediaId),
    })),

  // Watchlist actions
  addToWatchlist: (item) =>
    set((state) => {
      const exists = state.watchlist.find((w) => w.id === item.id);
      return {
        watchlist: exists ? state.watchlist : [...state.watchlist, item],
      };
    }),

  removeFromWatchlist: (id) =>
    set((state) => ({
      watchlist: state.watchlist.filter((w) => w.id !== id),
    })),

  isInWatchlist: (id) => {
    const state = get();
    return state.watchlist.some((w) => w.id === id);
  },

  getContinueWatching: () => {
    const state = get();
    return state.watchlist.filter((item) => item.progress > 0 && item.progress < 100);
  },

  // Persistence
  loadFromStorage: async () => {
    try {
      const providers = await storage.getItem('providers');
      const watchlist = await storage.getItem('watchlist');
      set({
        providers: providers || [],
        watchlist: watchlist || [],
      });
    } catch (error) {
      console.error('Error loading from storage:', error);
    }
  },

  saveToStorage: async () => {
    try {
      const state = get();
      await storage.setItem('providers', state.providers);
      await storage.setItem('watchlist', state.watchlist);
    } catch (error) {
      console.error('Error saving to storage:', error);
    }
  },
}));
