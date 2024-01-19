import { useEffect } from "react";

// Import TipTap module overloaded typings (custom commands)
import "@edifice-tiptap-extensions/extension-audio";
import "@edifice-tiptap-extensions/extension-image";
import "@edifice-tiptap-extensions/extension-video";

import { Alert } from "@edifice-tiptap-extensions/extension-alert";
import { FontSize } from "@edifice-tiptap-extensions/extension-font-size";
import { CustomHeading } from "@edifice-tiptap-extensions/extension-heading";
import { Hyperlink } from "@edifice-tiptap-extensions/extension-hyperlink";
import { Iframe } from "@edifice-tiptap-extensions/extension-iframe";
import { SpeechRecognition } from "@edifice-tiptap-extensions/extension-speechrecognition";
import { SpeechSynthesis } from "@edifice-tiptap-extensions/extension-speechsynthesis";
import { TableCell } from "@edifice-tiptap-extensions/extension-table-cell";
import { useOdeClient } from "@edifice-ui/react";
import Color from "@tiptap/extension-color";
import Focus from "@tiptap/extension-focus";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Subscript from "@tiptap/extension-subscript";
import Superscript from "@tiptap/extension-superscript";
import Table from "@tiptap/extension-table";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import Typography from "@tiptap/extension-typography";
import Underline from "@tiptap/extension-underline";
import { Content, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Mathematics } from "@tiptap-pro/extension-mathematics";

import {
  AttachmentNodeView,
  AttachmentRenderer,
  AudioNodeView,
  AudioRenderer,
  ImageNodeView,
  LinkerNodeView,
  LinkerRenderer,
  MediaRenderer,
  VideoNodeView,
} from "../components";

/**
 * Hook that creates a tiptap editor instance,
 * and a function to add rich content from the MediaLibrary.
 *
 * @param isEditable truthy if the editor content should be editable
 * @param content default rich content
 */
export const useTipTapEditor = (editable: boolean, content: Content) => {
  const { currentLanguage } = useOdeClient();

  const editor = useEditor({
    editable,
    extensions: [
      StarterKit,
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      TextStyle,
      Color,
      Focus.configure({
        className: "has-focus",
        mode: "all",
      }),
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      CustomHeading.configure({
        levels: [1, 2],
      }),
      Typography,
      FontSize,
      SpeechRecognition,
      SpeechSynthesis.configure({
        lang:
          currentLanguage?.length === 2
            ? `${currentLanguage}-${currentLanguage.toUpperCase()}` // FIXME very dirty hack for demo
            : "fr-FR",
      }),
      Iframe,
      Hyperlink,
      FontFamily,
      Mathematics,
      Alert,
      VideoNodeView(MediaRenderer),
      AudioNodeView(AudioRenderer),
      ImageNodeView(MediaRenderer),
      LinkerNodeView(LinkerRenderer),
      AttachmentNodeView(AttachmentRenderer),
    ],
    content,
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);

  useEffect(() => {
    editor?.commands.setContent(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  return { editor, editable };
};
