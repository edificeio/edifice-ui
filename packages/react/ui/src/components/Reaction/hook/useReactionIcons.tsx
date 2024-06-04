import {
  Congrats,
  CongratsCounter,
  Great,
  GreatCounter,
  InterestingCounter,
  Interesting,
  Thanks,
  ThanksCounter,
} from "@edifice-ui/icons/audience";

import { Reaction as ReactionIcon } from "@edifice-ui/icons";
import { ReactionType } from "../ReactionTypes";

export default function useReactionIcons() {
  /**
   * Get the Icon corresponding to a ReactionType.
   *
   * @param reactionType type
   * @param asCounter Get the "counter / rounded" version of the icon ?
   * @returns An icon for the type, or <ReactionIcon /> by default.
   */
  const getReactionIcon = (
    reactionType?: ReactionType | null,
    asCounter?: boolean,
  ) => {
    switch (reactionType) {
      case "REACTION_1":
        return asCounter ? <ThanksCounter /> : <Thanks />;
      case "REACTION_2":
        return asCounter ? <GreatCounter /> : <Great />;
      case "REACTION_3":
        return asCounter ? <CongratsCounter /> : <Congrats />;
      case "REACTION_4":
        return asCounter ? <InterestingCounter /> : <Interesting />;
      default:
        return <ReactionIcon />;
    }
  };

  /**
   * Get the i18n key for labelling a ReactionType.
   * @param reactionType type
   * @returns An i18n key
   */
  const getReactionLabel = (reactionType?: ReactionType | null) => {
    switch (reactionType) {
      case "REACTION_1":
        return "reaction.reaction_1";
      case "REACTION_2":
        return "reaction.reaction_2";
      case "REACTION_3":
        return "reaction.reaction_3";
      case "REACTION_4":
        return "reaction.reaction_4";
      default:
        return "reaction.default";
    }
  };

  return { getReactionIcon, getReactionLabel };
}
