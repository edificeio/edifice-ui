import { forwardRef, ReactNode } from "react";

import clsx from "clsx";

export interface CalloutProps extends React.ComponentPropsWithRef<"div"> {
  /**
   * Callout variant: warning, danger, info
   */
  variant?: "warning" | "danger" | "info";
  /**
   * Text or icon (or whatever) to render as children elements.
   */
  children: ReactNode;
  /**
   * Optional class for styling purpose
   */
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
const Callout = forwardRef(
  ({ className, variant, children, ...restProps }: CalloutProps) => {
    const classes = clsx(
      "callout",
      variant ? `callout-${variant}` : "",
      className,
    );

    return (
      <div className={classes} {...restProps}>
        {children}
      </div>
    );
  },
);

Callout.displayName = "Callout";

export default Callout;
