import { PAGE_SIZE } from "@/shared/constant";
import type { DecisionUrlDefaults } from "../types/decision.types";

export const DECISION_URL_DEFAULTS: DecisionUrlDefaults = {
  page: 1,
  pageSize: PAGE_SIZE,
  searchTerm: "",
};
