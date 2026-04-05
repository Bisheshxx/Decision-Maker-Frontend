import React, { useCallback } from "react";
import { useUrlState } from "@/shared/hooks/useUrlState";
import {
  DECISION_URL_DEFAULTS,
  DECISION_URL_DEFAULTS_MOBILE,
} from "../constants";

export default function useDecisionUrlState() {
  const [isMobile, setIsMobile] = React.useState(false);

  const checkIsMobile = useCallback(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  React.useEffect(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [checkIsMobile]);

  const defaults = isMobile
    ? DECISION_URL_DEFAULTS_MOBILE
    : DECISION_URL_DEFAULTS;

  return useUrlState({
    defaults,
  });
}
