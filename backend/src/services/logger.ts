export type PipelineStage =
  | "ingestion"
  | "categorization"
  | "evidence"
  | "correlation"
  | "historical"
  | "rca";

export function logStage(stage: PipelineStage, message: string, meta: Record<string, unknown> = {}) {
  console.log(
    JSON.stringify({
      timestamp: new Date().toISOString(),
      stage,
      message,
      ...meta,
    }),
  );
}
