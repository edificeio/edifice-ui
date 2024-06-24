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
  totalViews: number;
  totalUniqueViews: number;
  counterDetails: {
    parents: number;
    teachers: number;
    students: number;
  };
};
