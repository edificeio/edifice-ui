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
   * @param resourceId id
   * @param newReaction reaction to set / update / remove
   * @param oldReaction Previous reaction, or null if none exists.
   * @returns a promise of "+" (reaction added), "-" (reaction removed) or "=" (reaction changed)
   */
  const applyReaction = useCallback(
    async (
      resourceId: string,
      newReaction: ReactionType,
      oldReaction: ReactionType | null,
    ) => {
      // Forbid setting an unavailable reaction, but allow resetting it.
      if (
        newReaction !== oldReaction &&
        availableReactions.indexOf(newReaction) < 0
      ) {
        return Promise.reject(ERROR_CODE.MALFORMED_DATA);
      }

      let result: "+" | "-" | "=" = "+";
      if (oldReaction) {
        if (newReaction === oldReaction) {
          // Reset the reaction
          await _delete<void>(
            `/audience/reactions/${module}/${resourceType}/${resourceId}`,
          );
          result = "-";
        } else {
          // Put a reaction change
          await _putJson<void>(
            `/audience/reactions/${module}/${resourceType}`,
            {
              resourceId,
              reactionType: newReaction,
            },
          );
          result = "=";
        }
      } else {
        // Post a new reaction
        await _postJson<void>(`/audience/reactions/${module}/${resourceType}`, {
          resourceId,
          reactionType: newReaction,
        });
      }
      if (odeServices.http().isResponseError())
        return Promise.reject(ERROR_CODE.UNKNOWN);
      return result;
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
