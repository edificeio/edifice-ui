import { Dropdown, Icon, Tooltip } from '@edifice-ui/react';
import { Editor } from '@tiptap/react';
import { useTranslation } from 'react-i18next';

interface Props {
  /**
   * editor instance
   */
  editor: Editor | null;
}

export const TableToolbarAddMenu = ({ editor }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip message={t('tiptap.table.toolbar.tooltip.add')} placement="top">
        <Dropdown.Trigger
          variant="ghost"
          label={t('tiptap.table.toolbar.add')}
        />
      </Tooltip>
      <Dropdown.Menu>
        <Dropdown.Item
          key="add-above"
          icon={<Icon name="arrow-up" />}
          onClick={() => editor?.chain().focus().addRowBefore().run()}
        >
          {t('tiptap.table.toolbar.line.above')}
        </Dropdown.Item>
        <Dropdown.Item
          key="add-below"
          icon={<Icon name="arrow-down" />}
          onClick={() => editor?.chain().focus().addRowAfter().run()}
        >
          {t('tiptap.table.toolbar.line.below')}
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item
          key="add-left"
          icon={<Icon name="arrow-left" />}
          onClick={() => editor?.chain().focus().addColumnBefore().run()}
        >
          {t('tiptap.table.toolbar.col.left')}
        </Dropdown.Item>
        <Dropdown.Item
          key="add-right"
          icon={<Icon name="arrow-right" />}
          onClick={() => editor?.chain().focus().addColumnAfter().run()}
        >
          {t('tiptap.table.toolbar.col.right')}
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item
          key="header-row"
          icon={<Icon name="highlight-row" />}
          onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
        >
          {t('tiptap.table.toolbar.line.head')}
        </Dropdown.Item>
        <Dropdown.Item
          key="header-col"
          icon={<Icon name="highlight-column" />}
          onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
        >
          {t('tiptap.table.toolbar.col.head')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};
