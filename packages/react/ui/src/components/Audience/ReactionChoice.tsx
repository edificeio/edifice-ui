import { RefAttributes, useEffect, useState } from "react";
import { default as useReactionIcons } from "./hooks/useReactionIcons";
import { Button, ButtonProps, IconButton } from "../Button";
import { Dropdown } from "../Dropdown";
import { useTranslation } from "react-i18next";
import { ReactionSummaryData, ReactionType } from "edifice-ts-client";
import { Tooltip } from "../Tooltip";
import { useHover } from "../../hooks";

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
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const { t } = useTranslation();
  const { getReactionIcon, getReactionLabel } = useReactionIcons();
  const [triggerButtonRef, isHovered] = useHover<HTMLButtonElement>();

  const { userReaction } = summary;

  useEffect(() => {
    if (isHovered && !isDropdownVisible) triggerButtonRef.current?.click();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, isDropdownVisible]);

  const handleDropDownOnToggle = (visible: boolean) => {
    setIsDropdownVisible(visible);
  };

  const handleReactionOnClick = (reactionType: ReactionType) => {
    onChange?.(reactionType);
    // Close dropdown menu
    triggerButtonRef.current?.click();
  };

  return (
    <div className="reaction-choice">
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

ReactionChoice.displayName = "ReactionChoice";

export default ReactionChoice;
