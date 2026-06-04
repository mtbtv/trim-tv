import { Provider, MediaItem, ProviderConfig } from '../types';
import { storage } from '../utils/storage';
import { providerScraper } from './scraper';

class ProviderManager {
  private providers: Map<string, Provider> = new Map();
  private configs: Map<string, ProviderConfig> = new Map();
  private cache: Map<string, { data: MediaItem[]; timestamp: number }> =
    new Map();

  private CACHE_DURATION = 60 * 60 * 1000; // 1 hour

  async loadProviders(): Promise<Provider[]> {
    try {
      const providers = await storage.getItem('trim_providers');
      if (providers && Array.isArray(providers)) {
        providers.forEach((p) => this.providers.set(p.id, p));
        return providers;
      }
      return [];
    } catch (error) {
      console.error('Error loading providers:', error);
      return [];
    }
  }

  async addProvider(provider: Provider, config?: ProviderConfig): Promise<void> {
    try {
      // Validate provider
      if (!provider.id || !provider.name || !provider.url) {
        throw new Error('Provider must have id, name, and url');
      }

      this.providers.set(provider.id, provider);
      if (config) {
        this.configs.set(provider.id, config);
      }

      await this.saveProviders();
    } catch (error) {
      console.error('Error adding provider:', error);
      throw error;
    }
  }

  async removeProvider(providerId: string): Promise<void> {
    try {
      this.providers.delete(providerId);
      this.configs.delete(providerId);
      this.cache.delete(providerId);
      await this.saveProviders();
    } catch (error) {
      console.error('Error removing provider:', error);
      throw error;
    }
  }

  async updateProvider(
    providerId: string,
    updates: Partial<Provider>
  ): Promise<void> {
    try {
      const provider = this.providers.get(providerId);
      if (!provider) {
        throw new Error(`Provider ${providerId} not found`);
      }

      const updated = { ...provider, ...updates };
      this.providers.set(providerId, updated);
      this.cache.delete(providerId);
      await this.saveProviders();
    } catch (error) {
      console.error('Error updating provider:', error);
      throw error;
    }
  }

  async getProviderContent(providerId: string): Promise<MediaItem[]> {
    try {
      const provider = this.providers.get(providerId);
      if (!provider) {
        throw new Error(`Provider ${providerId} not found`);
      }

      if (!provider.enabled) {
        return [];
      }

      // Check cache
      const cached = this.cache.get(providerId);
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data;
      }

      // Scrape provider
      const config = this.configs.get(providerId) || this.getDefaultConfig();
      const items = await providerScraper.scrapeProvider(provider, config);

      // Cache result
      this.cache.set(providerId, { data: items, timestamp: Date.now() });

      // Update item count
      await this.updateProvider(providerId, { itemCount: items.length });

      return items;
    } catch (error) {
      console.error(`Error getting content from provider ${providerId}:`, error);
      return [];
    }
  }

  async getAllContent(): Promise<MediaItem[]> {
    try {
      const enabledProviders = Array.from(this.providers.values()).filter(
        (p) => p.enabled
      );

      const contentPromises = enabledProviders.map((p) =>
        this.getProviderContent(p.id)
      );

      const results = await Promise.all(contentPromises);
      return results.flat();
    } catch (error) {
      console.error('Error getting all content:', error);
      return [];
    }
  }

  getProviders(): Provider[] {
    return Array.from(this.providers.values());
  }

  getProvider(providerId: string): Provider | undefined {
    return this.providers.get(providerId);
  }

  toggleProvider(providerId: string): void {
    const provider = this.providers.get(providerId);
    if (provider) {
      provider.enabled = !provider.enabled;
      this.cache.delete(providerId);
      this.saveProviders();
    }
  }

  clearCache(providerId?: string): void {
    if (providerId) {
      this.cache.delete(providerId);
    } else {
      this.cache.clear();
    }
  }

  private getDefaultConfig(): ProviderConfig {
    return {
      selectors: {
        items: '.item, .media-item, [data-type="media"]',
        title: '.title, h2, .name',
        description: '.description, p',
        thumbnail: 'img, .poster',
        url: 'a, [data-url]',
      },
    };
  }

  private async saveProviders(): Promise<void> {
    try {
      const providers = Array.from(this.providers.values());
      await storage.setItem('trim_providers', providers);
    } catch (error) {
      console.error('Error saving providers:', error);
    }
  }
}

export const providerManager = new ProviderManager();
