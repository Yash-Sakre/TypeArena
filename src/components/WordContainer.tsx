import { useMemo } from 'react';
import Character from './Character';

type WordContainerProps = {
  word: string;
};

const WordContainer = ({ word }: WordContainerProps) => {
  const characters = useMemo(() => {
    return word.split('');
  }, [word]);

  return (
    <div className='relative top-0 left-0 font-mono text-xl opacity-90 lg:text-3xl'>
      {characters.map((character, index) => {
        return <Character key={index + character} character={character} />;
      })}
    </div>
  );
};

export default WordContainer;
