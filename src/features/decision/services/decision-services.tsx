import { request } from "@/shared/lib/axios/request";
import { Decision } from "../types/decision.types";
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
    request<Decision>({
      method: "GET",
      url: `decision/${id}`,
    }),
};
