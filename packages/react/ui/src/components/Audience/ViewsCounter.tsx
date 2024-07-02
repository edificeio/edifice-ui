import { See } from "@edifice-ui/icons";
import { Button } from "../Button";
import { StringUtils } from "../../utils";

export interface ViewsCounterProps {
  viewsCounter: number;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
}

const ViewsCounter = ({
  viewsCounter,
  onClick,
  className,
}: ViewsCounterProps) => {
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClick?.();
  };

  className = `text-gray-700 fw-normal py-4 px-8 btn-icon ${className || ""} `;

  return (
    <Button
      rightIcon={<See />}
      variant="ghost"
      type="button"
      className={className}
      onClick={handleClick}
      disabled={!viewsCounter}
    >
      {StringUtils.toCounter(viewsCounter)}
    </Button>
  );
};

ViewsCounter.displayName = "ViewsCounter";

export default ViewsCounter;
