export interface Results {
  accuracy: number;
  cpm: number;
  wpm: number;
  error: number;
}

export interface AccuracyMetrics {
  correctChars: number;
  incorrectChars: number;
  accuracy: number;
}

export interface HistoryType {
  wordHistory: string;
  typedHistory: string;
}

export interface RunRecord extends Results {
  id: string;
  time: number;
  totalTyped: number;
  timestamp: number;
}

export type BestWpmByTime = Record<string, number>;

export type ThemeName = 'light' | 'dark';
