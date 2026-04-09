import Image from "next/image";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteHeader from "@/components/SiteHeader";
import { fetchListingById } from "@/lib/fetchListingById";
import { IMAGES } from "../../images";
import BookingButton from "../BookingButton";

export const dynamic = "force-dynamic";

function listingImage(storageType: string): string {
  const map: Record<string, string> = {
    "Residential Storage": IMAGES.storage.residential,
    "Commercial Storage": IMAGES.storage.commercial,
    "Warehouse Storage": IMAGES.storage.warehouse,
    "Open Yard Storage": IMAGES.storage.yard,
    "Shared Shop/Shelf Space": IMAGES.storage.shelf,
    "Budget Units": IMAGES.storage.budget,
    "Pickup & Drop-Off Point Vendor": IMAGES.storage.parcel,
  };
  return map[storageType] ?? IMAGES.storage.commercial;
}

export async function generateMetadata({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await Promise.resolve(params);
  const listing = await fetchListingById(id);
  if (!listing) {
    return {
      title: "Storage Listing Not Found — Mystore",
      description: "The requested storage listing is not available.",
    };
  }

  const title = `${listing.title} — Mystore`;
  const description = `${listing.city}, ${listing.county} · ${listing.storageType} · KES ${listing.pricePerMonth.toLocaleString()}/month.`;
  const image = listingImage(listing.storageType);

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: image, alt: listing.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default async function StorageDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const { id } = await Promise.resolve(params);
  const listing = await fetchListingById(id);

  if (!listing) notFound();

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Link href="/storage" className="text-sm font-medium text-[var(--primary)] hover:underline">
          ← Back to search
        </Link>
        <div className="mt-6 rounded-xl border border-[var(--border)] bg-[var(--white)] overflow-hidden">
          <div className="relative aspect-[21/9] w-full overflow-hidden bg-[var(--border)]">
            <Image
              src={listingImage(listing.storageType)}
              alt={listing.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 896px"
              className="object-cover"
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
                  Parcel pickup & drop-off
                </span>
              )}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <span className="text-xl font-bold text-[var(--primary)]">
                KES {listing.pricePerMonth.toLocaleString()}/month
              </span>
              <span className="text-sm text-[var(--muted)]">
                or {listing.pricePerDay.toLocaleString()}/day · {listing.pricePerWeek.toLocaleString()}/week
              </span>
            </div>
            <BookingButton
              listingId={listing.id}
              pricePerDay={listing.pricePerDay}
              pricePerWeek={listing.pricePerWeek}
              pricePerMonth={listing.pricePerMonth}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
