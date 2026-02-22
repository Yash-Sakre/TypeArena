import { useState, useCallback, useContext, useEffect } from 'react';

import { useLocalStorage } from './useLocalStorage';

import { ThemeContext } from '../contexts/ThemeContext';
import type { ThemeName } from '../types';

const getInitialThemeName = (value: unknown): ThemeName => {
  if (value === 'dark' || value === 'light') {
    return value;
  }

  if (typeof value === 'object' && value !== null && 'name' in value) {
    const name = (value as { name?: unknown }).name;
    if (name === 'dark' || name === 'light') {
      return name;
    }
  }

  return 'light';
};

export const useTheme = () => {
  const { getLocalStorageValue, setLocalStorageValue } = useLocalStorage();

  const [themeName, setThemeName] = useState<ThemeName>(() => {
    const localTheme = getLocalStorageValue('theme');
    return getInitialThemeName(localTheme);
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', themeName === 'dark');
  }, [themeName]);

  const setTheme = useCallback(
    (value: ThemeName) => {
      setThemeName(value);
      setLocalStorageValue('theme', value);
    },
    [setLocalStorageValue]
  );

  return { themeName, setTheme };
};

export const useThemeContext = () => {
  return useContext(ThemeContext);
};
