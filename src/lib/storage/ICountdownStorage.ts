import type { CountdownItem } from '../types';

export interface ICountdownStorage {
  getAll(): CountdownItem[];

  getById(id: string): CountdownItem | null;

  create(item: Omit<CountdownItem, 'id' | 'createdAt'>): CountdownItem;

  update(id: string, updates: Partial<CountdownItem>): CountdownItem | null;

  delete(id: string): boolean;

  saveAll(items: CountdownItem[]): void;

  clear(): void;
}
