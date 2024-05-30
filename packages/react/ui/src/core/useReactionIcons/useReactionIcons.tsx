import {
  Reaction1,
  Reaction1Circle,
  Reaction2,
  Reaction2Circle,
  Reaction3,
  Reaction3Circle,
  Reaction4,
  Reaction4Circle,
} from "@edifice-ui/icons/reactions";

import { Reaction } from "../../types";
import { Smiley } from "@edifice-ui/icons";

export default function useReactionIcons() {
  const getReactionIcon = (
    reactionType?: Reaction | null,
    circle?: boolean,
  ) => {
    switch (reactionType) {
      case undefined || null:
        return <Smiley />;
      case "REACTION_1":
        return circle ? <Reaction1Circle /> : <Reaction1 />;
      case "REACTION_2":
        return circle ? <Reaction2Circle /> : <Reaction2 />;
      case "REACTION_3":
        return circle ? <Reaction3Circle /> : <Reaction3 />;
      case "REACTION_4":
        return circle ? <Reaction4Circle /> : <Reaction4 />;
      default:
        return <></>;
    }
  };
  const getReactionLabel = (reactionType?: Reaction | null) => {
    switch (reactionType) {
      case "REACTION_1":
        return "REACTION_1";
      case "REACTION_2":
        return "REACTION_2";
      case "REACTION_3":
        return "REACTION_3";
      case "REACTION_4":
        return "REACTION_4";
      default:
        return "réaction";
    }
  };

  return { getReactionIcon, getReactionLabel };
}
