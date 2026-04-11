"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [storageType, setStorageType] = useState("");
  const [duration, setDuration] = useState("month");
  const [priceBand, setPriceBand] = useState("");
  const [parcelOnly, setParcelOnly] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location.trim()) params.set("location", location.trim());
    if (storageType) params.set("type", storageType);
    if (duration) params.set("duration", duration);
    if (priceBand) params.set("priceBand", priceBand);
    if (parcelOnly) params.set("parcelOnly", "true");

    const qs = params.toString();
    router.push(`/storage${qs ? `?${qs}` : ""}`);
  };

  const fieldClass =
    "w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-left text-base outline-none focus:ring-2 focus:ring-[var(--primary)]";

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--white)] shadow-2xl shadow-[rgba(15,23,42,0.25)]"
    >
      <div className="bg-[var(--primary)] px-4 py-4 text-center md:px-6 md:py-5">
        <p className="text-xl font-bold text-white normal-case md:text-2xl">
          Search storage near you
        </p>
        <p className="mt-2 text-base font-medium text-white/90 normal-case">
          Choose location, type, duration and budget to see matching spaces.
        </p>
        <label className="mt-3 flex cursor-pointer items-center justify-center gap-2 text-sm font-medium text-white/95">
          <input
            type="checkbox"
            checked={parcelOnly}
            onChange={(e) => setParcelOnly(e.target.checked)}
            className="h-4 w-4 rounded border-white/40 bg-white/10 text-[var(--accent)] focus:ring-[var(--accent)]"
          />
          <span>Only show parcel pickup &amp; drop-off locations</span>
        </label>
      </div>
      <div className="p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <label htmlFor="hero-location" className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Location
            </label>
            <input
              id="hero-location"
              type="text"
              placeholder="City or area"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              autoComplete="address-level2"
              className={`${fieldClass} placeholder:text-center`}
            />
          </div>
          <div>
            <label htmlFor="hero-storage-type" className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Storage type
            </label>
            <select
              id="hero-storage-type"
              value={storageType}
              onChange={(e) => setStorageType(e.target.value)}
              className={fieldClass}
            >
              <option value="">Any type</option>
              <option value="residential">Residential Storage</option>
              <option value="commercial">Commercial Storage</option>
              <option value="warehouse">Warehouse Storage</option>
              <option value="yard">Open Yard Storage</option>
              <option value="shelf">Shared Shop/Shelf Space</option>
              <option value="budget">Budget Units</option>
              <option value="parcel">Pickup &amp; Drop-Off Point Vendor</option>
            </select>
          </div>
          <div>
            <label htmlFor="hero-duration" className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Rental duration
            </label>
            <select
              id="hero-duration"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className={fieldClass}
            >
              <option value="day">Per day</option>
              <option value="week">Per week</option>
              <option value="month">Per month</option>
            </select>
          </div>
          <div>
            <label htmlFor="hero-price-band" className="mb-1 block text-sm font-semibold text-[var(--muted)]">
              Budget (per month)
            </label>
            <select
              id="hero-price-band"
              value={priceBand}
              onChange={(e) => setPriceBand(e.target.value)}
              className={fieldClass}
            >
              <option value="">Any budget</option>
              <option value="lt10k">Below KES 10,000</option>
              <option value="10k-20k">KES 10,000 – 20,000</option>
              <option value="20k-30k">KES 20,000 – 30,000</option>
              <option value="gt30k">Above KES 30,000</option>
            </select>
          </div>
          <div className="flex items-end">
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-base font-semibold text-[var(--accent-foreground)] shadow-sm transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
            >
              <span>Search storage</span>
              <span aria-hidden>🔍</span>
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
