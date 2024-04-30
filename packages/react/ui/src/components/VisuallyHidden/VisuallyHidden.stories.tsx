import { Meta } from "@storybook/react";
import VisuallyHidden, { VisuallyHiddenProps } from "./VisuallyHidden";
import { Button } from "../Button";
import { AddUser } from "@edifice-ui/icons";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof VisuallyHidden> = {
  title: "Components/VisuallyHidden",
  component: VisuallyHidden,
  parameters: {
    docs: {
      description: {
        component:
          "It is used to visually hide an element but accessible for screen-readers. It renders html <span> as a wrapper of your content.",
      },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;

export const Base = (args: VisuallyHiddenProps) => {
  return (
    <Button>
      <AddUser />
      <VisuallyHidden>Add User</VisuallyHidden>
    </Button>
  );
};
