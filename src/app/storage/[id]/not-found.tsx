import Link from "next/link";

export default function StorageDetailNotFound() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12">
      <div className="rounded-xl border border-[var(--border)] bg-[var(--white)] p-8 text-center">
        <h1 className="text-2xl font-semibold text-[var(--foreground)]">Listing not found</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          The listing may have been removed or is no longer available.
        </p>
        <Link
          href="/storage"
          className="mt-5 inline-block rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white"
        >
          Browse storage listings
        </Link>
      </div>
    </div>
  );
}
