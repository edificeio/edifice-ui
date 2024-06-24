/**
 * ViewsCounters model
 */
export type ViewsCounters = {
  [ressourceId: string]: number;
};

/**
 * Views detail model
 */
export type ViewsDetail = {
  totalViewsCounter: number;
  counterDetails: {
    parents: number;
    teachers: number;
    students: number;
  };
};
