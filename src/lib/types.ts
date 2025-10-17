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

export interface TimeUnit {
  value: number;
  label: string;
  show: boolean;
}

export interface CountdownItem {
  id: string;
  title: string;
  dob: string;
  targetAge: number;
  targetDate: number;
  format: DisplayFormat;
  createdAt: number;
}

export type AppPage = 'list' | 'edit' | 'add';

export interface ConfirmDialogConfig {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}
