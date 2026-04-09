"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";
import AdminServiceCopyEditor from "./AdminServiceCopyEditor";

type Overview = {
  pendingBookings: number;
  mpesaPaymentsPending: number;
  mpesaPaymentsPaidTotal: number;
  deliveryJobsDraft: number;
  generatedAt: string;
};

export default function AdminDashboardClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<Overview | null>(null);

  useEffect(() => {
    const run = async () => {
      if (!supabaseBrowser) {
        setError("Supabase is not configured.");
        setLoading(false);
        return;
      }
      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession();
      const token = session?.access_token;
      if (!token) {
        setError("Log in with an admin account.");
        setLoading(false);
        return;
      }
      const res = await fetch("/api/admin/overview", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "Could not load overview.");
        setLoading(false);
        return;
      }
      setData(json as Overview);
      setLoading(false);
    };
    void run();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            Mystore
          </Link>
          <span className="text-xs font-medium text-white/80">Admin</span>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">Operations</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Counts from your database. Add your user id to{" "}
          <span className="font-mono text-xs">MYSTORE_ADMIN_USER_IDS</span> in
          the server environment.
        </p>

        {loading && (
          <p className="mt-8 text-sm text-[var(--muted)]">Loading…</p>
        )}
        {error && !loading && (
          <p className="mt-8 text-sm text-red-600">{error}</p>
        )}
        {data && !loading && (
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            <li className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Bookings pending
              </p>
              <p className="mt-2 text-3xl font-bold text-[var(--primary)]">
                {data.pendingBookings}
              </p>
            </li>
            <li className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                M-Pesa pending
              </p>
              <p className="mt-2 text-3xl font-bold text-[var(--primary)]">
                {data.mpesaPaymentsPending}
              </p>
            </li>
            <li className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                M-Pesa paid (all time)
              </p>
              <p className="mt-2 text-3xl font-bold text-[var(--foreground)]">
                {data.mpesaPaymentsPaidTotal}
              </p>
            </li>
            <li className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Delivery jobs (draft)
              </p>
              <p className="mt-2 text-3xl font-bold text-[var(--primary)]">
                {data.deliveryJobsDraft}
              </p>
            </li>
          </ul>
        )}
        {data && (
          <p className="mt-6 text-xs text-[var(--muted)]">
            Updated {new Date(data.generatedAt).toLocaleString()}
          </p>
        )}

        <AdminServiceCopyEditor />
      </main>
    </div>
  );
}
