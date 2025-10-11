export type DisplayFormat = 'days' | 'hours' | 'minutes' | 'seconds';

export interface CountdownData {
  dob: string;
  targetAge: number;
  format: DisplayFormat;
}

export interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface CountdownState {
  isPaused: boolean;
  isRunning: boolean;
  targetDateTimestamp: number | null;
  timeRemaining: TimeRemaining | null;
  format: DisplayFormat;
}

export interface ValidationErrors {
  dob: string;
  targetAge: string;
}
