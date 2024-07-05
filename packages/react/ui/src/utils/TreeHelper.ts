import { type TreeNode } from "@edifice-ui/react";
import { FOLDER, IFolder } from "edifice-ts-client";

export const TreeHelper = {
  TreeNodeFolderWrapper: class implements TreeNode {
    constructor(public readonly folder: IFolder) {
      this.id = folder.id;
      this.name = folder.name;
      this.childNumber = folder.childNumber;
    }

    public readonly id: string;
    public readonly name: string;
    public readonly childNumber: number;

    public section = false;

    public readonly children: TreeNode[] = [];
  },

  findNodeById(data: TreeNode, id: string): TreeNode | undefined {
    let res: TreeNode | undefined;
    if (data?.id === id) {
      return data;
    }
    if (data?.children?.length) {
      data?.children?.every((childNode: TreeNode) => {
        res = TreeHelper.findNodeById(childNode, id);
        return res === undefined; // break loop if res is found
      });
    }
    return res;
  },

  addNode(
    node: TreeNode,
    { parentId, newFolder }: { parentId: string; newFolder: IFolder },
  ): TreeNode {
    return TreeHelper.modifyNode(node, (node) => {
      if (node.id === parentId) {
        const parentAncestors = [
          ...((node as InstanceType<typeof TreeHelper.TreeNodeFolderWrapper>)
            .folder?.ancestors || []),
        ];
        const ancestors = TreeHelper.arrayUnique([...parentAncestors, node.id]);
        const newNode: TreeNode = {
          ...node,
          children: [
            ...(node.children || []),
            new TreeHelper.TreeNodeFolderWrapper({ ...newFolder, ancestors }),
          ],
        };
        return newNode;
      } else {
        return node;
      }
    });
  },

  arrayUnique<T>(array: T[]): T[] {
    return array.filter((item, index) => array.indexOf(item) === index);
  },

  deleteNode(node: TreeNode, { folders }: { folders: string[] }): TreeNode {
    return TreeHelper.modifyNode(node, (node) => {
      if (folders.includes(node.id)) {
        return undefined;
      } else {
        return node;
      }
    });
  },

  findParentNode(parentNode: TreeNode, childId: string): TreeNode | undefined {
    if (parentNode.children) {
      for (const child of parentNode.children) {
        if (child.id === childId) {
          return parentNode;
        }
        const foundNode = TreeHelper.findParentNode(child, childId);
        if (foundNode) {
          return foundNode;
        }
      }
    }
    return undefined;
  },

  getAncestors(data: TreeNode, folderId: string): string[] {
    const findItem = TreeHelper.findNodeById(data, folderId);
    if (findItem?.folder?.ancestors) {
      const nodes = findItem?.folder.ancestors || [];
      return [...nodes, folderId];
    } else if (folderId === FOLDER.BIN) {
      return [FOLDER.BIN];
    } else {
      return [FOLDER.DEFAULT];
    }
  },

  hasChildren(folderId: string, data: TreeNode): boolean {
    if (data.id === folderId && data.children) {
      return data.children.length > 0;
    }

    if (data.children) {
      return data.children.some((child: TreeNode) =>
        TreeHelper.hasChildren(data.id, child),
      );
    }
    return false;
  },

  modifyNode(
    data: TreeNode,
    callback: (node: TreeNode, parent?: TreeNode) => TreeNode | undefined,
  ): TreeNode {
    // root cannot be undefined
    const root = TreeHelper.doModify(data, callback) || data;
    return root;
  },

  doModify(
    current: TreeNode,
    callback: (node: TreeNode, parent?: TreeNode) => TreeNode | undefined,
    parent?: TreeNode,
  ): TreeNode | undefined {
    const result = callback(current, parent);
    if (result?.children?.length) {
      const children: TreeNode[] = [];
      for (const child of result?.children || []) {
        const res = TreeHelper.doModify(child, callback, result);
        if (res) {
          children.push(res);
        }
      }
      return { ...result!, children };
    }
    return result;
  },

  moveNode(
    node: TreeNode,
    { destinationId, folders }: { destinationId: string; folders: string[] },
  ): TreeNode {
    return TreeHelper.modifyNode(node, (node, parent) => {
      if (destinationId === node.id) {
        const parentAncestors = [
          ...((node as InstanceType<typeof TreeHelper.TreeNodeFolderWrapper>)
            .folder?.ancestors || []),
        ];
        const ancestors = TreeHelper.arrayUnique([...parentAncestors, node.id]);
        // add to new position
        const newChildren = [...(node.children || [])];
        const childrenIds = node.children?.map((child) => child.id) || [];
        for (const folder of folders) {
          // if not in children yet => move on it
          if (!childrenIds.includes(folder)) {
            const item = TreeHelper.findNodeById(node, folder);

            item &&
              newChildren.push({
                ...item,
                folder: {
                  ...item?.folder,
                  ancestors,
                },
              });
          }
        }
        const newNode: TreeNode = {
          ...node,
          children: newChildren,
        };

        return newNode;
      } else if (folders.includes(node.id) && destinationId !== parent?.id) {
        // delete from original position
        return undefined;
      } else {
        return node;
      }
    });
  },

  wrapTreeNode(
    treeNode: TreeNode,
    folders: IFolder[] | undefined,
    parentId: string,
  ) {
    return TreeHelper.modifyNode(treeNode, (node) => {
      // add missing children if needed
      if (node.id === parentId) {
        node.children = folders?.map(
          (e) => new TreeHelper.TreeNodeFolderWrapper(e),
        );
      }
      return node;
    });
  },

  updateNode(
    node: TreeNode,
    { folderId, newFolder }: { folderId: string; newFolder: IFolder },
  ): TreeNode {
    return TreeHelper.modifyNode(node, (node) => {
      if (node.id === folderId) {
        return new TreeHelper.TreeNodeFolderWrapper(newFolder);
      } else {
        return node;
      }
    });
  },
};
