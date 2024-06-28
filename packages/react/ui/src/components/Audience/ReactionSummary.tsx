import { RefAttributes, useEffect, useState } from "react";
import { default as useReactionIcons } from "./hooks/useReactionIcons";
import { Button, ButtonProps, IconButton } from "../Button";
import { Dropdown } from "../Dropdown";
import { useTranslation } from "react-i18next";
import { ReactionSummaryData, ReactionType } from "edifice-ts-client";
import { Tooltip } from "../Tooltip";
import { useHover } from "../../hooks";
import { StringUtils } from "../../utils";

export interface ReactionSummaryProps {
  availableReactions: ReactionType[];
  summary: ReactionSummaryData;
  onChange?: (chosenReaction?: ReactionType) => void;
  onClick?: () => void;
}

const ReactionSummary = ({
  availableReactions,
  summary,
  onChange,
  onClick: handleDetailsClick,
}: ReactionSummaryProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { t } = useTranslation();
  const { getReactionIcon, getReactionLabel } = useReactionIcons();
  const [triggerButtonRef, isHovered] = useHover<HTMLButtonElement>();

  const { totalReactionsCounter, reactionTypes, userReaction } = summary;

  useEffect(() => {
    if (isHovered && !isDropdownVisible) triggerButtonRef.current?.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isDropdownVisible]);

  const handleDropDownOnToggle = (visible: boolean) => {
    setIsDropdownVisible(visible);
  };

  const handleReactionOnClick = (reactionType: ReactionType) => {
    // Reaction is reset to `undefined` when same value is clicked.
    onChange?.(userReaction === reactionType ? undefined : reactionType);

    // Then close dropdown menu
    triggerButtonRef.current?.click();
  };

  const hasNoReactions = totalReactionsCounter === 0;

  return (
    <div className="reaction-summary">
      <Button
        variant="ghost"
        className="m-0 p-0 btn-icon"
        disabled={hasNoReactions}
        onClick={handleDetailsClick}
      >
        <div className="d-flex">
          <div className="text-gray-700 me-16">
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
      <div className="mt-4">
        <Dropdown placement="top" onToggle={handleDropDownOnToggle}>
          {(
            triggerProps: JSX.IntrinsicAttributes &
              Omit<ButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
          ) => (
            <>
              <Button
                {...triggerProps}
                ref={triggerButtonRef}
                color="tertiary"
                variant="ghost"
                size="sm"
                leftIcon={getReactionIcon(userReaction)}
                className="ps-4 pe-8 reaction-overlap"
              >
                {t(getReactionLabel(userReaction))}
              </Button>

              <Dropdown.Menu
                unstyled={true}
                className="bg-white shadow rounded-8 overflow-visible"
              >
                <div className="d-flex align-items-center justify-content-between">
                  {availableReactions?.map((reactionType) => (
                    <Tooltip
                      message={t(getReactionLabel(reactionType))}
                      placement="top"
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
    </div>
  );
};

ReactionSummary.displayName = "ReactionSummary";

export default ReactionSummary;
