import { MMKV } from 'react-native-mmkv-storage';

const mmkvInstance = new MMKV();

export const storage = {
  setItem: async (key: string, value: any) => {
    try {
      mmkvInstance.setString(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting item ${key}:`, error);
    }
  },

  getItem: async (key: string) => {
    try {
      const value = mmkvInstance.getString(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting item ${key}:`, error);
      return null;
    }
  },

  removeItem: async (key: string) => {
    try {
      mmkvInstance.removeItem(key);
    } catch (error) {
      console.error(`Error removing item ${key}:`, error);
    }
  },

  clear: async () => {
    try {
      mmkvInstance.clear();
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};
