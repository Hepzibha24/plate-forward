import { Link } from "react-router-dom";
import { Radar } from "lucide-react";

export function NotFoundPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-base-950 px-6">
      <div className="panel max-w-md p-8 text-center">
        <Radar className="mx-auto h-8 w-8 text-accent-cyan" />
        <h1 className="mt-4 text-lg font-semibold text-slate-100">Page not found</h1>
        <p className="mt-2 text-sm text-slate-400">
          Nothing here — the incident or page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="mt-5 inline-block rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/20"
        >
          Back to Live Feed
        </Link>
      </div>
    </div>
  );
}
