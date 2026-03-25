import { request } from "@/shared/lib/axios/request";
import {
  Decision,
  DecisionDetail,
  DecisionItem,
} from "../types/decision.types";
import z from "zod";
import { SchemaCreateDecision } from "../Schema/create-decision.schema";

export const DecisionService = {
  getDecisions: async (params: Record<string, unknown>) =>
    request<Decision[]>({
      method: "GET",
      url: "decisions",
      params: params,
    }),
  createDecision: async (data: z.infer<typeof SchemaCreateDecision>) =>
    request<Decision>({
      method: "POST",
      url: "decisions",
      data,
    }),
  getDecisionDetails: async (id: string) =>
    request<DecisionDetail>({
      method: "GET",
      url: `decision/${id}`,
    }),
  updateDecision: async (
    id: string,
    data: Partial<Pick<Decision, "title" | "description">>,
  ) =>
    request<null>({
      method: "PUT",
      url: `decision/${id}`,
      data,
    }),
  deleteDecision: async (id: string) =>
    request<null>({
      method: "DELETE",
      url: `decision/${id}`,
    }),
  getDecisionItems: async (id: number) =>
    request<Pick<DecisionItem, "title" | "id">[]>({
      method: "GET",
      url: `decision/${id}/decision-items`,
    }),
  upsertDecisionItems: async (
    id: number,
    data: Pick<DecisionItem, "id" | "title">[],
  ) =>
    request<null, Pick<DecisionItem, "id" | "title">[]>({
      method: "PUT",
      url: `decision/${id}/decision-items`,
      data: data,
    }),
};
