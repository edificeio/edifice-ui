/** Typing of a Reaction */
export type ReactionType =
  | "REACTION_1"
  | "REACTION_2"
  | "REACTION_3"
  | "REACTION_4";

/** Typing of a Reaction summary */
export type ReactionSummaryData = {
  reactionTypes?: Array<ReactionType> | null;
  userReaction?: ReactionType | null;
  totalReactionsCounter: number;
};

/** Typing of a Reaction detail */
export type ReactionDetail = {
  reactionCounters: {
    countByType: {
      [type in ReactionType]?: number;
    };
    allReactionsCounter: number;
  };
  userReactions: Array<{
    userId: string;
    profile: string;
    reactionType: ReactionType;
    displayName: string;
  }>;
};
