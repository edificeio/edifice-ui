import { See } from "@edifice-ui/icons";
import { Button } from "../Button";

export interface ViewsCounterProps {
  viewsCounter: number;
  onClick?: () => void;
}

const ViewsCounter = ({ viewsCounter, onClick }: ViewsCounterProps) => {
  const handleOnClick = () => {
    onClick?.();
  };

  return (
    <Button
      variant="ghost"
      type="button"
      className="text-gray-700 d-flex"
      onClick={handleOnClick}
    >
      <div className="me-8">{viewsCounter}</div>
      <See />
    </Button>
  );
};

ViewsCounter.displayName = "ViewsCounter";

export default ViewsCounter;
