import { useMemo } from "react";
import styled from "styled-components";

import { useThemeContext } from "../hooks/useTheme";
import Character from "./Character";

type UserTypedProps = {
  charTyped: string;
  check: (index: number) => boolean;
  word: string;
};

const StyledDiv = styled.div`
  &:last-child {
    &::after {
      background-color: ${({ theme }) => theme.text.secondary};
    }
  }
`;

const UserTyped = ({ check, charTyped, word }: UserTypedProps) => {
  const characters = useMemo(() => {
    return charTyped.split("");
  }, [charTyped]);

  const { systemTheme } = useThemeContext();

  return (
    <StyledDiv
      className="absolute top-0 left-0 z-10 font-mono text-xl md:character lg:text-3xl"
      theme={systemTheme}
    >
      {characters.map((_, index) => {
        return (
          <Character character={word.charAt(index)} state={check(index)} />
        );
      })}
    </StyledDiv>
  );
};

export default UserTyped;
