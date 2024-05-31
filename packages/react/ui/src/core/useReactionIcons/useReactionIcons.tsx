import {
  Congrats,
  CongratsCounter,
  Great,
  GreatCounter,
  InsterestingCounter,
  Interesting,
  Thanks,
  ThanksCounter,
} from "@edifice-ui/icons/reactions";

import { Reaction } from "../../types";
import { Reaction as ReactionIcon } from "@edifice-ui/icons";

export default function useReactionIcons() {
  const getReactionIcon = (
    reactionType?: Reaction | null,
    rounded?: boolean,
  ) => {
    switch (reactionType) {
      case "REACTION_1":
        return rounded ? <ThanksCounter /> : <Thanks />;
      case "REACTION_2":
        return rounded ? <GreatCounter /> : <Great />;
      case "REACTION_3":
        return rounded ? <CongratsCounter /> : <Congrats />;
      case "REACTION_4":
        return rounded ? <InsterestingCounter /> : <Interesting />;
      default:
        return <ReactionIcon />;
    }
  };
  const getReactionLabel = (reactionType?: Reaction | null) => {
    switch (reactionType) {
      case "REACTION_1":
        return "Merci";
      case "REACTION_2":
        return "Génial";
      case "REACTION_3":
        return "Bravo";
      case "REACTION_4":
        return "Instructif";
      default:
        return "Réagir";
    }
  };

  return { getReactionIcon, getReactionLabel };
}
