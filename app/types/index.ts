export interface MediaItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  poster: string;
  rating: number;
  year: number;
  duration: number;
  genre: string[];
  cast: string[];
  url: string;
  progress: number;
  providerId: string;
}

export interface Provider {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
  type: 'html' | 'json' | 'api';
  headers?: Record<string, string>;
  auth?: {
    username?: string;
    password?: string;
  };
  lastUpdated?: number;
  itemCount?: number;
}

export interface ProviderConfig {
  selectors?: {
    items: string;
    title: string;
    description?: string;
    thumbnail?: string;
    url?: string;
  };
  pagination?: {
    type: 'url' | 'offset';
    param: string;
    startPage?: number;
  };
}

export interface RootStackParamList {
  Home: undefined;
  Details: { id: string };
  Player: { id: string; title: string };
  Settings: undefined;
  Providers: undefined;
}

export interface WatchlistItem extends MediaItem {
  addedAt: number;
}
