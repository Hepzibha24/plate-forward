import { EmbeddingProvider } from "../types.js";
import { MockEmbeddingProvider } from "./mockEmbeddingProvider.js";
import { LiveVoyageEmbeddingProvider } from "./liveEmbeddingProvider.js";

export function getEmbeddingProvider(): EmbeddingProvider {
  if ((process.env.EMBEDDING_ADAPTER ?? "mock") === "live") {
    return new LiveVoyageEmbeddingProvider(process.env.VOYAGE_API_KEY ?? "");
  }
  return new MockEmbeddingProvider();
}
