/* eslint-disable jsx-a11y/click-events-have-key-events */
import clsx from "clsx";

import { useDate, CoreDate } from "../../core/useDate";

export type SummaryListProps = {
  /**
   * Items to display
   */
  list: SummaryListObject[];

  /**
   * Action on click
   */
  onClick?: (item: SummaryListObject) => void;
};

export type SummaryListObject = {
  id: string;
  title: string;
  date: CoreDate;
};

const SummaryList = ({ list, onClick }: SummaryListProps) => {
  const { formatDate } = useDate();

  const displayDate = (date: CoreDate) => {
    return formatDate(date, "D MMMM YYYY");
  };

  const handleOnClick = (item: SummaryListObject) => {
    onClick?.(item);
  };

  return (
    <>
      {list.map((item, index) => (
        <div
          className={clsx("pb-8 d-flex summary-list-item flex-column", {
            "pt-8": index !== 0,
          })}
          key={item.id}
          onClick={() => {
            handleOnClick(item);
          }}
          role="button"
          tabIndex={0}
        >
          <div className="summary-list-item-title small flex-fill text-truncate">
            {item.title}
          </div>
          <div className="summary-list-item-date small text-gray-700">
            {item.date && displayDate(item.date)}
          </div>
        </div>
      ))}
    </>
  );
};

export default SummaryList;
