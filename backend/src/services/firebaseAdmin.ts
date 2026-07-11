import { cert, getApps, initializeApp, type App } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

function buildApp(): App {
  if (getApps().length) return getApps()[0]!;

  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  // Falls back to Application Default Credentials (e.g. on Cloud Run) or
  // to the Firebase emulator when FIRESTORE_EMULATOR_HOST / FIREBASE_AUTH_EMULATOR_HOST
  // are set in the environment.
  return initializeApp({ projectId });
}

export const firebaseApp = buildApp();
export const adminAuth = getAuth(firebaseApp);
export const adminDb = getFirestore(firebaseApp);
