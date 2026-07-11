import "dotenv/config";
import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { incidentsRouter } from "./routes/incidents.js";
import { alertsRouter } from "./routes/alerts.js";
import { mockRouter } from "./routes/mock.js";
import { startMockGenerator } from "./pipeline/ingestion/mockGenerator.js";
import { ingestAlert } from "./pipeline/orchestrator.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use("/api/incidents", incidentsRouter);
app.use("/api/alerts", alertsRouter);
app.use("/api/mock", mockRouter);

const port = Number(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`[server] listening on port ${port}`);
});

if (process.env.MOCK_ALERT_GENERATOR_ENABLED === "true") {
  const rateMs = Number(process.env.MOCK_ALERT_RATE_MS) || 20000;
  startMockGenerator(rateMs, async (raw) => {
    try {
      await ingestAlert(raw, "mock");
    } catch (err) {
      console.error("[mock-generator] ingest failed", err);
    }
  });
}
