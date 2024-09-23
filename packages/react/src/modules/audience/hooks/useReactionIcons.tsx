import { ReactionType } from '@edifice.io/ts-client';
import { Icon } from '../../../components';

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
      case 'REACTION_1':
        return asCounter ? (
          <Icon name="audience/reactions/thanks-counter" />
        ) : (
          <Icon name="audience/reactions/thanks" />
        );
      case 'REACTION_2':
        return asCounter ? (
          <Icon name="audience/reactions/great-counter" />
        ) : (
          <Icon name="audience/reactions/great" />
        );
      case 'REACTION_3':
        return asCounter ? (
          <Icon name="audience/reactions/congrats-counter" />
        ) : (
          <Icon name="audience/reactions/congrats" />
        );
      case 'REACTION_4':
        return asCounter ? (
          <Icon name="audience/reactions/interesting-counter" />
        ) : (
          <Icon name="audience/reactions/interesting" />
        );
      default:
        return <Icon name="reaction" />;
    }
  };

  /**
   * Get the i18n key for labelling a ReactionType.
   * @param reactionType type
   * @returns An i18n key
   */
  const getReactionLabel = (reactionType?: ReactionType | null) => {
    switch (reactionType) {
      case 'REACTION_1':
        return 'audience.reaction.thanks';
      case 'REACTION_2':
        return 'audience.reaction.great';
      case 'REACTION_3':
        return 'audience.reaction.congrats';
      case 'REACTION_4':
        return 'audience.reaction.interesting';
      default:
        return 'audience.reaction.default';
    }
  };

  return { getReactionIcon, getReactionLabel };
}
