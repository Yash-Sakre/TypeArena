import { useMemo } from "react";
import Character from "./Character";

type UserTypedProps = {
  charTyped: string;
  check: (index: number) => boolean;
  word: string;
};

const MAX_LENGTH = 200;

const UserTyped = ({ check, charTyped, word }: UserTypedProps) => {
  const characters = useMemo(() => {
    return charTyped.slice(0, MAX_LENGTH).split("");
  }, [charTyped]);

  return (
    <div className="typing-caret pointer-events-none absolute left-0 top-0 z-10 m-0 w-full whitespace-pre-wrap break-words font-mono text-2xl leading-relaxed tracking-wide md:text-3xl lg:text-4xl">
      {characters.map((_, index) => (
        <Character
          key={`${word.charAt(index)}-${index}`}
          character={word.charAt(index)}
          state={check(index)}
        />
      ))}
    </div>
  );
};

export default UserTyped;
