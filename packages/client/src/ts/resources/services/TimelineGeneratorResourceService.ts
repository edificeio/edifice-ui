import { IResource, ResourceType } from "../..";
import {
  CreateParameters,
  CreateResult,
  TimelineGeneratorUpdate,
  UpdateResult,
} from "../interface";
import { ResourceService } from "../ResourceService";

const APP = "timelinegenerator";
const RESOURCE = "timelinegenerator";

export class TimelineGeneratorResourceService extends ResourceService {
  async create(parameters: CreateParameters): Promise<CreateResult> {
    const thumbnail = parameters.thumbnail
      ? await this.getThumbnailPath(parameters.thumbnail)
      : "";

    const res = await this.http.post<CreateResult>("/timelinegenerator", {
      title: parameters.name,
      description: parameters.description,
      visibility: parameters.public ? "PUBLIC" : "OWNER",
      thumbnail,
      trashed: false,
      folder: parameters.folder,
      slug: parameters.public ? parameters.slug : "",
      "publish-type": parameters.publishType || "RESTRAINT",
      "comment-type": "IMMEDIATE",
    });

    this.checkHttpResponse(res);

    return res;
  }

  async update(parameters: TimelineGeneratorUpdate): Promise<UpdateResult> {
    const thumbnail = await this.getThumbnailPath(parameters.thumbnail);
    const res = await this.http.put<IResource>(
      `/timelinegenerator/${parameters.entId}`,
      {
        trashed: parameters.trashed ? 1 : 0,
        title: parameters.name,
        icon: thumbnail,
        subTitle: parameters.description,
      },
    );
    this.checkHttpResponse(res);
    return { thumbnail: thumbnail, entId: parameters.entId } as UpdateResult;
  }
  getResourceType(): ResourceType {
    return RESOURCE;
  }
  getApplication(): string {
    return APP;
  }
  override getFormUrl(resourceId?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  getViewUrl(resourceId: string): string {
    return `/timelinegenerator#/view/${resourceId}`;
  }
  getPrintUrl(resourceId: string): string {
    return `/timelinegenerator/print#/print-timelinegenerator/${resourceId}`;
  }
  override getEditUrl(resourceId?: string | undefined): string {
    throw new Error("Method not implemented.");
  }
  // getExportUrl(resourceId: string): string {
  //   return `/timelinegenerator/exportHtml/${resourceId}`;
  // }
}

ResourceService.register(
  { application: APP, resourceType: RESOURCE },
  (context) => new TimelineGeneratorResourceService(context),
);
