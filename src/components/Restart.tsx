import { IoRefreshOutline } from 'react-icons/io5';

import { Button } from '@/components/ui/button';

type RestartProps = {
  restart: () => void;
};

const Restart = ({ restart }: RestartProps) => {
  return (
    <div className='flex justify-center'>
      <Button
        onClick={restart}
        variant='secondary'
        className='rounded-full border border-border/70 px-6 font-mono tracking-wide'
      >
        <IoRefreshOutline className='mr-2 text-base' />
        Restart Run
      </Button>
    </div>
  );
};

export default Restart;
