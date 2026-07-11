import "dotenv/config";
import express from "express";
import cors from "cors";
import { healthRouter } from "./routes/health.js";
import { incidentsRouter } from "./routes/incidents.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use(healthRouter);
app.use("/api/incidents", incidentsRouter);

const port = Number(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`[server] listening on port ${port}`);
});
