export interface IAudienceService {
  readonly views: IViewsService;
}

export interface IViewsService {
  getCounters(resourceIds: string[]): Promise<ViewsCounters>;
  getDetail(resourceId: string): Promise<ViewsDetail>;
  trigger(resourceId: string): Promise<void>;
}

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
  counterDetails?: {
    parents: number;
    teachers: number;
    students: number;
    personnel: number;
    guest: number;
  };
};
