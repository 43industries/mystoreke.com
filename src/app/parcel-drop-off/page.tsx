import Link from "next/link";
import PageHero from "@/components/PageHero";
import { IMAGES } from "../images";

export const metadata = {
  title: "Parcel Pickup & Drop-Off — Mystore",
  description:
    "Senders, hosts, and drivers: parcel pickup and drop-off across Kenya with clear addresses and handoffs.",
};

export default function ParcelDropOffPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[var(--primary)]">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="text-lg font-bold text-[var(--accent)]">
            Mystore
          </Link>
          <nav className="flex gap-4 text-sm font-medium text-white/90">
            <Link href="/storage" className="hover:text-white">Find Storage</Link>
            <Link href="/list-your-space" className="hover:text-white">List Your Space</Link>
            <Link href="/become-a-driver" className="hover:text-white">Become Driver/Rider</Link>
          </nav>
        </div>
      </header>
      <PageHero
        title="Parcel Pickup & Drop-Off"
        subtitle="Send, receive, and coordinate handoffs — from your door or a trusted host."
        imageSrc={IMAGES.pages.parcelDropOff}
        imageAlt="Parcel pickup and drop-off"
      />

      <main className="mx-auto max-w-4xl px-4 py-12">
        <p className="text-[var(--muted)]">
          Mystore supports hosts who run counters, kiosks, or shops as{" "}
          <strong className="text-[var(--foreground)]">pickup and drop-off points</strong>, and
          drivers or riders who move parcels between senders and receivers.
        </p>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For parcel senders</h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>
                Say whether the parcel should be <strong>picked up from your address</strong> or from
                the <strong>nearest host</strong> with a clear, searchable address.
              </li>
              <li>
                Specify where the parcel should be <strong>dropped</strong>: direct to the
                receiver&apos;s address, via a <strong>third-party courier</strong>, to a{" "}
                <strong>receiving host</strong> (pickup point), or another option you choose.
              </li>
              <li>
                Search storage and filter for{" "}
                <strong>&quot;Pickup &amp; Drop-Off Point Vendor&quot;</strong> to find verified
                counters and shops.
              </li>
              <li>Confirm operating hours, size limits, and fees before you hand over a parcel.</li>
            </ul>
          </div>
          <div className="space-y-4 rounded-xl border border-[var(--border)] bg-[var(--white)] p-6">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For hosts</h2>
            <ul className="list-disc space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>
                <strong>Enable drivers and riders</strong> to coordinate collection — both{" "}
                <strong>pickup and drop-off</strong> — using your listed hours and address.
              </li>
              <li>
                When you list your space, use the host flow to offer{" "}
                <strong>parcel pickup &amp; drop-off</strong> (including optional parcel box or
                counter holding).
              </li>
              <li>Describe fees, daily limits, and ID rules so senders and couriers know what to expect.</li>
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/storage?parcelOnly=true"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Find pickup &amp; drop-off points
          </Link>
          <Link
            href="/list-your-space"
            className="rounded-lg border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)]"
          >
            List as a host
          </Link>
          <Link
            href="/become-a-driver"
            className="rounded-lg border border-white/20 bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
          >
            Become Driver/Rider
          </Link>
        </div>
      </main>
    </div>
  );
}
