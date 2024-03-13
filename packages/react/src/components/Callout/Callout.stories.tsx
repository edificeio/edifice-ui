import { Meta, StoryObj } from "@storybook/react";

import Callout from "./Callout";
import {
  AlertCircle,
  AlertTriangle,
  Check,
  InfoCircle,
} from "@edifice-ui/icons";
import { Button } from "..";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Callout> = {
  title: "Components/Callout",
  component: Callout,
  argTypes: {
    variant: {
      options: ["warning", "danger", "info"],
      control: { type: "select" },
    },
  },
  args: {},
};
// More on argTypes: https://storybook.js.org/docs/react/api/argtypes

export default meta;
type Story = StoryObj<typeof Callout>;

export const Base: Story = {
  args: {
    children: (
      <>
        <Check /> Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Inventore tempora perspiciatis explicabo ipsam rem blanditiis quisquam!
      </>
    ),
  },
};

export const Warning: Story = {
  args: {
    children: (
      <>
        <AlertTriangle className="text-warning" />
        <div className="flex-fill">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
          tempora perspiciatis explicabo ipsam rem blanditiis quisquam!
        </div>
        <Button variant="ghost" color="tertiary">
          Confirmer
        </Button>
      </>
    ),
    variant: "warning",
  },
};

export const Danger: Story = {
  args: {
    children: (
      <>
        <AlertCircle className="text-danger" />
        <div className="flex-fill">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
          tempora perspiciatis explicabo ipsam rem blanditiis quisquam!
        </div>
        <Button variant="ghost" color="tertiary">
          Confirmer
        </Button>
      </>
    ),
    variant: "danger",
  },
};

export const Info: Story = {
  args: {
    children: (
      <>
        <InfoCircle className="text-info" />
        <div className="flex-fill">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore
          tempora perspiciatis explicabo ipsam rem blanditiis quisquam!
        </div>
        <Button variant="ghost" color="tertiary">
          Confirmer
        </Button>
      </>
    ),
    variant: "info",
  },
};
