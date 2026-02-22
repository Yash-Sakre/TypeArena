type CharactersProps = {
  state?: boolean;
  character: string;
  className?: string;
};

const Character = ({ state, character, className }: CharactersProps) => {
  const characterStateClass =
    state === undefined
      ? ''
      : state === true
      ? 'text-secondary-foreground'
      : 'text-destructive';

  const invalidSpaceClass = state === false && character === ' ' ? 'bg-destructive' : '';

  return (
    <span className={`${className} ${characterStateClass} ${invalidSpaceClass}`}>
      {character}
    </span>
  );
};

export default Character;
