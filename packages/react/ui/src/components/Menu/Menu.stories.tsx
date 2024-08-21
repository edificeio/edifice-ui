import { Meta, StoryObj } from '@storybook/react';

import { AlertCircle, AlignLeft, Calendar, Smiley } from '@edifice-ui/icons';
import { Menu } from './Menu';

const meta: Meta<typeof Menu> = {
  title: 'Components/Menu',
  component: Menu,
  args: {
    label: 'My resource',
  },
  decorators: [(Story) => <div style={{ width: '30rem' }}>{Story()}</div>],
};

export default meta;
type Story = StoryObj<typeof Menu>;

const menuItem = {
  onClick: () => console.log(''),
  leftIcon: <AlignLeft />,
  rightIcon: <Smiley />,
  children: 'Text',
  selected: false,
};

export const Base: Story = {
  render: (args) => {
    return (
      <Menu {...args}>
        <Menu.Item>
          <Menu.Button
            onClick={menuItem.onClick}
            leftIcon={menuItem.leftIcon}
            rightIcon={menuItem.rightIcon}
            selected={menuItem.selected}
          >
            {menuItem.children}
          </Menu.Button>
        </Menu.Item>
      </Menu>
    );
  },
};

export const Label: Story = {
  render: (args) => {
    return (
      <Menu {...args}>
        <Menu.Item>
          <Menu.Button
            onClick={menuItem.onClick}
            leftIcon={menuItem.leftIcon}
            rightIcon={menuItem.rightIcon}
            selected={menuItem.selected}
          >
            {menuItem.children}
          </Menu.Button>
        </Menu.Item>
      </Menu>
    );
  },
  args: {
    label: 'Wiki',
  },
};

const data = [
  {
    id: '1',
    children: 'Node 1',
    onClick: () => console.log('node 1'),
    leftIcon: <AlertCircle />,
  },
  {
    id: '2',
    children: 'Node 2',
    onClick: () => console.log('node 2'),
    leftIcon: <Calendar />,
  },
];

export const Data: Story = {
  render: (args) => {
    return (
      <Menu {...args}>
        {data.map((item) => (
          <Menu.Item key={item.id}>
            <Menu.Button leftIcon={item.leftIcon} onClick={item.onClick}>
              {item.children}
            </Menu.Button>
          </Menu.Item>
        ))}
      </Menu>
    );
  },
};

export const SelectedState: Story = {
  render: (args) => {
    return (
      <Menu {...args}>
        {data.map((item, index) => (
          <Menu.Item key={item.id}>
            <Menu.Button
              leftIcon={item.leftIcon}
              onClick={item.onClick}
              selected={index === 0}
            >
              {item.children}
            </Menu.Button>
          </Menu.Item>
        ))}
      </Menu>
    );
  },
};

export const CustomMenuElement: Story = {
  render: (args) => {
    return (
      <Menu {...args}>
        <Menu.Item>
          <div>Custom Component</div>
        </Menu.Item>
      </Menu>
    );
  },
};
