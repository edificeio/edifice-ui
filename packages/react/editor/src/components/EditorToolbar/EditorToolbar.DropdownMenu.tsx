import { Fragment, ReactNode, RefAttributes } from 'react';

import {
  Dropdown,
  DropdownMenuOptions,
  IconButton,
  IconButtonProps,
  Tooltip,
} from '@edifice-ui/react';

interface Props {
  /**
   * Props for the trigger
   */
  triggerProps: JSX.IntrinsicAttributes &
    Omit<IconButtonProps, 'ref'> &
    RefAttributes<HTMLButtonElement>;
  /**
   * Menu icon
   */
  icon: ReactNode;
  /**
   * Menu label (for accessibility)
   */
  ariaLabel: string;
  /**
   * Options to display
   */
  options: DropdownMenuOptions[];
}

export const EditorToolbarDropdownMenu = ({
  triggerProps,
  icon,
  ariaLabel,
  options,
}: Props) => {
  return (
    <>
      <Tooltip message={ariaLabel} placement="top">
        <IconButton
          {...triggerProps}
          type="button"
          variant="ghost"
          color="tertiary"
          icon={icon}
          aria-label={ariaLabel}
        />
      </Tooltip>
      <Dropdown.Menu>
        {options.map((option, index) => {
          return (
            <Fragment key={index}>
              {option.type === 'divider' ? (
                <Dropdown.Separator />
              ) : (
                <Dropdown.Item
                  icon={option.icon}
                  onClick={() => option.action(null)}
                >
                  {option.label}
                </Dropdown.Item>
              )}
            </Fragment>
          );
        })}
      </Dropdown.Menu>
    </>
  );
};
