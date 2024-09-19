import { Meta, StoryObj } from '@storybook/react';

import { Icon } from '../..';
import Dropdown from '../Dropdown';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown/Dropdown Item',
  component: Dropdown,
  decorators: [(Story) => <div style={{ height: '25em' }}>{Story()}</div>],
  parameters: {
    docs: {
      description: {
        component: 'Use `Dropdown.Item` when binding to a specific action',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Base: Story = {
  render: (args) => {
    return (
      <Dropdown>
        <Dropdown.Trigger label="Action menu" />
        <Dropdown.Menu>
          <Dropdown.Item
            icon={<Icon name="edit" />}
            onClick={() => alert('edit')}
          >
            Edit
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item
            icon={<Icon name="copy" />}
            onClick={() => alert('copy')}
          >
            Copy
          </Dropdown.Item>
          <Dropdown.Item
            icon={<Icon name="cut" />}
            onClick={() => alert('cut')}
          >
            Cut
          </Dropdown.Item>
          <Dropdown.Item
            icon={<Icon name="print" />}
            onClick={() => alert('print')}
          >
            Print
          </Dropdown.Item>
          <Dropdown.Separator />
          <Dropdown.Item
            icon={<Icon name="delete" />}
            onClick={() => alert('delete')}
          >
            Delete
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  },
};
