import { Folder, RafterRight } from "@edifice-ui/icons";
import clsx from "clsx";
import { forwardRef, Ref } from "react";
import { useTranslation } from "react-i18next";
import { TreeNodeProps, TreeProps } from "./types/types";
import { useTreeView } from "./hooks/useTreeView";

const Tree = ({
  nodes,
  selectedNodeId: externalSelectedNodeId,
  showIcon = false,
  shouldExpandAllNodes = false,
  draggedNode,
  onTreeItemFold,
  onTreeItemUnfold,
  onTreeItemClick,
  renderNode,
}: TreeProps) => {
  const { selectedNodeId, expandedNodes, handleItemClick, handleFoldUnfold } =
    useTreeView({
      data: nodes,
      externalSelectedNodeId,
      draggedNode,
      shouldExpandAllNodes,
      onTreeItemClick,
      onTreeItemFold,
      onTreeItemUnfold,
    });

  return (
    <div className="treeview">
      <ul role="tree" className="m-0 p-0">
      {Array.isArray(nodes) &&
          nodes.map((node) => (
            <TreeNode
              node={node}
              key={node.id}
              showIcon={showIcon}
              expandedNodes={expandedNodes}
              selectedNodeId={selectedNodeId}
              onTreeItemClick={handleItemClick}
              onToggleNode={handleFoldUnfold}
              renderNode={renderNode}
            />
          ))}
      </ul>
    </div>
  );
};

export const TreeNode = forwardRef(
  (
    {
      node,
      selectedNodeId,
      showIcon = false,
      expandedNodes,
      focused,
      renderNode,
      onTreeItemClick,
      onToggleNode,
      ...restProps
    }: TreeNodeProps,
    ref: Ref<HTMLLIElement>,
  ) => {
    const { t } = useTranslation();

    const selected = selectedNodeId === node.id;
    const expanded = expandedNodes.has(node.id);

    const treeItemClasses = {
      action: clsx("action-container d-flex align-items-center gap-8 px-2", {
        "drag-focus": focused,
        "py-4": !node.section,
      }),
      arrow: clsx({
        "py-4": !node.section,
        "py-8": node.section,
        "invisible":
          !Array.isArray(node.children) || node.children.length === 0,
      }),
      button: clsx("flex-fill d-flex align-items-center text-truncate gap-8", {
        "py-8": node.section,
      }),
    };

    const handleItemKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        event.stopPropagation();

        onTreeItemClick?.(node.id);
      }
    };

    const handleItemToggleKeyDown = (
      event: React.KeyboardEvent<HTMLDivElement>,
    ) => {
      if (event.code === "Enter" || event.code === "Space") {
        event.preventDefault();
        event.stopPropagation();

        onToggleNode?.(node.id);
      }
    };

    return (
      <li
        {...restProps}
        ref={ref}
        key={node.id}
        id={`treeitem-${node.id}`}
        role="treeitem"
        aria-selected={selected}
        aria-expanded={expanded}
      >
        <div>
          <div className={treeItemClasses.action}>
            {node.children && node.children.length > 0 ? (
              <div
                className={treeItemClasses.arrow}
                tabIndex={0}
                role="button"
                onClick={() => onToggleNode?.(node.id)}
                onKeyDown={handleItemToggleKeyDown}
                aria-label={t("foldUnfold")}
              >
                <RafterRight
                  width={16}
                  style={{
                    transform: expanded ? "rotate(90deg)" : "",
                  }}
                />
              </div>
            ) : (
              <div className="py-8 invisible"></div>
            )}

            {node.children && showIcon ? (
              <Folder title="folder" width={20} height={20} />
            ) : null}

            <div
              tabIndex={0}
              role="button"
              className={treeItemClasses.button}
              onClick={() => onTreeItemClick(node.id)}
              onKeyDown={handleItemKeyDown}
            >
              {renderNode ? (
                renderNode({
                  nodeId: node.id,
                  nodeName: node.name,
                  hasChildren:
                    Array.isArray(node.children) && !!node.children.length,
                })
              ) : (
                <div className="text-truncate">{node.name}</div>
              )}
            </div>
          </div>

          {expanded && node.children && !!node.children.length && (
            <ul role="group">
              {node.children?.map((node) => (
                <TreeNode
                  {...restProps}
                  ref={ref}
                  node={node}
                  key={node.id}
                  showIcon={showIcon}
                  selectedNodeId={selectedNodeId}
                  expandedNodes={expandedNodes}
                  onTreeItemClick={onTreeItemClick}
                  onToggleNode={onToggleNode}
                  renderNode={renderNode}
                />
              ))}
            </ul>
          )}
        </div>
      </li>
    );
  },
);

Tree.displayName = "Tree";

export default Tree;
