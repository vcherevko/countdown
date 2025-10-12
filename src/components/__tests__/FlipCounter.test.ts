import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, fireEvent } from '@testing-library/svelte';
import FlipCounter from '../FlipCounter.svelte';

describe('FlipCounter', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should render with initial value', () => {
    const { container } = render(FlipCounter, {
      props: { value: 42, label: 'Minutes' }
    });

    expect(container.querySelector('.flip-counter')).toBeTruthy();
    expect(container.querySelector('.flip-label')?.textContent).toBe('Minutes');
  });

  it('should split number into digits with padding', () => {
    const { container } = render(FlipCounter, {
      props: { value: 5, label: 'Seconds' }
    });

    const digits = container.querySelectorAll('.flip-digit');
    expect(digits).toHaveLength(2);
  });

  it('should display correct digit values', () => {
    const { container } = render(FlipCounter, {
      props: { value: 42, label: 'Minutes' }
    });

    const frontSpans = container.querySelectorAll('.flip-card-front .flip-card-top span');
    expect(frontSpans[0].textContent).toBe('4');
    expect(frontSpans[1].textContent).toBe('2');
  });

  it('should trigger flip animation when value changes', async () => {
    const { component, container } = render(FlipCounter, {
      props: { value: 10, label: 'Seconds' }
    });

    vi.advanceTimersByTime(150);

    await component.$set({ value: 11 });

    const flippingCards = container.querySelectorAll('.flip-card.flipping');
    expect(flippingCards.length).toBeGreaterThan(0);
  });

  it('should update prev value after animation ends', async () => {
    const { component, container } = render(FlipCounter, {
      props: { value: 10, label: 'Seconds' }
    });

    vi.advanceTimersByTime(150);

    await component.$set({ value: 11 });

    const flipCard = container.querySelector('.flip-card');
    const animationEndEvent = new Event('animationend');
    flipCard?.dispatchEvent(animationEndEvent);

    await vi.runAllTimersAsync();

    const isFlipping = flipCard?.classList.contains('flipping');
    expect(isFlipping).toBe(false);
  });

  it('should handle large numbers correctly', () => {
    const { container } = render(FlipCounter, {
      props: { value: 100000, label: 'Minutes' }
    });

    const digits = container.querySelectorAll('.flip-digit');
    expect(digits.length).toBeGreaterThan(2);
  });

  it('should not trigger animation on initial mount', () => {
    const { container } = render(FlipCounter, {
      props: { value: 42, label: 'Seconds' }
    });

    const flippingCards = container.querySelectorAll('.flip-card.flipping');
    expect(flippingCards).toHaveLength(0);
  });

  it('should only flip digits that changed', async () => {
    const { component, container } = render(FlipCounter, {
      props: { value: 20, label: 'Seconds' }
    });

    vi.advanceTimersByTime(150);

    await component.$set({ value: 21 });

    const frontSpans = container.querySelectorAll('.flip-card-front .flip-card-top span');
    expect(frontSpans[0].textContent).toBe('2');
    expect(frontSpans[1].textContent).toBe('0');

    const backSpans = container.querySelectorAll('.flip-card-back .flip-card-top span');
    expect(backSpans[0].textContent).toBe('2');
    expect(backSpans[1].textContent).toBe('1');
  });

  it('should render correct label', () => {
    const { container } = render(FlipCounter, {
      props: { value: 100, label: 'Hours' }
    });

    const label = container.querySelector('.flip-label');
    expect(label?.textContent).toBe('Hours');
  });
});
