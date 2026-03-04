"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { STORAGE_TYPES, STORAGE_TYPE_DETAILS, type StorageListing } from "./data";

export default function StorageSearch() {
  const searchParams = useSearchParams();
  const [allListings, setAllListings] = useState<StorageListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState("");
  const [storageType, setStorageType] = useState("");
  const [duration, setDuration] = useState<"day" | "week" | "month">("month");
  const [priceBand, setPriceBand] = useState("");
  const [parcelOnly, setParcelOnly] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadListings = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch("/api/listings");
        if (!res.ok) {
          throw new Error("Failed to load listings");
        }
        const data = (await res.json()) as StorageListing[];
        if (!cancelled) {
          setAllListings(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "Something went wrong while loading listings",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadListings();

    return () => {
      cancelled = true;
    };
  }, []);

  // Initialize filters from query string (e.g. /storage?type=residential&location=Nairobi)
  useEffect(() => {
    const slug = searchParams.get("type");
    const initialLocation = searchParams.get("location");
    const initialDuration = searchParams.get("duration") as
      | "day"
      | "week"
      | "month"
      | null;
    const initialPriceBand = searchParams.get("priceBand");
    const initialParcelOnly = searchParams.get("parcelOnly");

    if (initialLocation) {
      setLocation(initialLocation);
    }

    if (slug) {
      const details = STORAGE_TYPE_DETAILS[slug];
      if (details) {
        setStorageType(details.label);
      }
    }

    if (initialDuration && ["day", "week", "month"].includes(initialDuration)) {
      setDuration(initialDuration);
    }

    if (initialPriceBand) {
      setPriceBand(initialPriceBand);
    }

    if (initialParcelOnly === "true") {
      setParcelOnly(true);
    }
  }, [searchParams]);

  const filtered = useMemo(() => {
    let list = [...allListings];
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

    if (priceBand) {
      list = list.filter((l) => {
        const price = l.pricePerMonth;
        if (priceBand === "lt10k") return price < 10000;
        if (priceBand === "10k-20k") return price >= 10000 && price <= 20000;
        if (priceBand === "20k-30k") return price > 20000 && price <= 30000;
        if (priceBand === "gt30k") return price > 30000;
        return true;
      });
    }

    if (parcelOnly) {
      list = list.filter((l) => l.parcelDropOff);
    }
    return list;
  }, [allListings, location, storageType, priceBand, parcelOnly]);

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
            <div>
              <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                Budget (per month)
              </label>
              <select
                value={priceBand}
                onChange={(e) => setPriceBand(e.target.value)}
                className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
              >
                <option value="">Any budget</option>
                <option value="lt10k">Below KES 10,000</option>
                <option value="10k-20k">KES 10,000 – 20,000</option>
                <option value="20k-30k">KES 20,000 – 30,000</option>
                <option value="gt30k">Above KES 30,000</option>
              </select>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setLocation("Nairobi");
                  setStorageType("Warehouse Storage");
                  setPriceBand("20k-30k");
                  setParcelOnly(false);
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
              >
                Popular: Nairobi warehouse
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocation("Nairobi");
                  setStorageType("Budget Units");
                  setPriceBand("lt10k");
                  setParcelOnly(false);
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
              >
                Popular: Budget units in Nairobi
              </button>
              <button
                type="button"
                onClick={() => {
                  setLocation("");
                  setStorageType("");
                  setDuration("month");
                  setPriceBand("");
                  setParcelOnly(false);
                }}
                className="rounded-full border border-[var(--border)] bg-[var(--background)] px-3 py-1 text-xs font-medium text-[var(--muted)] hover:border-[var(--primary)]/40 hover:text-[var(--primary)]"
              >
                Clear filters
              </button>
            </div>
            <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
              <input
                type="checkbox"
                checked={parcelOnly}
                onChange={(e) => setParcelOnly(e.target.checked)}
                className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
              />
              <span>Only show locations that offer parcel drop-off</span>
            </label>
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
          {loading
            ? "Loading listings..."
            : error
              ? "We couldn’t load listings. Please try again."
              : `${filtered.length} listing${
                  filtered.length !== 1 ? "s" : ""
                } found`}
        </p>

        {/* Listings grid */}
        {!loading && !error && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((listing) => (
            <Link
              key={listing.id}
              href={`/storage/${listing.id}`}
              className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--white)] shadow-sm ring-1 ring-transparent transition-all hover:-translate-y-1 hover:border-[var(--primary)]/25 hover:shadow-lg hover:ring-[var(--primary)]/15"
            >
              <div className="relative aspect-[16/10] w-full bg-[var(--border)]">
                <div className="absolute inset-0 flex items-center justify-center text-xs font-medium uppercase tracking-[0.18em] text-[var(--muted)]">
                  Storage photo
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent opacity-80" />
                <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 rounded-full bg-black/45 px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{listing.storageType}</span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h2 className="text-sm font-semibold text-[var(--foreground)] group-hover:text-[var(--primary)] md:text-base">
                  {listing.title}
                </h2>
                <p className="mt-1 text-xs text-[var(--muted)] md:text-sm">
                  {listing.city}, {listing.county}
                </p>
                <p className="mt-2 text-xs text-[var(--foreground)] md:text-sm">
                  {listing.size > 0 && `${listing.size} ${listing.sizeUnit} · `}
                  <span className="text-[var(--muted)]">
                    {listing.security.slice(0, 2).join(" · ")}
                    {listing.security.length > 2 && " · + more"}
                  </span>
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold text-[var(--primary)] md:text-base">
                    {formatPrice(listing)}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[var(--background)] px-2 py-0.5 text-xs text-[var(--muted)]">
                    <span className="text-[var(--accent)]">★</span>
                    {listing.rating} ({listing.reviewCount})
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {listing.parcelDropOff && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/10 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.16em] text-[var(--accent)]">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                      Parcel drop-off
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}

        {filtered.length === 0 && (
          <div className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--white)] p-12 text-center text-[var(--muted)]">
            No listings match your filters. Try a different location or type.
          </div>
        )}
      </div>
    </div>
  );
}
