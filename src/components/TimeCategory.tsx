import { BiTimer } from 'react-icons/bi';

import { Button } from '@/components/ui/button';

type TimeCategoryProps = {
  time: number;
  presets: readonly number[];
  onSelectTime: (value: number) => void;
};

const TimeCategory = ({ time, presets, onSelectTime }: TimeCategoryProps) => {
  return (
    <div className='space-y-3'>
      <div className='flex items-center gap-2'>
        <BiTimer className='text-xl text-primary' />
        <p className='text-xs uppercase tracking-[0.14em] text-muted-foreground'>
          Duration mode
        </p>
      </div>

      <div className='flex flex-wrap gap-2'>
        {presets.map((preset) => {
          const isActive = preset === time;

          return (
            <Button
              key={preset}
              type='button'
              size='sm'
              variant={isActive ? 'default' : 'outline'}
              className='font-mono'
              onClick={() => onSelectTime(preset)}
            >
              {preset / 1000}s
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default TimeCategory;
