import { Meta, StoryObj } from "@storybook/react";

import { useToggle } from "../../hooks";
import { Button } from "../Button";
import ViewsModal from "./ViewsModal";
import { ViewsDetail } from "./models/Views";
import ViewsCounter from "./ViewsCounter";

const viewsDetailMockedData: ViewsDetail = {
  totalViews: 10,
  totalUniqueViews: 5,
  counterDetails: {
    students: 3,
    parents: 2,
    teachers: 1,
    personal: 1,
    guest: 2,
  },
};

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta: Meta<typeof ViewsModal> = {
  title: "Components/Views modal",
  component: ViewsModal,
  decorators: [(Story) => <div style={{ height: "25em" }}>{Story()}</div>],
  args: {
    viewsDetail: viewsDetailMockedData,
  },
};

export default meta;
type Story = StoryObj<typeof ViewsModal>;

export const Base: Story = {
  render: ({ viewsDetail }) => {
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
          viewsCounter={viewsDetail.totalViews}
          onClick={handleOpenModal}
        />
        {isOpen && (
          <ViewsModal
            viewsDetail={viewsDetail}
            isOpen={isOpen}
            onModalClose={handleCloseModal}
          />
        )}
      </div>
    );
  },
};
