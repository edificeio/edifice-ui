import { Fragment, RefAttributes, useEffect, useState } from "react";

import { TextTypo } from "@edifice-ui/icons";
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

export const EditorToolbarTypography = ({ triggerProps }: Props) => {
  const { t } = useTranslation();
  const { editor } = useEditorContext();

  const [value, setValue] = useState<string>("sans-serif");

  useEffect(() => {
    // When cursor moves in editor, update the actual text typo.
    const textStyle = editor?.getAttributes("textStyle");
    setValue(textStyle?.fontFamily ?? "");
  }, [editor, editor?.state]);

  const options = [
    {
      value: "",
      label: t("Sans-serif"),
    },
    {
      value: "Lora",
      label: t("Serif"),
      className: "ff-serif",
    },
    {
      value: "IBM Plex Mono",
      label: t("Monoscript"),
      className: "ff-script",
    },
    {
      value: "Ecriture A",
      label: t("Cursive"),
      className: "ff-cursive",
    },
    {
      value: "OpenDyslexic",
      label: t("OpenDyslexic"),
      className: "ff-dyslexic",
    },
  ];

  return (
    <>
      <IconButton
        {...triggerProps}
        type="button"
        variant="ghost"
        color="tertiary"
        icon={<TextTypo />}
        aria-label={t("Choix de la famille de typographie")}
        className={
          editor?.isActive("textStyle", {
            color: /^#([0-9a-f]{3}){1,2}$/i,
          })
            ? "selected"
            : ""
        }
      />
      <Dropdown.Menu>
        {options.map((option) => {
          return (
            <Fragment key={option.label}>
              <Dropdown.RadioItem
                value={option.value}
                model={value}
                onChange={(value: string) => {
                  if (typeof value === "string" && value.length > 0) {
                    editor?.chain().focus().setFontFamily(value).run();
                    setValue(value);
                  } else {
                    editor?.chain().focus().unsetFontFamily().run();
                    setValue("");
                  }
                }}
              >
                <span className={option.className}>{option.label}</span>
              </Dropdown.RadioItem>
            </Fragment>
          );
        })}
      </Dropdown.Menu>
    </>
  );
};
