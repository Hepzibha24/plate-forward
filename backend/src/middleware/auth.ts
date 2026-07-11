import type { NextFunction, Request, Response } from "express";
import { adminAuth, adminDb } from "../services/firebaseAdmin.js";

export type Role = "viewer" | "responder" | "admin";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      uid?: string;
      role?: Role;
    }
  }
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) {
    res.status(401).json({ error: "Missing bearer token" });
    return;
  }

  const token = header.slice("Bearer ".length);
  try {
    const decoded = await adminAuth.verifyIdToken(token);
    req.uid = decoded.uid;

    const profileSnap = await adminDb.collection("users").doc(decoded.uid).get();
    req.role = (profileSnap.data()?.role as Role | undefined) ?? "viewer";

    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function requireRole(...roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.role || !roles.includes(req.role)) {
      res.status(403).json({ error: "Insufficient role" });
      return;
    }
    next();
  };
}
