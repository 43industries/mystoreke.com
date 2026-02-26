"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  MOCK_LISTINGS,
  STORAGE_TYPES,
  STORAGE_TYPE_DETAILS,
  type StorageListing,
} from "./data";

export default function StorageSearch() {
  const searchParams = useSearchParams();
  const [location, setLocation] = useState("");
  const [storageType, setStorageType] = useState("");
  const [duration, setDuration] = useState<"day" | "week" | "month">("month");

  // Initialize storage type from query string (e.g. /storage?type=residential)
  useEffect(() => {
    const slug = searchParams.get("type");
    if (!slug) return;
    const details = STORAGE_TYPE_DETAILS[slug];
    if (details) {
      setStorageType(details.label);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...MOCK_LISTINGS];
    if (location.trim()) {
      const q = location.toLowerCase();
      list = list.filter(
        (l) =>
          l.city.toLowerCase().includes(q) || l.county.toLowerCase().includes(q)
      );
    }
    if (storageType) {
      list = list.filter((l) => l.storageType === storageType);
    }
    return list;
  }, [location, storageType]);

  const formatPrice = (listing: StorageListing) => {
    const n =
      duration === "day"
        ? listing.pricePerDay
        : duration === "week"
          ? listing.pricePerWeek
          : listing.pricePerMonth;
    return `KES ${n.toLocaleString()}${
      duration === "day" ? "/day" : duration === "week" ? "/wk" : "/mo"
    }`;
  };

  const activeTypeDetails = storageType
    ? Object.values(STORAGE_TYPE_DETAILS).find(
        (d) => d.label === storageType,
      )
    : undefined;

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="text-sm font-medium text-[var(--primary)] hover:underline"
        >
          ← Back to MyStoreKE
        </Link>
        <h1 className="mt-4 text-2xl font-bold text-[var(--foreground)]">
          Find Storage
        </h1>
        <p className="mt-1 text-[var(--muted)]">
          Browse listings. Use filters to narrow by location and type.
        </p>

        {/* Filters */}
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--white)] p-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                Location (city or county)
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. Nairobi, Mombasa"
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                Storage type
              </label>
              <select
                value={storageType}
                onChange={(e) => setStorageType(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">All types</option>
                {STORAGE_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                Show price per
              </label>
              <select
                value={duration}
                onChange={(e) =>
                  setDuration(e.target.value as "day" | "week" | "month")
                }
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="day">Day</option>
                <option value="week">Week</option>
                <option value="month">Month</option>
              </select>
            </div>
          </div>
        </div>

        {activeTypeDetails && (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-[var(--muted)]">
              About {activeTypeDetails.label}
            </h2>
            <p className="mt-2 text-sm text-[var(--foreground)]">
              {activeTypeDetails.description}
            </p>
            <p className="mt-2 text-xs text-[var(--muted)]">
              Ideal for: {activeTypeDetails.idealUse}
            </p>
          </div>
        )}

        <p className="mt-4 text-sm text-[var(--muted)]">
          {filtered.length} listing{filtered.length !== 1 ? "s" : ""} found
        </p>

        {/* Listings grid */}
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <Link
              key={listing.id}
              href={`/storage/${listing.id}`}
              className="group overflow-hidden rounded-xl border border-[var(--border)] bg-[var(--white)] transition-shadow hover:shadow-md"
            >
              <div className="flex aspect-[16/10] items-center justify-center bg-[var(--border)] text-sm text-[var(--muted)]">
                Photo
              </div>
              <div className="p-4">
                <h2 className="font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)]">
                  {listing.title}
                </h2>
                <p className="mt-1 text-sm text-[var(--muted)]">
                  {listing.city}, {listing.county}
                </p>
                <p className="mt-2 text-sm text-[var(--foreground)]">
                  {listing.storageType}
                  {listing.size > 0 && ` · ${listing.size} ${listing.sizeUnit}`}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="font-semibold text-[var(--primary)]">
                    {formatPrice(listing)}
                  </span>
                  <span className="text-sm text-[var(--muted)]">
                    {listing.rating} ★ ({listing.reviewCount})
                  </span>
                </div>
                {listing.parcelDropOff && (
                  <span className="mt-2 inline-block rounded bg-[var(--accent)]/10 px-2 py-0.5 text-xs font-medium text-[var(--accent)]">
                    Parcel drop-off
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--white)] p-12 text-center text-[var(--muted)]">
            No listings match your filters. Try a different location or type.
          </div>
        )}
      </div>
    </div>
  );
}
