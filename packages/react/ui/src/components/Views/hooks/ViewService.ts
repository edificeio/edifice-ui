import { odeServices } from "edifice-ts-client";
import { ViewsCounters, ViewsDetail } from "../models/Views";

export class ViewsService {
  constructor(
    private module: string,
    private resourceType: string,
  ) {}

  baseURL = "/audience/";

  async getViewsCounters(ressourceIds: string[]): Promise<ViewsCounters> {
    return odeServices
      .http()
      .get<ViewsCounters>(
        `${this.baseURL}/views/${this.module}/${
          this.resourceType
        }?ressourceIds=${ressourceIds.join(",")}`,
      );
  }

  getViewsDetail(ressourceId: string): Promise<ViewsDetail> {
    return odeServices
      .http()
      .get<ViewsDetail>(
        `${this.baseURL}/views/${this.module}/${this.resourceType}/${ressourceId}`,
      );
  }

  postView(ressourceId: string): Promise<number> {
    return odeServices
      .http()
      .post<number>(
        `${this.baseURL}/views/${this.module}/${this.resourceType}/${ressourceId}`,
      );
  }
}
