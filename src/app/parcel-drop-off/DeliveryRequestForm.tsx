"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

export default function DeliveryRequestForm() {
  const router = useRouter();
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [description, setDescription] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!supabaseBrowser) {
      setError("Delivery requests require a configured app.");
      return;
    }
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      router.push("/auth");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/delivery-jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          pickupAddress: pickup,
          dropoffAddress: dropoff,
          parcelDescription: description,
          preferredDate: preferredDate || undefined,
          notes: notes || undefined,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof json.message === "string" ? json.message : "Request failed.");
        return;
      }
      setMessage("Request saved as a draft. We’ll follow up when routing is available.");
      setPickup("");
      setDropoff("");
      setDescription("");
      setPreferredDate("");
      setNotes("");
    } catch {
      setError("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mt-12 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
      <h2 className="text-lg font-semibold text-[var(--foreground)]">
        Request a pickup &amp; drop-off
      </h2>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Log in to submit a draft job. An admin can move it through quoted → assigned → delivered.
      </p>
      <form className="mt-4 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Pickup address
          </label>
          <textarea
            required
            rows={2}
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Drop-off address
          </label>
          <textarea
            required
            rows={2}
            value={dropoff}
            onChange={(e) => setDropoff(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
            Parcel description (optional)
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Preferred date (optional)
            </label>
            <input
              type="date"
              value={preferredDate}
              onChange={(e) => setPreferredDate(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-[var(--foreground)]">
              Notes (optional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {message && <p className="text-sm text-green-700">{message}</p>}
        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
          >
            {loading ? "Submitting…" : "Submit draft request"}
          </button>
          <Link
            href="/my-bookings"
            className="self-center text-sm font-medium text-[var(--primary)] hover:underline"
          >
            View my bookings &amp; jobs →
          </Link>
        </div>
      </form>
    </section>
  );
}
