import { RefAttributes } from "react";
import { default as useReactionIcons } from "./hooks/useReactionIcons";
import { Button, ButtonProps, IconButton } from "../Button";
import { Dropdown } from "../Dropdown";
import { useTranslation } from "react-i18next";
import { ReactionSummaryData, ReactionType } from "edifice-ts-client";
import { Tooltip } from "../Tooltip";

export interface ReactionChoiceProps {
  availableReactions: ReactionType[];
  summary: ReactionSummaryData;
  onChange?: (chosenReaction?: ReactionType) => void;
}

const ReactionChoice = ({
  availableReactions,
  summary,
  onChange,
}: ReactionChoiceProps) => {
  const { t } = useTranslation();
  const { getReactionIcon, getReactionLabel } = useReactionIcons();

  const { userReaction } = summary;

  const handleReactionOnClick = (reactionType: ReactionType) => {
    // Reaction is reset to `undefined` when same value is clicked.
    onChange?.(userReaction === reactionType ? undefined : reactionType);
  };

  return (
    <div className="reaction-choice">
      <Dropdown placement="top-start" isTriggerHovered={true}>
        {(
          triggerProps: JSX.IntrinsicAttributes &
            Omit<ButtonProps, "ref"> &
            RefAttributes<HTMLButtonElement>,
        ) => (
          <>
            <Button
              {...triggerProps}
              color="tertiary"
              variant="ghost"
              size="sm"
              leftIcon={getReactionIcon(userReaction)}
            >
              {t(getReactionLabel(userReaction))}
            </Button>

            <Dropdown.Menu
              unstyled
              className="bg-white shadow rounded-8 overflow-visible"
            >
              <div className="d-flex align-items-center justify-content-between">
                {availableReactions?.map((reactionType) => (
                  <Tooltip
                    key={reactionType}
                    message={t(getReactionLabel(reactionType))}
                    placement="top"
                    key={reactionType}
                  >
                    <IconButton
                      className="reaction-available m-4"
                      variant="ghost"
                      icon={getReactionIcon(reactionType)}
                      onClick={() => handleReactionOnClick(reactionType)}
                    />
                  </Tooltip>
                ))}
              </div>
            </Dropdown.Menu>
          </>
        )}
      </Dropdown>
    </div>
  );
};

ReactionChoice.displayName = "ReactionChoice";

export default ReactionChoice;
