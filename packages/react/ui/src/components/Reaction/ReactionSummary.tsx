import { RefAttributes } from "react";
import { default as useReactionIcons } from "./hook/useReactionIcons";
import { Reaction, ReactionSummaryData } from "./ReactionTypes";
import { Button, IconButton, IconButtonProps } from "../Button";
import { Dropdown } from "../Dropdown";

export interface ReactionSummaryProps {
  availableReactions: Reaction[];
  summary: ReactionSummaryData;
}

const ReactionSummary = ({
  availableReactions,
  summary,
}: ReactionSummaryProps) => {
  const { totalReactionsCounter, reactionTypes, userReaction } = summary;

  const { getReactionIcon, getReactionLabel } = useReactionIcons();

  return (
    <div className="reaction-summary">
      <div className="d-flex">
        <div className="text-gray-700 me-16">{totalReactionsCounter}</div>
        {reactionTypes?.map((reactionType) => (
          <div className="reaction-overlap">
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
                className="ps-4 pe-8 reaction-overlap"
              >
                {getReactionLabel(userReaction)}
              </Button>

              <Dropdown.Menu
                unstyled={true}
                className="bg-white shadow rounded-8 overflow-visible"
              >
                <div className="d-flex align-items-center justify-content-between">
                  {availableReactions?.map((reactionType) => (
                    <IconButton
                      className="reaction-available m-4"
                      variant="ghost"
                      title={getReactionLabel(reactionType)}
                      icon={getReactionIcon(reactionType)}
                    />
                  ))}
                </div>
              </Dropdown.Menu>
            </>
          )}
        </Dropdown>
      </div>
    </div>
  );
};

ReactionSummary.displayName = "ReactionSummary";

export default ReactionSummary;
