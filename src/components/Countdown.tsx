type CountdownProps = {
  countdown: number;
  totalTime: number;
  progress: number;
  isRunning: boolean;
};

const Countdown = ({ countdown, totalTime, progress, isRunning }: CountdownProps) => {
  const minutes = new Date(countdown).getUTCMinutes();
  const seconds = new Date(countdown).getUTCSeconds();

  const formatted = `${minutes < 10 ? `0${minutes}` : minutes}:${
    seconds < 10 ? `0${seconds}` : seconds
  }`;

  return (
    <div className='space-y-2'>
      <div className='flex items-end justify-between'>
        <span className='font-mono text-4xl text-foreground'>{formatted}</span>
        <span className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>
          {isRunning ? 'in progress' : 'ready'}
        </span>
      </div>
      <div className='h-2 overflow-hidden rounded-full bg-secondary'>
        <div
          className='h-full rounded-full bg-primary transition-[width] duration-300'
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className='text-xs text-muted-foreground'>
        {Math.round((countdown / totalTime) * 100)}% time left
      </p>
    </div>
  );
};

export default Countdown;
