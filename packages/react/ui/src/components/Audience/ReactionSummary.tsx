import { default as useReactionIcons } from "./hooks/useReactionIcons";
import { Button } from "../Button";
import { ReactionSummaryData } from "edifice-ts-client";
import { StringUtils } from "../../utils";

export interface ReactionSummaryProps {
  summary: ReactionSummaryData;
  onClick?: () => void;
}

const ReactionSummary = ({
  summary,
  onClick: handleDetailsClick,
}: ReactionSummaryProps) => {
  const { getReactionIcon } = useReactionIcons();

  const { totalReactionsCounter, reactionTypes } = summary;

  const hasNoReactions = totalReactionsCounter === 0;

  return (
    <Button
      variant="ghost"
      className="p-4 btn-icon"
      disabled={hasNoReactions}
      onClick={handleDetailsClick}
    >
      <div className="d-flex align-items-center">
        <div className="text-gray-700 fw-normal me-16">
          {StringUtils.toCounter(totalReactionsCounter)}
        </div>
        {hasNoReactions ? (
          <div className="reaction-overlap">
            {getReactionIcon("REACTION_1", true)}
          </div>
        ) : (
          reactionTypes?.map((reactionType) => (
            <div className="reaction-overlap">
              {getReactionIcon(reactionType, true)}
            </div>
          ))
        )}
      </div>
    </Button>
  );
};

ReactionSummary.displayName = "ReactionSummary";

export default ReactionSummary;
