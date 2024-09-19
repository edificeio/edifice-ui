import { RefObject } from 'react';

import { Editor } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
import { DropdownMenuOptions, Icon, MediaLibraryRef } from '../../..';

export const useActionOptions = (
  editor: Editor | null,
  toggleMathsModal: Function,
  mediaLibraryRef: RefObject<MediaLibraryRef>,
) => {
  const { t } = useTranslation();
  const options: DropdownMenuOptions[] = [
    {
      icon: <Icon name="text-vanilla" />,
      label: t('tiptap.toolbar.removeFormat'),
      action: () => editor?.chain().clearNodes().unsetAllMarks().run(),
    },
    {
      type: 'divider',
    },
    {
      icon: <Icon name="table" />,
      label: t('tiptap.toolbar.table'),
      action: () =>
        editor
          ?.chain()
          .focus()
          .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
          .run(),
    },
    {
      type: 'divider',
    },
    {
      icon: <Icon name="superscript" />,
      label: t('tiptap.toolbar.superscript'),
      action: () => editor?.chain().focus().toggleSuperscript().run(),
    },
    {
      icon: <Icon name="subscript" />,
      label: t('tiptap.toolbar.subscript'),
      action: () => editor?.chain().focus().toggleSubscript().run(),
    },
    {
      icon: <Icon name="square-root" />,
      label: t('tiptap.toolbar.mathjax'),
      action: () => {
        toggleMathsModal();
      },
    },
    {
      type: 'divider',
    },
    {
      icon: <Icon name="code" />,
      label: t('tiptap.toolbar.embed.iframe'),
      action: () => mediaLibraryRef.current?.show('embedder'),
    },
  ];
  const listOptions: DropdownMenuOptions[] = [
    {
      icon: <Icon name="bullet-list" />,
      label: t('tiptap.toolbar.ulist'),
      action: () => editor?.chain().focus().toggleBulletList().run(),
    },
    {
      icon: <Icon name="ordered-list" />,
      label: t('tiptap.toolbar.olist'),
      action: () => editor?.chain().focus().toggleOrderedList().run(),
    },
  ];
  const alignmentOptions: DropdownMenuOptions[] = [
    {
      icon: <Icon name="align-left" />,
      label: t('tiptap.toolbar.text.left'),
      action: () => editor?.chain().focus().setTextAlign('left').run(),
    },
    {
      icon: <Icon name="align-center" />,
      label: t('tiptap.toolbar.text.center'),
      action: () => editor?.chain().focus().setTextAlign('center').run(),
    },
    {
      icon: <Icon name="align-right" />,
      label: t('tiptap.toolbar.text.right'),
      action: () => editor?.chain().focus().setTextAlign('right').run(),
    },
    {
      icon: <Icon name="align-justify" />,
      label: t('tiptap.toolbar.text.justify'),
      action: () => editor?.chain().focus().setTextAlign('justify').run(),
    },
  ];
  return [options, listOptions, alignmentOptions];
};
