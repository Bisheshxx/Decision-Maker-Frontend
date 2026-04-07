import { PROFILE_TAB } from "../constants";
import { useUrlState } from "@/shared/hooks/useUrlState";

export default function useProfileUrlState() {
  const defaults = {
    tab: PROFILE_TAB,
  };
  return useUrlState({
    defaults,
  });
}
