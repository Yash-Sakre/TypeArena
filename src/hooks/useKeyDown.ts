import { useState, useEffect, useCallback } from 'react';

import { useCursorPosition } from './useCursorPosition';
import { isAllowedCode } from '../utils';

type TypingState = 'idle' | 'start' | 'typing';

export const useKeyDown = (active: boolean) => {
  const [typingState, setTypingState] = useState<TypingState>('idle');
  const [charTyped, setCharTyped] = useState<string>('');
  const [totalCharacterTyped, setTotalCharacterTyped] = useState<string>('');

  const { cursorPosition, updateCursorPosition, resetCursorPointer } =
    useCursorPosition();

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key, code } = event;

      if (!active || !isAllowedCode(code)) return;

      if (code === 'Space') {
        // Prevent page scroll while typing spaces.
        event.preventDefault();
      }

      if (key === 'Backspace') {
        if (cursorPosition <= 0) return;

        setCharTyped((prev) => prev.slice(0, -1));
        setTotalCharacterTyped((prev) => prev.slice(0, -1));
        updateCursorPosition('decrease');
        return;
      }

      if (typingState === 'idle') {
        setTypingState('start');
      }

      setCharTyped((prev) => prev + key);
      setTotalCharacterTyped((prev) => prev + key);
      updateCursorPosition('increase');
    },
    [active, cursorPosition, typingState, updateCursorPosition]
  );

  const resetCharTyped = useCallback(() => {
    setCharTyped('');
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return {
    charTyped,
    totalCharacterTyped,
    setTotalCharacterTyped,
    cursorPosition,
    resetCharTyped,
    resetCursorPointer,
    typingState,
    setTypingState,
  };
};
