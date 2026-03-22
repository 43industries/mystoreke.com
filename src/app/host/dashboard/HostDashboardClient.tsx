"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type HostListingRow = {
  id: string;
  title: string;
  city: string;
  county: string;
  price_per_month: number | null;
  created_at: string;
};

export default function HostDashboardClient() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [listings, setListings] = useState<HostListingRow[]>([]);

  useEffect(() => {
    const load = async () => {
      if (!supabaseBrowser) {
        setError("Dashboard is not available right now.");
        setLoading(false);
        return;
      }

      const { data } = await supabaseBrowser.auth.getUser();
      const userId = data.user?.id;
      if (!userId) {
        setError("Please log in to see your host dashboard.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/listings?hostId=${encodeURIComponent(userId)}`);
        const json = await res.json().catch(() => []);
        if (!res.ok) {
          setError(json.message || "Could not load listings.");
          setLoading(false);
          return;
        }
        setListings(json as HostListingRow[]);
      } catch {
        setError("Network error while loading listings.");
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
            <Link href="/become-a-driver" className="hover:text-white">Become Driver/Rider</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">Host Dashboard</h1>
        <p className="mt-4 text-[var(--muted)]">
          See and manage the listings you&apos;ve created.
        </p>

        <div className="mt-6 flex justify-between gap-4">
          <Link
            href="/list-your-space"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Create a new listing
          </Link>
        </div>

        {loading && (
          <p className="mt-8 text-sm text-[var(--muted)]">
            Loading your listings…
          </p>
        )}

        {error && !loading && (
          <p className="mt-8 text-sm text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && listings.length === 0 && (
          <p className="mt-8 text-sm text-[var(--muted)]">
            You haven&apos;t created any listings yet.
          </p>
        )}

        {!loading && !error && listings.length > 0 && (
          <section className="mt-8 grid gap-4 md:grid-cols-2">
            {listings.map((l) => (
              <div
                key={l.id}
                className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-5"
              >
                <h2 className="text-sm font-semibold text-[var(--foreground)]">
                  {l.title}
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  {l.city}, {l.county}
                </p>
                <p className="mt-2 text-sm font-semibold text-[var(--primary)]">
                  {l.price_per_month
                    ? `KES ${Number(l.price_per_month).toLocaleString()}/month`
                    : "Price not set"}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Created at {new Date(l.created_at).toLocaleDateString()}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
