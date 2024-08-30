import { forwardRef, Ref } from 'react';
import { Icon } from '../Icon';

export interface ActionBarProps {
  /**
   * Add Buttons To Actions bar
   */
  children: React.ReactNode;
}

export type ActionBarType = React.FC<ActionBarProps>;

const ActionBar = forwardRef(
  ({ children }: ActionBarProps, ref: Ref<HTMLDivElement>) => {
    return (
      <div ref={ref} className="actionbar">
        <Icon name="apps/collaborative-wall" />
        {children}
      </div>
    );
  },
);

ActionBar.displayName = 'ActionBar';
export default ActionBar;
