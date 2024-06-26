import { IOdeServices } from "../services/OdeServices";
import { IViewsService, ViewsCounters, ViewsDetail } from "./interface";

export class ViewsService implements IViewsService {
  constructor(
    private context: IOdeServices,
    private module: string,
    private resourceType: string,
  ) {}

  private get http() {
    return this.context.http();
  }

  getCounters(resourceIds: string[]) {
    return this.http.get<ViewsCounters>(
      `/audience/views/${this.module}/${
        this.resourceType
      }?ressourceIds=${resourceIds.join(",")}`,
    );
  }

  getDetail(resourceId: string) {
    return this.http.get<ViewsDetail>(
      `/audience/views/${this.module}/${this.resourceType}/${resourceId}`,
    );
  }

  trigger(resourceId: string) {
    return this.http.post<void>(
      `/audience/views/${this.module}/${this.resourceType}/${resourceId}`,
    );
  }
}
