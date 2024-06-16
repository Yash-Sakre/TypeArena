import styled from "styled-components";
import { BsGithub, BsTwitterX, BsLinkedin } from "react-icons/bs";

import { useThemeContext } from "../hooks/useTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Link } from "react-router-dom";

const StyledLink = styled.a`
  &:hover {
    color: ${({ theme }) => theme.text.title};
  }
`;

const Footer = () => {
  const { systemTheme } = useThemeContext();
  return (
    <footer className="mt-auto mb-3">
      <div className="flex flex-col items-center justify-center w-full ">
        <div className="flex items-center justify-center gap-4 ">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://github.com/Yash-Sakre"
                  className="cursor-pointer"
                >
                  <BsGithub size={30} />
                </a>
              </TooltipTrigger>
              <TooltipContent className="">Github</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <a href="https://x.com/YashSakre4" className="cursor-pointer">
                  <BsTwitterX size={30} />
                </a>
              </TooltipTrigger>
              <TooltipContent>Telegram</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href="https://www.linkedin.com/in/yash-sakre/"
                  className="cursor-pointer"
                >
                  <BsLinkedin size={30} />
                </a>
              </TooltipTrigger>
              <TooltipContent className="">Linkedin</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="flex items-center gap-2 mt-2">
          Made by{" "}
          <span style={{ color: systemTheme.text.secondary }}>Yash Sakre</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
