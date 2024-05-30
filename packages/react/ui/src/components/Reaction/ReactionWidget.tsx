import { useReactionIcons } from "../../core";
import { ReactionSummary } from "../../types/Reaction";

export interface ReactionWidgetProps {
  summary: ReactionSummary;
}

const ReactionWidget = (props: ReactionWidgetProps) => {
  const { totalReactionsCounter, reactionTypes, userReaction } = props.summary;

  const { getReactionIcon } = useReactionIcons();

  return (
    <>
      <div>
        <div className="me-8">{totalReactionsCounter}</div>
        <div>
          {reactionTypes?.map((reactionType) => (
            <div className="ms-minus-8">
              {getReactionIcon(reactionType, true)}
            </div>
          ))}
        </div>
      </div>
      <div>{userReaction}</div>
    </>
  );
};

ReactionWidget.displayName = "ReactionWidget";

export default ReactionWidget;
