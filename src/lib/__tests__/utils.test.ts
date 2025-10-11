import { describe, it, expect } from 'vitest';
import {
  calculateTimeRemaining,
  formatTimeDisplay,
  formatTargetDate,
  validateDob,
  validateTargetAge,
} from '../utils';

describe('calculateTimeRemaining', () => {
  it('should calculate correct time remaining for future date', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    futureDate.setHours(0, 0, 0, 0);

    const result = calculateTimeRemaining(futureDate);

    expect(result.days).toBeGreaterThan(360);
    expect(result.hours).toBeGreaterThanOrEqual(0);
    expect(result.minutes).toBeGreaterThanOrEqual(0);
    expect(result.seconds).toBeGreaterThanOrEqual(0);
  });

  it('should return all zeros for past date', () => {
    const pastDate = new Date('2020-01-01');

    const result = calculateTimeRemaining(pastDate);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });

  it('should return all zeros for current time', () => {
    const now = new Date();

    const result = calculateTimeRemaining(now);

    expect(result.days).toBe(0);
    expect(result.hours).toBe(0);
    expect(result.minutes).toBe(0);
    expect(result.seconds).toBe(0);
  });
});

describe('formatTimeDisplay', () => {
  const timeRemaining = {
    days: 10,
    hours: 5,
    minutes: 30,
    seconds: 45,
  };

  it('should format as days correctly', () => {
    const result = formatTimeDisplay(timeRemaining, 'days');
    expect(result).toHaveLength(4);
    expect(result[0]).toEqual({ value: 10, label: 'Days', show: true });
    expect(result[1]).toEqual({ value: 5, label: 'Hours', show: true });
    expect(result[2]).toEqual({ value: 30, label: 'Minutes', show: true });
    expect(result[3]).toEqual({ value: 45, label: 'Seconds', show: true });
  });

  it('should format as hours correctly', () => {
    const result = formatTimeDisplay(timeRemaining, 'hours');
    const totalHours = 10 * 24 + 5;
    expect(result).toHaveLength(3);
    expect(result[0]).toEqual({ value: totalHours, label: 'Hours', show: true });
    expect(result[1]).toEqual({ value: 30, label: 'Minutes', show: true });
    expect(result[2]).toEqual({ value: 45, label: 'Seconds', show: true });
  });

  it('should format as minutes correctly', () => {
    const result = formatTimeDisplay(timeRemaining, 'minutes');
    const totalMinutes = 10 * 24 * 60 + 5 * 60 + 30;
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({ value: totalMinutes, label: 'Minutes', show: true });
    expect(result[1]).toEqual({ value: 45, label: 'Seconds', show: true });
  });

  it('should format as seconds correctly', () => {
    const result = formatTimeDisplay(timeRemaining, 'seconds');
    const totalSeconds = 10 * 24 * 60 * 60 + 5 * 60 * 60 + 30 * 60 + 45;
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({ value: totalSeconds, label: 'Seconds', show: true });
  });
});

describe('formatTargetDate', () => {
  it('should format valid date correctly', () => {
    const date = new Date('2030-06-15');
    const result = formatTargetDate(date);
    expect(result).toBe('June 15, 2030');
  });

  it('should return "Invalid Date" for invalid date', () => {
    const invalidDate = new Date('invalid');
    const result = formatTargetDate(invalidDate);
    expect(result).toBe('Invalid Date');
  });
});

describe('validateDob', () => {
  it('should return error for empty string', () => {
    const result = validateDob('');
    expect(result).toBe('Please enter a valid date of birth');
  });

  it('should return empty string for valid date', () => {
    const result = validateDob('1990-01-01');
    expect(result).toBe('');
  });
});

describe('validateTargetAge', () => {
  it('should return empty string for positive number', () => {
    const result = validateTargetAge(30);
    expect(result).toBe('');
  });

  it('should return error for zero or negative', () => {
    expect(validateTargetAge(0)).toBe('Please enter a valid target age');
    expect(validateTargetAge(-5)).toBe('Please enter a valid target age');
  });
});
