import { Meta, StoryObj } from "@storybook/react";

import ReactionWidget, { ReactionWidgetProps } from "./ReactionWidget";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReactionWidget> = {
  title: "Widgets/ReactionWidget",
  component: ReactionWidget,
  args: {
    summary: {
      reactionTypes: ["REACTION_2"],
      userReaction: "REACTION_2",
      totalReactionsCounter: 1,
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof ReactionWidget>;

export const Base: Story = {
  render: (args: ReactionWidgetProps) => {
    return <ReactionWidget summary={args.summary} />;
  },
};
