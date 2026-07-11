import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Navbar } from "./Navbar";

export function AppShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-screen bg-base-950">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar title={title} />
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
