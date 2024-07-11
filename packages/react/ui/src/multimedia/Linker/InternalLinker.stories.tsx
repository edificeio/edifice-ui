import { Meta, StoryObj } from '@storybook/react';

import { WorkspaceElement } from 'edifice-ts-client';
import InternalLinker from './InternalLinker';

const mockedDocuments: WorkspaceElement[] = [];

const meta: Meta<typeof InternalLinker> = {
  title: 'Multimedia/InternalLinker',
  component: InternalLinker,
  args: {},
};

export default meta;

type Story = StoryObj<typeof InternalLinker>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const Base: Story = {
  parameters: {
    app: 'timelinegenerator',
    docs: {
      description: {
        story: '',
      },
    },
  },
  /* decorators: [
    (Story, context) => {
      console.log({ context });
      return <div style={{ height: '400px' }}>{Story()}</div>;
    },
  ], */
  render: (args: any) => {
    return <InternalLinker {...args}></InternalLinker>;
  },
};
