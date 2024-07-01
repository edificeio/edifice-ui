import { See } from "@edifice-ui/icons";
import { Button } from "../Button";
import { StringUtils } from "../../utils";

export interface ViewsCounterProps {
  viewsCounter: number;
  onClick?: () => void;
}

const ViewsCounter = ({ viewsCounter, onClick }: ViewsCounterProps) => {
  return (
    <Button
      rightIcon={<See />}
      variant="ghost"
      type="button"
      className="text-gray-700 fw-normal d-flex m-0 p-0"
      onClick={onClick}
    >
      {StringUtils.toCounter(viewsCounter)}
    </Button>
  );
};

ViewsCounter.displayName = "ViewsCounter";

export default ViewsCounter;
