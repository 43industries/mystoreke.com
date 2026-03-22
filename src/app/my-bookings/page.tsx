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

export default function MyBookingsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<BookingRow[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!supabaseBrowser) {
        setError("Bookings are not available right now.");
        setLoading(false);
        return;
      }

      const { data } = await supabaseBrowser.auth.getUser();
      const userId = data.user?.id;

      if (!userId) {
        setError("Please log in to see your bookings.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/bookings?renterId=${encodeURIComponent(userId)}`);
        const json = await res.json().catch(() => []);
        if (!res.ok) {
          setError(json.message || "Could not load bookings.");
          setLoading(false);
          return;
        }
        setBookings(json as BookingRow[]);
      } catch {
        setError("Network error while loading bookings.");
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

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
      </main>
    </div>
  );
}

