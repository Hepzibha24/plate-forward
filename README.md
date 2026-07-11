# Payment Incident Intelligence Platform

Ingests payments monitoring alerts, classifies them, gathers evidence, correlates
noise into incidents, checks historical precedent, and uses Claude to propose a
root cause and recommendation — surfaced on a real-time dashboard.

Phase 1 (Foundation) is in place: repo scaffold, Firebase Auth login, and a
live incident feed backed by Firestore. The processing pipeline (ingestion,
categorization, evidence, correlation, historical retrieval, RCA) lands in
later phases.

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
- An Anthropic API key (needed from Phase 6 onward; not required for Phase 1)

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

### 3. Seed mock incidents

With backend `.env` pointed at a real Firestore (or the emulator):

```
cd backend
npm run seed
```

This writes a handful of hand-authored mock incidents so the Live Incident
Feed has something to render. From Phase 2 onward incidents will be created
by the ingestion pipeline instead.

### 4. Create a user

Create a user in Firebase Authentication (email/password), then add a
matching `users/{uid}` Firestore document with a `role` field
(`viewer` | `responder` | `admin`) to control access per `firestore.rules`.

## Deployment target

The backend is built to run as a container on **Cloud Run** (see
`backend/Dockerfile`); the frontend deploys as a static build (e.g. Firebase
Hosting, pointed at `frontend/dist`).

## Roadmap

See the phased build plan: Foundation → Ingestion & Categorization → Evidence
Collection → Correlation & Noise Reduction → Historical Retrieval → RCA &
Recommendation → Polish & Hardening.
