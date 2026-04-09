"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type HostListingRow = {
  id: string;
  title: string;
  city: string;
  county: string;
  pricePerMonth: number | null;
  createdAt: string;
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
      const {
        data: { session },
      } = await supabaseBrowser.auth.getSession();
      const accessToken = session?.access_token;
      if (!userId) {
        setError("Please log in to see your host dashboard.");
        setLoading(false);
        return;
      }
      if (!accessToken) {
        setError("Session expired. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`/api/listings?hostId=${encodeURIComponent(userId)}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
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
      <SiteHeader />

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
                  {l.pricePerMonth != null
                    ? `KES ${Number(l.pricePerMonth).toLocaleString()}/month`
                    : "Price not set"}
                </p>
                <p className="mt-1 text-xs text-[var(--muted)]">
                  Created at {new Date(l.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
