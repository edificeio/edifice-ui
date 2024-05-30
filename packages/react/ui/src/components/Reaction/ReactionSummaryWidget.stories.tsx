import { Meta, StoryObj } from "@storybook/react";

import ReactionSummaryWidget, {
  ReactionSummaryWidgetProps,
} from "./ReactionSummaryWidget";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReactionSummaryWidget> = {
  title: "Widgets/Reaction summary",
  component: ReactionSummaryWidget,
  args: {
    availableReactions: ["REACTION_2", "REACTION_3", "REACTION_4"],
    summary: {
      reactionTypes: ["REACTION_2", "REACTION_4"],
      userReaction: "REACTION_4",
      totalReactionsCounter: 3,
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof ReactionSummaryWidget>;

export const Base: Story = {
  render: (args: ReactionSummaryWidgetProps) => {
    return <ReactionSummaryWidget {...args} />;
  },
};
