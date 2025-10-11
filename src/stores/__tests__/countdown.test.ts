import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';
import { countdownStore } from '../countdown';

describe('countdownStore', () => {
  beforeEach(() => {
    countdownStore.reset();
    vi.clearAllTimers();
  });

  describe('initial state', () => {
    it('should have correct default values', () => {
      const state = get(countdownStore);

      expect(state.isPaused).toBe(false);
      expect(state.isRunning).toBe(false);
      expect(state.targetDateTimestamp).toBe(null);
      expect(state.timeRemaining).toBe(null);
      expect(state.format).toBe('days');
    });
  });

  describe('start', () => {
    it('should set correct state when starting countdown', () => {
      countdownStore.start('1990-01-01', 40, 'hours');
      const state = get(countdownStore);

      expect(state.isRunning).toBe(true);
      expect(state.isPaused).toBe(false);
      expect(state.targetDateTimestamp).toBeTypeOf('number');
      expect(state.targetDateTimestamp).toBeGreaterThan(0);
      expect(state.timeRemaining).not.toBe(null);
      expect(state.format).toBe('hours');
    });

    it('should calculate correct target date from DOB and age', () => {
      countdownStore.start('1990-01-01', 40, 'days');
      const state = get(countdownStore);

      const expectedDate = new Date('1990-01-01T00:00:00');
      expectedDate.setFullYear(expectedDate.getFullYear() + 40);

      expect(state.targetDateTimestamp).toBe(expectedDate.getTime());
    });
  });

  describe('pause', () => {
    it('should pause countdown correctly', () => {
      countdownStore.start('1990-01-01', 40, 'days');
      countdownStore.pause();
      const state = get(countdownStore);

      expect(state.isPaused).toBe(true);
      expect(state.isRunning).toBe(true);
    });
  });

  describe('resume', () => {
    it('should resume countdown correctly', () => {
      countdownStore.start('1990-01-01', 40, 'days');
      countdownStore.pause();
      countdownStore.resume();
      const state = get(countdownStore);

      expect(state.isPaused).toBe(false);
      expect(state.isRunning).toBe(true);
    });
  });

  describe('reset', () => {
    it('should reset countdown to initial state', () => {
      countdownStore.start('1990-01-01', 40, 'hours');
      countdownStore.reset();
      const state = get(countdownStore);

      expect(state.isPaused).toBe(false);
      expect(state.isRunning).toBe(false);
      expect(state.targetDateTimestamp).toBe(null);
      expect(state.timeRemaining).toBe(null);
      expect(state.format).toBe('days');
    });
  });

  describe('changeFormat', () => {
    it('should update format correctly', () => {
      countdownStore.start('1990-01-01', 40, 'days');
      countdownStore.changeFormat('seconds');
      const state = get(countdownStore);

      expect(state.format).toBe('seconds');
    });
  });
});
