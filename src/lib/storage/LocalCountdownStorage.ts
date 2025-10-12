import type { CountdownItem } from '../types';
import type { ICountdownStorage } from './ICountdownStorage';

export class LocalCountdownStorage implements ICountdownStorage {
  private readonly STORAGE_KEY = 'countdown-timers';

  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  getAll(): CountdownItem[] {
    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];
      return JSON.parse(data) as CountdownItem[];
    } catch (error) {
      console.error('Error loading countdowns from localStorage:', error);
      return [];
    }
  }

  getById(id: string): CountdownItem | null {
    const items = this.getAll();
    return items.find(item => item.id === id) || null;
  }

  create(item: Omit<CountdownItem, 'id' | 'createdAt'>): CountdownItem {
    const newItem: CountdownItem = {
      ...item,
      id: this.generateId(),
      createdAt: Date.now()
    };

    const items = this.getAll();
    items.push(newItem);
    this.saveAll(items);

    return { ...newItem };
  }

  update(id: string, updates: Partial<CountdownItem>): CountdownItem | null {
    const items = this.getAll();
    const index = items.findIndex(item => item.id === id);

    if (index === -1) return null;

    items[index] = { ...items[index], ...updates, id };
    this.saveAll(items);

    return { ...items[index] };
  }

  delete(id: string): boolean {
    const items = this.getAll();
    const filteredItems = items.filter(item => item.id !== id);

    if (filteredItems.length === items.length) return false;

    this.saveAll(filteredItems);
    return true;
  }

  saveAll(items: CountdownItem[]): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
      console.error('Error saving countdowns to localStorage:', error);
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing countdowns from localStorage:', error);
    }
  }
}
