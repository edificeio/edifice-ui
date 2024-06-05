import { useCallback, useEffect, useState } from "react";
import { ReactionSummaryData, ReactionType } from "../ReactionTypes";
import { ERROR_CODE, odeServices } from "edifice-ts-client";

type ReactionSummariesData = {
  reactionsByResource: {
    [resourceId: string]: ReactionSummaryData | undefined;
  };
};

/**
 * This hook implements some logic and provides functions to easily call "audience" backend endpoints.
 * @param module application code, e.g. "blog"
 * @param resourceType type of resource, e.g. "post"
 * @returns functions to easily call "audience" backend endpoints
 */
export default function useReactions(module: string, resourceType: string) {
  const [availableReactions, setAvailableReactions] = useState<ReactionType[]>(
    [],
  );

  // Useful shortcuts
  const _get = odeServices.http().get;
  const _putJson = odeServices.http().putJson;
  const _postJson = odeServices.http().postJson;
  const _delete = odeServices.http().delete;

  /** Get the list of available reactions types, which is configured on the platform. */
  async function loadAvailableReactions() {
    const reactions = await _get<ReactionType[]>("/audience/conf/public");
    if (!odeServices.http().isResponseError() && Array.isArray(reactions)) {
      setAvailableReactions(reactions);
    }
  }

  /**
   * Load the reactions summary for a list of resources.
   * @param resourceIds list of resource ids
   * @returns map of summaries, indexed by resource id.
   */
  const loadReactionSummaries: (resourceIds: string[]) => Promise<{
    [resourceId: string]: ReactionSummaryData | undefined;
  }> = async (resourceIds) => {
    const summaries = await _get<ReactionSummariesData>(
      `/audience/reactions/${module}/${resourceType}?resourceIds=${resourceIds.join(
        ",",
      )}`,
    );
    return odeServices.http().isResponseError()
      ? {}
      : summaries.reactionsByResource;
  };

  /**
   * Set, update or remove a reaction to a resource.
   * This parameter is
   * @param resourceId id
   * @param newReaction reaction to set / update / remove
   * @param oldReaction Previous reaction set, or null if none exists.
   */
  const applyReaction = useCallback(
    (
      resourceId: string,
      newReaction: ReactionType,
      oldReaction: ReactionType | null,
    ) => {
      // Forbid setting an unavailable reaction, by allow resetting it.
      if (
        newReaction !== oldReaction &&
        availableReactions.indexOf(newReaction) < 0
      ) {
        return Promise.reject(ERROR_CODE.MALFORMED_DATA);
      }

      if (oldReaction) {
        if (newReaction === oldReaction) {
          // Reset the reaction
          return _delete<void>(
            `/audience/reactions/${module}/${resourceType}/${resourceId}`,
          );
        } else {
          // Put a reaction change
          return _putJson<void>(
            `/audience/reactions/${module}/${resourceType}`,
            {
              resourceId,
              reactionType: newReaction,
            },
          );
        }
      } else {
        // Post a new reaction
        return _postJson<void>(
          `/audience/reactions/${module}/${resourceType}`,
          {
            resourceId,
            reactionType: newReaction,
          },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [availableReactions],
  );

  /** Get the available reactions, only once. */
  useEffect(() => {
    loadAvailableReactions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { availableReactions, loadReactionSummaries, applyReaction };
}
