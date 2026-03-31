"use client";

export default function MyBookingsError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h2 className="text-lg font-semibold">Could not load bookings</h2>
        <p className="mt-2 text-sm">{error.message || "Please try again."}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
