import styled from "styled-components";

import { useThemeContext } from "../hooks/useTheme";

import { BsQuestionCircle } from "react-icons/bs";
import { BsKeyboardFill } from "react-icons/bs";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ThemeDropdown from "./ThemeDropdown";

type HeaderProps = {
  restart: () => void;
  openAboutModal: (str: string) => void;
  closeAboutModal: (str: string) => void;
};

const StyledSvg = styled.svg`
  width: 50px;
  height: 50px;
  color: ${({ theme }) => theme.text.title};
`;

const Header = ({ restart, openAboutModal }: HeaderProps) => {
  const { systemTheme } = useThemeContext();

  return (
    <header className="flex items-center justify-between py-8">
      <div
        className="flex items-center gap-3 cursor-pointer"
        style={{
          color: systemTheme.text.title,
        }}
      >
        <h1
          className={`font-mono text-2xl font-bold hover:underline lg:text-3xl`}
        >
          TypeArena.
        </h1>
        {/* <Tooltip tooltipId='keyboard'>
          <div
            className='ml-4'
            onClick={() => {
              restart();
            }}
            data-tooltip-id='keyboard'
            data-tooltip-content='Restart'
          >
            <BsKeyboardFill className='text-2xl lg:text-3xl ' />
          </div>
        </Tooltip> */}
      </div>
      <div className="flex gap-4">
        <ThemeDropdown />
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <div
                data-tooltip-id="about"
                data-tooltip-content="About"
                className="cursor-pointer"
                onClick={() => openAboutModal("about")}
              >
                <BsQuestionCircle className="text-3xl" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              About
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </header>
  );
};

export default Header;
