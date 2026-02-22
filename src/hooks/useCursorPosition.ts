import { useCallback, useState } from 'react';

export const useCursorPosition = () => {
  const [cursorPosition, setCursorPosition] = useState(0);

  const resetCursorPointer = useCallback(() => {
    setCursorPosition(0);
  }, []);

  const updateCursorPosition = useCallback((opt: 'increase' | 'decrease') => {
    if (opt === 'increase') {
      setCursorPosition((cursor) => cursor + 1);
      return;
    }

    setCursorPosition((cursor) => cursor - 1);
  }, []);

  return { cursorPosition, updateCursorPosition, resetCursorPointer };
};
