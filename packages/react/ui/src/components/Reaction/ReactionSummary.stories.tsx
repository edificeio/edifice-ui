import { Meta, StoryObj } from "@storybook/react";

import ReactionSummary, { ReactionSummaryProps } from "./ReactionSummary";
import { useState } from "react";
import { ReactionSummaryData, ReactionType } from "./ReactionTypes";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReactionSummary> = {
  title: "Components/Reaction summary",
  component: ReactionSummary,
  args: {
    availableReactions: ["REACTION_2", "REACTION_3", "REACTION_4"],
    summary: {
      reactionTypes: ["REACTION_2", "REACTION_4"],
      userReaction: undefined,
      totalReactionsCounter: 3,
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;
type Story = StoryObj<typeof ReactionSummary>;

export const Base: Story = {
  render: ({ summary, availableReactions }: ReactionSummaryProps) => {
    const [currentSummary, setCurrentSummary] =
      useState<ReactionSummaryData>(summary);

    const handleOnChange = (newReaction?: ReactionType | undefined) => {
      setCurrentSummary(({ userReaction, ...restSummary }) => {
        alert(`Reaction changed from ${userReaction} to ${newReaction}`);
        return { ...restSummary, userReaction: newReaction };
      });
    };

    return (
      <ReactionSummary
        summary={currentSummary}
        availableReactions={availableReactions}
        onChange={handleOnChange}
      />
    );
  },
};
