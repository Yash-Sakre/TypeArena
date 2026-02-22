import { useThemeContext } from '../hooks/useTheme';
import { BsMoonStarsFill, BsSunFill } from 'react-icons/bs';

import type { ThemeName } from '../types';

const ThemeDropdown = () => {
  const { themeName, setTheme } = useThemeContext();
  const isDark = themeName === 'dark';
  const nextTheme: ThemeName = isDark ? 'light' : 'dark';

  return (
    <button
      type='button'
      onClick={() => setTheme(nextTheme)}
      aria-label={`Switch to ${nextTheme} theme`}
      className='relative h-8 w-16 rounded-full border border-secondary-foreground bg-secondary p-1 transition-colors duration-300'
    >
      <span
        className={`absolute left-2 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground transition-opacity duration-300 ${
          isDark ? 'opacity-100' : 'opacity-[0.35]'
        }`}
      >
        <BsMoonStarsFill />
      </span>
      <span
        className={`absolute right-2 top-1/2 -translate-y-1/2 text-xs text-secondary-foreground transition-opacity duration-300 ${
          isDark ? 'opacity-[0.35]' : 'opacity-100'
        }`}
      >
        <BsSunFill />
      </span>

      <span
        className={`absolute top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ${
          isDark ? 'translate-x-0' : 'translate-x-8'
        } bg-background text-foreground`}
      >
        {isDark ? <BsMoonStarsFill size={12} /> : <BsSunFill size={12} />}
      </span>
    </button>
  );
};

export default ThemeDropdown;
