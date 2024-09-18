import clsx from 'clsx';

import { Icon } from '..';
import { ColorPaletteItem } from './ColorPalette';

export interface ColorPickerItemProps {
  /**
   * Color item to display
   */
  model: ColorPaletteItem;
  /**
   * Render as selected
   */
  selected?: boolean;
  /**
   * Optional class for styling purpose
   */
  className?: string;
}

const ColorPickerItem = ({
  model,
  selected,
  className,
}: ColorPickerItemProps) =>
  model.isReset ? (
    <Icon name="delete-color" />
  ) : (
    <div
      aria-label={model.description}
      className={clsx(
        'color-picker-hue-color-item rounded-1',
        className,
        model.hue === 'light' ? 'light' : 'dark',
        selected && 'selected',
      )}
      style={{ backgroundColor: model.value }}
    ></div>
  );

ColorPickerItem.displayName = 'ColorPickerItem';

export default ColorPickerItem;
