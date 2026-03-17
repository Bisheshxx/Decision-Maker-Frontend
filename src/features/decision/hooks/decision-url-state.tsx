import { useUrlState } from "@/shared/hooks/useUrlState";
import { DECISION_URL_DEFAULTS } from "../constants";

export default function useDecisionUrlState() {
  return useUrlState({
    defaults: DECISION_URL_DEFAULTS,
  });
}
