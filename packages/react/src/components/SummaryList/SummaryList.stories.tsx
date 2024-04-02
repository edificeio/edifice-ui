import { Meta, StoryObj } from "@storybook/react";
import { SummaryList } from ".";

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof SummaryList> = {
  title: "Components/SummaryList",
  component: SummaryList,
  decorators: [(Story) => <div style={{ height: "400px" }}>{Story()}</div>],
} as Meta<typeof SummaryList>;

export default meta;
type Story = StoryObj<typeof SummaryList>;

const posts = [
  {
    _id: "7c64caf1-8652-4c66-a55e-30f20d2ad537",
    title: "Harry Potter first month at school",
    modified: {
      $date: 1704390307139,
    },
    author: {
      userId: "ab7019cd-565c-478e-9704-5438606127c0",
      username: "Potter Harry",
      login: "harry.potter",
    },
  },
  {
    _id: "7c64caf1-8652-4c66-a55e-30f20d2ad537",
    title: "Harry Potter first week at school",
    modified: {
      $date: 1706881323000,
    },
    author: {
      userId: "ab7019cd-565c-478e-9704-5438606127c0",
      username: "Potter Harry",
      login: "harry.potter",
    },
  },
  {
    _id: "7c64caf1-8652-4c66-a55e-30f20d2ad537",
    title: "Harry Potter first day at school",
    modified: {
      $date: 1705930923000,
    },
    author: {
      userId: "ab7019cd-565c-478e-9704-5438606127c0",
      username: "Potter Harry",
      login: "harry.potter",
    },
  },
];

export const Base: Story = {
  render: (args) => {
    const handleOnClick = (itemId: string) => {
      console.log(itemId);
    };

    return (
      <SummaryList
        list={posts.map((post) => ({
          id: post._id,
          title: post.title,
          date: post.modified,
        }))}
        onClick={(item: any) => handleOnClick(item.id)}
      />
    );
  },
};
