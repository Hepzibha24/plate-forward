import { EmbeddingProvider } from "../types.js";

/**
 * Swap-in point for a real embedding model (Anthropic has no native embeddings
 * endpoint; Voyage AI is Anthropic's recommended partner). Implement embed()
 * against the Voyage AI embeddings API using `apiKey`.
 */
export class LiveVoyageEmbeddingProvider implements EmbeddingProvider {
  constructor(private readonly apiKey: string) {}

  async embed(_text: string): Promise<number[]> {
    throw new Error(
      `Live embedding provider not implemented yet (VOYAGE_API_KEY ${this.apiKey ? "set" : "unset"}). ` +
        "Set EMBEDDING_ADAPTER=mock or implement embed() against the Voyage AI embeddings API.",
    );
  }
}
