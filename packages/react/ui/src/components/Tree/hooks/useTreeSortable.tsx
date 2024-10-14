import { useEffect, useMemo, useState } from "react";
import { FlattenedItem, TreeItem, UpdateTreeData } from "../types/types";
import {
  Announcements,
  defaultDropAnimation,
  DragEndEvent,
  DragMoveEvent,
  DragOverEvent,
  DragStartEvent,
  DropAnimation,
  KeyboardSensor,
  MeasuringStrategy,
  Modifier,
  PointerSensor,
  UniqueIdentifier,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  determineNewParentId,
  flattenTree,
  generateUpdateData,
  getActiveAndOverNodes,
  getDragDepth,
  getIndicesToUpdate,
  updateParentIds,
} from "../utils/utils";

export const useTreeSortable = ({
  nodes,
  onSortable,
  handleCollapseNode,
}: {
  nodes: TreeItem[];
  onSortable: (updateArray: UpdateTreeData[]) => void;
  handleCollapseNode: (nodeId: string) => void;
}) => {
  const [items, setItems] = useState<TreeItem[]>(() => nodes);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [overId, setOverId] = useState<string | null>(null);
  const [offsetLeft, setOffsetLeft] = useState(0);
  const [currentPosition, setCurrentPosition] = useState<{
    parentId: UniqueIdentifier | null;
    overId: UniqueIdentifier;
  } | null>(null);

  useEffect(() => {
    setItems(nodes);
  }, [nodes]);

  const activationConstraint = {
    delay: 250,
    tolerance: 5,
  };

  const indicator = false;
  const indentationWidth = 64;

  const flattenedTree: FlattenedItem[] = useMemo(
    () => flattenTree(items, null),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [items],
  );

  const activeItem = activeId
    ? flattenedTree.find(({ id }) => id === activeId)
    : null;

  const buildTree = (flatNodes: FlattenedItem[]): TreeItem[] => {
    const nodeMap = new Map<string, TreeItem>();

    // Initialiser la map avec chaque nœud
    flatNodes.forEach((node) => {
      nodeMap.set(node.id, {
        id: node.id,
        name: node.name,
        children: [],
        position: node.position,
      });
    });

    const tree: TreeItem[] = [];

    // Parcourir les nœuds et assigner les enfants à leur parent
    flatNodes.forEach((node) => {
      const treeNode = nodeMap.get(node.id)!; // Récupère le nœud correspondant
      if (node.parentId === null) {
        tree.push(treeNode); // Pas de parent, c'est un nœud racine
      } else {
        const parentNode = nodeMap.get(node.parentId);
        if (parentNode) {
          parentNode.children = parentNode.children ?? undefined;
          parentNode.children?.push(treeNode); // Ajoute le nœud en tant qu'enfant de son parent
        }
      }
    });

    return tree;
  };

  function getProjection(
    items: FlattenedItem[],
    activeId: UniqueIdentifier,
    overId: UniqueIdentifier,
    dragOffset: number,
    indentationWidth: number,
  ) {
    const overItemIndex = items.findIndex(({ id }) => id === overId);
    const activeItemIndex = items.findIndex(({ id }) => id === activeId);
    const activeItem = items[activeItemIndex];
    const newItems = arrayMove(items, activeItemIndex, overItemIndex);
    const previousItem = newItems[overItemIndex - 1];
    const dragDepth = getDragDepth(dragOffset, indentationWidth);
    const projectedDepth = activeItem.depth + dragDepth;
    let depth = projectedDepth + activeItem.depth;

    if (!previousItem) {
      depth = 0;
    } else {
      depth = Math.max(0, Math.min(1, projectedDepth));
    }

    return { depth, parentId: getParentId(), activeId, previousItem };

    function getParentId() {
      if (depth === 0 || !previousItem) {
        return null;
      }

      if (depth === previousItem.depth) {
        return previousItem.parentId;
      }

      if (depth > previousItem.depth) {
        return previousItem.id;
      }

      const newParent = newItems
        .slice(0, overItemIndex)
        .reverse()
        .find((item) => item.depth === depth)?.parentId;

      return newParent ?? null;
    }
  }

  const projected =
    activeId && overId
      ? getProjection(
          flattenedTree,
          activeId,
          overId,
          offsetLeft,
          indentationWidth,
        )
      : null;

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;

    handleCollapseNode(active.id as string);

    setActiveId(active.id as unknown as string);
    setOverId(active.id as unknown as string);

    const activeItem = flattenedTree.find(({ id }) => id === activeId);

    if (activeItem) {
      setCurrentPosition({
        parentId: activeItem.parentId,
        overId: activeId as unknown as string,
      });
    }
  }

  function handleDragMove({ delta }: DragMoveEvent) {
    setOffsetLeft(delta.x);
  }

  function handleDragOver(event: DragOverEvent) {
    const { over } = event;

    setOverId(over?.id as unknown as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    const { activeNode, activeNodeIndex, overNode, overNodeIndex } =
      getActiveAndOverNodes(flattenedTree, active.id, over?.id);

    const newParentId = determineNewParentId(
      active,
      over,
      activeNode,
      overNode,
      projected,
    );

    const indicesToUpdate = getIndicesToUpdate(
      activeNode,
      activeNodeIndex,
      flattenedTree,
      projected,
    );

    updateParentIds(flattenedTree, indicesToUpdate, newParentId);

    const updatedFlattenedTree = arrayMove(
      flattenedTree,
      activeNodeIndex,
      overNodeIndex,
    );
    const { updateArray, updatedTreeData } =
      generateUpdateData(updatedFlattenedTree);

    const updatedTree = buildTree(updatedTreeData);

    setItems(updatedTree);
    setActiveId(null);
    setOverId(null);

    onSortable(updateArray as UpdateTreeData[]);
  }

  const sortedIds = useMemo(
    () => flattenedTree.map(({ id }) => id),
    [flattenedTree],
  );

  function getMovementAnnouncement(
    eventName: string,
    activeId: UniqueIdentifier,
    overId?: UniqueIdentifier,
  ) {
    if (overId && projected) {
      if (eventName !== "onDragEnd") {
        if (
          currentPosition &&
          projected.parentId === currentPosition.parentId &&
          overId === currentPosition.overId
        ) {
          return;
        } else {
          setCurrentPosition({
            parentId: projected.parentId,
            overId,
          });
        }
      }

      const clonedItems: FlattenedItem[] = JSON.parse(
        JSON.stringify(flattenTree(items, null, 0)),
      );
      const overIndex = clonedItems.findIndex(({ id }) => id === overId);
      const activeIndex = clonedItems.findIndex(({ id }) => id === activeId);
      const sortedItems = arrayMove(clonedItems, activeIndex, overIndex);

      const previousItem = sortedItems[overIndex - 1];

      let announcement;
      const movedVerb = eventName === "onDragEnd" ? "dropped" : "moved";
      const nestedVerb = eventName === "onDragEnd" ? "dropped" : "nested";

      if (!previousItem) {
        const nextItem = sortedItems[overIndex + 1];
        announcement = `${activeId} was ${movedVerb} before ${nextItem.id}.`;
      } else {
        if (projected.depth > previousItem.depth) {
          announcement = `${activeId} was ${nestedVerb} under ${previousItem.id}.`;
        } else {
          let previousSibling: FlattenedItem | undefined = previousItem;
          while (previousSibling && projected.depth < previousSibling.depth) {
            const parentId: UniqueIdentifier | null = previousSibling.parentId;
            previousSibling = sortedItems.find(({ id }) => id === parentId);
          }

          if (previousSibling) {
            announcement = `${activeId} was ${movedVerb} after ${previousSibling.id}.`;
          }
        }
      }

      return announcement;
    }

    return;
  }

  const announcements: Announcements = {
    onDragStart({ active }) {
      return `Picked up ${active.id}.`;
    },
    onDragMove({ active, over }) {
      return getMovementAnnouncement("onDragMove", active.id, over?.id);
    },
    onDragOver({ active, over }) {
      return getMovementAnnouncement("onDragOver", active.id, over?.id);
    },
    onDragEnd({ active, over }) {
      return getMovementAnnouncement("onDragEnd", active.id, over?.id);
    },
    onDragCancel({ active }) {
      return `Moving was cancelled. ${active.id} was dropped in its original position.`;
    },
  };

  const dropAnimationConfig: DropAnimation = {
    keyframes({ transform }) {
      return [
        { opacity: 1, transform: CSS.Transform.toString(transform.initial) },
        {
          opacity: 0,
          transform: CSS.Transform.toString({
            ...transform.final,
            x: transform.final.x + 5,
            y: transform.final.y + 5,
          }),
        },
      ];
    },
    easing: "ease-out",
    sideEffects({ active }) {
      active.node.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: defaultDropAnimation.duration,
        easing: defaultDropAnimation.easing,
      });
    },
  };

  const adjustTranslate: Modifier = ({ transform }) => {
    return {
      ...transform,
      y: transform.y - 25,
    };
  };

  const measuring = {
    droppable: {
      strategy: MeasuringStrategy.Always,
    },
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  return {
    handleDragStart,
    handleDragMove,
    handleDragOver,
    handleDragEnd,
    adjustTranslate,
    sortedIds,
    indicator,
    activationConstraint,
    projected,
    announcements,
    activeId,
    indentationWidth,
    activeItem,
    dropAnimationConfig,
    measuring,
    sensors,
    items,
    flattenedTree,
  };
};
