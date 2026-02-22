import { useEffect, useState, useRef, useCallback } from 'react';

export const useCountdown = (initialValue: number, interval = 1000) => {
  const intervalRef = useRef<number | null>(null);
  const [countdown, setCountdown] = useState(initialValue);
  const [isRunning, setIsRunning] = useState(false);

  const clearRunningInterval = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startCountdown = useCallback(() => {
    if (intervalRef.current !== null) return;

    setIsRunning(true);

    intervalRef.current = window.setInterval(() => {
      setCountdown((prev) => {
        const next = Math.max(prev - interval, 0);

        if (next === 0) {
          clearRunningInterval();
          setIsRunning(false);
        }

        return next;
      });
    }, interval);
  }, [clearRunningInterval, interval]);

  const resetCountdown = useCallback(
    (nextValue?: number) => {
      clearRunningInterval();
      setIsRunning(false);
      setCountdown(nextValue ?? initialValue);
    },
    [clearRunningInterval, initialValue]
  );

  useEffect(() => {
    resetCountdown(initialValue);
  }, [initialValue, resetCountdown]);

  useEffect(() => {
    return () => {
      clearRunningInterval();
    };
  }, [clearRunningInterval]);

  return { countdown, isRunning, startCountdown, resetCountdown };
};
