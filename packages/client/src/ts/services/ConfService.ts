import { OdeServices } from "./OdeServices";

export class ConfService {
  constructor(private context: OdeServices) {}
  getCdnUrl(): string | undefined {
    console.warn("[getCdnUrl] Not implemented yet");
    return undefined;
  }
  private get http() {
    return this.context.http();
  }
  async savePreference<T>(key: string, value: T) {
    this.http.putJson(`/userbook/preference/${key}`, value);
  }

  async getPreference<T>(key: string): Promise<T> {
    const res = await this.http.get<{ preference: string }>(
      `/userbook/preference/${key}`,
    );
    return JSON.parse(res.preference) as T;
  }
}
