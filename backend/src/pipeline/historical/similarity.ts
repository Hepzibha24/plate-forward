export function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i]! * b[i]!;
    normA += a[i]! * a[i]!;
    normB += b[i]! * b[i]!;
  }
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

/**
 * Brute-force top-K ranking by cosine similarity. Fine at this scale (a few
 * dozen to a few hundred historical incidents); isolated here so it can be
 * swapped for a real vector DB (Pinecone/pgvector) without touching callers.
 */
export function findSimilarIncidents<T extends { embedding: number[] }>(
  queryEmbedding: number[],
  candidates: T[],
  topK = 3,
): (T & { similarity: number })[] {
  return candidates
    .map((candidate) => ({ ...candidate, similarity: cosineSimilarity(queryEmbedding, candidate.embedding) }))
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK);
}
