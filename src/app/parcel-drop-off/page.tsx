import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IMAGES } from "../images";

export const metadata = {
  title: "Parcel Drop-Off Points — MyStoreKE",
  description:
    "Find or offer parcel drop-off points that make it easy to send and receive packages across Kenya.",
};

export default function ParcelDropOffPage() {
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
            <Link href="/become-a-driver" className="hover:text-white">Become a Driver</Link>
          </nav>
        </div>
      </header>
      <PageHero
        title="Parcel Drop-Off Points"
        subtitle="Send and receive packages across Kenya."
        imageSrc={IMAGES.pages.parcelDropOff}
        imageAlt="Parcel drop-off and delivery"
      />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="mt-4 text-[var(--muted)]">
          MyStoreKE supports hosts who run counters, kiosks, or shops that can safely accept parcels
          on behalf of customers and businesses.
        </p>

        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For parcel senders</h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>Search storage and filter for “Parcel Drop-Off Points”.</li>
              <li>Confirm operating hours and limits before you drop a parcel.</li>
              <li>Use the host’s instructions for labeling and pickup.</li>
            </ul>
          </div>
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For hosts</h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>Enable parcel drop-off when listing your space.</li>
              <li>Describe fees, limits per day, and ID requirements.</li>
              <li>Work with drivers to coordinate collection and dispatch.</li>
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/storage?parcelOnly=true"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Find parcel drop-off points
          </Link>
          <Link
            href="/list-your-space"
            className="rounded-lg border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)]"
          >
            Offer parcel drop-off
          </Link>
        </div>
      </main>
    </div>
  );
}

