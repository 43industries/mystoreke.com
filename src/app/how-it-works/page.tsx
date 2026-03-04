import Link from "next/link";

export const metadata = {
  title: "How MyStoreKE Works",
  description:
    "Understand how renters, hosts, and drivers use MyStoreKE to find storage and move parcels.",
};

export default function HowItWorksPage() {
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

      <main className="mx-auto max-w-4xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">How MyStoreKE Works</h1>
        <p className="mt-4 text-[var(--muted)]">
          MyStoreKE connects three sides of the marketplace: renters who need space, hosts with
          available storage, and drivers who move parcels between locations.
        </p>

        <section className="mt-10 grid gap-8 md:grid-cols-3">
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For renters</h2>
            <ol className="list-decimal space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>Search for storage by location, type, and filters.</li>
              <li>Compare options, security features, and pricing.</li>
              <li>Book and arrange drop-off and access with the host.</li>
            </ol>
            <Link
              href="/storage"
              className="mt-3 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
            >
              Start searching →
            </Link>
          </div>
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For hosts</h2>
            <ol className="list-decimal space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>Describe your space and upload photos.</li>
              <li>Set pricing, access hours, and security options.</li>
              <li>Optionally enable parcel drop-off to earn more.</li>
            </ol>
            <Link
              href="/list-your-space"
              className="mt-3 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
            >
              List your space →
            </Link>
          </div>
          <div className="space-y-3 rounded-xl border border-[var(--border)] bg-[var(--white)] p-5">
            <h2 className="text-lg font-semibold text-[var(--foreground)]">For deliveries</h2>
            <ol className="list-decimal space-y-2 pl-4 text-sm text-[var(--muted)]">
              <li>Apply once with your details and vehicle type.</li>
              <li>Get verified and receive parcel jobs.</li>
              <li>Deliver on your schedule and get paid per trip.</li>
            </ol>
            <Link
              href="/become-a-driver"
              className="mt-3 inline-block text-sm font-medium text-[var(--primary)] hover:underline"
            >
              Become a driver →
            </Link>
          </div>
        </section>

        <section className="mt-10 space-y-3">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Security & trust</h2>
          <p className="text-sm text-[var(--muted)]">
            MyStoreKE encourages hosts to provide clear security features (CCTV, guards, locked
            units, gated yards) and transparent terms. Renters should always review listings
            carefully and keep written agreements and inventories for long-term storage.
          </p>
        </section>
      </main>
    </div>
  );
}

