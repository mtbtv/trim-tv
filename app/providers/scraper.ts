import axios from 'axios';
import * as cheerio from 'cheerio';
import { MediaItem, Provider, ProviderConfig } from '../types';

export interface ScrapeResult {
  items: MediaItem[];
  nextPage?: string;
}

class ProviderScraper {
  async scrapeHTML(
    provider: Provider,
    config: ProviderConfig,
    url: string
  ): Promise<ScrapeResult> {
    try {
      const response = await axios.get(url, {
        headers: provider.headers || {},
        timeout: 10000,
      });

      const $ = cheerio.load(response.data);
      const items: MediaItem[] = [];

      $(config.selectors?.items || '.item').each((_index, element) => {
        const title = $(element)
          .find(config.selectors?.title || '.title')
          .text()
          .trim();

        const description = $(element)
          .find(config.selectors?.description || '.description')
          .text()
          .trim();

        const thumbnail = $(element)
          .find(config.selectors?.thumbnail || 'img')
          .attr('src');

        const contentUrl = $(element)
          .find(config.selectors?.url || 'a')
          .attr('href');

        if (title && contentUrl) {
          items.push({
            id: `${provider.id}-${contentUrl}`,
            title,
            description,
            thumbnail: thumbnail || '',
            poster: thumbnail || '',
            rating: 0,
            year: new Date().getFullYear(),
            duration: 0,
            genre: [],
            cast: [],
            url: contentUrl,
            progress: 0,
            providerId: provider.id,
          });
        }
      });

      return { items };
    } catch (error) {
      console.error(`Error scraping HTML from ${url}:`, error);
      throw error;
    }
  }

  async scrapeJSON(
    provider: Provider,
    config: ProviderConfig,
    url: string
  ): Promise<ScrapeResult> {
    try {
      const response = await axios.get(url, {
        headers: provider.headers || {},
        timeout: 10000,
      });

      const data = response.data;
      const items: MediaItem[] = [];

      // Handle nested data structures
      const itemsArray = config.selectors?.items
        ? this.getNestedValue(data, config.selectors.items)
        : data;

      if (!Array.isArray(itemsArray)) {
        throw new Error('Expected array of items');
      }

      itemsArray.forEach((item: any) => {
        const title = this.getNestedValue(item, config.selectors?.title);
        const contentUrl = this.getNestedValue(item, config.selectors?.url);

        if (title && contentUrl) {
          items.push({
            id: `${provider.id}-${contentUrl}`,
            title,
            description: this.getNestedValue(item, config.selectors?.description) || '',
            thumbnail: this.getNestedValue(item, config.selectors?.thumbnail) || '',
            poster: this.getNestedValue(item, config.selectors?.thumbnail) || '',
            rating: item.rating || 0,
            year: item.year || new Date().getFullYear(),
            duration: item.duration || 0,
            genre: item.genre || [],
            cast: item.cast || [],
            url: contentUrl,
            progress: 0,
            providerId: provider.id,
          });
        }
      });

      return { items };
    } catch (error) {
      console.error(`Error scraping JSON from ${url}:`, error);
      throw error;
    }
  }

  async scrapeProvider(
    provider: Provider,
    config: ProviderConfig
  ): Promise<MediaItem[]> {
    try {
      let result: ScrapeResult;

      if (provider.type === 'html') {
        result = await this.scrapeHTML(provider, config, provider.url);
      } else if (provider.type === 'json') {
        result = await this.scrapeJSON(provider, config, provider.url);
      } else {
        throw new Error(`Unsupported provider type: ${provider.type}`);
      }

      return result.items;
    } catch (error) {
      console.error(`Error scraping provider ${provider.id}:`, error);
      return [];
    }
  }

  private getNestedValue(obj: any, path?: string): any {
    if (!path) return obj;
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }
}

export const providerScraper = new ProviderScraper();
