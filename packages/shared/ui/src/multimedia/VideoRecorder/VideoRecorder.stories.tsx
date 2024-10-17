import { Meta, StoryObj } from '@storybook/react';
import VideoRecorder from './VideoRecorder';

const meta: Meta<typeof VideoRecorder> = {
  title: 'Multimedia/VideoRecorder',
  component: VideoRecorder,
  parameters: {
    docs: {
      description: {
        component:
          'Video recorder component that allows user to record a video through the camera device.',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof VideoRecorder>;

export const Base: Story = {
  render: (args) => <VideoRecorder {...args} />,
  args: {
    appCode: 'Blog',
    caption:
      "Souriez, vous êtes filmé(e) ! Vous pouvez enregistrer jusqu'à 3 minutes de vidéo.",
  },
};
