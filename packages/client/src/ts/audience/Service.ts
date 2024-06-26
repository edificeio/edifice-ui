import { App, ResourceType } from "../globals";
import { IOdeServices } from "../services/OdeServices";
import { ViewsService } from "./ViewService";
import { IAudienceService } from "./interface";

export class AudienceService implements IAudienceService {
  constructor(
    private context: IOdeServices,
    private module: App,
    private resourceType: ResourceType,
  ) {}

  public get views() {
    return new ViewsService(this.context, this.module, this.resourceType);
  }
}
