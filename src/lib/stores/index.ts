export * from './';
import storage from './storage';

export const favoritesStore = storage<string[]>('favorites', []);
export const urlsStore = storage<string[]>('urls', []);
