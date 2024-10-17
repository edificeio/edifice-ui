import { useEffect } from 'react';

// Import TipTap module overloaded typings (custom commands)
import '@edifice.io/tiptap-extensions';

import { useOdeClient } from '@edifice.io/react';
import {
  Alert,
  CustomHeading,
  CustomHighlight,
  FontSize,
  Hyperlink,
  Iframe,
  SpeechRecognition,
  SpeechSynthesis,
  TableCell,
} from '@edifice.io/tiptap-extensions';
import { Mathematics } from '@tiptap-pro/extension-mathematics';
import Color from '@tiptap/extension-color';
import Focus from '@tiptap/extension-focus';
import FontFamily from '@tiptap/extension-font-family';
import Placeholder from '@tiptap/extension-placeholder';
import Subscript from '@tiptap/extension-subscript';
import Superscript from '@tiptap/extension-superscript';
import Table from '@tiptap/extension-table';
import TableHeader from '@tiptap/extension-table-header';
import TableRow from '@tiptap/extension-table-row';
import TextAlign from '@tiptap/extension-text-align';
import TextStyle from '@tiptap/extension-text-style';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import { Content, FocusPosition, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useTranslation } from 'react-i18next';

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
} from '../components';

/**
 * Hook that creates a tiptap editor instance.
 *
 * @param editable truthy if the editor content should be editable
 * @param content default rich content
 * @param focus set focus position to the editor
 * @param placeholder editor placeholder content
 */
export const useTipTapEditor = (
  editable: boolean,
  content: Content,
  focus?: FocusPosition,
  placeholder?: string,
  onContentChange?: ({ editor }: { editor: any }) => void,
) => {
  const { currentLanguage } = useOdeClient();
  const { t } = useTranslation();

  const editor = useEditor({
    // fix WB-2534
    // TipTap editor must be instantiated in editable mode for table columns to be resizable.
    // It will then be set in the correct editable mode, by a useEffect below.
    editable: true,
    extensions: [
      StarterKit,
      Focus.configure({
        className: 'has-focus',
        mode: 'all',
      }),
      Placeholder.configure({
        placeholder: t(placeholder || 'tiptap.placeholder'),
      }),
      CustomHighlight.configure({
        multicolor: true,
      }),
      Underline,
      TextStyle,
      Color,
      Subscript,
      Superscript,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      TextAlign.configure({
        types: ['heading', 'paragraph', 'custom-image', 'video'],
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
            : 'fr-FR',
      }),
      Iframe,
      Hyperlink,
      FontFamily,
      Mathematics,
      Alert,
      VideoNodeView(MediaRenderer),
      AudioNodeView(AudioRenderer),
      LinkerNodeView(LinkerRenderer),
      ImageNodeView(MediaRenderer),
      AttachmentNodeView(AttachmentRenderer),
    ],
    content,
    // If the onContentChange callback is provided, we call it on every content change.
    ...(onContentChange
      ? {
          onUpdate: onContentChange,
        }
      : {}),
  });

  useEffect(() => {
    editor?.setEditable(editable);
  }, [editor, editable]);

  useEffect(() => {
    editor?.commands.setContent(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content]);

  useEffect(() => {
    focus && editor?.commands.focus(focus);
  }, [editor, focus, editable]);

  return { editor, editable };
};
