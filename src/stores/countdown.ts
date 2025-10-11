import { writable } from 'svelte/store';
import type { CountdownState, DisplayFormat, TimeRemaining } from '../lib/types';
import { calculateTimeRemaining } from '../lib/utils';

function createCountdownStore() {
  const initialState: CountdownState = {
    isPaused: false,
    isRunning: false,
    targetDateTimestamp: null,
    timeRemaining: null,
    format: 'days',
  };

  const { subscribe, set, update } = writable<CountdownState>(initialState);

  let intervalId: number | null = null;

  function updateCountdown() {
    update((state) => {
      if (!state.targetDateTimestamp || state.isPaused) return state;

      const targetDate = new Date(state.targetDateTimestamp);
      const timeRemaining = calculateTimeRemaining(targetDate);

      if (
        timeRemaining.days === 0 &&
        timeRemaining.hours === 0 &&
        timeRemaining.minutes === 0 &&
        timeRemaining.seconds === 0
      ) {
        stopCountdown();
      }

      return {
        ...state,
        timeRemaining,
      };
    });
  }

  function startCountdown(dob: string, targetAge: number, format: DisplayFormat) {
    const dobDate = new Date(dob + 'T00:00:00');
    const targetDate = new Date(dobDate);
    targetDate.setFullYear(dobDate.getFullYear() + targetAge);

    stopCountdown();

    const timeRemaining = calculateTimeRemaining(targetDate);

    set({
      isPaused: false,
      isRunning: true,
      targetDateTimestamp: targetDate.getTime(),
      timeRemaining,
      format,
    });

    intervalId = setInterval(updateCountdown, 1000) as unknown as number;
  }

  function pauseCountdown() {
    update((state) => ({ ...state, isPaused: true }));
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resumeCountdown() {
    update((state) => {
      if (!state.targetDateTimestamp) return state;
      return { ...state, isPaused: false };
    });
    intervalId = setInterval(updateCountdown, 1000) as unknown as number;
  }

  function stopCountdown() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function resetCountdown() {
    stopCountdown();
    set({
      isPaused: false,
      isRunning: false,
      targetDateTimestamp: null,
      timeRemaining: null,
      format: 'days',
    });
  }

  function changeFormat(format: DisplayFormat) {
    update((state) => ({ ...state, format }));
  }

  return {
    subscribe,
    start: startCountdown,
    pause: pauseCountdown,
    resume: resumeCountdown,
    reset: resetCountdown,
    changeFormat,
  };
}

export const countdownStore = createCountdownStore();
