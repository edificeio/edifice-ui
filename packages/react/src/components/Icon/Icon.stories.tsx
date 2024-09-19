import { iconNames } from '@edifice.io/icons';
import { Meta, StoryObj } from '@storybook/react';

import { Icon } from './Icon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof Icon> = {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    name: {
      options: [...iconNames].sort(),
    },
    size: {
      options: ['16', '18', '20', '22', '24', '40', '36', '48'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

export const Base: Story = {
  args: {
    name: 'add-user',
  },

  parameters: {
    docs: {
      description: {
        story: 'Icon component expects a name props.',
      },
    },
  },
};

export const IconSize: Story = {
  args: {
    name: 'wand',
    size: '24',
  },

  render: (args) => {
    return (
      <div className="d-flex align-items-center gap-8">
        <Icon size="12" name={args.name} />
        <Icon size="18" name={args.name} />
        <Icon size="20" name={args.name} />
        <Icon size="40" name={args.name} />
        <Icon size="64" name={args.name} />
      </div>
    );
  },

  parameters: {
    docs: {
      description: {
        story:
          'Default size of an icon is 24x24 but you can pass any of the default list : `16 | 18 | 20 | 22 | 24 | 40 | 36 | 48` or any size you need.',
      },
    },
  },
};

export const IconColor: Story = {
  args: {
    name: 'apps/collaborative-wall',
  },

  render: (args) => (
    <div className="d-flex align-items-center gap-8">
      <Icon color="red" name={args.name} />
      <Icon color="#666" name={args.name} />
      <Icon color="var(--edifice-secondary)" name={args.name} />
      <Icon name={args.name} className="text-success" />
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          'You can customize the color of the icon with `color` attribute (string, HEX or CSS variables) or with a `className`',
      },
    },
  },
};

export const IconProps: Story = {
  args: {
    name: 'alert-circle',
  },

  render: (args) => (
    <div className="d-flex align-items-center gap-8">
      <Icon color="red" name={args.name} />
      <Icon fillOpacity={0.5} name={args.name} />
    </div>
  ),

  parameters: {
    docs: {
      description: {
        story:
          'This component extends `SVGProps<SVGSVGElement>` so you can pass any props from `SVGAttributes`.',
      },
    },
  },
};
