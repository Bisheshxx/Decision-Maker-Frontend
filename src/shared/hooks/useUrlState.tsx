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

  const setUrlState = useCallback((updates: Partial<T>) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, String(value));
      }
    });

    router.replace(`?${params.toString()}`);
  }, [router, searchParams]);

  return {
    urlState,
    setUrlState,
  };
}
