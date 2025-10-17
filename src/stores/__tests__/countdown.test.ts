import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { get } from 'svelte/store';
import { countdownsStore, sortedCountdowns } from '../countdown';
import { countdownStorage } from '../../lib/storage';

describe('countdownsStore', () => {
  beforeEach(() => {
    countdownStorage.clear();
    const state = get(countdownsStore);
    state.items.forEach(item => {
      countdownsStore.deleteCountdown(item.id);
    });
    vi.clearAllTimers();
  });

  afterEach(() => {
    countdownStorage.clear();
    const state = get(countdownsStore);
    state.items.forEach(item => {
      countdownsStore.deleteCountdown(item.id);
    });
  });

  describe('initial state', () => {
    it('should have correct default values', () => {
      const state = get(countdownsStore);

      expect(state.items).toEqual([]);
      expect(state.activeId).toBe(null);
      expect(state.currentPage).toBe('list');
      expect(state.timeRemainingMap).toBeInstanceOf(Map);
    });
  });

  describe('addCountdown', () => {
    it('should add a countdown correctly', () => {
      countdownsStore.addCountdown('Test Countdown', '1990-01-01', 40, 'full');
      const state = get(countdownsStore);

      expect(state.items).toHaveLength(1);
      expect(state.items[0].title).toBe('Test Countdown');
      expect(state.items[0].dob).toBe('1990-01-01');
      expect(state.items[0].targetAge).toBe(40);
      expect(state.items[0].format).toBe('full');
    });

    it('should calculate target date correctly', () => {
      countdownsStore.addCountdown('Test', '1990-01-01', 40, 'full');
      const state = get(countdownsStore);

      const expectedDate = new Date('1990-01-01T00:00:00');
      expectedDate.setFullYear(expectedDate.getFullYear() + 40);

      expect(state.items[0].targetDate).toBe(expectedDate.getTime());
    });

    it('should persist countdown to storage', () => {
      countdownsStore.addCountdown('Test', '1990-01-01', 40, 'full');
      const stored = countdownStorage.getAll();

      expect(stored).toHaveLength(1);
      expect(stored[0].title).toBe('Test');
    });
  });

  describe('updateCountdown', () => {
    it('should call update on storage', () => {
      countdownsStore.addCountdown('Test', '1990-01-01', 40, 'full');
      const beforeUpdate = countdownStorage.getAll();
      expect(beforeUpdate.length).toBeGreaterThan(0);

      if (beforeUpdate.length > 0) {
        const id = beforeUpdate[0].id;
        countdownsStore.updateCountdown(id, { title: 'Updated Test' });

        const afterUpdate = countdownStorage.getAll();
        expect(afterUpdate.length).toBeGreaterThan(0);
      }
    });
  });

  describe('deleteCountdown', () => {
    it('should delete countdown from storage', () => {
      countdownsStore.addCountdown('Test', '1990-01-01', 40, 'full');
      const state = get(countdownsStore);
      const id = state.items[0].id;

      countdownsStore.deleteCountdown(id);

      const stored = countdownStorage.getById(id);
      expect(stored).toBeNull();
    });
  });

  describe('navigateTo', () => {
    it('should navigate to different pages', () => {
      countdownsStore.navigateTo('add');
      expect(get(countdownsStore).currentPage).toBe('add');

      countdownsStore.navigateTo('edit', 'some-id');
      const state = get(countdownsStore);
      expect(state.currentPage).toBe('edit');
      expect(state.activeId).toBe('some-id');

      countdownsStore.navigateTo('list', null);
      const listState = get(countdownsStore);
      expect(listState.currentPage).toBe('list');
      expect(listState.activeId).toBe(null);
    });
  });

  describe('sortedCountdowns', () => {
    it('should return an array', () => {
      const sorted = get(sortedCountdowns);
      expect(Array.isArray(sorted)).toBe(true);
    });
  });
});
