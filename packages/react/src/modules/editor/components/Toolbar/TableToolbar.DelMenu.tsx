import { Editor } from '@tiptap/react';
import { useTranslation } from 'react-i18next';
import { Dropdown, Icon, Tooltip } from '../../../..';

interface Props {
  /**
   * editor instance
   */
  editor: Editor | null;
}

export const TableToolbarDelMenu = ({ editor }: Props) => {
  const { t } = useTranslation();

  return (
    <>
      <Tooltip message={t('tiptap.table.toolbar.tooltip.del')} placement="top">
        <Dropdown.Trigger
          variant="ghost"
          label={t('tiptap.table.toolbar.del')}
        />
      </Tooltip>
      <Dropdown.Menu>
        <Dropdown.Item
          key="del-row"
          icon={<Icon name="delete-row" />}
          onClick={() => editor?.chain().focus().deleteRow().run()}
        >
          {t('tiptap.table.toolbar.del.line')}
        </Dropdown.Item>
        <Dropdown.Item
          key="del-col"
          icon={<Icon name="delete-column" />}
          onClick={() => editor?.chain().focus().deleteColumn().run()}
        >
          {t('tiptap.table.toolbar.del.col')}
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item
          key="del-header-row"
          icon={<Icon name="delete-row-highlight" />}
          onClick={() => editor?.chain().focus().toggleHeaderRow().run()}
        >
          {t('tiptap.table.toolbar.del.line.head')}
        </Dropdown.Item>
        <Dropdown.Item
          key="del-header-col"
          icon={<Icon name="delete-column-highlight" />}
          onClick={() => editor?.chain().focus().toggleHeaderColumn().run()}
        >
          {t('tiptap.table.toolbar.del.col.head')}
        </Dropdown.Item>
        <Dropdown.Separator />
        <Dropdown.Item
          key="del-table"
          icon={<Icon name="delete" />}
          onClick={() => editor?.chain().focus().deleteTable().run()}
        >
          {t('tiptap.table.toolbar.del.array')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </>
  );
};
