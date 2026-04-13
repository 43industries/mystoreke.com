"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

async function syncProfileToServer(
  accessToken: string,
  fullName: string,
  role: "renter" | "host" | "driver",
) {
  const res = await fetch("/api/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ fullName, role }),
  });
  if (!res.ok) {
     
    console.warn("Profile sync failed:", await res.text().catch(() => ""));
  }
}

export default function AuthPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"renter" | "host" | "driver">("renter");
  const [mode, setMode] = useState<"signup" | "login">("signup");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!supabaseBrowser) {
      setError("Supabase is not configured on the client.");
      return;
    }

    setLoading(true);
    try {
      if (mode === "signup") {
        const { data: signUpData, error: err } = await supabaseBrowser.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              role,
            },
          },
        });
        if (err) {
          setError(err.message);
        } else {
          if (signUpData.session?.access_token) {
            await syncProfileToServer(
              signUpData.session.access_token,
              fullName,
              role,
            );
            setMessage(
              "Sign-up successful. Your profile is saved. Check your email if confirmation is required.",
            );
          } else {
            setMessage(
              "Sign-up successful. After you confirm your email and log in, your profile will sync automatically.",
            );
          }
        }
      } else {
        const { data: signInData, error: err } =
          await supabaseBrowser.auth.signInWithPassword({
            email,
            password,
          });
        if (err) {
          setError(err.message);
        } else if (signInData.session?.access_token && signInData.user) {
          const meta = signInData.user.user_metadata ?? {};
          const metaRole = meta.role as string | undefined;
          const metaName = (meta.full_name as string | undefined) ?? "";
          const resolvedRole: "renter" | "host" | "driver" =
            metaRole === "host" || metaRole === "driver" || metaRole === "renter"
              ? metaRole
              : "renter";
          await syncProfileToServer(
            signInData.session.access_token,
            metaName,
            resolvedRole,
          );
          setMessage("Logged in successfully.");
        } else {
          setMessage("Logged in successfully.");
        }
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            Mystore
          </Link>
        </div>
      </header>
      <main className="mx-auto flex max-w-md flex-col px-4 py-12">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">
          {mode === "signup" ? "Create an account" : "Log in"}
        </h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Supabase Auth manages your credentials. With an active session we upsert your role and name into
          the database profiles table (apply supabase/schema.sql in Supabase if you have not already).
        </p>
        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
                required
              />
            </div>
          )}
          {mode === "signup" && (
            <div>
              <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
                I am signing up as
              </label>
              <select
                value={role}
                onChange={(e) =>
                  setRole(e.target.value as "renter" | "host" | "driver")
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="renter">Renter</option>
                <option value="host">Host</option>
                <option value="driver">Driver / Rider</option>
              </select>
            </div>
          )}
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              required
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "signup"
                ? "Sign up"
                : "Log in"}
          </button>
        </form>
        <div className="mt-4 text-sm text-[var(--muted)]">
          {mode === "signup" ? (
            <button
              type="button"
              onClick={() => setMode("login")}
              className="text-[var(--primary)] hover:underline"
            >
              Already have an account? Log in
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-[var(--primary)] hover:underline"
            >
              Need an account? Sign up
            </button>
          )}
        </div>
        {message && (
          <p className="mt-4 text-sm text-green-600">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-sm text-red-600">
            {error}
          </p>
        )}
      </main>
    </div>
  );
}

