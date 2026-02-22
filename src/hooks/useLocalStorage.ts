import { useCallback } from 'react';

import type { ThemeName } from '../types';

type LocalStorageValue = number | ThemeName | string | boolean | object | null;

export const useLocalStorage = () => {
  const setLocalStorageValue = useCallback(
    (key: string, value: LocalStorageValue) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {
        // Ignore storage write errors to keep app usable.
      }
    },
    []
  );

  const getLocalStorageValue = useCallback(<T>(key: string): T | null => {
    try {
      const value = window.localStorage.getItem(key);
      return value ? (JSON.parse(value) as T) : null;
    } catch {
      return null;
    }
  }, []);

  return { setLocalStorageValue, getLocalStorageValue };
};
