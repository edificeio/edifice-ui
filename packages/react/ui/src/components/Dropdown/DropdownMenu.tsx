import { ComponentPropsWithRef, ReactNode, Ref, forwardRef } from "react";

import clsx from "clsx";

import { useDropdownContext } from "./DropdownContext";

interface Item {
  /**
   * Object type
   */
  type?: undefined;
  /**
   * Icon component
   */
  icon: JSX.Element;
  /**
   * Label for a11y
   */
  label: string;
  /**
   * Action OnClick
   */
  action: (elem: any) => any;
}

interface Divider {
  /**
   * Object type
   */
  type: "divider";
}

export type DropdownMenuOptions = Item | Divider;

export interface DropdownMenuProps extends ComponentPropsWithRef<"div"> {
  children: ReactNode;
  block?: boolean;
}

const DropdownMenu = forwardRef(
  (
    { children, block, ...restProps }: DropdownMenuProps,
    forwardRef: Ref<HTMLDivElement>,
  ) => {
    const { menuProps, visible } = useDropdownContext();
    const { className, ...restMenuProps } = menuProps;

    const mergedProps = { ...restMenuProps, ...restProps };
    const dropdownMenu = clsx({ "w-100": block }, className);

    return visible ? (
      <div ref={forwardRef} className={dropdownMenu} {...mergedProps}>
        {children}
      </div>
    ) : null;
  },
);

DropdownMenu.displayName = "Dropdown.Menu";

export default DropdownMenu;
