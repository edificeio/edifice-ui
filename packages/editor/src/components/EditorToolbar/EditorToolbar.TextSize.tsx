import { Fragment, RefAttributes } from "react";

import { TextSize } from "@edifice-ui/icons";
import { Dropdown, IconButton, IconButtonProps } from "@edifice-ui/react";
import { useTranslation } from "react-i18next";

import { useEditorContext } from "../../hooks/useEditorContext";
import { hasExtension } from "../../utils/has-extension";

interface Props {
  /**
   * Props for the trigger
   */
  triggerProps: JSX.IntrinsicAttributes &
    Omit<IconButtonProps, "ref"> &
    RefAttributes<HTMLButtonElement>;
}

export const EditorToolbarTextSize = ({ triggerProps }: Props) => {
  const { t } = useTranslation();
  const { editor } = useEditorContext();

  const textOptions = [
    {
      label: t("tiptap.toolbar.size.h1"),
      className: "fs-2 fw-bold text-secondary",
      action: () =>
        editor?.chain().focus().setCustomHeading({ level: 1 }).run(),
      visibility: hasExtension("customHeading", editor),
    },
    {
      label: t("tiptap.toolbar.size.h2"),
      className: "fs-3 fw-bold text-secondary",
      action: () =>
        editor?.chain().focus().setCustomHeading({ level: 2 }).run(),
      visibility: hasExtension("customHeading", editor),
    },
    {
      type: "divider",
      visibility:
        hasExtension("customHeading", editor) &&
        hasExtension("fontSize", editor),
    },
    {
      label: t("tiptap.toolbar.size.big"),
      className: "fs-4",
      action: () =>
        editor?.chain().focus().setParagraph().setFontSize("18px").run(),
      visibility: hasExtension("fontSize", editor),
    },
    {
      label: t("tiptap.toolbar.size.normal"),
      action: () =>
        editor?.chain().focus().setParagraph().setFontSize("16px").run(),
      visibility: hasExtension("fontSize", editor),
    },
    {
      label: t("tiptap.toolbar.size.small"),
      className: "fs-6",
      action: () =>
        editor?.chain().focus().setParagraph().setFontSize("14px").run(),
      visibility: hasExtension("fontSize", editor),
    },
  ];

  console.log(hasExtension("customHeading", editor));

  return (
    <>
      <IconButton
        {...triggerProps}
        type="button"
        variant="ghost"
        color="tertiary"
        icon={<TextSize />}
        aria-label={t("tiptap.toolbar.size.choice")}
      />
      <Dropdown.Menu>
        {textOptions.map((option) => {
          return (
            <Fragment key={option.label}>
              {option.type === "divider" && option.visibility ? (
                <Dropdown.Separator />
              ) : option.visibility ? (
                <Dropdown.Item onClick={option.action}>
                  <span className={option.className}>{option.label}</span>
                </Dropdown.Item>
              ) : null}
            </Fragment>
          );
        })}
      </Dropdown.Menu>
    </>
  );
};
