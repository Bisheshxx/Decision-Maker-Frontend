import { MOBILE_PAGE_SIZE, PAGE_SIZE } from "@/shared/constant";
import type { DecisionUrlDefaults } from "../types/decision.types";

export const DECISION_URL_DEFAULTS: DecisionUrlDefaults = {
  page: 1,
  pageSize: PAGE_SIZE,
  searchTerm: "",
};
export const DECISION_URL_DEFAULTS_MOBILE: DecisionUrlDefaults = {
  page: 1,
  pageSize: MOBILE_PAGE_SIZE,
  searchTerm: "",
};

export const DECISION_ITEM_LENGTH = 15;
export const MOBILE_DECISION_ITEM_LENGTH = 9;
