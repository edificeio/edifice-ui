import { Active, Over, UniqueIdentifier } from '@dnd-kit/core';
import { FlattenedItem, Projected, TreeItem } from '../types/types';

export function getDragDepth(offset: number, indentationWidth: number) {
  return Math.round(offset / indentationWidth);
}

function getSubtreeIndices(
  flattenedTree: FlattenedItem[],
  activeIndex: number
) {
  const indices = [activeIndex];
  const nodeIds = [flattenedTree[activeIndex].id];

  for (let i = activeIndex + 1; i < flattenedTree.length; i++) {
    const item = flattenedTree[i];
    if (item.parentId) {
      if (nodeIds.includes(item.parentId)) {
        indices.push(i);
        nodeIds.push(item.id);
      }
    }
  }

  return indices;
}

export function determineNewParentId(
  active: Active,
  over: Over | null,
  activeNode: FlattenedItem,
  overNode: FlattenedItem | null,
  projected: Projected
): string | null | undefined {
  if (projected && (projected.depth === 0 || projected.depth === 1)) {
    return projected.parentId;
  } else if (active.id !== over?.id && overNode) {
    return overNode.parentId === activeNode.parentId
      ? activeNode.parentId
      : overNode.parentId;
  }
  return undefined;
}

export function getActiveAndOverNodes(
  tree: FlattenedItem[],
  activeId: UniqueIdentifier,
  overId?: UniqueIdentifier | undefined
) {
  const activeNodeIndex = tree.findIndex(({ id }) => id === activeId);
  const overNodeIndex = overId ? tree.findIndex(({ id }) => id === overId) : -1;
  const activeNode = tree[activeNodeIndex];
  const overNode = overNodeIndex !== -1 ? tree[overNodeIndex] : null;

  return { activeNode, activeNodeIndex, overNode, overNodeIndex };
}

export function getIndicesToUpdate(
  activeNode: FlattenedItem,
  activeNodeIndex: number,
  flattenedTree: FlattenedItem[],
  projected: Projected
): number[] {
  if (
    activeNode.children &&
    activeNode.children.length > 0 &&
    projected?.depth === 1
  ) {
    return getSubtreeIndices(flattenedTree, activeNodeIndex);
  } else {
    return [activeNodeIndex];
  }
}

export function flattenTree(
  tree: TreeItem[],
  parentId: string | null,
  depth = 0
): FlattenedItem[] {
  return tree.reduce((acc, node) => {
    acc.push({
      id: node.id,
      name: node.name,
      parentId: parentId ?? null,
      position: node.position ?? undefined,
      depth: depth ?? 0,
      children: node.children,
    });

    if (node.children && node.children.length > 0) {
      acc = acc.concat(flattenTree(node.children, node.id, depth + 1));
    }

    return acc;
  }, [] as FlattenedItem[]);
}

export function updateParentIds(
  flattenedTree: any[],
  indices: number[],
  newParentId: string | null | undefined
) {
  indices.forEach((index) => {
    flattenedTree[index] = {
      ...flattenedTree[index],
      parentId: newParentId,
    };
  });
}

export function findItemIndexInTree(
  tree: any[],
  itemId: string
): number | null {
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.id === itemId) {
      return i;
    }
    if (node.children && node.children.length > 0) {
      const result = findItemIndexInTree(node.children, itemId);
      if (result) {
        return result;
      }
    }
  }
  return 0;
}

export function generateUpdateData(updatedFlattenedTree: FlattenedItem[]) {
  const updateArray = updatedFlattenedTree.map((item, index) => {
    item.position = index;
    return {
      _id: item.id,
      position: index,
      parentId: item.parentId ?? undefined,
    };
  });

  return { updateArray, updatedTreeData: updatedFlattenedTree };
}
