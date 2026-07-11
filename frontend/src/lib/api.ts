import { auth } from "./firebase";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080";

export async function apiFetch(path: string, init: RequestInit = {}) {
  const token = await auth.currentUser?.getIdToken();
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error ?? `Request failed with status ${response.status}`);
  }

  return response.json();
}

export function generateMockAlerts(count = 1) {
  return apiFetch(`/api/mock/generate?count=${count}`, { method: "POST" });
}
