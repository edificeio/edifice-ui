import { RefAttributes } from "react";
import { useReactionIcons } from "../../core";
import { Reaction, ReactionSummary } from "../../types/Reaction";
import { Button, IconButtonProps } from "../Button";
import { Dropdown } from "../Dropdown";

export interface ReactionSummaryWidgetProps {
  availableReactions: Reaction[];
  summary: ReactionSummary;
}

const ReactionSummaryWidget = ({
  availableReactions,
  summary,
}: ReactionSummaryWidgetProps) => {
  const { totalReactionsCounter, reactionTypes, userReaction } = summary;

  const { getReactionIcon, getReactionLabel } = useReactionIcons();

  return (
    <>
      <div className="reaction-summary d-flex">
        <div className="text-gray-700 me-16">{totalReactionsCounter}</div>
        {reactionTypes?.map((reactionType) => (
          <div className="reaction-type" style={{ "margin-left": "-8px" }}>
            {getReactionIcon(reactionType, true)}
          </div>
        ))}
      </div>
      <div className="mt-4">
        <Dropdown placement="top">
          {(
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
          ) => (
            <>
              <Button
                {...triggerProps}
                color="tertiary"
                variant="ghost"
                size="sm"
                leftIcon={getReactionIcon(userReaction)}
                className="ps-4 pe-8 reaction-type fw-normal"
                style={{ "margin-left": "-8px" }}
              >
                {getReactionLabel(userReaction)}
              </Button>

              <Dropdown.Menu>
                <div className="d-flex gap-8 align-items-center justify-content-between p-4 p-relative">
                  {availableReactions?.map((reactionType) => (
                    <div
                      className="reaction-available"
                      title={getReactionLabel(reactionType)}
                    >
                      {getReactionIcon(reactionType)}
                    </div>
                  ))}
                </div>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </div>
    </>
  );
};

ReactionSummaryWidget.displayName = "ReactionWidget";

export default ReactionSummaryWidget;
