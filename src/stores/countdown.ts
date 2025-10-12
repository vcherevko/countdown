import { writable, derived } from 'svelte/store';
import type { CountdownItem, AppPage, TimeRemaining } from '../lib/types';
import { countdownStorage } from '../lib/storage';
import { calculateTimeRemaining } from '../lib/utils';

interface CountdownsState {
  items: CountdownItem[];
  activeId: string | null;
  currentPage: AppPage;
  timeRemainingMap: Map<string, TimeRemaining>;
}

function createCountdownsStore() {
  const initialState: CountdownsState = {
    items: countdownStorage.getAll(),
    activeId: null,
    currentPage: 'list',
    timeRemainingMap: new Map(),
  };

  const { subscribe, set, update } = writable<CountdownsState>(initialState);

  let intervalId: number | null = null;

  function calculateTargetDate(dob: string, targetAge: number): number {
    const dobDate = new Date(dob + 'T00:00:00');
    const targetDate = new Date(dobDate);
    targetDate.setFullYear(dobDate.getFullYear() + targetAge);
    return targetDate.getTime();
  }

  function updateAllCountdowns() {
    update((state) => {
      const newMap = new Map<string, TimeRemaining>();

      state.items.forEach((item) => {
        const targetDate = new Date(item.targetDate);
        const timeRemaining = calculateTimeRemaining(targetDate);
        newMap.set(item.id, timeRemaining);
      });

      return {
        ...state,
        timeRemainingMap: newMap,
      };
    });
  }

  function startInterval() {
    if (intervalId !== null) return;
    updateAllCountdowns();
    intervalId = setInterval(updateAllCountdowns, 1000) as unknown as number;
  }

  function stopInterval() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  function addCountdown(
    title: string,
    dob: string,
    targetAge: number,
    format: string
  ) {
    const targetDate = calculateTargetDate(dob, targetAge);

    const newItem = countdownStorage.create({
      title,
      dob,
      targetAge,
      targetDate,
      format: format as any,
    });

    update((state) => ({
      ...state,
      items: [...state.items, newItem],
    }));

    startInterval();
  }

  function updateCountdown(id: string, updates: Partial<CountdownItem>) {
    if (updates.dob && updates.targetAge) {
      updates.targetDate = calculateTargetDate(updates.dob, updates.targetAge);
    }

    const updatedItem = countdownStorage.update(id, updates);
    if (!updatedItem) return;

    update((state) => ({
      ...state,
      items: state.items.map((item) => (item.id === id ? updatedItem : item)),
    }));
  }

  function deleteCountdown(id: string) {
    const success = countdownStorage.delete(id);
    if (!success) return;

    update((state) => {
      const newItems = state.items.filter((item) => item.id !== id);
      const newMap = new Map(state.timeRemainingMap);
      newMap.delete(id);

      if (newItems.length === 0) {
        stopInterval();
      }

      return {
        ...state,
        items: newItems,
        timeRemainingMap: newMap,
        activeId: state.activeId === id ? null : state.activeId,
      };
    });
  }

  function selectCountdown(id: string | null) {
    update((state) => ({
      ...state,
      activeId: id,
    }));
  }

  function navigateTo(page: AppPage, countdownId?: string | null) {
    update((state) => ({
      ...state,
      currentPage: page,
      activeId: countdownId !== undefined ? countdownId : state.activeId,
    }));
  }

  startInterval();

  return {
    subscribe,
    addCountdown,
    updateCountdown,
    deleteCountdown,
    selectCountdown,
    navigateTo,
  };
}

export const countdownsStore = createCountdownsStore();

export const sortedCountdowns = derived(countdownsStore, ($store) => {
  return [...$store.items].sort((a, b) => {
    const timeA = $store.timeRemainingMap.get(a.id);
    const timeB = $store.timeRemainingMap.get(b.id);

    if (!timeA || !timeB) return 0;

    const totalA =
      timeA.days * 86400 + timeA.hours * 3600 + timeA.minutes * 60 + timeA.seconds;
    const totalB =
      timeB.days * 86400 + timeB.hours * 3600 + timeB.minutes * 60 + timeB.seconds;

    return totalA - totalB;
  });
});
