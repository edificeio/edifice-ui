/** Typing of a Reaction */
export type Reaction =
  | "REACTION_1"
  | "REACTION_2"
  | "REACTION_3"
  | "REACTION_4";

/** Typing of a Reaction summary */
export type ReactionSummary = {
  reactionTypes?: Array<Reaction> | null;
  userReaction?: Reaction | null;
  totalReactionsCounter: number;
};

/** Typing of a Reaction detail */
export type ReactionDetail = {
  reactionCounters: {
    countByType: {
      [type in Reaction]?: number;
    };
    allReactionsCounter: number;
  };
  userReactions: Array<{
    userId: string;
    profile: string;
    reactionType: Reaction;
    displayName: string;
  }>;
};
