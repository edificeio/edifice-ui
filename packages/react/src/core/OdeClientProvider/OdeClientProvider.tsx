import {
  createContext,
  type ReactNode,
  useMemo,
  useContext,
  useEffect,
} from "react";

import { UseQueryResult } from "@tanstack/react-query";
import {
  App,
  IUserInfo,
  IUserDescription,
  IWebApp,
  UserProfile,
  IGetConf,
  IGetSession,
} from "edifice-ts-client";
import { useTranslation } from "react-i18next";

import { useConf } from "../useConf";
import { useSession } from "../useSession";

export interface OdeProviderParams {
  alternativeApp?: boolean;
  app: App;
  cdnDomain?: string | null;
  version?: string | null;
}

export interface OdeClientProps {
  children: ReactNode;
  params: OdeProviderParams;
}

export interface OdeContextProps {
  appCode: App;
  applications: IWebApp[] | undefined;
  confQuery: UseQueryResult<IGetConf>;
  currentApp: IWebApp | undefined;
  currentLanguage: string | undefined;
  init: boolean;
  sessionQuery: UseQueryResult<IGetSession>;
  user: IUserInfo | any;
  userDescription: IUserDescription | undefined;
  userProfile: UserProfile | undefined;
}

export const OdeClientContext = createContext<OdeContextProps | null>(null!);

export function OdeClientProvider({ children, params }: OdeClientProps) {
  const appCode = params.app;

  const { t } = useTranslation();
  const translatedAppCode = t(appCode);

  const sessionQuery = useSession();
  const confQuery = useConf({ appCode });

  const init = confQuery?.isSuccess && sessionQuery?.isSuccess;

  useEffect(() => {
    document
      .querySelector("html")
      ?.setAttribute("lang", sessionQuery?.data?.currentLanguage || "fr");
  }, [sessionQuery?.data]);

  useEffect(() => {
    document.title = `${translatedAppCode}`;
  }, [appCode, sessionQuery.data, translatedAppCode]);

  const values = useMemo(
    () => ({
      appCode,
      applications: confQuery?.data?.applications,
      confQuery,
      currentApp: confQuery?.data?.currentApp,
      currentLanguage: sessionQuery?.data?.currentLanguage,
      init,
      sessionQuery,
      user: sessionQuery?.data?.user,
      userDescription: sessionQuery?.data?.userDescription,
      userProfile: sessionQuery?.data?.userProfile,
    }),
    [appCode, confQuery, init, sessionQuery],
  );

  return (
    <OdeClientContext.Provider value={values}>
      {children}
    </OdeClientContext.Provider>
  );
}

export function useOdeClient() {
  const context = useContext(OdeClientContext);

  if (!context) {
    throw new Error(`Cannot be used outside of OdeClientProvider`);
  }
  return context;
}
