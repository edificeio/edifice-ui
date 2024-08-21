import { TimelinegeneratorBehaviour } from './behaviours/TimelinegeneratorBehaviour';
import { App, ERROR_CODE, ResourceType } from '../globals';
import { IOdeServices } from '../services/OdeServices';
import { AbstractBehaviourService } from './behaviours/AbstractBehaviourService';
import { WorkspaceBehaviour } from './behaviours/WorkspaceBehaviour';
import { BlogBehaviour } from './behaviours/BlogBehaviour';
import { ActualitesBehaviour } from './behaviours/ActualitesBehaviour';
import { WikiBehaviour } from './behaviours/WikiBehaviour';
import { PagesBehaviour } from './behaviours/PagesBehaviour';
import { CommunityBehaviour } from './behaviours/CommunityBehaviour';
import { MindmapBehaviour } from './behaviours/MindmapBehaviour';
import { ForumBehaviour } from './behaviours/ForumBehaviour';
import { HomeworksBehaviour } from './behaviours/HomeworksBehaviour';
import { ScrapbookBehaviour } from './behaviours/ScrapbookBehaviour';
import { CollaborativewallBehaviour } from './behaviours/CollaborativewallBehaviour';
import { ExercizerBehaviour } from './behaviours/ExercizerBehaviour';
import { FormulaireBehaviour } from './behaviours/FormulaireBehaviour';
import { MagnetoBehaviour } from './behaviours/MagnetoBehaviour';
import { PollBehaviour } from './behaviours/PollBehaviour';
import { ServiceRegistry } from './ServiceRegistry';
import { IBehaviourService } from './interface';

export class SnipletsService {
  //
  // STATIC REGISTRY
  //
  private static registry = new ServiceRegistry<IBehaviourService>();
  // Expose some useful functions
  static findBehaviour = this.registry.findService.bind(this.registry);
  static hasBehaviour = this.registry.isRegistered.bind(this.registry);

  static resourceProducingApps: App[] = [];

  static async initialize(
    context: IOdeServices,
    currentApp: App,
  ): Promise<App[]> {
    const http = context.http();
    return new Promise<App[]>(async (resolve, reject) => {
      if (!this.resourceProducingApps.length) {
        // Default to current app and workspace
        this.resourceProducingApps = [currentApp, 'workspace'];

        // Dynamic load prefixes of resource-producing apps
        try {
          const [appList, me] = await Promise.all([
            http.get<App[]>('/resources-applications'),
            context.session().getUser(),
          ]);
          if (me && me.apps && appList?.length) {
            // Sanitize list agains authorized apps for this user
            this.resourceProducingApps = appList.filter((appPrefix) => {
              return (
                -1 <
                me.apps.findIndex((webapp) => {
                  return (
                    webapp.address.indexOf(appPrefix) !== -1 &&
                    webapp.icon.indexOf('/') === -1
                  );
                })
              );
            });
          }
        } catch {
          /* keep default */
        }
      }
      resolve(this.resourceProducingApps);
    });
  }

  static async registerBehaviours(currentApp: App): Promise<void> {
    // Register services
    this.resourceProducingApps.forEach((app) => {
      const key = { application: currentApp, resourceType: app };
      this.registry.register(key, (context: IOdeServices) =>
        this.serviceFor(context, currentApp, app),
      );
    });
  }

  private static serviceFor(
    context: IOdeServices,
    application: App,
    resourceType: ResourceType,
  ) {
    let service: AbstractBehaviourService;
    switch (resourceType) {
      case 'timelinegenerator':
        service = new TimelinegeneratorBehaviour(context);
        break;
      case 'workspace':
        service = new WorkspaceBehaviour(context);
        break;
      case 'blog':
        service = new BlogBehaviour(context);
        break;
      case 'actualites':
        service = new ActualitesBehaviour(context);
        break;
      case 'wiki':
        service = new WikiBehaviour(context);
        break;
      case 'pages':
        service = new PagesBehaviour(context);
        break;
      case 'poll':
        service = new PollBehaviour(context);
        break;
      case 'community':
        service = new CommunityBehaviour(context);
        break;
      case 'mindmap':
        service = new MindmapBehaviour(context);
        break;
      case 'forum':
        service = new ForumBehaviour(context);
        break;
      case 'homeworks':
        service = new HomeworksBehaviour(context);
        break;
      case 'scrapbook':
        service = new ScrapbookBehaviour(context);
        break;
      case 'collaborativewall':
        service = new CollaborativewallBehaviour(context);
        break;
      case 'exercizer':
        service = new ExercizerBehaviour(context);
        break;
      case 'formulaire':
        service = new FormulaireBehaviour(context);
        break;
      case 'magneto':
        service = new MagnetoBehaviour(context);
        break;
      default:
        throw ERROR_CODE.NOT_SUPPORTED;
    }
    service.APP = application;
    return service;
  }
}
