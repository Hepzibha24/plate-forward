import { adminDb } from "../../services/firebaseAdmin.js";
import { logStage } from "../../services/logger.js";
import { HistoricalIncident } from "../../types/historicalIncident.js";
import { HistoricalMatch } from "../../types/incident.js";
import { getEmbeddingProvider } from "./embeddings/providers.js";
import { findSimilarIncidents } from "./similarity.js";

const TOP_K = 3;
/** Below this, a match is more likely shared-vocabulary noise than a genuinely similar incident. */
const MIN_SIMILARITY = 0.15;

export async function retrieveHistoricalMatches(incidentText: string): Promise<HistoricalMatch[]> {
  const provider = getEmbeddingProvider();
  const queryEmbedding = await provider.embed(incidentText);

  const snapshot = await adminDb.collection("historical_incidents").get();
  const candidates = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }) as HistoricalIncident);

  const ranked = findSimilarIncidents(queryEmbedding, candidates, TOP_K).filter(
    (match) => match.similarity >= MIN_SIMILARITY,
  );

  logStage("historical", "historical matches retrieved", {
    candidateCount: candidates.length,
    matchCount: ranked.length,
  });

  return ranked.map((match) => ({
    historicalId: match.id,
    title: match.title,
    category: match.category,
    resolutionSummary: match.resolutionSummary,
    outcome: match.outcome,
    similarity: Math.round(match.similarity * 1000) / 1000,
  }));
}
