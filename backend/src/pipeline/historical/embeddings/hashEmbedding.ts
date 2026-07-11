/**
 * Deterministic, dependency-free "embedding": classic feature hashing (the
 * hashing trick) over word tokens, L2-normalized. No external API required,
 * which keeps historical retrieval working out of the box before any real
 * embedding provider is configured. Good enough for cosine similarity over a
 * small, domain-specific vocabulary — swap for a real embedding model via
 * EMBEDDING_ADAPTER=live when semantic nuance matters more than zero-setup.
 */
const DIMENSIONS = 256;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((token) => token.length > 2);
}

function hashToken(token: string): number {
  let hash = 2166136261;
  for (let i = 0; i < token.length; i++) {
    hash ^= token.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return Math.abs(hash) % DIMENSIONS;
}

export function embedText(text: string): number[] {
  const vector = new Array(DIMENSIONS).fill(0);
  for (const token of tokenize(text)) {
    vector[hashToken(token)] += 1;
  }
  const norm = Math.sqrt(vector.reduce((sum, v) => sum + v * v, 0)) || 1;
  return vector.map((v) => v / norm);
}
