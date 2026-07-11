# Payment Incident Intelligence Platform

Ingests payments monitoring alerts, classifies them, gathers evidence, correlates
noise into incidents, checks historical precedent, and uses Claude to propose a
root cause and recommendation — surfaced on a real-time dashboard.

The full pipeline is in place: alert ingestion (mock generator + Alertmanager-shaped
webhook endpoint) → rule-based/LLM categorization → evidence collection
(mock Prometheus/Grafana, swappable for live) → correlation & noise reduction →
historical incident retrieval (embedding similarity) → Claude-powered root cause
analysis and recommendation. Every stage's output is visible on the incident
detail page, not just the final answer.

## Structure

```
frontend/   Vite + React + TypeScript + Tailwind — dashboard UI
backend/    Node + TypeScript + Express — API, pipeline, Firebase Admin, Claude
firestore.rules, firebase.json   Firestore security rules / project config
```

## Prerequisites

- Node.js 20+
- A Firebase project with **Authentication (Email/Password)** and
  **Firestore** enabled (or the Firebase emulator suite for local dev)
- An Anthropic API key (optional — RCA and LLM-fallback classification
  degrade gracefully to clear placeholders without one; everything else
  works fully on mock data)

## Setup

### 1. Frontend

```
cd frontend
cp .env.example .env      # fill in your Firebase web app config
npm install
npm run dev                # http://localhost:5173
```

### 2. Backend

```
cd backend
cp .env.example .env      # fill in Firebase service account + ANTHROPIC_API_KEY
npm install
npm run dev                 # http://localhost:8080
```

Firebase Admin credentials: either set `FIREBASE_PROJECT_ID` /
`FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY` from a service account key,
or leave them unset to use Application Default Credentials (Cloud Run) / the
Firebase emulator (`FIRESTORE_EMULATOR_HOST`, `FIREBASE_AUTH_EMULATOR_HOST`).

### 3. Seed mock data

With backend `.env` pointed at a real Firestore (or the emulator):

```
cd backend
npm run seed              # a handful of hand-authored mock incidents
npm run seed:historical   # a library of past resolved incidents for Phase 5 retrieval
```

Incidents seeded by `npm run seed` are just there to populate the dashboard
immediately; from then on, incidents are created by the ingestion pipeline
(mock generator or `POST /api/alerts/ingest`).

### 4. Sign in and become an admin

Create a user in Firebase Authentication (email/password) and sign in from
the frontend — the app self-provisions a `users/{uid}` Firestore document
for you with `role: "viewer"` on first login (Firestore rules only allow a
user to create their *own* profile, and only as viewer, to prevent
self-promotion).

To do anything beyond viewing (trigger mock alerts, re-run RCA, manage other
users), that first account needs to be promoted to `admin` once, by hand,
outside the app:

- **Emulator / local dev:** use the Emulator UI (`http://localhost:4000/firestore`)
  to edit the `users/{uid}` doc's `role` field directly, or run a small
  script with `firebase-admin` pointed at the emulator.
- **Real Firebase project:** edit the same field in the Firestore console,
  or run a one-off script with the Admin SDK (bypasses security rules).

Once one admin exists, they can promote/demote anyone else from
**Settings → User Management** in the app.

## Deployment

- **Backend** — containerized for **Cloud Run** (`backend/Dockerfile`, multi-stage build).
  ```
  cd backend
  gcloud run deploy payment-ioc-backend --source . --region <region> \
    --set-env-vars ANTHROPIC_API_KEY=...,FIREBASE_PROJECT_ID=...,CORS_ALLOWED_ORIGINS=https://your-frontend-domain
  ```
  Set `CORS_ALLOWED_ORIGINS` to a comma-separated list of allowed origins in
  production — it defaults to allowing all origins, which is fine for local
  dev but should be locked down once the frontend has a real domain.
- **Frontend** — static build, deployable to Firebase Hosting (already
  configured in `firebase.json`, pointed at `frontend/dist`) or any static host.
  ```
  cd frontend && npm run build
  npx firebase-tools deploy --only hosting
  ```

## Roadmap

Foundation → Ingestion & Categorization → Evidence Collection → Correlation &
Noise Reduction → Historical Retrieval → RCA & Recommendation → Polish &
Hardening — all phases complete.
