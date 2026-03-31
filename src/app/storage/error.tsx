"use client";

export default function StorageError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900">
        <h2 className="text-lg font-semibold">Could not load storage page</h2>
        <p className="mt-2 text-sm">{error.message || "Something went wrong."}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-4 rounded-lg bg-[var(--primary)] px-4 py-2 text-sm font-medium text-white"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
