import Link from "next/link";

export const metadata = {
  title: "About MyStoreKE",
  description:
    "Learn how MyStoreKE connects renters, hosts, and drivers across Kenya for storage and parcel movement.",
};

export default function AboutPage() {
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

      <main className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-3xl font-bold text-[var(--foreground)]">About MyStoreKE</h1>
        <p className="mt-4 text-[var(--muted)]">
          MyStoreKE is a marketplace for storage and parcel movement in Kenya. We bring together
          people who need extra space, businesses that run warehouses or yards, and drivers who
          move goods between cities and estates.
        </p>
        <p className="mt-4 text-[var(--muted)]">
          Our goal is to make storage and logistics feel as simple as booking a ride: clear pricing,
          verified hosts and drivers, and flexible options that match how Kenyans actually move and
          store things in everyday life.
        </p>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Who we serve</h2>
          <ul className="space-y-2 text-[var(--muted)]">
            <li>
              <span className="font-medium text-[var(--foreground)]">Renters:</span> individuals,
              families, and businesses that need temporary or long-term space for goods.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">Hosts:</span> homeowners and
              businesses with spare rooms, warehouses, yards, or shelves they can safely rent out.
            </li>
            <li>
              <span className="font-medium text-[var(--foreground)]">Drivers:</span> riders, van and
              lorry owners who want steady parcel jobs and clear payout terms.
            </li>
          </ul>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">How MyStoreKE works</h2>
          <p className="text-[var(--muted)]">
            We provide the digital infrastructure: listings, search, bookings, and communication.
            Hosts and drivers focus on offering reliable service on the ground, while renters enjoy
            a single, trusted place to find space and delivery options.
          </p>
        </section>

        <section className="mt-10 space-y-4">
          <h2 className="text-xl font-semibold text-[var(--foreground)]">Our principles</h2>
          <ul className="list-disc space-y-2 pl-5 text-[var(--muted)]">
            <li>Clear and transparent pricing.</li>
            <li>Security and verification first.</li>
            <li>Fair opportunities for hosts and drivers.</li>
            <li>Responsive support when things go wrong.</li>
          </ul>
        </section>

        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/storage"
            className="rounded-lg bg-[var(--primary)] px-5 py-2.5 text-sm font-medium text-white hover:bg-[var(--primary-hover)]"
          >
            Find Storage
          </Link>
          <Link
            href="/list-your-space"
            className="rounded-lg border border-[var(--border)] bg-[var(--white)] px-5 py-2.5 text-sm font-medium text-[var(--foreground)]"
          >
            List Your Space
          </Link>
        </div>
      </main>
    </div>
  );
}

