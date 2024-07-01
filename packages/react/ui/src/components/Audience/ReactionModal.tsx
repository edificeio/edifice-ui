import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { default as useReactionIcons } from "./hooks/useReactionIcons";
import { Modal } from "../Modal";
import { useTranslation } from "react-i18next";
import { Button } from "../Button";
import {
  ReactionDetailsData,
  ReactionType,
  ReactionTypes,
} from "edifice-ts-client";
import { Tabs, TabsItemProps } from "../Tabs";
import { ReactionModalCard } from "./ReactionModal.Card";
import { StringUtils } from "../../utils";
import { createPortal } from "react-dom";

export interface ReactionModalProps {
  /** Id of resource. */
  resourceId: string;

  /** Number of results per page, defaults to 30. */
  pageSize?: number;

  /** Display modal ? */
  isOpen: boolean;

  /** Close button handler. */
  onModalClose(): void;

  /** Function for loading reactions to the resource. */
  reactionDetailsLoader: (
    resourceId: string,
    page: number,
    size: number,
  ) => Promise<ReactionDetailsData | undefined>;
}

const ALL_TAB_ID = "all";
type TabId = ReactionType | typeof ALL_TAB_ID;

const ReactionModal = ({
  resourceId,
  pageSize = 30,
  reactionDetailsLoader: loadReactionDetails,
  onModalClose,
  ...restProps
}: ReactionModalProps) => {
  // Reaction counters details.
  const [counters, setCounters] = useState({
    countByType: {} as {
      [type in ReactionType]?: number;
    },
    allReactionsCounter: 0,
  });
  // Reactions details.
  const [reactions, setReactions] = useState<
    ReactionDetailsData["userReactions"]
  >([]);
  // Currently displayed tab ID.
  const [currentTabId, setCurrentTabId] = useState<TabId>(ALL_TAB_ID);

  const id = useId();
  const { t } = useTranslation();
  const { getReactionIcon } = useReactionIcons();

  const loadPage = useCallback(
    async (pageNumber: number) => {
      if (pageNumber >= 0) {
        const data = await loadReactionDetails(
          resourceId,
          pageNumber,
          pageSize,
        );
        if (data) {
          const { reactionCounters, userReactions } = data;
          if (pageNumber === 0) setCounters(reactionCounters);
          setReactions((old) => [...old, ...userReactions]);
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setCounters, setReactions],
  );

  const handleMoreClick = useCallback(async () => {
    if (pageSize > 0) {
      // Load NEXT page.
      // Choosing an arbitrary page number will not work (bad array indexes).
      const pageNumber = Math.floor((reactions.length + 1) / pageSize);
      loadPage(pageNumber);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageSize, reactions.length]);

  // Displayed panel.
  const panel = useMemo(() => {
    return (
      <div className="d-flex flex-column w-100 gap-8 mt-32">
        {reactions
          .filter(
            (reaction) =>
              currentTabId === ALL_TAB_ID ||
              reaction.reactionType === currentTabId,
          )
          .map((reaction) => {
            return (
              <ReactionModal.Card key={reaction.userId} reaction={reaction} />
            );
          })}
      </div>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reactions, currentTabId]);

  // Displayed tabs list.
  const tabs = useMemo(() => {
    const items: TabsItemProps[] = ReactionTypes.filter(
      (type) => typeof counters.countByType?.[type] === "number",
    ).map((type) => ({
      id: type,
      icon: getReactionIcon(type),
      label: StringUtils.toCounter(counters.countByType[type] as number),
      content: panel,
    }));

    return [
      {
        id: ALL_TAB_ID,
        icon: null,
        label: t("audience.reaction.tab.all"),
        content: panel,
      },
      ...items,
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counters, reactions, panel]);

  // Load first page, once
  useEffect(() => {
    loadPage(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTabChange = (tab: TabsItemProps) => {
    setCurrentTabId(tab.id as TabId);
  };

  const hasMore = reactions.length < counters.allReactionsCounter;

  return createPortal(
    <Modal id={id} {...restProps} onModalClose={onModalClose} size="md">
      <Modal.Header onModalClose={onModalClose}>
        <h2>{t("audience.reaction.modal.header")}</h2>
      </Modal.Header>

      <Modal.Body>
        <Tabs
          items={tabs}
          defaultId={ALL_TAB_ID}
          onChange={handleTabChange}
        ></Tabs>
      </Modal.Body>

      <Modal.Footer>
        {hasMore && (
          <Button color="tertiary" onClick={handleMoreClick}>
            {t("audience.reaction.modal.more")}
          </Button>
        )}
        <Button
          color="primary"
          onClick={onModalClose}
          type="button"
          variant="filled"
        >
          {t("close")}
        </Button>
      </Modal.Footer>
    </Modal>,
    document.getElementById("portal") as HTMLElement,
  );
};

ReactionModal.displayName = "ReactionModal";
ReactionModal.Card = ReactionModalCard;

export default ReactionModal;
