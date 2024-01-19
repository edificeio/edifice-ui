import { Ref, forwardRef } from "react";

import { RafterUp } from "@edifice-ui/icons";
import clsx from "clsx";

import { useDropdownContext } from "./DropdownContext";
import { Tooltip } from "..";

export interface DropdownTriggerProps
  extends React.ComponentPropsWithRef<"button"> {
  /**
   * Dropdown trigger title
   */
  label?: string;
  /**
   * Add an icon in dropdown trigger
   */
  icon?: React.ReactNode;
  /**
   * Add a badge
   */
  badgeContent?: string | number;
  /**
   * Set appearance
   */
  variant?: "ghost";
  /**
   * Button size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Disabled Trigger
   * */
  disabled?: boolean;
  /**
   * Stretch the dropdown trigger.
   */
  block?: boolean;
  tooltip?: string;
}

export type DropdownTriggerType = React.ReactElement<DropdownTriggerProps>;

const DropdownTrigger = forwardRef(
  (
    {
      label,
      icon,
      variant,
      disabled = false,
      size,
      tooltip,
      badgeContent,
      ...restProps
    }: DropdownTriggerProps,
    forwardRef: Ref<HTMLButtonElement>,
  ) => {
    const { triggerProps, block } = useDropdownContext();
    const { className, ...restTriggerProps } = triggerProps;

    const mergedProps = { ...restTriggerProps, ...restProps };
    const dropdownTrigger = clsx(
      "dropdown-toggle ",
      size,
      variant,
      { "w-100": block },
      className,
    );

    return (
      <Tooltip message={tooltip} placement="top">
        <button
          ref={forwardRef}
          className={dropdownTrigger}
          disabled={disabled}
          {...mergedProps}
        >
          {icon ? icon : null}
          {label}
          {badgeContent ? (
            <span className="badge text-bg-secondary rounded-pill">
              {badgeContent}
            </span>
          ) : (
            <RafterUp
              width={16}
              height={16}
              className="dropdown-toggle-caret"
            />
          )}
        </button>
      </Tooltip>
    );
  },
);

DropdownTrigger.displayName = "Dropdown.Trigger";

export default DropdownTrigger;
