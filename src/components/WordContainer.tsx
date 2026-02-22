import { useMemo } from 'react';
import Character from './Character';

type WordContainerProps = {
  word: string;
};

const MAX_LENGTH = 200;

const WordContainer = ({ word }: WordContainerProps) => {
  const characters = useMemo(() => {
    const trimmedWord = word.slice(0, MAX_LENGTH);
    return trimmedWord.split('');
  }, [word]);

  return (
    <div className='relative left-0 top-0 m-0 w-full whitespace-pre-wrap break-words font-mono text-2xl leading-relaxed tracking-wide text-muted-foreground md:text-3xl lg:text-4xl'>
      {characters.map((character, index) => (
        <Character key={`${index}-${character}`} character={character} />
      ))}
    </div>
  );
};

export default WordContainer;