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

  return (
    <form
      onSubmit={onSubmit}
      className="mx-auto mt-10 max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--white)] p-4 shadow-2xl shadow-[rgba(15,23,42,0.25)] md:p-6"
    >
      <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]">
        Search storage near you
      </p>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr,1.5fr,1.5fr,1.5fr,auto]">
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
            Location
          </label>
          <input
            type="text"
            placeholder="City or area"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div className="flex flex-col justify-end">
          <label className="inline-flex items-center gap-2 text-xs font-medium text-[var(--muted)]">
            <input
              type="checkbox"
              checked={parcelOnly}
              onChange={(e) => setParcelOnly(e.target.checked)}
              className="h-4 w-4 rounded border-[var(--border)] text-[var(--accent)] focus:ring-[var(--accent)]"
            />
            <span>Only show parcel drop-off locations</span>
          </label>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
            Storage Type
          </label>
          <select
            value={storageType}
            onChange={(e) => setStorageType(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="">Any type</option>
            <option value="residential">Residential</option>
            <option value="commercial">Commercial</option>
            <option value="warehouse">Warehouse</option>
            <option value="yard">Open Yard</option>
            <option value="shelf">Shelf</option>
            <option value="budget">Budget</option>
            <option value="parcel">Parcel Drop-Off</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
            Rental Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="day">Per Day</option>
            <option value="week">Per Week</option>
            <option value="month">Per Month</option>
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
            Budget (per month)
          </label>
          <select
            value={priceBand}
            onChange={(e) => setPriceBand(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          >
            <option value="">Any budget</option>
            <option value="lt10k">Below KES 10,000</option>
            <option value="10k-20k">KES 10,000 – 20,000</option>
            <option value="20k-30k">KES 20,000 – 30,000</option>
            <option value="gt30k">Above KES 30,000</option>
          </select>
        </div>
        <div className="lg:col-span-2 flex items-end">
          <button
            type="submit"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]"
          >
            <span>Search Storage</span>
            <span aria-hidden>🔍</span>
          </button>
        </div>
      </div>
    </form>
  );
}

\"use client\";

import { FormEvent, useState } from \"react\";
import { useRouter } from \"next/navigation\";

export default function HeroSearchForm() {
  const router = useRouter();
  const [location, setLocation] = useState(\"\");
  const [storageType, setStorageType] = useState(\"\");
  const [duration, setDuration] = useState(\"month\");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (location.trim()) params.set(\"location\", location.trim());
    if (storageType) params.set(\"type\", storageType);
    if (duration) params.set(\"duration\", duration);

    const qs = params.toString();
    router.push(`/storage${qs ? `?${qs}` : \"\"}`);
  };

  return (
    <form
      onSubmit={onSubmit}
      className=\"mx-auto mt-10 max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--white)] p-4 shadow-2xl shadow-[rgba(15,23,42,0.25)] md:p-6\"
    >
      <p className=\"mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[var(--muted)]\">
        Search storage near you
      </p>
      <div className=\"grid gap-4 md:grid-cols-2 lg:grid-cols-[2fr,1.5fr,1.5fr,auto]\">
        <div>
          <label className=\"mb-1 block text-xs font-medium text-[var(--muted)]\">
            Location
          </label>
          <input
            type=\"text\"
            placeholder=\"City or area\"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className=\"w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]\"
          />
        </div>
        <div>
          <label className=\"mb-1 block text-xs font-medium text-[var(--muted)]\">
            Storage Type
          </label>
          <select
            value={storageType}
            onChange={(e) => setStorageType(e.target.value)}
            className=\"w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]\"
          >
            <option value=\"\">Any type</option>
            <option value=\"residential\">Residential</option>
            <option value=\"commercial\">Commercial</option>
            <option value=\"warehouse\">Warehouse</option>
            <option value=\"yard\">Open Yard</option>
            <option value=\"shelf\">Shelf</option>
            <option value=\"budget\">Budget</option>
            <option value=\"parcel\">Parcel Drop-Off</option>
          </select>
        </div>
        <div>
          <label className=\"mb-1 block text-xs font-medium text-[var(--muted)]\">
            Rental Duration
          </label>
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className=\"w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]\"
          >
            <option value=\"day\">Per Day</option>
            <option value=\"week\">Per Week</option>
            <option value=\"month\">Per Month</option>
          </select>
        </div>
        <div className=\"lg:col-span-2 flex items-end\">
          <button
            type=\"submit\"
            className=\"inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform transition-colors hover:-translate-y-0.5 hover:bg-[var(--accent-hover)]\"
          >
            <span>Search Storage</span>
            <span aria-hidden>🔍</span>
          </button>
        </div>
      </div>
    </form>
  );
}

