import { EmbeddingProvider } from "../types.js";

const VOYAGE_MODEL = "voyage-3";

interface VoyageEmbeddingsResponse {
  data: Array<{ embedding: number[]; index: number }>;
}

/**
 * Real embedding provider using Voyage AI (Anthropic's recommended embeddings
 * partner — Anthropic has no native embeddings endpoint).
 */
export class LiveVoyageEmbeddingProvider implements EmbeddingProvider {
  constructor(private readonly apiKey: string) {}

  async embed(text: string): Promise<number[]> {
    if (!this.apiKey) {
      throw new Error("VOYAGE_API_KEY is not set; required when EMBEDDING_ADAPTER=live.");
    }

    const response = await fetch("https://api.voyageai.com/v1/embeddings", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        input: text,
        model: VOYAGE_MODEL,
        input_type: "document",
      }),
    });

    if (!response.ok) {
      throw new Error(`Voyage AI embeddings request failed (HTTP ${response.status})`);
    }

    const body = (await response.json()) as VoyageEmbeddingsResponse;
    const embedding = body.data[0]?.embedding;
    if (!embedding) {
      throw new Error("Voyage AI embeddings response contained no embedding");
    }

    return embedding;
  }
}
