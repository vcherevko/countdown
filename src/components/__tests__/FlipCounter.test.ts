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

    const staticSpans = container.querySelectorAll('.digit-top-static span');
    expect(staticSpans[0].textContent).toBe('4');
    expect(staticSpans[1].textContent).toBe('2');
  });

  it('should have digit-top-flip elements for animation', () => {
    const { container } = render(FlipCounter, {
      props: { value: 10, label: 'Seconds' }
    });

    const flipElements = container.querySelectorAll('.digit-top-flip');
    expect(flipElements.length).toBeGreaterThan(0);
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

    const flippingElements = container.querySelectorAll('.digit-top-flip.flipping');
    expect(flippingElements).toHaveLength(0);
  });

  it('should render flip-front and flip-back elements', () => {
    const { container } = render(FlipCounter, {
      props: { value: 20, label: 'Seconds' }
    });

    const frontElements = container.querySelectorAll('.flip-front');
    const backElements = container.querySelectorAll('.flip-back');

    expect(frontElements.length).toBeGreaterThan(0);
    expect(backElements.length).toBeGreaterThan(0);
  });

  it('should render correct label', () => {
    const { container } = render(FlipCounter, {
      props: { value: 100, label: 'Hours' }
    });

    const label = container.querySelector('.flip-label');
    expect(label?.textContent).toBe('Hours');
  });
});
