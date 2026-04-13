"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";

export function RouteProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const isNavigatingRef = useRef(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finishTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (finishTimeoutRef.current) {
      clearTimeout(finishTimeoutRef.current);
      finishTimeoutRef.current = null;
    }
  };

  const startProgress = () => {
    if (isNavigatingRef.current) return;
    isNavigatingRef.current = true;
    setIsVisible(true);
    setValue(14);

    intervalRef.current = setInterval(() => {
      setValue((prev) => {
        const increment = prev < 40 ? 10 : prev < 70 ? 4 : 1.5;
        return Math.min(prev + increment, 90);
      });
    }, 140);
  };

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.metaKey || event.ctrlKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin) return;
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return;

      startProgress();
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  useEffect(() => {
    // URL changed, complete current navigation progress.
    if (isNavigatingRef.current) {
      const deferred = setTimeout(() => {
        if (!isNavigatingRef.current) return;

        isNavigatingRef.current = false;
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }

        setValue(100);
        finishTimeoutRef.current = setTimeout(() => {
          setIsVisible(false);
          setValue(0);
        }, 220);
      }, 0);

      return () => clearTimeout(deferred);
    }
  }, [pathname, searchParams]);

  useEffect(() => {
    return () => clearTimers();
  }, []);

  return (
    <>
      {isVisible && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-100">
          <Progress value={value} className="h-1.5 w-full rounded-none" />
        </div>
      )}
      {children}
    </>
  );
}
