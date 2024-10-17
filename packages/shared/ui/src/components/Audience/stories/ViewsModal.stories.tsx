import { Meta, StoryObj } from '@storybook/react';

import { ViewsDetails } from '@edifice.io/ts-client';
import { useToggle } from '../../../hooks';
import ViewsCounter from '../ViewsCounter';
import ViewsModal from '../ViewsModal';

const viewsDetailsMockedData: ViewsDetails = {
  viewsCounter: 20,
  uniqueViewsCounter: 5,
  uniqueViewsPerProfile: [
    {
      profile: 'Student',
      counter: 1,
    },
    {
      profile: 'Relative',
      counter: 1,
    },
    {
      profile: 'Teacher',
      counter: 1,
    },
    {
      profile: 'Personnel',
      counter: 1,
    },
    {
      profile: 'Guest',
      counter: 1,
    },
  ],
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ViewsModal> = {
  title: 'Components/Audience/Views modal',
  component: ViewsModal,
  decorators: [(Story) => <div style={{ height: '25em' }}>{Story()}</div>],
  args: {
    viewsDetails: viewsDetailsMockedData,
  },
};

export default meta;
type Story = StoryObj<typeof ViewsModal>;

export const Base: Story = {
  render: ({ viewsDetails }) => {
    const [isOpen, toggle] = useToggle(false);

    function handleOpenModal() {
      toggle(true);
    }

    function handleCloseModal() {
      toggle(false);
    }

    return (
      <div id="portal">
        <ViewsCounter
          viewsCounter={viewsDetails.viewsCounter}
          onClick={handleOpenModal}
        />
        {isOpen && (
          <ViewsModal
            viewsDetails={viewsDetails}
            isOpen={isOpen}
            onModalClose={handleCloseModal}
          />
        )}
      </div>
    );
  },
};
