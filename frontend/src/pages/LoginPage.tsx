import { FormEvent, useState } from "react";
import { Navigate } from "react-router-dom";
import { Activity } from "lucide-react";
import { useAuth } from "@/lib/authContext";

export function LoginPage() {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center bg-base-950">
      <div className="panel w-full max-w-sm p-8">
        <div className="mb-6 flex items-center gap-2">
          <Activity className="h-6 w-6 text-accent-cyan" />
          <span className="mono text-base font-semibold text-slate-100">PAYMENT IOC</span>
        </div>
        <h2 className="mb-1 text-lg font-semibold text-slate-100">Sign in</h2>
        <p className="mb-6 text-sm text-slate-500">Payment Incident Intelligence Platform</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
              Email
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-panel-border bg-base-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent-cyan"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs uppercase tracking-wide text-slate-500">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-panel-border bg-base-800 px-3 py-2 text-sm text-slate-100 outline-none focus:border-accent-cyan"
            />
          </div>

          {error && <p className="text-sm text-severity-critical">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 rounded-md bg-accent-cyan/10 border border-accent-cyan/40 py-2 text-sm font-medium text-accent-cyan transition-colors hover:bg-accent-cyan/20 disabled:opacity-50"
          >
            {submitting ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
