import { Bookmark, Close, RafterDown, Users } from "@edifice-ui/icons";
import {
  ShareRight,
  ShareRightAction,
  ShareRightActionDisplayName,
  ShareRightWithVisibles,
} from "edifice-ts-client";
import { useTranslation } from "react-i18next";

import { Avatar, Button, Checkbox, IconButton } from "../../components";
import { hasRight } from "./utils/hasRight";
import { showShareRightLine } from "./utils/showShareRightLine";

export const ShareBookmarkLine = ({
  shareRights,
  showBookmark,
  toggleBookmark,
  shareRightActions,
  toggleRight,
  onDeleteRow,
}: {
  shareRights: ShareRightWithVisibles;
  shareRightActions: ShareRightAction[];
  showBookmark: boolean;
  toggleRight: (
    shareRight: ShareRight,
    actionName: ShareRightActionDisplayName,
  ) => void;
  toggleBookmark: () => void;
  onDeleteRow: (shareRight: ShareRight) => void;
}) => {
  const { t } = useTranslation();

  return shareRights?.rights.map((shareRight: ShareRight) => {
    const avatarMapping = {
      user: (
        <Avatar
          alt={t("explorer.modal.share.avatar.shared.alt")}
          size="xs"
          src={shareRight.avatarUrl}
          variant="circle"
        />
      ),
      group: (
        <div className="avatar-xs bg-primary-200 justify-content-center d-flex rounded-circle">
          <Users width={16} />
        </div>
      ),
      sharebookmark: <Bookmark />,
    };

    const selectedAvatar = avatarMapping[shareRight.type] || null;

    return (
      showShareRightLine(shareRight, showBookmark) && (
        <tr
          key={shareRight.id}
          className={shareRight.isBookmarkMember ? "bg-light" : ""}
        >
          <td>{selectedAvatar}</td>
          <td>
            <div className="d-flex">
              {shareRight.type === "sharebookmark" && (
                <Button
                  color="tertiary"
                  rightIcon={
                    <RafterDown
                      title={t("show")}
                      className="w-16 min-w-0"
                      style={{
                        transition: "rotate 0.2s ease-out",
                        rotate: showBookmark ? "-180deg" : "0deg",
                      }}
                    />
                  }
                  type="button"
                  variant="ghost"
                  className="fw-normal ps-0"
                  onClick={toggleBookmark}
                >
                  {shareRight.displayName}
                </Button>
              )}
              {shareRight.type !== "sharebookmark" && shareRight.displayName}
              {shareRight.type === "user" &&
                ` (${t(shareRight.profile || "")})`}
            </div>
          </td>
          {shareRightActions.map((shareRightAction) => (
            <td
              key={shareRightAction.displayName}
              style={{ width: "80px" }}
              className="text-center text-white"
            >
              <Checkbox
                checked={hasRight(shareRight, shareRightAction)}
                onChange={() => toggleRight(shareRight, shareRightAction.id)}
              />
            </td>
          ))}
          <td>
            {!shareRight.isBookmarkMember && (
              <IconButton
                aria-label={t("close")}
                color="tertiary"
                icon={<Close />}
                type="button"
                variant="ghost"
                title={t("close")}
                onClick={() => onDeleteRow(shareRight)}
              />
            )}
          </td>
        </tr>
      )
    );
  });
};
