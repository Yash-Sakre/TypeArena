import { useEffect } from 'react';

import { useThemeContext } from '../hooks/useTheme';

type CountdownProps = {
  countdown: number;
  reset: () => void;
};

const Countdown = ({ countdown, reset }: CountdownProps) => {
  useEffect(() => {
    reset();
  }, [reset]);

  const formatedCountdown = {
    minutes: new Date(countdown).getUTCMinutes(),
    seconds: new Date(countdown).getUTCSeconds(),
  };

  const { systemTheme } = useThemeContext();

  return (
    <div className='flex '>
      <div
        className='p-3 rounded-lg '
        style={{
          backgroundColor: systemTheme.background.secondary,
        }}
      >
        <span
          className='font-mono text-lg text-right lg:text-xl'
          style={{
            color: systemTheme.text.secondary,
          }}
        >
          {formatedCountdown.minutes < 10
            ? `0${formatedCountdown.minutes}`
            : formatedCountdown.minutes}
          :
          {formatedCountdown.seconds < 10
            ? `0${formatedCountdown.seconds}`
            : formatedCountdown.seconds}
        </span>
      </div>
    </div>
  );
};

export default Countdown;
