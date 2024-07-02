import { ResourceService } from "../ResourceService";
import {
  CreateParameters,
  CreateResult,
  UpdateParameters,
  UpdateResult,
} from "../interface";

const APP = "wiki";
const RESOURCE = "wiki";

export class WikiResourceService extends ResourceService {
  getApplication(): string {
    return APP;
  }

  getPrintUrl(resourceId: string): string {
    return `/wiki/print/id/${resourceId}`;
  }

  getViewUrl(resourceId: string): string {
    return `/wiki/id/${resourceId}`;
  }

  getFormUrl(folderId?: string | undefined): string {
    // TODO ?
    throw new Error("Method not implemented.");
  }

  getEditUrl(resourceId?: string | undefined): string {
    // TODO ?
    throw new Error("Method not implemented.");
  }

  async create(parameters: CreateParameters): Promise<CreateResult> {
    const res = await this.http.post("/wiki", parameters);
    this.checkHttpResponse(res);
    return res;
  }

  async update(parameters: UpdateParameters): Promise<UpdateResult> {
    const res = await this.http.put(`/wiki/${parameters.entId}`, parameters);
    this.checkHttpResponse(res);
    return res;
  }

  getResourceType(): string {
    return RESOURCE;
  }
}

ResourceService.register(
  { application: APP, resourceType: RESOURCE },
  (context) => new WikiResourceService(context),
);
