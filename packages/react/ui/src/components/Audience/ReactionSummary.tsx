import { RefAttributes, useEffect, useState } from "react";
import { default as useReactionIcons } from "./hooks/useReactionIcons";
import { Button, ButtonProps, IconButton } from "../Button";
import { Dropdown } from "../Dropdown";
import { useTranslation } from "react-i18next";
import { ReactionSummaryData, ReactionType } from "edifice-ts-client";
import { Tooltip } from "../Tooltip";
import { useHover } from "../../hooks";
import { StringUtils } from "../../utils";
import clsx from "clsx";

export interface ReactionSummaryProps {
  availableReactions: ReactionType[];
  summary: ReactionSummaryData;
  onChange?: (chosenReaction?: ReactionType) => void;
  onClick?: () => void;
  flexDirection?: "row" | "column";
}

const ReactionSummary = ({
  flexDirection = "column",
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
  const classes = clsx("reaction-summary d-flex gap-4", {
    "flex-column": flexDirection === "column",
    "align-items-start": flexDirection === "column",
    "flex-row-reverse": flexDirection === "row",
    "justify-content-end": flexDirection === "row",
  });

  return (
    <div className={classes}>
      <Button
        variant="ghost"
        className="p-0 btn-icon"
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
  );
};

ReactionSummary.displayName = "ReactionSummary";

export default ReactionSummary;
