import Link from "next/link";
import { notFound } from "next/navigation";
import { IMAGES } from "../../images";
import { type StorageListing } from "../data";

function listingImage(storageType: string): string {
  const map: Record<string, string> = {
    "Residential Storage": IMAGES.storage.residential,
    "Commercial Storage": IMAGES.storage.commercial,
    "Warehouse Storage": IMAGES.storage.commercial,
    "Open Yard Storage": IMAGES.storage.yard,
    "Shelf Storage": IMAGES.storage.shelf,
    "Budget Units": IMAGES.storage.residential,
    "Parcel Drop-Off Points": IMAGES.storage.parcel,
  };
  return map[storageType] ?? IMAGES.storage.commercial;
}

export default async function StorageDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await fetch("/api/listings", {
    // Always fetch fresh data on the server for now so newly added listings appear.
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const allListings = (await res.json()) as StorageListing[];
  const listing = allListings.find((l) => l.id === id);
  if (!listing) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            MyStoreKE
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-white/90">
            <Link href="/storage" className="hover:text-white">Find Storage</Link>
            <Link href="/list-your-space" className="hover:text-white">List Your Space</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/storage" className="text-sm font-medium text-[var(--primary)] hover:underline">
          ← Back to search
        </Link>
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--white)] overflow-hidden">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--border)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={listingImage(listing.storageType)}
              alt={listing.title}
              className="h-full w-full object-cover"
            />
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
