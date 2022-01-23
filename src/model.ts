export const WORD_LENGTH = 5;
export const GUESSES = 6;
export const TOAST_ID = "toast";

export interface AppState {
  target: string;
  currentWord: string;
  guesses: string[];
}

export interface Colors {
  primaryBackground: string;
  secondaryBackground: string;
  success: string;
  error: string;
  warning: string;
  cloud: string;
}

export interface Storage {
  history: string;
}