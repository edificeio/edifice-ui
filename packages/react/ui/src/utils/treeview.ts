import { FOLDER } from "edifice-ts-client";
import { TreeData } from "../types";

export function findNodeById(
  data: TreeData,
  nodeId: string | undefined,
): TreeData | undefined {
  let res: TreeData | undefined;

  if (!nodeId) return;

  if (data?.id === nodeId) {
    return data;
  }
  if (data?.children?.length) {
    data?.children?.every((childNode: TreeData) => {
      res = findNodeById(childNode, nodeId);
      return res === undefined;
    });
  }
  return res;
}

export function getAncestors(data: TreeData, nodeId: string): string[] {
  const findItem = findNodeById(data, nodeId);
  if (findItem?.folder?.ancestors) {
    const nodes = findItem?.folder.ancestors || [];
    return [...nodes, nodeId];
  } else {
    return [FOLDER.DEFAULT];
  }
}

export function findPathById(tree: TreeData, nodeId: string) {
  let path: string[] = [];

  function traverse(node: TreeData, currentPath: string[]) {
    if (node.id === nodeId) {
      path = currentPath.concat(node.id);
      return true;
    }
    if (node.children) {
      for (const child of node.children) {
        if (traverse(child, currentPath.concat(node.id))) {
          return true;
        }
      }
    }
    return false;
  }

  traverse(tree, []);
  return path;
}
