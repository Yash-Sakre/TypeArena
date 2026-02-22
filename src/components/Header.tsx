import { BsQuestionCircle } from 'react-icons/bs';
import { IoRefreshOutline } from 'react-icons/io5';

import ThemeDropdown from './ThemeDropdown';

import { Button } from '@/components/ui/button';

type HeaderProps = {
  onRestart: () => void;
  onOpenAbout: () => void;
  bestWpm: number;
  currentTime: number;
};

const Header = ({ onRestart, onOpenAbout, bestWpm, currentTime }: HeaderProps) => {
  return (
    <header className='relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 px-5 py-4 backdrop-blur sm:px-7'>
      <div className='absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-3xl' />
      <div className='relative flex flex-wrap items-center justify-between gap-4'>
        <div>
          <p className='font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground'>
            Type training space
          </p>
          <h1 className='font-serif text-3xl text-foreground sm:text-4xl'>Typr</h1>
        </div>

        <div className='flex items-center gap-2'>
          <div className='hidden rounded-full border border-border/70 bg-background/70 px-3 py-2 font-mono text-xs text-muted-foreground sm:block'>
            PB {currentTime / 1000}s: <span className='text-foreground'>{bestWpm} wpm</span>
          </div>
          <ThemeDropdown />
          <Button variant='outline' size='icon' onClick={onRestart} aria-label='Restart test'>
            <IoRefreshOutline className='text-lg' />
          </Button>
          <Button variant='outline' size='icon' onClick={onOpenAbout} aria-label='Open about'>
            <BsQuestionCircle className='text-lg' />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
