"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

const MPESA_ENABLED = process.env.NEXT_PUBLIC_MPESA_ENABLED === "true";

type DurationUnit = "day" | "week" | "month";

type Props = {
  listingId: string;
  pricePerDay: number;
  pricePerWeek: number;
  pricePerMonth: number;
};

function formatKes(n: number) {
  const v = Number.isFinite(n) ? n : 0;
  return `KES ${v.toLocaleString("en-KE", { maximumFractionDigits: 0 })}`;
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
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [mpesaPhone, setMpesaPhone] = useState("");
  const [mpesaLoading, setMpesaLoading] = useState(false);
  const [mpesaMessage, setMpesaMessage] = useState<string | null>(null);
  const [payStatus, setPayStatus] = useState<"none" | "pending" | "paid" | "failed">(
    "none",
  );
  const [paidDemo, setPaidDemo] = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);
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

  const stopPoll = () => {
    if (pollRef.current) {
      clearInterval(pollRef.current);
      pollRef.current = null;
    }
  };

  useEffect(() => {
    return () => stopPoll();
  }, []);

  const pollPaymentStatus = async (bid: string, token: string) => {
    const res = await fetch(
      `/api/payments/mpesa/status?bookingId=${encodeURIComponent(bid)}`,
      { headers: { Authorization: `Bearer ${token}` } },
    );
    const json = await res.json().catch(() => ({}));
    if (!res.ok) return;
    const st = json.status as string;
    if (st === "paid") {
      setPayStatus("paid");
      stopPoll();
    } else if (st === "failed") {
      setPayStatus("failed");
      stopPoll();
    } else if (st === "pending") {
      setPayStatus("pending");
    }
  };

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
      setBookingId(typeof json.bookingId === "string" ? json.bookingId : null);
      setReserved(true);
      setPayStatus("none");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleMpesaPay = async () => {
    setMpesaMessage(null);
    setError(null);
    if (!bookingId || !supabaseBrowser) return;
    const {
      data: { session },
    } = await supabaseBrowser.auth.getSession();
    const token = session?.access_token;
    if (!token) {
      router.push("/auth");
      return;
    }

    setMpesaLoading(true);
    try {
      const res = await fetch("/api/payments/mpesa/initiate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ bookingId, phone: mpesaPhone }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "M-Pesa request failed.");
        return;
      }
      setMpesaMessage(
        json.customerMessage ||
          "Request sent. Approve the payment on your phone.",
      );
      setPayStatus("pending");
      stopPoll();
      let attempts = 0;
      pollRef.current = setInterval(() => {
        attempts += 1;
        if (attempts > 45) {
          stopPoll();
          return;
        }
        void pollPaymentStatus(bookingId, token);
      }, 4000);
      void pollPaymentStatus(bookingId, token);
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setMpesaLoading(false);
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

      {error && <p className="text-sm text-red-600">{error}</p>}

      {reserved && MPESA_ENABLED && bookingId && payStatus !== "paid" && (
        <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-4 space-y-3">
          <p className="font-semibold text-[var(--foreground)]">
            Pay with M-Pesa
          </p>
          <div className="rounded-lg border border-[var(--border)] bg-[var(--white)] p-3 text-sm text-[var(--foreground)]">
            <p className="font-medium">Payment instructions</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-[var(--muted)]">
              <li>Confirm the amount below matches what you agreed with the host.</li>
              <li>Enter the Safaricom number that should receive the STK push.</li>
              <li>Tap &ldquo;Send STK push&rdquo;, then approve the prompt on your phone.</li>
              <li>Keep this page open until you see confirmation — we update automatically.</li>
            </ol>
          </div>
          <p className="text-sm text-[var(--muted)]">
            Phone format: 07… or 2547…
          </p>
          <input
            type="tel"
            value={mpesaPhone}
            onChange={(e) => setMpesaPhone(e.target.value)}
            placeholder="e.g. 0712345678"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--background)] px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-[var(--primary)]"
          />
          <p className="text-sm font-medium text-[var(--foreground)]">
            Amount: {formatKes(unitPrice)}
          </p>
          {payStatus === "pending" && (
            <p className="text-sm text-[var(--muted)]">
              Waiting for M-Pesa… This page updates when payment completes.
            </p>
          )}
          {payStatus === "failed" && (
            <p className="text-sm text-red-600">
              Payment did not complete. You can try again.
            </p>
          )}
          {mpesaMessage && (
            <p className="text-sm text-green-700">{mpesaMessage}</p>
          )}
          <button
            type="button"
            onClick={() => void handleMpesaPay()}
            disabled={mpesaLoading || !mpesaPhone.trim()}
            className="rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] hover:opacity-90 disabled:opacity-60"
          >
            {mpesaLoading ? "Sending…" : "Send STK push"}
          </button>
        </div>
      )}

      {reserved && MPESA_ENABLED && payStatus === "paid" && (
        <p className="text-sm font-medium text-green-700">
          Payment received. Your booking is confirmed. See{" "}
          <a href="/my-bookings" className="underline">
            My bookings
          </a>
          .
        </p>
      )}

      {reserved && !MPESA_ENABLED && !paidDemo && (
        <div className="rounded-xl border border-[var(--accent)] bg-[var(--accent)]/10 p-4">
          <p className="font-semibold text-[var(--foreground)]">
            Reservation recorded
          </p>
          <div className="mt-3 rounded-lg border border-[var(--border)] bg-[var(--white)] p-3 text-sm">
            <p className="font-medium text-[var(--foreground)]">Next steps</p>
            <ol className="mt-2 list-decimal space-y-1 pl-4 text-[var(--muted)]">
              <li>Your hold uses the price for the period you selected ({duration}).</li>
              <li>When M-Pesa is enabled, you&apos;ll pay here with STK push.</li>
              <li>For now, use the demo button below only on test environments.</li>
            </ol>
          </div>
          <p className="mt-3 text-sm text-[var(--muted)]">
            M-Pesa is not enabled here. In production, set{" "}
            <span className="font-mono text-xs">NEXT_PUBLIC_MPESA_ENABLED</span> and Daraja env vars.
          </p>
          <p className="mt-3 text-sm font-medium text-[var(--foreground)]">
            Amount due: {formatKes(unitPrice)}
          </p>
          <button
            type="button"
            onClick={() => setPaidDemo(true)}
            className="mt-4 rounded-lg bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-[var(--accent-foreground)] hover:opacity-90"
          >
            Pay now (demo — for testing only)
          </button>
        </div>
      )}

      {!MPESA_ENABLED && paidDemo && (
        <p className="text-sm font-medium text-green-700">
          Demo payment recorded. Check{" "}
          <a href="/my-bookings" className="underline">
            My bookings
          </a>
          .
        </p>
      )}
    </div>
  );
}
