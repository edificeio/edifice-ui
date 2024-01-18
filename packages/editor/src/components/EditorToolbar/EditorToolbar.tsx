import { RefAttributes, RefObject, useMemo } from "react";

import {
  AlignLeft,
  Paperclip,
  Landscape,
  Link,
  Mic,
  RecordVideo,
  TextBold,
  TextItalic,
  TextUnderline,
  SpeechToText,
  BulletList,
} from "@edifice-ui/icons";
import {
  ToolbarItem,
  IconButtonProps,
  MediaLibraryRef,
  Toolbar,
} from "@edifice-ui/react";
import { useTranslation } from "react-i18next";

import { EditorToolbarDropdownMenu } from "./EditorToolbar.DropdownMenu";
import { EditorToolbarEmoji } from "./EditorToolbar.Emoji";
import { EditorToolbarHighlightColor } from "./EditorToolbar.HighlightColor";
import { EditorToolbarPlusMenu } from "./EditorToolbar.PlusMenu";
import { EditorToolbarTextColor } from "./EditorToolbar.TextColor";
import { EditorToolbarTextSize } from "./EditorToolbar.TextSize";
import { EditorToolbarTypography } from "./EditorToolbar.Typography";
import {
  useActionOptions,
  useEditorContext,
  useSpeechRecognition,
} from "../..";
import { hasExtension } from "../../utils/has-extension";
import { hasMark } from "../../utils/has-mark";
import { hasTextStyle } from "../../utils/has-text-style";

interface Props {
  /** Ref to a MediaLibrary instance */
  mediaLibraryRef: RefObject<MediaLibraryRef>;
  /** API to open/close a Math modal. */
  toggleMathsModal: Function;
}

export const EditorToolbar = ({ mediaLibraryRef, toggleMathsModal }: Props) => {
  const { t } = useTranslation();
  const { editor } = useEditorContext();

  const [plusOptions, listOptions, alignmentOptions] = useActionOptions(
    editor,
    toggleMathsModal,
    mediaLibraryRef,
  );

  const {
    isAvailable: canRecognizeSpeech,
    isActive: speechRecognition,
    toggle: toggleSpeechRecognition,
  } = useSpeechRecognition(editor);

  const toolbarItems: ToolbarItem[] = useMemo(() => {
    const showIf = (truthy: boolean) => (truthy ? "show" : "hide");

    return [
      //--------------- IMAGE ---------------//
      {
        type: "icon",
        props: {
          icon: <Landscape />,
          className: "bg-green-200",
          "aria-label": t("tiptap.toolbar.picture"),
          onClick: () => mediaLibraryRef.current?.show("image"),
        },
        name: "image",
      },
      //--------------- VIDEO ---------------//
      {
        type: "icon",
        props: {
          icon: <RecordVideo />,
          className: "bg-purple-200",
          "aria-label": t("tiptap.toolbar.video"),
          onClick: () => mediaLibraryRef.current?.show("video"),
        },
        name: "video",
      },
      //--------------- AUDIO ---------------//
      {
        type: "icon",
        props: {
          icon: <Mic />,
          className: "bg-red-200",
          "aria-label": t("tiptap.toolbar.audio"),
          onClick: () => mediaLibraryRef.current?.show("audio"),
        },
        name: "audio",
      },
      //--------------- ATTACHMENT ---------------//
      {
        type: "icon",
        props: {
          icon: <Paperclip />,
          className: "bg-yellow-200",
          "aria-label": t("tiptap.toolbar.attachment"),
          onClick: () => mediaLibraryRef.current?.show("attachment"),
        },
        name: "attachment",
      },
      //-------------------------------------//
      {
        type: "divider",
        name: "div-1",
      },
      //--------------- SPEECH TO TEXT ---------------//
      {
        type: "icon",
        props: {
          icon: <SpeechToText />,
          "aria-label": t("tiptap.toolbar.stt"),
          className: speechRecognition ? "is-selected" : "",
          onClick: () => toggleSpeechRecognition(),
        },
        visibility: canRecognizeSpeech ? "show" : "hide",
        name: "speechtotext",
      },
      //------------------------------------//
      {
        type: "divider",
        name: "div-speech",
        visibility: canRecognizeSpeech ? "show" : "hide",
      },
      //--------------- TYPOGRAPHY ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
          ) => <EditorToolbarTypography triggerProps={triggerProps} />,
        },
        name: "text_typo",
        visibility: showIf(hasExtension("fontFamily", editor)),
      },
      //--------------- TEXT SIZE ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
          ) => <EditorToolbarTextSize triggerProps={triggerProps} />,
        },
        name: "text_size",
        visibility: showIf(
          hasExtension("fontSize", editor) ||
            hasExtension("customHeading", editor),
        ),
      },
      //--------------- TEXT COLOR ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
            itemRefs: any,
          ) => (
            <EditorToolbarTextColor
              triggerProps={triggerProps}
              itemRefs={itemRefs}
            />
          ),
        },
        overflow: false,
        name: "color",
        visibility: hasTextStyle("color", editor) ? "show" : "hide",
      },
      //--------------- TEXT HIGHLIGHTING COLOR ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
            itemRefs: any,
          ) => (
            <EditorToolbarHighlightColor
              triggerProps={triggerProps}
              itemRefs={itemRefs}
            />
          ),
        },
        name: "highlight",
        visibility: showIf(hasMark("highlight", editor)),
      },
      //-------------------------------------//
      {
        type: "divider",
        name: "div-2",
      },
      //--------------- BOLD ---------------//
      {
        type: "icon",
        props: {
          icon: <TextBold />,
          "aria-label": t("tiptap.toolbar.bold"),
          className: editor?.isActive("bold") ? "is-selected" : "",
          onClick: () => editor?.chain().focus().toggleBold().run(),
        },
        name: "bold",
        visibility: showIf(hasMark("bold", editor)),
      },
      //--------------- ITALIC ---------------//
      {
        type: "icon",
        props: {
          icon: <TextItalic />,
          "aria-label": t("tiptap.toolbar.italic"),
          className: editor?.isActive("italic") ? "is-selected" : "",
          onClick: () => editor?.chain().focus().toggleItalic().run(),
        },
        name: "italic",
        visibility: showIf(hasMark("italic", editor)),
      },
      //--------------- UNDERLINE ---------------//
      {
        type: "icon",
        props: {
          icon: <TextUnderline />,
          "aria-label": t("tiptap.toolbar.underline"),
          className: editor?.isActive("underline") ? "is-selected" : "",
          onClick: () => editor?.chain().focus().toggleUnderline().run(),
        },
        name: "underline",
        visibility: showIf(hasMark("underline", editor)),
      },
      //-------------------------------------//
      {
        type: "divider",
        name: "div-3",
      },
      //--------------- EMOJI ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
            itemRefs: any,
          ) => (
            <EditorToolbarEmoji
              triggerProps={triggerProps}
              itemRefs={itemRefs}
            />
          ),
        },
        name: "emoji",
      },
      //--------------- LINKER (internal / external) ---------------//
      {
        type: "icon",
        props: {
          icon: <Link />,
          "aria-label": t("tiptap.toolbar.linker"),
          className: editor?.isActive("linker") ? "is-selected" : "",
          onClick: () => mediaLibraryRef.current?.show("hyperlink"),
        },
        name: "linker",
      },
      //-----------------------------------//
      {
        type: "divider",
        name: "div-4",
      },
      //--------------- LIST MENU ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
          ) => (
            <EditorToolbarDropdownMenu
              triggerProps={triggerProps}
              icon={<BulletList />}
              ariaLabel={t("tiptap.toolbar.listoptions")}
              options={listOptions}
            />
          ),
        },
        name: "list",
        visibility: showIf(hasExtension("starterKit", editor)),
      },
      //--------------- TEXT ALIGNMENT ---------------//
      {
        type: "dropdown",
        props: {
          children: (
            triggerProps: JSX.IntrinsicAttributes &
              Omit<IconButtonProps, "ref"> &
              RefAttributes<HTMLButtonElement>,
          ) => (
            <EditorToolbarDropdownMenu
              triggerProps={triggerProps}
              icon={<AlignLeft />}
              ariaLabel={t("tiptap.toolbar.align")}
              options={alignmentOptions}
            />
          ),
        },
        name: "alignment",
        visibility: showIf(hasExtension("textAlign", editor)),
      },
      //-------------------------------------//
      {
        type: "divider",
        name: "div-5",
      },
      //--------------- MORE sub-menu ---------------//
      {
        type: "dropdown",
        props: {
          children: () => <EditorToolbarPlusMenu options={plusOptions} />,
        },
        name: "plus",
        visibility: showIf(hasExtension("textAlign", editor)),
      },
    ];
  }, [
    alignmentOptions,
    canRecognizeSpeech,
    editor,
    listOptions,
    mediaLibraryRef,
    plusOptions,
    speechRecognition,
    t,
    toggleSpeechRecognition,
  ]);

  return (
    <Toolbar
      items={toolbarItems}
      variant="no-shadow"
      className="rounded-top"
      isBlock
      align="left"
      ariaControls="editorContent"
    />
  );
};
