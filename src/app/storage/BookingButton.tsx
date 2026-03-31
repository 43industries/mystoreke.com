"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type DurationUnit = "day" | "week" | "month";

type Props = {
  listingId: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
};

function formatKes(n: number) {
  return `KES ${n.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
}

export default function BookingButton({
  listingId,
  pricePerDay,
  pricePerWeek,
  pricePerMonth,
}: Props) {
  const [duration, setDuration] = useState<DurationUnit>("month");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reserved, setReserved] = useState(false);
  const [paidDemo, setPaidDemo] = useState(false);
  const router = useRouter();

  const unitPrice = useMemo(() => {
    if (duration === "day") return pricePerDay;
    if (duration === "week") return pricePerWeek;
    return pricePerMonth;
  }, [duration, pricePerDay, pricePerWeek, pricePerMonth]);

  const { startDate, endDate } = useMemo(() => {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    if (duration === "day") end.setDate(end.getDate() + 1);
    else if (duration === "week") end.setDate(end.getDate() + 7);
    else end.setMonth(end.getMonth() + 1);
    return {
      startDate: start.toISOString().slice(0, 10),
      endDate: end.toISOString().slice(0, 10),
    };
  }, [duration]);

  const handleReserve = async () => {
    setError(null);

    if (!supabaseBrowser) {
      setError("Bookings are not available right now.");
      return;
    }

    const { data } = await supabaseBrowser.auth.getUser();
    const userId = data.user?.id;
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const accessToken = session?.access_token;

    if (!userId || !accessToken) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          listingId,
          startDate,
          endDate,
          durationUnit: duration,
          totalPrice: unitPrice,
          note: `Selected ${duration} rate from listing page.`,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "Could not create booking.");
        return;
      }
      setReserved(true);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 space-y-4">
      <div>
        <p className="text-sm font-medium text-[var(--foreground)]">
          Choose a priced option
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {(
            [
              ["day", "Per day", pricePerDay],
              ["week", "Per week", pricePerWeek],
              ["month", "Per month", pricePerMonth],
            ] as const
          ).map(([key, label, price]) => (
            <button
              key={key}
              type="button"
              onClick={() => setDuration(key)}
              className={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                duration === key
                  ? "border-[var(--primary)] bg-[var(--primary)] text-white"
                  : "border-[var(--border)] bg-[var(--background)] text-[var(--foreground)] hover:border-[var(--primary)]/50"
              }`}
            >
              {label} · {formatKes(price)}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--background)] p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
          Price check
        </p>
        <p className="mt-1 text-lg font-bold text-[var(--primary)]">
          {formatKes(unitPrice)}{" "}
          <span className="text-sm font-normal text-[var(--muted)]">
            for this booking period ({duration})
          </span>
        </p>
        <p className="mt-1 text-xs text-[var(--muted)]">
          {startDate} → {endDate}
        </p>
      </div>

      {!reserved && (
        <button
          type="button"
          onClick={() => void handleReserve()}
          disabled={loading}
          className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
        >
          {loading ? "Reserving…" : "Reserve"}
        </button>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {reserved && !paidDemo && (
        <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-4">
          <p className="font-semibold text-[var(--foreground)]">
            Reservation recorded
          </p>
          <p className="mt-2 text-sm text-[var(--muted)]">
            Complete payment to confirm. When live, this step will connect to M-Pesa, card, or
            other methods you enable for Mystore.
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
            Amount due: {formatKes(unitPrice)}
          </p>
          <button
            type="button"
            onClick={() => setPaidDemo(true)}
            className="mt-4 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] hover:opacity-90"
          >
            Pay now (demo — marks as paid)
          </button>
        </div>
      )}

      {paidDemo && (
        <p className="text-sm font-medium text-green-700">
          Payment recorded for this demo. Check{" "}
          <a href="/my-bookings" className="underline">
            My bookings
          </a>{" "}
          when connected to your account.
        </p>
      )}
    </div>
  );
}
