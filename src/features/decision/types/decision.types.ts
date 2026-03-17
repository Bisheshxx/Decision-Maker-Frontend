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
