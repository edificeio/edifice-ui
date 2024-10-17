import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  type ReactNode,
} from 'react';

import { IOdeTheme } from '@edifice.io/ts-client';

import { useOdeClient } from '../OdeClientProvider';
import { useConf } from '../useConf';

export interface ThemeProps {
  children: ReactNode;
}

export interface ThemeContextProps {
  theme: IOdeTheme | undefined;
}

export const ThemeContext = createContext<ThemeContextProps | null>(null!);

export function ThemeProvider({ children }: ThemeProps) {
  const { appCode } = useOdeClient();

  const confQuery = useConf({ appCode });

  useEffect(() => {
    const favicon = document.getElementById('favicon') as HTMLAnchorElement;
    favicon.href =
      `${confQuery?.data?.theme?.basePath}/img/illustrations/favicon.ico` as string;
    const bootstrapVersion =
      confQuery?.data?.theme?.bootstrapVersion?.split('-');
    const dataProduct = bootstrapVersion
      ? bootstrapVersion[bootstrapVersion.length - 1]
      : undefined;

    const attributes = [
      {
        data: 'data-skin',
        value: confQuery?.data?.theme?.skinName,
      },
      {
        data: 'data-theme',
        // WB2-1885, add npmTheme for dynamic theme on springboard
        value:
          confQuery?.data?.theme?.npmTheme ?? confQuery?.data?.theme?.themeName,
      },
      {
        data: 'data-product',
        value: dataProduct,
      },
    ];

    attributes.forEach((attribute) => {
      return document
        .querySelector('html')
        ?.setAttribute(attribute.data, attribute.value as string);
    });
  }, [confQuery?.data]);

  const values = useMemo(
    () => ({
      theme: confQuery?.data?.theme,
    }),
    [confQuery?.data?.theme],
  );

  return (
    <ThemeContext.Provider value={values}>{children}</ThemeContext.Provider>
  );
}

export function useOdeTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(`Cannot be used outside of OdeClientProvider`);
  }
  return context;
}
