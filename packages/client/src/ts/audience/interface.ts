import { UserProfile } from "../session/interfaces";

export interface IAudienceService {
  readonly views: IViewsService;
}

export interface IViewsService {
  /**
   * Load the views counter for a list of resources.
   * @param resourceIds list of resource ids
   * @returns map of counters, indexed by resource id.
   */
  getCounters(resourceIds: string[]): Promise<ViewsCounters>;
  /**
   * Load the views details for a resource.
   * @param resourceId ID of the resource
   * @returns detailed views counters, or `undefined` if an error occured.
   */
  getDetails(resourceId: string): Promise<ViewsDetails | undefined>;
  /**
   * Trigger a view for a resource.
   * @param resourceId id
   */
  trigger(resourceId: string): Promise<void>;
}

/**
 * ViewsCounters model
 */
export type ViewsCounters = {
  [resourceId: string]: number;
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
