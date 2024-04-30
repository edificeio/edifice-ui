import { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";
import { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

import { useSession } from "../useSession";

import "dayjs/locale/de";
import "dayjs/locale/es";
import "dayjs/locale/pt";
import "dayjs/locale/fr";
import "dayjs/locale/it";

dayjs.extend(relativeTime);
dayjs.extend(customParseFormat);

export type MongoDate = {
  $date: number | string;
};
export type IsoDate = string; // "2021-03-24T16:36:05.398" or "1980-01-13"

/** Date formats we are going to deal with. */
export type CoreDate = IsoDate | MongoDate;

/**
 * Hook to compute user-friendly dates from various format.
 */
export default function useDate() {
  // Current language
  const [lang, setLang] = useState<string>("fr");
  const sessionQuery = useSession();

  /* Utility function */
  function parseDate(date: string, lang?: string): Dayjs {
    if (date.length < 11) return dayjs(date, ["YYYY-MM-DD"], lang);

    // Check if the string is exclusively made of digits
    if (date.split("").findIndex((char) => "0" > char || char > "9") < 0) {
      // => it should be a number of elapsed milliseconds since 1970-01-01, as a string.
      return dayjs(Number.parseInt(date));
    } else {
      // Otherwise, it should be an ISO 8601 date.
      let day = dayjs(date);
      if (!day.isValid()) {
        // If invalid, try custom parsings (https://day.js.org/docs/en/parse/string-format)
        day = dayjs(date, ["YYYY-MM-DD HH:mm:ss.SSS"]);
      }
      return day;
    }
  }

  /** Compute a user-friendly elapsed duration, between now and a date. */
  const fromNow = useCallback(
    (date: CoreDate): string => {
      let computedDate: Dayjs = dayjs();
      try {
        if ("undefined" === typeof date) {
          return "";
        } else if ("string" === typeof date) {
          computedDate = parseDate(date, lang);
        } else if ("number" === typeof date.$date) {
          computedDate = dayjs(new Date(date.$date));
        } else if ("string" === typeof date.$date) {
          computedDate = parseDate(date.$date, lang);
        }

        return computedDate.isValid() ? computedDate.fromNow() : "";
      } catch (e) {
        return "";
      }
    },
    [lang],
  );

  const formatDate = useCallback(
    (date: CoreDate, format?: string): string => {
      let computedDate: Dayjs = dayjs();
      try {
        if ("undefined" === typeof date) {
          return "";
        } else if ("string" === typeof date) {
          computedDate = parseDate(date, lang);
        } else if ("number" === typeof date.$date) {
          computedDate = dayjs(new Date(date.$date));
        } else if ("string" === typeof date.$date) {
          computedDate = parseDate(date.$date, lang);
        }

        return computedDate.isValid()
          ? computedDate.locale(lang).format(format || "D MMMM YYYY HH:mm:ss")
          : "";
      } catch (e) {
        return "";
      }
    },
    [lang],
  );

  useEffect(() => {
    const lang = sessionQuery?.data?.currentLanguage || "fr";
    setLang(lang);
    dayjs.locale(lang);
  }, [sessionQuery?.data, setLang]);

  return {
    fromNow,
    formatDate,
  };
}
