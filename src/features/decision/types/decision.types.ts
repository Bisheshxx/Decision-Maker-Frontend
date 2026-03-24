import z from "zod";
import { SchemaUpsertDecisionItem } from "../Schema/decision-item.schema";

export interface Decision {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt?: string;
  userId?: string;
}

export type DecisionUrlDefaults = {
  page: number;
  pageSize: number;
  searchTerm: string;
};

export interface DecisionItem {
  id: string | number;
  title: string;
  DecisionId: string;
}

export interface DecisionDetail extends Decision {
  decisionItems: DecisionItem[];
}

export type SchemaUpsertDecisionItemType = z.infer<
  typeof SchemaUpsertDecisionItem
>;
