import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";

import {
  SortAscendingLetters,
  SortDescendingLetters,
  SortTime,
} from "@edifice-ui/icons";
import clsx from "clsx";
import {
  Role,
  WorkspaceElement,
  WorkspaceSearchFilter,
} from "edifice-ts-client";
import { useTranslation } from "react-i18next";

import {
  Dropdown,
  FileCard,
  Grid,
  SearchBar,
  TreeNode,
  TreeView,
  TreeViewHandlers,
} from "../../components";
import { useWorkspaceSearch } from "../../core";
import { FolderNode } from "../../core/useWorkspaceSearch/useWorkspaceSearch";

/**
 * MediaLibrary component properties
 */
export interface WorkspaceProps {
  /**
   * Only display media elements having this role[s] (=generic file format).
   * Set to null to display all medias.
   */
  roles: Role | Role[] | null;
  /**
   * If defined, try to auto-select the folder dedicated to this filter.
   */
  defaultFolder?: WorkspaceSearchFilter;
  /**
   * Allow selecting public documents.
   */
  showPublicFolder?: boolean;
  /**
   * Notify parent when media elements are successfully selected.
   */
  onSelect: (result: WorkspaceElement[]) => void;
  /**
   * Optional class for styling purpose
   */
  className?: string;
}

const Workspace = ({
  roles,
  onSelect,
  className,
  defaultFolder,
  showPublicFolder,
}: WorkspaceProps) => {
  const { t } = useTranslation();

  const { root: ownerRoot, loadContent: loadOwnerDocs } = useWorkspaceSearch(
    "root",
    t("workspace.tree.owner"),
    "owner",
    roles,
  );
  const { root: sharedRoot, loadContent: loadSharedDocs } = useWorkspaceSearch(
    "root",
    t("workspace.tree.shared"),
    "shared",
    roles,
  );
  const { root: protectRoot, loadContent: loadProtectedDocs } =
    useWorkspaceSearch(
      "root",
      t("workspace.tree.protected"),
      "protected",
      roles,
    );
  const { root: publicRoot, loadContent: loadPublicDocs } = useWorkspaceSearch(
    "root",
    t("workspace.tree.public"),
    "public",
    roles,
  );

  const ownerRef = useRef<TreeViewHandlers>(null);
  const sharedRef = useRef<TreeViewHandlers>(null);
  const protectRef = useRef<TreeViewHandlers>(null);
  const publicRef = useRef<TreeViewHandlers>(null);

  const [currentFilter, setCurrentFilter] = useState<WorkspaceSearchFilter>(
    () => {
      // Determine which root folder to load at first.
      if ("public" === defaultFolder) {
        if (showPublicFolder) return defaultFolder;
        return "protected";
      }
      if ("protected" === defaultFolder || "shared" === defaultFolder)
        return defaultFolder;
      return "owner";
    },
  );

  const [currentNode, setCurrentNode] = useState<FolderNode>(ownerRoot);

  const [documents, setDocuments] = useState<WorkspaceElement[]>([]);

  const [searchTerm, setSearchTerm] = useState<string | undefined>(null!);

  const [sortOrder, setSortOrder] = useState<[string, string]>([
    "modified",
    "desc",
  ]);

  const [selectedDocuments, setSelectedDocuments] = useState<
    WorkspaceElement[]
  >([]);

  /**
   * Retrieve the stateful TreeNode matching a WorkspaceSearchFilter value
   */
  const rootNodeFor: (filter: WorkspaceSearchFilter) => {
    root: FolderNode;
    othersRef: React.RefObject<TreeViewHandlers>[];
  } = useCallback(
    (filter: WorkspaceSearchFilter) => {
      switch (filter) {
        case "owner":
          return {
            root: ownerRoot,
            othersRef: [sharedRef, protectRef, publicRef],
          };
        case "shared":
          return {
            root: sharedRoot,
            othersRef: [ownerRef, protectRef, publicRef],
          };
        case "protected":
          return {
            root: protectRoot,
            othersRef: [ownerRef, sharedRef, publicRef],
          };
        case "public":
          return {
            root: publicRoot,
            othersRef: [ownerRef, sharedRef, protectRef],
          };
        default:
          throw "no.root.node";
      }
    },
    [ownerRoot, sharedRoot, protectRoot, publicRoot],
  );

  /**
   * Load current node children (folders and files)
   */
  const loadContent = useCallback(() => {
    // Try to avoid loading twice
    if (
      typeof currentNode.children === "undefined" ||
      !currentNode.children.length
    ) {
      switch (currentFilter) {
        case "owner":
          loadOwnerDocs(currentNode.id);
          break;
        case "shared":
          loadSharedDocs(currentNode.id);
          break;
        case "protected":
          loadProtectedDocs(currentNode.id);
          break;
        case "public":
          loadPublicDocs(currentNode.id);
          break;
        default:
          throw "no.way";
      }
    }
  }, [
    currentFilter,
    currentNode.children,
    currentNode.id,
    loadOwnerDocs,
    loadProtectedDocs,
    loadPublicDocs,
    loadSharedDocs,
  ]);

  /**
   * Utility function to find a node in a tree.
   */
  function find(
    root: TreeNode,
    predicate: (node: TreeNode) => boolean,
  ): TreeNode | undefined {
    if (predicate(root)) return root;
    return (
      Array.isArray(root.children) &&
      root.children.find((child) => find(child, predicate))
    );
  }

  function selectAndLoadContent(filter: WorkspaceSearchFilter, nodeId: string) {
    setCurrentFilter(filter);
    const { root, othersRef } = rootNodeFor(filter);
    const targetNode = find(root, (node) => node.id === nodeId);
    if (targetNode) {
      setCurrentNode(targetNode);
      // Reset others current selection, if any
      othersRef.forEach((otherRef) => otherRef.current?.unselectAll());
    }
  }

  /** Select a tree node */
  useEffect(() => {
    let ref;
    switch (currentFilter) {
      case "owner":
        ref = ownerRef;
        break;
      case "shared":
        ref = sharedRef;
        break;
      case "protected":
        ref = protectRef;
        break;
      case "public":
        ref = publicRef;
        break;
      default:
        return;
    }
    // Selecting a tree node here will trigger a selectAndLoadContent()
    ref?.current?.select("root");
  }, [currentFilter]);

  /** Load content when the callback is updated. */
  useEffect(loadContent, [loadContent]);

  /** Display documents when currentNode or searchTerm or sortOrder changes */
  useEffect(() => {
    let list = ([] as WorkspaceElement[]).concat(currentNode.files || []);
    // Apply search terms
    if (searchTerm) {
      list = list.filter((f) => f.name.indexOf(searchTerm) >= 0);
    }
    // Apply sort order
    const sortFunction: (a: any, b: any) => number =
      sortOrder[0] === "name"
        ? sortOrder[1] === "asc"
          ? (a, b) => compare(a.name, b.name)
          : (a, b) => compare(b.name, a.name)
        : (a, b) => compare(b.modified, a.modified);

    setDocuments(() => list.sort(sortFunction));
  }, [
    currentNode,
    ownerRoot,
    protectRoot,
    sharedRoot,
    publicRoot,
    searchTerm,
    sortOrder,
  ]);

  /** Load initial content, once */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => selectAndLoadContent(currentFilter, "root"), []);

  const handleSearchChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    [setSearchTerm],
  );

  function compare(a: string, b: string) {
    if (!a) return -1;
    if (!b) return 1;
    return a.localeCompare(b);
  }

  function getSortOrderLabel() {
    return sortOrder[0] === "name"
      ? sortOrder[1] === "asc"
        ? t("sort.order.alpha.asc")
        : t("sort.order.alpha.desc")
      : t("sort.order.modify.desc");
  }

  function handleSelectDoc(doc: WorkspaceElement) {
    let currentDocuments = [...selectedDocuments];
    if (currentDocuments.includes(doc)) {
      currentDocuments = currentDocuments.filter(
        (selectedDocument) => selectedDocument._id !== doc._id,
      );
    } else {
      currentDocuments = [...currentDocuments, doc];
    }
    setSelectedDocuments(currentDocuments);
    onSelect(currentDocuments);
  }

  const workspace = clsx("workspace flex-grow-1 gap-0", className);

  return (
    <Grid className={workspace}>
      <Grid.Col
        sm="12"
        md="3"
        xl="4"
        className="workspace-folders p-12 pt-0 gap-12"
      >
        <div style={{ position: "sticky", top: 0, paddingTop: "1.2rem" }}>
          <TreeView
            ref={ownerRef}
            data={ownerRoot}
            onTreeItemSelect={(nodeId) => selectAndLoadContent("owner", nodeId)}
            onTreeItemUnfold={(nodeId) => selectAndLoadContent("owner", nodeId)}
          />
          <TreeView
            ref={sharedRef}
            data={sharedRoot}
            onTreeItemSelect={(nodeId) =>
              selectAndLoadContent("shared", nodeId)
            }
            onTreeItemUnfold={(nodeId) =>
              selectAndLoadContent("shared", nodeId)
            }
          />
          <TreeView
            ref={protectRef}
            data={protectRoot}
            onTreeItemSelect={(nodeId) =>
              selectAndLoadContent("protected", nodeId)
            }
            onTreeItemUnfold={(nodeId) =>
              selectAndLoadContent("protected", nodeId)
            }
          />
          {showPublicFolder && (
            <TreeView
              ref={publicRef}
              data={publicRoot}
              onTreeItemSelect={(nodeId) =>
                selectAndLoadContent("public", nodeId)
              }
              onTreeItemUnfold={(nodeId) =>
                selectAndLoadContent("public", nodeId)
              }
            />
          )}
        </div>
      </Grid.Col>
      <Grid.Col sm="12" md="5" xl="8">
        <Grid className="flex-grow-1 gap-0">
          <Grid.Col sm="4" md="8" xl="12">
            <div className="workspace-search px-16 py-8 ">
              <SearchBar
                isVariant={true}
                className="gap-16"
                onChange={handleSearchChange}
              />
            </div>
            <div className="d-flex align-items-center justify-content-end px-8 py-4">
              <small className="text-muted">
                {t("workspace.search.order")}
              </small>
              <Dropdown>
                <Dropdown.Trigger
                  size="sm"
                  label={getSortOrderLabel()}
                  variant="ghost"
                />
                <Dropdown.Menu>
                  <Dropdown.Item
                    icon={<SortTime />}
                    onClick={() => setSortOrder(["modified", "desc"])}
                  >
                    {t("sort.order.modify.desc")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<SortAscendingLetters />}
                    onClick={() => setSortOrder(["name", "asc"])}
                  >
                    {t("sort.order.alpha.asc")}
                  </Dropdown.Item>
                  <Dropdown.Item
                    icon={<SortDescendingLetters />}
                    onClick={() => setSortOrder(["name", "desc"])}
                  >
                    {t("sort.order.alpha.desc")}
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </Grid.Col>
          <Grid.Col sm="4" md="8" xl="12" className="p-8 gap-8">
            <div className="grid grid-workspace">
              {documents.map((doc) => {
                const isSelected = selectedDocuments.includes(doc);
                return (
                  <FileCard
                    key={doc._id}
                    doc={doc}
                    isSelected={isSelected}
                    onClick={() => handleSelectDoc(doc)}
                  />
                );
              })}
            </div>
          </Grid.Col>
        </Grid>
      </Grid.Col>
    </Grid>
  );
};
export default Workspace;
