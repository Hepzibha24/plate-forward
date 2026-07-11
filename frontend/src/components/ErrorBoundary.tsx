import { Component, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: { componentStack: string }) {
    console.error("[ErrorBoundary]", error, info.componentStack);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-screen items-center justify-center bg-base-950 px-6">
          <div className="panel max-w-md p-8 text-center">
            <AlertTriangle className="mx-auto h-8 w-8 text-severity-critical" />
            <h1 className="mt-4 text-lg font-semibold text-slate-100">Something went wrong</h1>
            <p className="mt-2 text-sm text-slate-400">
              An unexpected error occurred while rendering this page. Reloading usually fixes it.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-md border border-accent-cyan/40 bg-accent-cyan/10 px-4 py-2 text-sm font-medium text-accent-cyan hover:bg-accent-cyan/20"
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
