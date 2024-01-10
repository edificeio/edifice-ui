import { RefObject } from "react";

import {
  TextVanilla,
  Superscript,
  Subscript,
  SquareRoot,
  Code,
  Table,
  BulletList,
  OrderedList,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
} from "@edifice-ui/icons";
import { DropdownMenuOptions, MediaLibraryRef } from "@edifice-ui/react";
import { Editor } from "@tiptap/react";
import { useTranslation } from "react-i18next";

export const useActionOptions = (
  editor: Editor | null,
  toggleMathsModal: Function,
  mediaLibraryRef: RefObject<MediaLibraryRef>,
) => {
  const { t } = useTranslation();
  const options: DropdownMenuOptions[] = [
    {
      icon: <TextVanilla />,
      label: t("Supprimer la mise en forme"),
      action: () => editor?.chain().clearNodes().unsetAllMarks().run(),
    },
    {
      type: "divider",
    },
    {
      icon: <Table />,
      label: t("Tableau"),
      action: () =>
        editor
          ?.chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    },
    {
      type: "divider",
    },
    {
      icon: <Superscript />,
      label: t("Exposant"),
      action: () => editor?.chain().focus().toggleSuperscript().run(),
    },
    {
      icon: <Subscript />,
      label: t("Indice"),
      action: () => editor?.chain().focus().toggleSubscript().run(),
    },
    {
      icon: <SquareRoot />,
      label: t("Formule mathématique"),
      action: () => {
        toggleMathsModal();
      },
    },
    {
      type: "divider",
    },
    {
      icon: <Code />,
      label: t("Élément embed/iframe"),
      action: () => mediaLibraryRef.current?.show("embedder"),
    },
  ];
  const listOptions: DropdownMenuOptions[] = [
    {
      icon: <BulletList />,
      label: t("Liste à puce"),
      action: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <OrderedList />,
      label: t("Liste numérotée"),
      action: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];
  const alignmentOptions: DropdownMenuOptions[] = [
    {
      icon: <AlignLeft />,
      label: t("Aligner à gauche"),
      action: () => editor?.chain().focus().setTextAlign("left").run(),
    },
    {
      icon: <AlignCenter />,
      label: t("Aligner au centre"),
      action: () => editor?.chain().focus().setTextAlign("center").run(),
    },
    {
      icon: <AlignRight />,
      label: t("Aligner à droite"),
      action: () => editor?.chain().focus().setTextAlign("right").run(),
    },
    {
      icon: <AlignJustify />,
      label: t("Justifier"),
      action: () => editor?.chain().focus().setTextAlign("justify").run(),
    },
  ];
  return [options, listOptions, alignmentOptions];
};
