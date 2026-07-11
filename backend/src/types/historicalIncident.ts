import { CategoryId } from "../config/categories.js";

export interface HistoricalIncident {
  id: string;
  title: string;
  category: CategoryId;
  subType: string;
  summary: string;
  resolutionSummary: string;
  outcome: string;
  embedding: number[];
  createdAt: number;
}
