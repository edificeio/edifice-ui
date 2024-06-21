import { default as useReactionIcons } from "./hooks/useReactionIcons";
export interface ReactionModalProps {
  pageSize: number;
}

const ReactionModal = ({ pageSize = 30 }: ReactionModalProps) => {
  //  const [] = useReactions()

  /*const { getReactionIcon, getReactionLabel } =*/ useReactionIcons();

  console.log(pageSize);
  return <></>;
};

ReactionModal.displayName = "ReactionModal";

export default ReactionModal;
