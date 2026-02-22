import { MdCenterFocusStrong } from 'react-icons/md';
import Restart from './Restart';

type WordWrapperProps = {
  children: React.ReactNode;
  focused: boolean;
  typedLength: number;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  restart: () => void;
};

const WordWrapper = ({
  children,
  focused,
  typedLength,
  setFocused,
  restart
}: WordWrapperProps) => {
  return (
    <section className='space-y-2'>
      <div className='flex items-center justify-between'>
        <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>
          Typing arena
        </p>
        <p className='font-mono text-xs text-muted-foreground'>
          {typedLength} chars typed
        </p>
      </div>

      <div
        className={`relative rounded-3xl border border-border/70 bg-card/60 px-5 py-8 transition-all duration-300 sm:px-8 md:py-10 ${focused
          ? 'shadow-[0_0_0_1px_hsl(var(--primary)/0.6),0_18px_60px_-20px_hsl(var(--primary)/0.45)]'
          : 'cursor-pointer opacity-90'
          }`}
        tabIndex={0}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {!focused ? (
          <div className='absolute inset-0 z-20 flex items-center justify-center rounded-3xl bg-background/40 backdrop-blur-[1px]'>
            <div className='flex items-center gap-2 rounded-full border border-border/80 bg-background/90 px-4 py-2'>
              <MdCenterFocusStrong className='text-primary' />
              <span className='text-sm text-foreground'>Click to focus and start typing</span>
            </div>
          </div>
        ) : null}

        <div className='relative w-full'>
          {children}
        </div>
      </div>

      <div className='flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground'>
        <div className='flex items-center gap-2 '>
          <span className='rounded-full border border-border/70 bg-background/80 px-2.5 py-1'>
            Esc restarts run
          </span>
          <span className='rounded-full border border-border/70 bg-background/80 px-2.5 py-1'>
            Backspace edits current word
          </span>
        </div>
        <Restart restart={restart} />
      </div>
    </section>
  );
};

export default WordWrapper;
