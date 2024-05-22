import { defaultDiacriticsRemovalMap } from "../idiom/Idiom";

export class StringUtils {
  static removeAccents(str: string): string {
    for (let i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
      str = str.replace(
        defaultDiacriticsRemovalMap[i].letters,
        defaultDiacriticsRemovalMap[i].base,
      );
    }
    return str;
  }

  static generateVirtualId(): string {
    return "xxxx-xxxx-xxx-xxxx".replace(/[x]/g, () => {
      const r = Math.floor(Math.random() * 16);
      return r.toString(16);
    });
  }
}
