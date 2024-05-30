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

export default function useReactionIcons() {
  const getReactionIcon = (reactionType: Reaction, circle?: boolean) => {
    switch (reactionType) {
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
  const getReactionTitle = (reactionType: Reaction) => {
    switch (reactionType) {
      case "REACTION_1":
        return "";
      case "REACTION_2":
        return "";
      case "REACTION_3":
        return "";
      case "REACTION_4":
        return "";
      default:
        return "";
    }
  };

  return { getReactionIcon, getReactionTitle };
}
