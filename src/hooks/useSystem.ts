import { useCallback, useEffect, useMemo, useState } from 'react';

import { useCountdown } from './useCountdown';
import { useKeyDown } from './useKeyDown';
import { useLocalStorage } from './useLocalStorage';
import { useModal } from './useModal';
import { useWord } from './useWord';

import {
  calculateAccuracy,
  calculateErrorPercentage,
  calculateWPM,
} from '@/utils';

import type { BestWpmByTime, HistoryType, Results, RunRecord } from '@/types';

const TIME_PRESETS = [15000, 30000, 60000, 120000] as const;
type TimePreset = (typeof TIME_PRESETS)[number];

const isTimePreset = (value: number): value is TimePreset => {
  return TIME_PRESETS.some((preset) => preset === value);
};

const getSafeTime = (value: unknown) => {
  if (typeof value === 'number' && isTimePreset(value)) {
    return value;
  }

  return 30000;
};

const getSafeRuns = (value: unknown): RunRecord[] => {
  if (!Array.isArray(value)) return [];

  return value.filter((entry): entry is RunRecord => {
    return (
      typeof entry === 'object' &&
      entry !== null &&
      'id' in entry &&
      'wpm' in entry &&
      'cpm' in entry &&
      'accuracy' in entry &&
      'error' in entry &&
      'time' in entry &&
      'totalTyped' in entry &&
      'timestamp' in entry
    );
  });
};

const getSafeBestMap = (value: unknown): BestWpmByTime => {
  if (typeof value !== 'object' || value === null) {
    return {};
  }

  const typed = value as Record<string, unknown>;
  const safeMap: BestWpmByTime = {};

  Object.entries(typed).forEach(([key, mapValue]) => {
    if (typeof mapValue === 'number' && Number.isFinite(mapValue)) {
      safeMap[key] = mapValue;
    }
  });

  return safeMap;
};

export const useSystem = () => {
  const [results, setResults] = useState<Results>({
    accuracy: 0,
    wpm: 0,
    cpm: 0,
    error: 0,
  });

  const [history, setHistory] = useState<HistoryType>({
    wordHistory: '',
    typedHistory: '',
  });

  const { setLocalStorageValue, getLocalStorageValue } = useLocalStorage();

  const [wordContainerFocused, setWordContainerFocused] = useState(false);
  const [time, setTime] = useState(() =>
    getSafeTime(getLocalStorageValue<number>('time'))
  );

  const [recentRuns, setRecentRuns] = useState<RunRecord[]>(() =>
    getSafeRuns(getLocalStorageValue<RunRecord[]>('recentRuns'))
  );
  const [bestWpmByTime, setBestWpmByTime] = useState<BestWpmByTime>(() =>
    getSafeBestMap(getLocalStorageValue<BestWpmByTime>('bestWpmByTime'))
  );

  const { countdown, isRunning, resetCountdown, startCountdown } =
    useCountdown(time);
  const { word, updateWord, totalWord } = useWord(30);

  const {
    charTyped,
    typingState,
    cursorPosition,
    totalCharacterTyped,
    resetCharTyped,
    resetCursorPointer,
    setTotalCharacterTyped,
    setTypingState,
  } = useKeyDown(wordContainerFocused);

  const { modalIsOpen, aboutModal, openModal, closeModal } = useModal();

  const restartTest = useCallback(() => {
    resetCountdown(time);
    updateWord(true);
    resetCursorPointer();
    resetCharTyped();
    setTypingState('idle');
    setTotalCharacterTyped('');
  }, [
    resetCountdown,
    resetCursorPointer,
    resetCharTyped,
    setTotalCharacterTyped,
    setTypingState,
    time,
    updateWord,
  ]);

  const setTimePreset = useCallback((nextTime: number) => {
    if (!isTimePreset(nextTime)) return;

    setTime(nextTime);
  }, []);

  useEffect(() => {
    setLocalStorageValue('time', time);
    restartTest();
  }, [restartTest, setLocalStorageValue, time]);

  useEffect(() => {
    if (word.length !== charTyped.length || charTyped.length === 0) return;

    updateWord();
    resetCharTyped();
    resetCursorPointer();
  }, [charTyped.length, resetCharTyped, resetCursorPointer, updateWord, word.length]);

  useEffect(() => {
    if (typingState !== 'start') return;

    startCountdown();
    setTypingState('typing');
  }, [setTypingState, startCountdown, typingState]);

  const completeRun = useCallback(() => {
    const { accuracy } = calculateAccuracy(totalWord, totalCharacterTyped);
    const { wpm, cpm } = calculateWPM(totalCharacterTyped, accuracy, time);
    const error = calculateErrorPercentage(accuracy);

    const nextResults = {
      accuracy,
      wpm,
      cpm,
      error,
    };

    const runRecord: RunRecord = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      timestamp: Date.now(),
      time,
      totalTyped: totalCharacterTyped.length,
      ...nextResults,
    };

    setResults(nextResults);

    setHistory({
      wordHistory: totalWord,
      typedHistory: totalCharacterTyped,
    });

    setRecentRuns((prev) => {
      const next = [runRecord, ...prev].slice(0, 8);
      setLocalStorageValue('recentRuns', next);
      return next;
    });

    setBestWpmByTime((prev) => {
      const currentBest = prev[String(time)] ?? 0;
      if (wpm <= currentBest) {
        return prev;
      }

      const next = {
        ...prev,
        [String(time)]: wpm,
      };

      setLocalStorageValue('bestWpmByTime', next);
      return next;
    });

    openModal('result');
    restartTest();
  }, [
    openModal,
    restartTest,
    setLocalStorageValue,
    time,
    totalCharacterTyped,
    totalWord,
  ]);

  useEffect(() => {
    if (countdown !== 0 || typingState !== 'typing') return;

    completeRun();
  }, [completeRun, countdown, typingState]);

  const checkCharacter = useCallback(
    (index: number) => {
      return charTyped[index] === word[index];
    },
    [charTyped, word]
  );

  const liveResults = useMemo<Results>(() => {
    const typedLength = totalCharacterTyped.length;

    if (!typedLength) {
      return {
        accuracy: 0,
        wpm: 0,
        cpm: 0,
        error: 0,
      };
    }

    let correctChars = 0;
    for (let i = 0; i < typedLength; i++) {
      if (totalCharacterTyped[i] === totalWord[i]) {
        correctChars++;
      }
    }

    const accuracy = (correctChars / typedLength) * 100;
    const elapsedMs = Math.max(time - countdown, 0);

    if (!elapsedMs) {
      return {
        accuracy,
        wpm: 0,
        cpm: 0,
        error: 100 - accuracy,
      };
    }

    const elapsedMinutes = elapsedMs / 60000;
    const grossWpm = typedLength / 5 / elapsedMinutes;
    const netWpm = Math.round(grossWpm * (accuracy / 100));

    return {
      accuracy,
      wpm: netWpm,
      cpm: Math.round(typedLength / elapsedMinutes),
      error: 100 - accuracy,
    };
  }, [countdown, time, totalCharacterTyped, totalWord]);

  const countdownProgress = useMemo(() => {
    if (!time) return 0;
    return Math.max(0, Math.min(100, (countdown / time) * 100));
  }, [countdown, time]);

  const bestWpm = bestWpmByTime[String(time)] ?? 0;

  return {
    charTyped,
    countdown,
    countdownProgress,
    cursorPosition,
    modalIsOpen,
    aboutModal,
    results,
    liveResults,
    recentRuns,
    bestWpm,
    time,
    history,
    word,
    wordContainerFocused,
    isRunning,
    timePresets: TIME_PRESETS,
    setWordContainerFocused,
    setTimePreset,
    restartTest,
    checkCharacter,
    closeModal,
    openModal,
  };
};
