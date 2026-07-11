import { EmbeddingProvider } from "../types.js";
import { embedText } from "./hashEmbedding.js";

export class MockEmbeddingProvider implements EmbeddingProvider {
  async embed(text: string): Promise<number[]> {
    return embedText(text);
  }
}
