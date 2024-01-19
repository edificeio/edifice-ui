import React, { useEffect, useRef } from "react";

import { odeServices, LAYER_NAME } from "edifice-ts-client";
import { useTranslation } from "react-i18next";

import { useToast } from "../..";
import { CustomToastOptions } from "../../hooks/useToast/useToast";

const useHttpErrorToast = (options?: CustomToastOptions) => {
  const message = useRef<string>();
  const toast = useToast();
  const { t } = useTranslation();

  useEffect(() => {
    const unsubscribeFn = odeServices
      .notify()
      .events()
      .subscribe(LAYER_NAME.TRANSPORT, (event) => {
        message.current = t(
          event?.data?.payload?.error || event.data.response.statusText,
        );
        toast.error(
          React.createElement("div", { children: [message.current] }),
          options,
        );
      });

    return unsubscribeFn;
  }, [t, toast]);

  return message.current;
};

export default useHttpErrorToast;
