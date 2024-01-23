import { DeleteColor } from "@edifice-ui/icons";
import clsx from "clsx";

import { ColorPaletteItem } from "./ColorPalette";

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
}: ColorPickerItemProps) => (
  <div
    aria-label={model.description}
    className={clsx(
      "color-picker-hue-color-item",
      className,
      model.hue === "light" ? "light" : "dark",
      selected && "selected",
    )}
    style={{ backgroundColor: model.value }}
  >
    {model.isReset && <DeleteColor />}
  </div>
);

ColorPickerItem.displayName = "ColorPickerItem";

export default ColorPickerItem;
