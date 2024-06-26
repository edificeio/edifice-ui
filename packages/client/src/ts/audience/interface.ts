import { UserProfile } from "../session/interfaces";

export interface IAudienceService {
  readonly views: IViewsService;
}

export interface IViewsService {
  getCounters(resourceIds: string[]): Promise<ViewsCounters>;
  getDetails(resourceId: string): Promise<ViewsDetails>;
  trigger(resourceId: string): Promise<void>;
}

/**
 * ViewsCounters model
 */
export type ViewsCounters = {
  [ressourceId: string]: number;
};

/**
 * Views details
 */
export interface ViewsDetails {
  viewsCounter: number;
  uniqueViewsCounter: number;
  uniqueViewsPerProfile?: ViewsDetailsProfile[];
}

/**
 * Views details
 */
export interface ViewsDetailsProfile {
  profile: UserProfile[number];
  counter: number;
}
