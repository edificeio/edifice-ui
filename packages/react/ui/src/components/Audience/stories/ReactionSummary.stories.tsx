import { Meta, StoryObj } from "@storybook/react";

import ReactionSummary, { ReactionSummaryProps } from "../ReactionSummary";
import { useState } from "react";
import { ReactionSummaryData, ReactionType } from "edifice-ts-client";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReactionSummary> = {
  title: "Components/Audience/Reactions summary",
  component: ReactionSummary,
  decorators: [
    (Story) => (
      <div>
        <p style={{ height: "5em" }}>
          Here is a very informative and interesting paragraph.
        </p>
        {Story()}
      </div>
    ),
  ],
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
  render: ({
    summary,
    availableReactions,
    flexDirection,
  }: ReactionSummaryProps) => {
    const [currentSummary, setCurrentSummary] =
      useState<ReactionSummaryData>(summary);

    const handleChange = (newReaction?: ReactionType | undefined) => {
      setCurrentSummary(({ userReaction, ...restSummary }) => {
        alert(`Reaction changed from ${userReaction} to ${newReaction}`);
        return { ...restSummary, userReaction: newReaction };
      });
    };

    const handleClick = () => {
      alert("Show details, please");
    };

    return (
      <ReactionSummary
        flexDirection={flexDirection}
        summary={currentSummary}
        availableReactions={availableReactions}
        onClick={handleClick}
        onChange={handleChange}
      />
    );
  },
};
