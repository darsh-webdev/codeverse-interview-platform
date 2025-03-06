"use client";
import { useUserRole } from "@/hooks/use-user-role";

export default function Home() {
  const { isInterviewer } = useUserRole();
  return (
    <div className="container mx-auto max-w-7xl p-6">
      {/* WELCOME SECTION */}
      <div className="rounded-lg bg-card p-6 border shadow-sm mb-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-700 to-violet-500 bg-clip-text text-transparent">
          Welcome Back!
        </h1>
        <p className="pt-2 text-muted-foreground">
          {isInterviewer
            ? "Manage your interviews and review candidates effectively"
            : "Access your upcoming interviews and preparations"}
        </p>
      </div>

      {isInterviewer ? (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            Show Something here...
          </div>
        </>
      ) : (
        <>
          <div>Candidate view goes here...</div>
        </>
      )}
    </div>
  );
}
