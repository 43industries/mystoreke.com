"use client";

import { useCallback, useEffect, useState } from "react";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type Row = {
  id: string;
  status: string;
  pickup_address: string | null;
  dropoff_address: string | null;
  parcel_description: string | null;
  preferred_date: string | null;
  notes: string | null;
  created_at: string;
  renter_id: string;
};

const STATUSES = [
  "draft",
  "quoted",
  "assigned",
  "in_transit",
  "delivered",
  "cancelled",
] as const;

export default function AdminDeliveryJobsPanel() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<Record<string, boolean>>({});

  const load = useCallback(async () => {
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
      setLoading(false);
      return;
    }
    const res = await fetch("/api/delivery-jobs?scope=all", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok) {
      setError(typeof json.message === "string" ? json.message : "Could not load jobs.");
      setLoading(false);
      return;
    }
    setRows(Array.isArray(json) ? json : []);
    setError(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const updateStatus = async (id: string, status: string) => {
    if (!supabaseBrowser) return;
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const token = session?.access_token;
    if (!token) return;
    setPending((p) => ({ ...p, [id]: true }));
    try {
      const res = await fetch("/api/delivery-jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, status }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof json.message === "string" ? json.message : "Update failed.");
        return;
      }
      await load();
    } finally {
      setPending((p) => ({ ...p, [id]: false }));
    }
  };

  if (loading) {
    return (
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Delivery jobs</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">Loading…</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Delivery jobs</h2>
        <p className="mt-2 text-sm text-red-600">{error}</p>
      </section>
    );
  }

  if (rows.length === 0) {
    return (
      <section className="mt-12">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">Delivery jobs</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">No jobs yet.</p>
      </section>
    );
  }

  return (
    <section className="mt-12">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">Delivery jobs</h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Recent parcel / delivery requests. Update status as you progress the job.
      </p>
      <div className="mt-4 overflow-x-auto rounded-xl border border-[var(--border)] bg-[var(--white)]">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-[var(--border)] bg-[var(--background)] text-xs uppercase text-[var(--muted)]">
            <tr>
              <th className="px-3 py-2">Created</th>
              <th className="px-3 py-2">Route</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-[var(--border)] last:border-0">
                <td className="whitespace-nowrap px-3 py-2 text-[var(--muted)]">
                  {new Date(r.created_at).toLocaleString()}
                </td>
                <td className="max-w-xs px-3 py-2 text-[var(--foreground)]">
                  <span className="line-clamp-2">
                    {(r.pickup_address ?? "").slice(0, 80)}
                    {" → "}
                    {(r.dropoff_address ?? "").slice(0, 80)}
                  </span>
                </td>
                <td className="px-3 py-2 font-medium">{r.status}</td>
                <td className="px-3 py-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      className="rounded border border-[var(--border)] bg-[var(--background)] px-2 py-1 text-xs"
                      defaultValue={r.status}
                      id={`status-${r.id}`}
                      aria-label={`Status for job ${r.id}`}
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <button
                      type="button"
                      disabled={!!pending[r.id]}
                      className="rounded bg-[var(--primary)] px-2 py-1 text-xs font-medium text-white disabled:opacity-50"
                      onClick={() => {
                        const el = document.getElementById(
                          `status-${r.id}`,
                        ) as HTMLSelectElement | null;
                        if (el) void updateStatus(r.id, el.value);
                      }}
                    >
                      {pending[r.id] ? "…" : "Save"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
