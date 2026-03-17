"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

type Primitive = string | number | boolean;

type UseUrlStateOptions<T> = {
  defaults: T;
};

export function useUrlState<T extends Record<string, Primitive>>(
  options: UseUrlStateOptions<T>,
) {
  const { defaults } = options;

  const searchParams = useSearchParams();
  const router = useRouter();

  const urlState = useMemo(() => {
    const result = {} as T;

    for (const key in defaults) {
      const value = searchParams.get(key);

      if (value === null) {
        result[key] = defaults[key];
        continue;
      }
      const defaultValue = defaults[key];
      if (typeof defaultValue === "number") {
        result[key] = Number(value) as T[typeof key];
      } else if (typeof defaultValue === "boolean") {
        result[key] = (value === "true") as T[typeof key];
      } else {
        result[key] = value as T[typeof key];
      }
    }
    return result;
  }, [searchParams, defaults]);

  const setUrlState = useCallback(
    (updates: Partial<T>) => {
      const currentQuery = searchParams.toString();
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        const defaultValue = defaults[key as keyof T];
        if (value === null || value === "" || value === undefined) {
          params.delete(key);
        } else if (value === defaultValue) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      const nextQuery = params.toString();
      if (nextQuery === currentQuery) {
        return;
      }

      router.replace(nextQuery ? `?${nextQuery}` : "?");
    },
    [defaults, router, searchParams],
  );

  const getUrlKey = useCallback(
    <K extends keyof T>(key: K) => {
      return searchParams.get(String(key));
    },
    [searchParams],
  );

  const resetUrlState = useCallback(
    (keys?: Array<keyof T>) => {
      const resetKeys = keys ?? (Object.keys(defaults) as Array<keyof T>);
      const updates = {} as Partial<T>;

      resetKeys.forEach((key) => {
        updates[key] = defaults[key];
      });

      setUrlState(updates);
    },
    [defaults, setUrlState],
  );

  return {
    urlState,
    setUrlState,
    getUrlKey,
    resetUrlState,
  };
}
