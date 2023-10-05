import { Meta, StoryObj } from "@storybook/react";

import { DefaultPalette } from "./ColorPalette";
import ColorPicker, { ColorPickerProps } from "./ColorPicker";
import { useState } from "react";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ColorPicker> = {
  title: "Components/ColorPicker",
  component: ColorPicker,
  parameters: {
    docs: {
      description: {
        component:
          "The ColorPicker allows users to choose one color among a list of available colors. There are two predefined lists of available colors : standard and accessible",
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ColorPicker>;

const Template = (args: ColorPickerProps) => {
  const [currentColor, setCurrentColor] = useState<string>("#4A4A4A");
  const handleOnChange = (color: string) => setCurrentColor(color);
  return (
    <div>
      <ColorPicker {...args} model={currentColor} onSuccess={handleOnChange} />
    </div>
  );
};

export const Base: Story = {
  render: Template,
};

export const Reset: Story = {
  render: (args: ColorPickerProps) => {
    const newArgs = {
      ...args,
      palettes: [
        {
          ...DefaultPalette,
          reset: { value: "transparent", description: "None" },
        },
      ],
    };
    return Template(newArgs);
  },
};
