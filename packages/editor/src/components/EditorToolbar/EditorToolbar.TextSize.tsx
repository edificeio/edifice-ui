import { Fragment, RefAttributes, useState } from "react";

import { TypoSizeLevel } from "@edifice-tiptap-extensions/extension-typosize";
import { TextSize } from "@edifice-ui/icons";
import { Dropdown, IconButton, IconButtonProps } from "@edifice-ui/react";
import { useTranslation } from "react-i18next";

import { useEditorContext } from "../../hooks/useEditorContext";

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

  const [size, setSize] = useState<TypoSizeLevel>();

  /* FIXME
  useEffect(() => {
    // When cursor moves in editor, update the text values.
    const textStyle = editor?.getAttributes("textStyle");
    // TODO setSize( ?? 5);
  }, [editor, editor?.state]);
  */

  const sizes = [
    {
      value: "2",
      label: t("Titre 1"),
      className: "fs-2 fw-bold",
    },
    {
      value: "3",
      label: t("Titre 2"),
      className: "fs-3 fw-bold",
    },
    {
      value: "4",
      label: t("Texte grand"),
      className: "fs-4",
    },
    {
      value: "5",
      label: t("Texte normal"),
    },
    {
      value: "6",
      label: t("Texte petit"),
      className: "fs-6",
    },
  ];

  return (
    <>
      <IconButton
        {...triggerProps}
        type="button"
        variant="ghost"
        color="tertiary"
        icon={<TextSize />}
        aria-label={t("Choix de la taille de typographie")}
      />
      <Dropdown.Menu>
        {sizes.map(({ value, label, className }) => {
          return (
            <Fragment key={value}>
              <Dropdown.RadioItem
                value={value}
                model={`${size}`}
                onChange={(newValue: string) => {
                  const level = parseInt(newValue) as TypoSizeLevel;
                  editor?.chain().focus().toggleTypoSize({ level }).run();
                  setSize(level);
                }}
              >
                <span className={className}>{label}</span>
              </Dropdown.RadioItem>
            </Fragment>
          );
        })}
      </Dropdown.Menu>
    </>
  );
};
