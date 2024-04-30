import { configure } from "./Framework";
import { IGetConf, IOdeTheme, IThemeConf } from "./interfaces";
import { App, ERROR_CODE } from "../globals";
import { IWebApp } from "../session/interfaces";
import { IOdeServices } from "../services/OdeServices";

export class ConfService {
  constructor(private context: IOdeServices) {}

  private get http() {
    return this.context.http();
  }

  private get cdnDomain(): string {
    return configure.Platform.cdnDomain;
  }

  private get notify() {
    return this.context.notify();
  }

  async getConf(app: App): Promise<IGetConf> {
    const [conf, applications] = await Promise.all([
      this.getThemeConf(),
      this.getApplicationsList(),
    ]);

    const [theme, currentApp] = await Promise.all([
      this.getTheme({ conf, publicTheme: applications === undefined }),
      this.getWebAppConf({ app, applications: applications ?? [] }),
    ]);

    const appConf = {
      app,
      applications: applications ?? [],
      conf,
      currentApp,
      theme,
    };

    this.notify.onAppConfReady().resolve(appConf);

    return appConf;
  }

  async getPublicConf<T extends any>(app: App): Promise<T> {
    const publicConfResponse = await this.http.get<any>(`/${app}/conf/public`, {
      queryParams: { _: configure.Platform.deploymentTag },
    });
    if (this.http.isResponseError()) throw ERROR_CODE.APP_NOT_FOUND;
    return publicConfResponse;
  }

  getCdnUrl(): string | undefined {
    //TODO to implement
    console.warn("[getCdnUrl] Not implemented yet");
    return undefined;
  }

  async savePreference<T>(key: string, value: T) {
    this.http.putJson(`/userbook/preference/${key}`, value);
  }

  async getPreference<T>(key: string): Promise<T> {
    const res = await this.http.get<{ preference: string }>(
      `/userbook/preference/${key}`,
    );
    if (this.http.isResponseError() || typeof res === "string") {
      // This is not a JSON object => not logged in !
      return {} as T;
    }
    return JSON.parse(res.preference) as T;
  }

  private async getThemeConf(version?: string): Promise<IThemeConf> {
    const res = await this.http.getScript<IThemeConf>(
      "/assets/theme-conf.js",
      { queryParams: { v: version } },
      "exports.conf",
    );
    return res;
  }

  private async getApplicationsList(): Promise<IWebApp[] | undefined> {
    const response = await this.http.get<{ apps: Array<IWebApp> }>(
      `/applications-list`,
    );
    if (this.http.isResponseError() || typeof response === "string") {
      // This is not a JSON object => not logged in !
      return undefined;
    }
    return response.apps;
  }

  private async getWebAppConf({
    app,
    applications,
  }: {
    app: App;
    applications: IWebApp[];
  }): Promise<IWebApp | undefined> {
    const find = applications.find((item) => {
      if (item?.prefix) {
        return item?.prefix.replace("/", "") === app;
      }
    });
    return find;
  }

  private async getTheme({
    version,
    conf,
    publicTheme,
  }: {
    version?: string;
    conf: any;
    publicTheme?: boolean;
  }): Promise<IOdeTheme> {
    const theme = !publicTheme
      ? await this.http.get<IOdeTheme>("/theme", {
          queryParams: { _: version },
        })
      : null;
    const themeOverride = conf?.overriding.find(
      (item: { child: any }) =>
        // Public access => simply use the 1st override
        theme === null || item.child === theme.themeName,
    );

    const skinName = theme?.skinName || themeOverride.skins[0];
    const themeUrl =
      theme?.skin || `/assets/themes/${themeOverride.child}/skins/${skinName}/`;
    const skins = themeOverride.skins;
    const bootstrapPath = "/assets/themes/edifice-bootstrap";
    const bootstrapVersion = themeOverride.bootstrapVersion
      .split("-")
      .slice(-1)[0];
    const is1d = themeOverride.parent === "panda";

    return {
      basePath: `${this.cdnDomain}${themeUrl}../../`,
      bootstrapPath,
      bootstrapVersion,
      is1d,
      logoutCallback: theme?.logoutCallback || "",
      skin: themeOverride.child,
      skinName,
      skins,
      themeName: themeOverride.child,
      themeUrl,
    };
  }
}
