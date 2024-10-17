import { Meta, StoryObj } from '@storybook/react';
import LoadingScreen from './LoadingScreen';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof LoadingScreen> = {
  title: 'Components/LoadingScreen',
  component: LoadingScreen,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The LoadingScreen component is commonly used with Lazy Loaded Components (code splitting) to notify the user that components are loading.',
      },
    },
  },
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
};

export default meta;

type Story = StoryObj<typeof LoadingScreen>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args

export const Base: Story = {
  render: (args) => <LoadingScreen />,
};

export const Position: Story = {
  render: (args) => <LoadingScreen {...args} />,
  args: {
    position: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Position of the component is set to `true` per default. If set to `false`, LoadingScreen will take the whole screen and shows an overlay',
      },
    },
  },
};

export const Caption: Story = {
  render: (args) => <LoadingScreen {...args} />,
  args: {
    caption: 'Loading...',
  },
  parameters: {
    docs: {
      description: {
        story: 'Caption will show text below the loading icon.',
      },
    },
  },
};
