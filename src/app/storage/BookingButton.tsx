"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabaseBrowser";

type Props = {
  listingId: string;
  monthlyPrice: number;
};

export default function BookingButton({ listingId, monthlyPrice }: Props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleClick = async () => {
    setMessage(null);
    setError(null);

    if (!supabaseBrowser) {
      setError("Bookings are not available right now.");
      return;
    }

    const { data } = await supabaseBrowser.auth.getUser();
    const userId = data.user?.id;

    if (!userId) {
      router.push("/auth");
      return;
    }

    setLoading(true);
    try {
      const today = new Date();
      const end = new Date(today);
      end.setMonth(end.getMonth() + 1);

      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          renterId: userId,
          listingId,
          startDate: today.toISOString().slice(0, 10),
          endDate: end.toISOString().slice(0, 10),
          durationUnit: "month",
          totalPrice: monthlyPrice,
        }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(json.message || "Could not create booking.");
        return;
      }
      setMessage("Booking request submitted.");
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={handleClick}
        disabled={loading}
        className="rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)] disabled:opacity-60"
      >
        {loading ? "Sending request..." : "Request to book"}
      </button>
      {message && (
        <p className="mt-2 text-sm text-green-600">
          {message}
        </p>
      )}
      {error && (
        <p className="mt-2 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

