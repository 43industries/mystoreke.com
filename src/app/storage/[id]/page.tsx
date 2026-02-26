import Link from "next/link";
import { notFound } from "next/navigation";
import { MOCK_LISTINGS } from "../data";

export async function generateStaticParams() {
  return MOCK_LISTINGS.map((l) => ({ id: l.id }));
}

export default async function StorageDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = MOCK_LISTINGS.find((l) => l.id === id);
  if (!listing) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--white)]/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--primary)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-[var(--muted)]">
            <Link href="/storage" className="hover:text-[var(--foreground)]">Find Storage</Link>
            <Link href="/list-your-space" className="hover:text-[var(--foreground)]">List Your Space</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/storage" className="text-sm font-medium text-[var(--primary)] hover:underline">
          ← Back to search
        </Link>
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--white)] overflow-hidden">
          <div className="aspect-[21/9] bg-[var(--border)] flex items-center justify-center text-[var(--muted)]">
            Listing photo
          </div>
          <div className="p-6">
            <h1 className="text-2xl font-bold text-[var(--foreground)]">
              {listing.title}
            </h1>
            <p className="mt-2 text-[var(--muted)]">
              {listing.city}, {listing.county} · {listing.rating} ★ ({listing.reviewCount} reviews)
            </p>
            <p className="mt-2 font-medium text-[var(--foreground)]">
              {listing.storageType}
              {listing.size > 0 && ` · ${listing.size} ${listing.sizeUnit}`}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {listing.security.map((s) => (
                <span
                  key={s}
                  className="rounded bg-[var(--background)] px-2 py-1 text-xs text-[var(--muted)]"
                >
                  {s}
                </span>
              ))}
              {listing.parcelDropOff && (
                <span className="rounded bg-[var(--accent)]/10 px-2 py-1 text-xs font-medium text-[var(--accent)]">
                  Parcel drop-off
                </span>
              )}
            </div>
            <div className="mt-6 flex items-center gap-4">
              <span className="text-xl font-bold text-[var(--primary)]">
                KES {listing.pricePerMonth.toLocaleString()}/month
              </span>
              <span className="text-sm text-[var(--muted)]">
                or {listing.pricePerDay.toLocaleString()}/day · {listing.pricePerWeek.toLocaleString()}/week
              </span>
            </div>
            <button
              type="button"
              className="mt-6 rounded-lg bg-[var(--primary)] px-6 py-3 font-medium text-white hover:bg-[var(--primary-hover)]"
            >
              Request to book
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
