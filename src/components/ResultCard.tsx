import { useThemeContext } from "../hooks/useTheme";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type ResultCardProps = {
  tooltipId: string;
  tooltipContent: string;
  tooltipPlace: "bottom" | "top" | "left" | "right";
  title: string;
  results: string;
};

const ResultCard = ({
  title,
  tooltipId,
  tooltipContent,
  tooltipPlace,
  results,
}: ResultCardProps) => {
  const { systemTheme } = useThemeContext();
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div
            className="flex flex-col items-center justify-center w-full gap-2 p-5 rounded-lg cursor-pointer"
            data-tooltip-content={tooltipContent}
            data-tooltip-id={tooltipId}
            data-tooltip-place={tooltipPlace}
            style={{
              backgroundColor: systemTheme.background.secondary,
            }}
          >
            <h2 className="text-3xl">{title}</h2>
            <p
              className="text-3xl text-center"
              style={{
                color: systemTheme.text.secondary,
              }}
            >
              {results}
            </p>
          </div>
        </TooltipTrigger>
        <TooltipContent>{title}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ResultCard;
