"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type BookingRow = {
  id: string;
  start_date: string;
  end_date: string;
  duration_unit: string;
  total_price: number;
  status: string;
  listings: {
    id: string;
    title: string;
    city: string;
    county: string;
  } | null;
};

type DeliveryJobRow = {
  id: string;
  status: string;
  pickup_address: string | null;
  dropoff_address: string | null;
  created_at: string;
};

export default function MyBookingsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingRow[]>([]);
  const [jobs, setJobs] = useState<DeliveryJobRow[]>([]);
  const [jobAction, setJobAction] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!supabaseBrowser) {
        setError("Bookings are not available right now.");
        setLoading(false);
        return;
      }

      const { data } = await supabaseBrowser.auth.getUser();
      const userId = data.user?.id;
      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession();
      const accessToken = session?.access_token;

      if (!userId) {
        setError("Please log in to see your bookings.");
        setLoading(false);
        return;
      }
      if (!accessToken) {
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const [bRes, jRes] = await Promise.all([
          fetch(`/api/bookings?renterId=${encodeURIComponent(userId)}`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
          fetch("/api/delivery-jobs", {
            headers: { Authorization: `Bearer ${accessToken}` },
          }),
        ]);
        const bJson = await bRes.json().catch(() => []);
        if (!bRes.ok) {
          setError(bJson.message || "Could not load bookings.");
          setLoading(false);
          return;
        }
        setBookings(bJson as BookingRow[]);

        const jJson = await jRes.json().catch(() => []);
        if (jRes.ok && Array.isArray(jJson)) {
          setJobs(jJson as DeliveryJobRow[]);
        } else {
          setJobs([]);
        }
      } catch {
        setError("Network error while loading bookings.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const cancelDraftJob = async (jobId: string) => {
    if (!supabaseBrowser) return;
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const token = session?.access_token;
    if (!token) return;
    setJobAction(jobId);
    try {
      const res = await fetch("/api/delivery-jobs", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: jobId, status: "cancelled" }),
      });
      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId ? { ...j, status: "cancelled" } : j)),
        );
      }
    } finally {
      setJobAction(null);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            Mystore
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-white/90">
            <Link href="/storage" className="hover:text-white">Find Storage</Link>
            <Link href="/list-your-space" className="hover:text-white">List Your Space</Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold text-[var(--foreground)]">My bookings</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          View the storage bookings you&apos;ve requested.
        </p>
        {loading && (
          <p className="mt-6 text-sm text-[var(--muted)]">Loading bookings…</p>
        )}
        {error && !loading && (
          <p className="mt-6 text-sm text-red-600">{error}</p>
        )}
        {!loading && !error && bookings.length === 0 && (
          <p className="mt-6 text-sm text-[var(--muted)]">
            You don&apos;t have any bookings yet.
          </p>
        )}
        {!loading && !error && bookings.length > 0 && (
          <div className="mt-6 space-y-4">
            {bookings.map((b) => (
              <div
                key={b.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-sm font-semibold text-[var(--foreground)]">
                      {b.listings?.title ?? "Listing"}
                    </h2>
                    <p className="text-xs text-[var(--muted)]">
                      {b.listings
                        ? `${b.listings.city}, ${b.listings.county}`
                        : ""}
                    </p>
                  </div>
                  <span className="rounded-full bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)]">
                    {b.status}
                  </span>
                </div>
                <div className="mt-3 text-sm text-[var(--muted)]">
                  <span>
                    {b.start_date} → {b.end_date} ({b.duration_unit})
                  </span>
                </div>
                <div className="mt-2 text-sm font-semibold text-[var(--primary)]">
                  KES {Number(b.total_price).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && (
          <section className="mt-12">
            <h2 className="text-xl font-bold text-[var(--foreground)]">My delivery jobs</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Draft parcel requests you submitted from{" "}
              <Link href="/parcel-drop-off" className="font-medium text-[var(--primary)] hover:underline">
                Parcel pickup &amp; drop-off
              </Link>
              .
            </p>
            {jobs.length === 0 ? (
              <p className="mt-4 text-sm text-[var(--muted)]">No delivery jobs yet.</p>
            ) : (
              <ul className="mt-4 space-y-3">
                {jobs.map((j) => (
                  <li
                    key={j.id}
                    className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-4 text-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium capitalize text-[var(--foreground)]">
                        {j.status.replace(/_/g, " ")}
                      </span>
                      {j.status === "draft" && (
                        <button
                          type="button"
                          disabled={jobAction === j.id}
                          className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                          onClick={() => void cancelDraftJob(j.id)}
                        >
                          {jobAction === j.id ? "Cancelling…" : "Cancel draft"}
                        </button>
                      )}
                    </div>
                    <p className="mt-2 text-[var(--muted)]">
                      <span className="font-medium text-[var(--foreground)]">From:</span>{" "}
                      {j.pickup_address ?? "—"}
                    </p>
                    <p className="mt-1 text-[var(--muted)]">
                      <span className="font-medium text-[var(--foreground)]">To:</span>{" "}
                      {j.dropoff_address ?? "—"}
                    </p>
                    <p className="mt-2 text-xs text-[var(--muted)]">
                      {new Date(j.created_at).toLocaleString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

