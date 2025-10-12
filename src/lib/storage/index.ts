import type { ICountdownStorage } from './ICountdownStorage';
import { LocalCountdownStorage } from './LocalCountdownStorage';

export const countdownStorage: ICountdownStorage = new LocalCountdownStorage();

export type { ICountdownStorage } from './ICountdownStorage';
