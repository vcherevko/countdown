import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { countdownStore } from '../stores/countdown';

describe('UI Visibility Logic', () => {
  beforeEach(() => {
    countdownStore.reset();
  });

  it('should hide form when countdown is running', () => {
    const initialState = get(countdownStore);
    expect(initialState.isRunning).toBe(false);

    countdownStore.start('1990-01-01', 40, 'days');

    const runningState = get(countdownStore);
    expect(runningState.isRunning).toBe(true);
  });

  it('should show form again when reset is clicked', () => {
    countdownStore.start('1990-01-01', 40, 'days');
    expect(get(countdownStore).isRunning).toBe(true);

    countdownStore.reset();

    const resetState = get(countdownStore);
    expect(resetState.isRunning).toBe(false);
  });

  it('should show control buttons only when countdown is running', () => {
    const initialState = get(countdownStore);
    expect(initialState.isRunning).toBe(false);

    countdownStore.start('1990-01-01', 40, 'days');
    expect(get(countdownStore).isRunning).toBe(true);
  });

  it('should maintain button visibility through pause/resume', () => {
    countdownStore.start('1990-01-01', 40, 'days');

    countdownStore.pause();
    const pausedState = get(countdownStore);
    expect(pausedState.isRunning).toBe(true);
    expect(pausedState.isPaused).toBe(true);

    countdownStore.resume();
    const resumedState = get(countdownStore);
    expect(resumedState.isRunning).toBe(true);
    expect(resumedState.isPaused).toBe(false);
  });
});
