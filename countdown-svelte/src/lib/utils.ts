import type { TimeRemaining, DisplayFormat } from './types';

export function calculateTimeRemaining(targetDate: Date): TimeRemaining {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
}

export function formatTimeDisplay(
  timeRemaining: TimeRemaining,
  format: DisplayFormat
): string {
  const { days, hours, minutes, seconds } = timeRemaining;

  switch (format) {
    case 'days':
      return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    case 'hours':
      const totalHours = days * 24 + hours;
      return `${totalHours} hours, ${minutes} minutes, ${seconds} seconds`;
    case 'minutes':
      const totalMinutes = days * 24 * 60 + hours * 60 + minutes;
      return `${totalMinutes} minutes, ${seconds} seconds`;
    case 'seconds':
      const totalSeconds =
        days * 24 * 60 * 60 + hours * 60 * 60 + minutes * 60 + seconds;
      return `${totalSeconds} seconds`;
  }
}

export function formatTargetDate(date: Date): string {
  if (!date) return 'Invalid Date';

  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) {
      return 'Invalid Date';
    }
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return d.toLocaleDateString('en-US', options);
  } catch (e) {
    return 'Invalid Date';
  }
}

export function validateDob(dob: string): string {
  if (!dob) return 'Please enter a valid date of birth';
  const date = new Date(dob);
  if (isNaN(date.getTime())) return 'Please enter a valid date of birth';
  return '';
}

export function validateTargetAge(age: number): string {
  if (!age || isNaN(age) || age < 1) return 'Please enter a valid target age';
  return '';
}
