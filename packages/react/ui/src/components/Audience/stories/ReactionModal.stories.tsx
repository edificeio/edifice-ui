import { Meta, StoryObj } from '@storybook/react';

import { ReactionModal } from '..';
import { useToggle } from '../../../hooks';
import { Button } from '../../Button';
import { ReactionDetailsData } from 'edifice-ts-client';

const mockedData: ReactionDetailsData = {
  reactionCounters: {
    allReactionsCounter: 5,
    countByType: {
      REACTION_1: 2,
      REACTION_2: 1,
      REACTION_3: 1,
      REACTION_4: 1,
    },
  },
  userReactions: [
    {
      displayName: 'Ramirez Noname',
      userId: 'toto-1',
      profile: 'Teacher',
      reactionType: 'REACTION_1',
    },
    {
      displayName: 'Connor MacLeod',
      userId: 'toto-2',
      profile: 'Teacher',
      reactionType: 'REACTION_2',
    },
    {
      displayName: 'Tom Saw-a-year',
      userId: 'toto-3',
      profile: 'Student',
      reactionType: 'REACTION_3',
    },
    {
      displayName: "Jack o'Clubs",
      userId: 'toto-4',
      profile: 'Relative',
      reactionType: 'REACTION_4',
    },
    {
      displayName:
        'Richard "Le bien nommé" Lionheart, a.k.a. Richard Coeur-de-Lion en français, a.k.a. 🍚🛒💚➁🦁',
      userId: 'toto-5',
      profile: 'Personnel',
      reactionType: 'REACTION_1',
    },
  ],
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ReactionModal> = {
  title: 'Components/Audience/Reactions modal',
  component: ReactionModal,
  decorators: [(Story) => <div style={{ height: '25em' }}>{Story()}</div>],
  args: {
    pageSize: 2,
    async reactionDetailsLoader(_resourceId, page, size) {
      const asIndex = page - 1;
      const { reactionCounters, userReactions } = mockedData;
      const from = Math.max(
        0,
        Math.min(userReactions.length - 1, asIndex * size),
      );
      const to = Math.min(userReactions.length, from + size);
      return {
        reactionCounters,
        userReactions: userReactions.slice(from, to),
      };
    },
  },
  argTypes: {
    pageSize: {
      control: { type: 'input' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ReactionModal>;

export const Base: Story = {
  render: (args) => {
    const [isOpen, toggle] = useToggle(false);

    function handleOpenModal() {
      toggle(true);
    }

    function handleCloseModal() {
      toggle(false);
    }

    return (
      <div id="portal">
        <Button
          type="button"
          variant="filled"
          color="primary"
          onClick={handleOpenModal}
        >
          Open Modal
        </Button>
        {isOpen && (
          <ReactionModal
            {...args}
            resourceId="DEAD-BEEF"
            isOpen={isOpen}
            onModalClose={handleCloseModal}
          />
        )}
      </div>
    );
  },
};
